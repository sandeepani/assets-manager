import { useEffect, useState } from "react";
import AssetsInput from "./components/AssetsInput"
import AssetsList from "./components/AssetsList"
import { Asset } from "./models/Asset"


function App() {

  let [assets, setAssets]: [Asset[], (assets: Asset[]) => void] = useState<Asset[]>([]);

  const [asset, setAsset]: [Asset, (asset: Asset) => void] = useState<Asset>({
    id: 0,
    name: "",
    price: 0,
    boughtAt: new Date(Date.now()),
    description: "",
  });



  function addAsset(asset: Asset) {
    console.log(asset);
    const newAssetsList = [...assets, asset];
    setAssets(newAssetsList);
    persistData(newAssetsList);
  }

  function deleteAsset(id: number) {
    const newAssetsList = assets.filter((asset) => asset.id !== id);
    setAssets(newAssetsList);
    persistData(newAssetsList);
  }

  function editSelectedAsset(id: number) {
    console.log(id);
    const assetToBeEdited = assets.find((asset) => asset.id === id);
    console.log(assetToBeEdited);
    setAsset(assetToBeEdited!);
  }

  function updateAsset(newAsset: Asset) {
    const newAssetsList = assets.map((asset) => asset.id === newAsset.id ? newAsset : asset);
    setAssets(newAssetsList);
    persistData(newAssetsList);
  }

  useEffect(() => {
    console.log("useEffect 1");

    if (!localStorage) return;

    const assetsEntry = localStorage.getItem("assets");
    if (!assetsEntry) {
      return;
    }

    console.log(assetsEntry);

    const storedData = JSON.parse(assetsEntry);
    if (!storedData) {
      return;
    }

    console.log(storedData);

    // Map the plain JSON objects to Asset instances
    // This is crucial because JSON.parse returns the date as a string, 
    // but the Asset class expects a Date object.
    const mappedAssets = storedData.assets.map((a: any) => Asset.fromJSON(a));
    setAssets(mappedAssets);


  }, []);

  // useEffect(() => {
  //   if (!isSiteLoaded) return;
  //   persistData();
  // }, [assets]);

  return (
    <>
      <AssetsInput onAddAsset={addAsset} asset={asset} setAsset={setAsset} updateAsset={updateAsset} />

      <AssetsList assets={assets} onDeleteAsset={deleteAsset} onEditAsset={editSelectedAsset} />
    </>
  )

  function persistData(newAssetsList: Asset[]) {
    console.log("useEffect 2");

    console.log(newAssetsList.length);
    console.log(newAssetsList);

    localStorage.setItem("assets", JSON.stringify({ assets: newAssetsList }));
  }
}

export default App
