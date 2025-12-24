import React from 'react'
import type { Asset } from '../models/Asset';

export default function AssetsCard(props: { asset: Asset | undefined, children: React.ReactNode, onDeleteAsset: (id: number) => void, onEditAsset: (id: number) => void }) {
    const { asset, children, onDeleteAsset, onEditAsset } = props;

    function calculateCurrentValue(asset: Asset): string {
        const today = new Date(Date.now());
        let currentValue = 0;
        if (daysBetween(today, asset.boughtAt) === 0) {
            currentValue = asset.price;
        } else {
            const totalDays = daysBetween(today, asset.boughtAt);
            currentValue = asset.price / totalDays;
        }
        return currentValue.toFixed(2);
    }

    function calculateValueToNumber(asset: Asset | undefined): number {
        if (!asset) return 0;

        const today = new Date(Date.now());
        let currentValue: number = 0;
        if (daysBetween(today, asset?.boughtAt) === 0) {
            currentValue = asset?.price;
        } else {
            const totalDays = daysBetween(today, asset?.boughtAt);
            currentValue = asset?.price / totalDays;
        }
        return currentValue;
    }

    function getDateString(boughtAt: Date): string {

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

    function formatCurrency(amount: number) {
        return new Intl.NumberFormat("en-GB", {
            style: "currency",
            currency: "GBP",
        }).format(amount);
    }

    function handleOnCardClick(event: React.MouseEvent) {
        event.stopPropagation();
        onEditAsset(asset?.id ?? -1);
    }

    return (
        <li className='todoItem real' onClick={(event) => { handleOnCardClick(event); }}>

            <div className='todoItem-row todoItem-row-up'>
                <div className='todoItem-column todoItem-column-left'>
                    <h2>{asset?.name}</h2>
                    <p>Purchased on {getDateString(asset?.boughtAt ?? new Date(Date.now()))}</p>
                </div>

                <div className="actionsContainer todoItem-column todoItem-column-right">
                    <button onClick={() => onDeleteAsset(asset?.id ?? -1)}>
                        <i className="fa-regular fa-trash-can"></i>
                    </button>
                </div>
            </div>

            <div className='todoItem-row todoItem-row-middle'>
                <p>{asset?.description}</p>
            </div>

            <div className='todoItem-row todoItem-row-down'>
                <div className='todoItem-column column-1'>
                    <p className="column-header">Purchase Price</p>
                    <p className='column-value'>{formatCurrency(asset?.price ?? 0)}</p>
                </div>

                <div className='todoItem-column column-2'>
                    <p className="column-header">Current Value</p>
                    <p className='column-value'>{formatCurrency(calculateValueToNumber(asset))}</p>
                </div>
            </div>
        </li>
    )

    /**
 * Calculates the difference in total days between two dates.
 * @param {Date} date1 The first date.
 * @param {Date} date2 The second date.
 * @returns {number} The number of days between the two dates.
 */
    function daysBetween(date1: Date, date2: Date) {
        // The number of milliseconds in one day
        const ONE_DAY = 1000 * 60 * 60 * 24;

        // const date1UTC = getUtcDate(date1);
        // //console.log(date1UTC);
        // const date2UTC = getUtcDate(date2);
        // //console.log(date2UTC);
        try {
            date1.getTime();
        } catch (error) {
            console.log(error);
            return 0;
        }
        try {
            date2.getTime();
        } catch (error) {
            console.log(error);
            console.log(date2);
            return 0;
        }

        // Calculate the difference in milliseconds and take the absolute value
        const differenceMs = Math.abs(date1.getTime() - date2.getTime());
        //console.log(differenceMs);

        // Convert back to days and return, rounding to handle DST shifts
        return Math.round(differenceMs / ONE_DAY);
    }



}
