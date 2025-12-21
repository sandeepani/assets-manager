import { useState } from "react";
import AssetsInput from "./components/AssetsInput"
import AssetsList from "./components/AssetsList"
import type { Asset } from "./models/Asset"


function App() {

  let [assets, setAssets]: [Asset[], (assets: Asset[]) => void] = useState<Asset[]>([]);

  const [asset, setAsset]: [Asset, (asset: Asset) => void] = useState<Asset>({
    id: 0,
    name: "",
    price: 0,
    boughtAt: new Date(),
    description: "",
  });

  function addAsset(asset: Asset) {
    console.log(asset);
    const newAssetsList = [...assets, asset];
    setAssets(newAssetsList);
  }

  function deleteAsset(id: number) {
    const newAssetsList = assets.filter((asset) => asset.id !== id);
    setAssets(newAssetsList);
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
  }

  return (
    <>
      <AssetsInput onAddAsset={addAsset} asset={asset} setAsset={setAsset} updateAsset={updateAsset} />

      <AssetsList assets={assets} onDeleteAsset={deleteAsset} onEditAsset={editSelectedAsset} />
    </>
  )
}

export default App
