import React from "react";
import type { Asset } from "../models/Asset";

export default function AssetsInput(props: { onAddAsset: (asset: Asset) => void, asset: Asset, setAsset: (asset: Asset) => void, updateAsset: (asset: Asset) => void }) {
    const { onAddAsset, asset, setAsset, updateAsset } = props;

    function setName(name: string) {
        setAsset({ ...asset, name });
    }

    function setPrice(price: number) {
        setAsset({ ...asset, price });
    }

    function setBoughtAt(boughtAt: Date) {
        setAsset({ ...asset, boughtAt });
    }

    function setDescription(description: string) {
        setAsset({ ...asset, description });
    }

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        console.log(asset.name, asset.price, asset.boughtAt, asset.description);

        if (!asset.name || !asset.price || !asset.boughtAt) return;

        if (asset.id) {
            console.log(asset.name, asset.price, asset.boughtAt, asset.description);
            updateAsset(asset);
            setAsset({
                id: 0,
                name: "",
                price: 0,
                boughtAt: new Date(Date.now()),
                description: "",
            });
            console.log(asset.name, asset.price, asset.boughtAt, asset.description);
            return;
        }

        const id = Date.now();
        asset.id = id;
        onAddAsset(asset);

        console.log(asset.name, asset.price, asset.boughtAt, asset.description);
        setAsset({
            id: 0,
            name: "",
            price: 0,
            boughtAt: new Date(Date.now()),
            description: "",
        });
        console.log(asset.name, asset.price, asset.boughtAt, asset.description);
    }

    return (
        <header>
            <div className="main">
                <h2>Add New Asset</h2>
                <div className="main-inputs">
                    <input type="text" placeholder="Enter asset name..." value={asset.name} onChange={(event) => setName(event.target.value)} />
                    <input type="number" placeholder="Asset price" value={asset.price} onChange={(event) => setPrice(Number(event.target.value))} />
                    <input type="date" placeholder="Asset purchased on" value={getBoughtAtDateString()} onChange={(event) => setBoughtAt(new Date(event.target.value))} />
                    <textarea placeholder="Add any additional details..." value={asset.description} onChange={(event) => setDescription(event.target.value)} />
                    <button id="submit" onClick={handleSubmit}><h3>Add Asset</h3></button>
                </div>
            </div>
        </header>
    )

    function getBoughtAtDateString(): string {
        let boughtAt: Date = new Date();
        try {
            boughtAt = new Date(asset.boughtAt);
        } catch (error) {
            console.log(error);
            return "";
        }
        if (!boughtAt) return "";

        //if (!isValidDateTime(boughtAt.toDateString())) return "";
        let fullString = "";
        try {
            fullString = boughtAt.toISOString();
        } catch (error) {
            console.log(error);
            return "";
        }
        if (!fullString) return "";
        const stringSections = fullString.split("T");
        if (stringSections.length < 1) return "";

        return stringSections[0];
    }
}