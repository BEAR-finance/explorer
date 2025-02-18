import React from 'react'
import { Accordion } from '../common/Accordion'
import { Container, Content } from '../common/Container'
import './BeginnersGuide.css'

export const BeginnersGuide: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => (
  <div className="eth-beginners-guide">
    <Container>
      <Content>
        <h2>Beginner's Guide</h2>
        <Accordion
          title={
            <h3>
              What do I need to <b>play</b>?
            </h3>
          }
        >
          <p>A PC or Mac running Chrome or Firefox</p>
          <ul>
            <li>
              <p>Can I play on a mobile device?</p>
              <p>For the moment we don’t support mobile devices. But please stay tuned!</p>
            </li>
            <li>
              <p>Can I log in from multiple computers?</p>
              <p>
<<<<<<< HEAD
                Yes, you can run Bearland from multiple computers as long as
                you have your digital wallet installed on each machine.
=======
                Yes, you can run Decentraland from multiple computers as long as you have your digital wallet installed
                on each machine.
>>>>>>> 7f19988295bc26bb94346a9a4f9c5a27e5ee74a4
              </p>
            </li>
            <li>
              <p>Can I use a different browser?</p>
              <p>
                While it may be technically possible to use another browser, we recommend Chrome or Firefox to ensure
                optimal performance.
              </p>
            </li>
          </ul>
        </Accordion>
        <Accordion
          title={
            <h3>
              What is a <b>Wallet</b> and why do I need one?
            </h3>
          }
        >
          <p>
<<<<<<< HEAD
            If you want to fully enjoy the Bearland experience, we recommend
            you get yourself a digital wallet. Digital wallets work as your
            personal account, keeping all your digital assets (such as names,
            collectibles, LANDs) and in-world progress safe.
          </p>
          <p>
            If you choose to experience Bearland Explorer without a wallet,
            the information will be only be stored locally: you will be able to
            walk around, customize your Avatar and chat with others in-world,
            but you won’t have the chance to receive daily rewards, participate
            in events or log in with a different device using the same Guest ID
            and Avatar.
          </p>
          <p>
            If this is the first time you’re hearing about digital wallets, we
            recommend reading{" "}
            <a
              href="https://docs.bears.finance/examples/get-a-wallet/"
              target="_blank"
              rel="noreferrer"
            >
=======
            If you want to fully enjoy the Decentraland experience, we recommend you get yourself a digital wallet.
            Digital wallets work as your personal account, keeping all your digital assets (such as names, collectibles,
            LANDs) and in-world progress safe.
          </p>
          <p>
            If you choose to experience Decentraland Explorer without a wallet, the information will only be stored
            locally: you will be able to walk around, customize your Avatar and chat with others in-world, but you won’t
            have the chance to receive daily rewards, participate in events or log in with a different device using the
            same Guest ID and Avatar.
          </p>
          <p>
            If this is the first time you’re hearing about digital wallets, we recommend reading{' '}
            <a href="https://docs.decentraland.org/examples/get-a-wallet/" target="_blank" rel="noreferrer">
>>>>>>> 7f19988295bc26bb94346a9a4f9c5a27e5ee74a4
              Get a Wallet – Beginners Guide
            </a>
            .
          </p>
        </Accordion>
        <Accordion
          title={
            <h3>
              What is <b>USD</b>?
            </h3>
          }
        >
          <p>
<<<<<<< HEAD
            USD is Bearland’s fungible, ERC20 cryptocurrency token. USD is
            burned, or spent, in exchange for LAND parcels. For a current
            summary of critical stats like total and circulating supply, please
            visit our USD Token Information transparency dashboard. See the{" "}
            <a
              href="https://docs.bears.finance/decentraland/glossary/"
              target="_blank"
              rel="noreferrer"
            >
=======
            MANA is Decentraland’s fungible, ERC20 cryptocurrency token. MANA is burned, or spent, in exchange for LAND
            parcels. For a current summary of critical stats like total and circulating supply, please visit our MANA
            Token Information transparency dashboard. See the{' '}
            <a href="https://docs.decentraland.org/decentraland/glossary/" target="_blank" rel="noreferrer">
>>>>>>> 7f19988295bc26bb94346a9a4f9c5a27e5ee74a4
              Glossary
            </a>
            for more information.
          </p>
        </Accordion>
        <Accordion
          title={
            <h3>
              What is <b>LAND</b>?
            </h3>
          }
        >
          <p>
            LAND is a non-fungible digital asset maintained in an Ethereum smart contract. LAND is divided into parcels
            that are referenced using unique x,y cartesian coordinates. Each LAND token includes a record of its
            coordinates, its owner, and a reference to a content description file or parcel manifest that describes and
            encodes the content the owner wishes to serve on his or her land.
          </p>
        </Accordion>
        <Accordion
          title={
            <h3>
              What is the <b>Marketplace</b>?
            </h3>
          }
        >
          <p>The Marketplace is the go-to place to trade and manage all your Decentraland on-chain assets.</p>
          <p>
<<<<<<< HEAD
            The Marketplace is the go-to place to trade and manage all your
            Bearland on-chain assets.
          </p>
          <p>
            Access the Marketplace at{" "}
            <a
              href="https://market.bears.finance"
              target="_blank"
              rel="noreferrer"
            >
              market.bears.finance
=======
            Access the Marketplace at{' '}
            <a href="https://market.decentraland.org" target="_blank" rel="noreferrer">
              market.decentraland.org
>>>>>>> 7f19988295bc26bb94346a9a4f9c5a27e5ee74a4
            </a>
            .
          </p>
          <p>The Marketplace allows you to:</p>
          <ul>
            <li>
              <p>
<<<<<<< HEAD
                Sell parcels and Estates of LAND, wearables and unique names.
                Set your own price in USD and an expiration date for the offer.
=======
                Sell parcels and Estates of LAND, wearables and unique names. Set your own price in MANA and an
                expiration date for the offer.
>>>>>>> 7f19988295bc26bb94346a9a4f9c5a27e5ee74a4
              </p>
            </li>
            <li>
              <p>Buy parcels and Estates, wearables and unique names that are for sale.</p>
            </li>
            <li>
              <p>Transfer your parcels and Estates to another user.</p>
            </li>
            <li>
              <p>
                Explore the world through a map to see who owns what, what wearables exist and what names are claimed.
              </p>
            </li>
          </ul>
        </Accordion>
      </Content>
    </Container>
  </div>
)
