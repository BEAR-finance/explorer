using DCL.Configuration;
using DCL.Helpers.NFT;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class BuilderInWorldNFTController 
{
    public event System.Action OnNFTUsageChange;
    NFTOwner nFTOwner;

    Coroutine fechNFTsCor;

    static BuilderInWorldNFTController instance;

    List<NFTInfo> nFTsAlreadyInUse = new List<NFTInfo>();

    public static BuilderInWorldNFTController i
    {
        get
        {
            if (instance == null)
            {
                instance = new BuilderInWorldNFTController();
            }

            return instance;
        }
    }
 
    public void Start()
    {
        UserProfile userProfile = UserProfile.GetOwnUserProfile();
        userProfile.OnUpdate += (x) => GetNFTsFromOwner();
    }

    public void ClearNFTs()
    {
        nFTsAlreadyInUse.Clear();
    }

    public bool IsNFTInUse(string id)
    {
        foreach(NFTInfo info in nFTsAlreadyInUse)
        {
            if (info.assetContract.address == id)
                return true;
        }
        return false;
    }

    public void StopUsingNFT(string id)
    {
        foreach (NFTInfo info in nFTOwner.assets)
        {
            if (info.assetContract.address != id) continue;
            if (!nFTsAlreadyInUse.Contains(info)) continue;

            nFTsAlreadyInUse.Remove(info);
            OnNFTUsageChange?.Invoke();
        }
    }

    public void UseNFT(string id)
    {
        foreach (NFTInfo info in nFTOwner.assets)
        {
            if (info.assetContract.address != id) continue;
            if (nFTsAlreadyInUse.Contains(info)) continue;

            nFTsAlreadyInUse.Add(info);
            OnNFTUsageChange?.Invoke();

        }
    }
   
    public List<SceneObject> GetNFTsAsSceneObjects()
    {
        List<SceneObject> sceneObjects = new List<SceneObject>();

        if (nFTOwner.assets == null)
            return sceneObjects;

        foreach(NFTInfo nFTInfo in nFTOwner.assets)
        {
            sceneObjects.Add(NFTInfoToSceneObject(nFTInfo));
        }
        return sceneObjects;
    }

    void GetNFTsFromOwner()
    {
        if (fechNFTsCor != null) CoroutineStarter.Stop(fechNFTsCor);
        fechNFTsCor = CoroutineStarter.Start(FetchNFTs());
    }

    IEnumerator FetchNFTs()
    {
        UserProfile userProfile = UserProfile.GetOwnUserProfile();
        string userId = "0xdEdD78D3fF1533979f7F5302C95cfA63d9e0D09a";
        yield return NFTHelper.FetchNFTsFromOwner(userId, (nFTOwner) =>
        {
            this.nFTOwner = nFTOwner;
        },
        (error) =>
        {
            Debug.Log($"error getting NFT from owner:  {error}");
        });
    }

    SceneObject NFTInfoToSceneObject(NFTInfo nFTInfo)
    {
        SceneObject sceneObject = new SceneObject();
        sceneObject.asset_pack_id = BuilderInWorldSettings.ASSETS_COLLECTIBLES;
        sceneObject.id = nFTInfo.assetContract.address;
        sceneObject.thumbnail = nFTInfo.thumbnailUrl;
        sceneObject.SetBaseURL(nFTInfo.originalImageUrl);
        sceneObject.name = nFTInfo.name;
        sceneObject.category = BuilderInWorldSettings.ASSETS_COLLECTIBLES;
        sceneObject.model = BuilderInWorldSettings.COLLECTIBE_MODEL_PROTOCOL + nFTInfo.assetContract.address+"/"+ nFTInfo.tokenId;
        sceneObject.tags = new List<string>();
        sceneObject.contents = new Dictionary<string, string>();
        sceneObject.metrics = new SceneObject.ObjectMetrics();

        return sceneObject;
    }
}
