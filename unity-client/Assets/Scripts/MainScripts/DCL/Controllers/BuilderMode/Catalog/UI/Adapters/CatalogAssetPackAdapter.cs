using DCL;
using System;
using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

public class CatalogAssetPackAdapter : MonoBehaviour
{
    public TextMeshProUGUI titleTxt;
    public RawImage packImg;

    public event Action<SceneAssetPack> OnSceneAssetPackClick;
    SceneAssetPack sceneAssetPack;

    string loadedThumbnailURL;
    AssetPromise_Texture loadedThumbnailPromise;
    public void SetContent(SceneAssetPack _sceneAssetPack)
    {
        sceneAssetPack = _sceneAssetPack;
        titleTxt.text = sceneAssetPack.title;
        GetThumbnail();
    }

    private void GetThumbnail()
    {
        var url = sceneAssetPack?.ComposeThumbnailUrl();

        if (url == loadedThumbnailURL)
            return;

        if (sceneAssetPack == null || string.IsNullOrEmpty(url))
            return;

        string newLoadedThumbnailURL = url;
        var newLoadedThumbnailPromise = new AssetPromise_Texture(url);


        newLoadedThumbnailPromise.OnSuccessEvent += SetThumbnail;
        newLoadedThumbnailPromise.OnFailEvent += x => { Debug.Log($"Error downloading: {url}"); };

        AssetPromiseKeeper_Texture.i.Keep(newLoadedThumbnailPromise);


        AssetPromiseKeeper_Texture.i.Forget(loadedThumbnailPromise);
        loadedThumbnailPromise = newLoadedThumbnailPromise;
        loadedThumbnailURL = newLoadedThumbnailURL;
    }

    public void SetThumbnail(Asset_Texture texture)
    {
        if (packImg != null)
        {
            packImg.enabled = true;
            packImg.texture = texture.texture;
        }
    }

    public void SceneAssetPackClick()
    {
        OnSceneAssetPackClick?.Invoke(sceneAssetPack);
    }
}
