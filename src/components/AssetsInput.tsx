import React, { useState } from "react";
import { AssetErrors, type Asset } from "../models/Asset";

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

    const [errors, setErrors] = useState<AssetErrors>({});

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        console.log(asset.name, asset.price, asset.boughtAt, asset.description);

        function validateAsset() {
            if (!asset.name || !asset.price || !asset.boughtAt) {
                setErrors({
                    name: !asset.name ? "Name is required" : "",
                    price: !asset.price ? "Price is required" : "",
                    boughtAt: !asset.boughtAt ? "Purchased on date is required" : "",
                });
                return false;
            }
            if (asset.boughtAt.toDateString() === "Invalid Date") {
                setErrors({
                    name: "",
                    price: "",
                    boughtAt: "Purchased on date is invalid",
                });
                return false;
            }
            setErrors({
                name: "",
                price: "",
                boughtAt: "",
            });
            return true;
        }

        if (!validateAsset()) return;

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
                    {errors.name && <div className="error"> <i className="fa-solid fa-circle-exclamation"></i> <p>{errors.name}</p> </div>}
                    <input type="number" placeholder="Asset price" value={asset.price} onChange={(event) => setPrice(Number(event.target.value))} />
                    {errors.price && <div className="error"> <i className="fa-solid fa-circle-exclamation"></i> <p>{errors.price}</p> </div>}
                    <input type="date" placeholder="Asset purchased on" value={getBoughtAtDateString()} onChange={(event) => setBoughtAt(new Date(event.target.value))} />
                    {errors.boughtAt && <div className="error"> <i className="fa-solid fa-circle-exclamation"></i> <p>{errors.boughtAt}</p> </div>}
                    <textarea placeholder="Add any additional details..." value={asset.description} onChange={(event) => setDescription(event.target.value)} />
                    {errors.description && <div className="error"> <i className="fa-solid fa-circle-exclamation"></i> <p>{errors.description}</p> </div>}
                    <button id="submit" onClick={handleSubmit}><h3>{asset.id && asset.id !== -1 ? "Update" : "Add"} Asset</h3></button>
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