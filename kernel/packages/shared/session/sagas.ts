import { call, delay, put, select, takeEvery, takeLatest } from 'redux-saga/effects'
import { createIdentity } from 'eth-crypto'
import { Personal } from 'web3x/personal/personal'
import { Account } from 'web3x/account'
import { Authenticator } from 'dcl-crypto'

import { ENABLE_WEB3, ETHEREUM_NETWORK, getTLD, PREVIEW, setNetwork, WORLD_EXPLORER } from 'config'

import defaultLogger, { createLogger } from 'shared/logger'
import { initializeReferral, referUser } from 'shared/referral'
import {
  createEth,
  createWeb3Connector,
  isSessionExpired,
  loginCompleted,
  providerFuture,
  requestWeb3Provider
} from 'shared/ethereum/provider'
import { getUserProfile, removeUserProfile, setLocalProfile } from 'shared/comms/peers'
import { ReportFatalError } from 'shared/loading/ReportFatalError'
import {
  AUTH_ERROR_LOGGED_OUT,
  AWAITING_USER_SIGNATURE,
  awaitingUserSignature,
  NETWORK_MISMATCH,
  setLoadingScreen,
  setTLDError
} from 'shared/loading/types'
import { identifyUser, queueTrackingEvent } from 'shared/analytics'
import { getAppNetwork, getNetworkFromTLD } from 'shared/web3'
import { getNetwork } from 'shared/ethereum/EthereumService'

import { getFromLocalStorage, saveToLocalStorage } from 'atomicHelpers/localStorage'

import { Session } from '.'
import { ExplorerIdentity, LoginStage, SignUpStage } from './types'
import {
  AUTHENTICATE,
  AuthenticateAction,
  changeLoginStage,
  changeSignUpStage,
  INIT_SESSION,
  LOGIN,
  LoginAction,
  loginCompleted as loginCompletedAction,
  LOGOUT,
  SIGNUP,
  toggleWalletPrompt,
  UPDATE_TOS,
  updateTOS,
  userAuthentified
} from './actions'
import { ProviderType } from '../ethereum/ProviderType'
import Html from '../Html'
import { createSignUpProfile, ensureBaseCatalogs, getProfileByUserId } from '../profiles/sagas'
import { generateRandomUserProfile } from '../profiles/generateRandomUserProfile'
import { unityInterface } from '../../unity-interface/UnityInterface'
import { getSignUpProfile } from './selectors'
import { ensureRealmInitialized } from '../dao/sagas'

const TOS_KEY = 'tos'
const logger = createLogger('session: ')

export function* sessionSaga(): any {
  yield call(initialize)
  yield call(initializeReferral)

  yield takeEvery(UPDATE_TOS, updateTermOfService)
  yield takeLatest(INIT_SESSION, initSession)
  yield takeLatest(LOGIN, login)
  yield takeLatest(LOGOUT, logout)
  yield takeLatest(SIGNUP, singUp)
  yield takeLatest(AUTHENTICATE, authenticate)
  yield takeLatest(AWAITING_USER_SIGNATURE, scheduleAwaitingSignaturePrompt)
}

function* initialize() {
  const tosAgreed: boolean = !!getFromLocalStorage(TOS_KEY)
  yield put(updateTOS(tosAgreed))
  Html.initializeTos(tosAgreed)
}

function* updateTermOfService(action: any) {
  return saveToLocalStorage(TOS_KEY, action.payload)
}

function* scheduleAwaitingSignaturePrompt() {
  yield delay(10000)
  const isStillWaiting = yield select((state) => !state.session?.initialized)

  if (isStillWaiting) {
    yield put(toggleWalletPrompt(true))
    Html.showAwaitingSignaturePrompt(true)
  }
}

function* initSession() {
  yield ensureRealmInitialized()
  if (ENABLE_WEB3) {
    Html.showEthLogin()
    yield createWeb3Connector()
    const userData = getUserProfile()
    if (userData && userData.userId && isSessionExpired(userData)) {
      removeUserProfile()
    }
  }
  yield put(changeLoginStage(LoginStage.SING_IN))
  Html.bindLoginEvent()
}

function* authenticate(action: AuthenticateAction) {
  const provider = yield requestProvider(action.payload.provider as ProviderType)
  if (!provider) {
    return
  }
  const userData = yield authorize()
  let profile = yield getProfileByUserId(userData.userId)
  defaultLogger.log('PROFILE_EXIST: ', profile)
  if (profile) {
    return yield signIn(userData.userId, userData.identity)
  }
  return yield startSignUp(userData.userId, userData.identity)
}

function* startSignUp(userId: string, identity: ExplorerIdentity) {
  yield put(setLoadingScreen(true))
  yield put(changeLoginStage(LoginStage.SING_UP))
  yield put(changeSignUpStage(SignUpStage.AVATAR))
  saveToLocalStorage('signup_profile', { userId, identity })
  let profile = yield generateRandomUserProfile(userId)
  profile = {
    userId: identity.address.toString(),
    ethAddress: identity.address.toString(),
    hasClaimedName: false,
    version: 0,
    ...profile
  }
  yield ensureBaseCatalogs()
  unityInterface.LoadProfile(profile)
  unityInterface.ShowAvatarEditorInSignIn()
  yield put(setLoadingScreen(false))
}

function* requestProvider(providerType: ProviderType) {
  const provider = yield requestWeb3Provider(providerType)
  if (provider) {
    if (WORLD_EXPLORER && (yield checkTldVsNetwork())) {
      throw new Error('Network mismatch')
    }

    if (PREVIEW && ETHEREUM_NETWORK.MAINNET === (yield getNetworkValue())) {
      Html.showNetworkWarning()
    }
  }
  return provider
}

function* authorize() {
  if (ENABLE_WEB3) {
    try {
      const eth = createEth()
      const account = (yield eth.getAccounts())[0]
      const address = account.toJSON()
      const userData = getUserProfile()
      // check that user data is stored & key is not expired
      if (isSessionExpired(userData) || userData.userId !== address) {
        const identity = yield createAuthIdentity()
        return {
          userId: identity.address,
          identity
        }
      }
      return {
        userId: userData.identity.address,
        identity: userData.identity
      }
    } catch (e) {
      logger.error(e)
      ReportFatalError(AUTH_ERROR_LOGGED_OUT)
      throw e
    }
  } else {
    logger.log(`Using test user.`)
    const identity = yield createAuthIdentity()
    const profile = { userId: identity.address, identity }
    setLocalProfile(profile.userId, profile)
    return profile
  }
}

function* signIn(userId: string, identity: ExplorerIdentity) {
  logger.log(`User ${userId} logged in`)
  yield put(changeLoginStage(LoginStage.COMPLETED))

  setLocalProfile(userId, { userId, identity })
  if (identity.hasConnectedWeb3) {
    identifyUser(userId)
    referUser(identity)
  }
  yield setUserAuthentified(userId, identity)

  loginCompleted.resolve()
  yield put(loginCompletedAction())
}

function* setUserAuthentified(userId: string, identity: ExplorerIdentity) {
  let net: ETHEREUM_NETWORK = ETHEREUM_NETWORK.MAINNET
  if (WORLD_EXPLORER) {
    net = yield getAppNetwork()

    // Load contracts from https://contracts.decentraland.org
    yield setNetwork(net)
    queueTrackingEvent('Use network', { net })
  }

  yield put(userAuthentified(userId, identity, net))
}

function* singUp() {
  setLoadingScreen(true)
  const userData = getFromLocalStorage('signup_profile')

  logger.log(`User ${userData.userId} signed up`)

  const profile = yield select(getSignUpProfile)
  profile.userId = userData.userId.toString()
  profile.ethAddress = userData.userId.toString()

  yield createSignUpProfile(profile, userData.identity)
  yield signIn(userData.userId, userData.identity)
}

function* login(action: LoginAction) {
  let userId: string
  let identity: ExplorerIdentity

  if (ENABLE_WEB3) {
    try {
      if (!(yield requestProvider(action.payload.provider as ProviderType))) {
        yield put(changeLoginStage(LoginStage.CONNECT_ADVICE))
        return
      }
    } catch (e) {
      return
    }
    yield put(changeLoginStage(LoginStage.COMPLETED))
    Html.hideEthLogin()
    try {
      const userData = getUserProfile()

      // check that user data is stored & key is not expired
      if (isSessionExpired(userData)) {
        yield put(awaitingUserSignature())
        identity = yield createAuthIdentity()
        yield put(toggleWalletPrompt(false))
        Html.showAwaitingSignaturePrompt(false)
        userId = identity.address

        setLocalProfile(userId, {
          userId,
          identity
        })
      } else {
        identity = userData.identity
        userId = userData.identity.address

        setLocalProfile(userId, {
          userId,
          identity
        })
      }
    } catch (e) {
      logger.error(e)
      ReportFatalError(AUTH_ERROR_LOGGED_OUT)
      throw e
    }

    if (identity.hasConnectedWeb3) {
      identifyUser(userId)
      referUser(identity)
    }
  } else {
    logger.log(`Using test user.`)
    identity = yield createAuthIdentity()
    userId = identity.address

    setLocalProfile(userId, {
      userId,
      identity
    })

    loginCompleted.resolve()
  }

  logger.log(`User ${userId} logged in`)

  let net: ETHEREUM_NETWORK = ETHEREUM_NETWORK.MAINNET
  if (WORLD_EXPLORER) {
    net = yield getAppNetwork()

    // Load contracts from https://contracts.decentraland.org
    yield setNetwork(net)
    queueTrackingEvent('Use network', { net })
  }
  yield put(userAuthentified(userId, identity, net))

  loginCompleted.resolve()
  yield put(loginCompletedAction())
}

function* checkTldVsNetwork() {
  const web3Net = yield getNetworkValue()

  const tld = getTLD()
  const tldNet = getNetworkFromTLD()

  if (tld === 'localhost') {
    // localhost => allow any network
    return false
  }

  if (tldNet !== web3Net) {
    yield put(setTLDError({ tld, web3Net, tldNet }))
    Html.updateTLDInfo(tld, web3Net, tldNet as string)
    ReportFatalError(NETWORK_MISMATCH)
    return true
  }

  return false
}

async function getNetworkValue() {
  const web3Network = await getNetwork()
  return web3Network === '1' ? ETHEREUM_NETWORK.MAINNET : ETHEREUM_NETWORK.ROPSTEN
}

async function createAuthIdentity() {
  const ephemeral = createIdentity()

  const ephemeralLifespanMinutes = 7 * 24 * 60 // 1 week

  let address
  let signer
  let hasConnectedWeb3 = false

  if (ENABLE_WEB3) {
    const result = await providerFuture
    if (result.successful) {
      const eth = createEth()
      const account = (await eth.getAccounts())[0]

      address = account.toJSON()
      signer = async (message: string) => {
        let result
        while (!result) {
          try {
            result = await new Personal(eth.provider).sign(message, account, '')
          } catch (e) {
            if (e.message && e.message.includes('User denied message signature')) {
              put(changeLoginStage(LoginStage.SING_ADVICE))
              Html.showEthSignAdvice(true)
            }
          }
        }
        put(changeLoginStage(LoginStage.COMPLETED))
        Html.showEthSignAdvice(false)
        return result
      }
      hasConnectedWeb3 = true
    } else {
      const account: Account = result.localIdentity

      address = account.address.toJSON()
      signer = async (message: string) => account.sign(message).signature
    }
  } else {
    const account = Account.create()

    address = account.address.toJSON()
    signer = async (message: string) => account.sign(message).signature
  }

  const auth = await Authenticator.initializeAuthChain(address, ephemeral, ephemeralLifespanMinutes, signer)
  const identity: ExplorerIdentity = { ...auth, address: address.toLocaleLowerCase(), hasConnectedWeb3 }

  return identity
}

function* logout() {
  Session.current.logout().catch((e) => logger.error('error while logging out', e))
}
