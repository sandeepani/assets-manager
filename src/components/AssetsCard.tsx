import React from 'react'
import type { Asset } from '../models/Asset';

export default function AssetsCard(props: { asset: Asset, children: React.ReactNode, onDeleteAsset: (id: number) => void, onEditAsset: (id: number) => void }) {
    const { asset, children, onDeleteAsset, onEditAsset } = props;

    function calculateCurrentValue(asset: Asset): React.ReactNode {
        const today = new Date();
        let currentValue = 0;
        if (daysBetween(today, asset.boughtAt) === 0) {
            currentValue = asset.price;
        } else {
            const totalDays = daysBetween(today, asset.boughtAt);
            currentValue = asset.price / totalDays;
        }
        return currentValue.toFixed(2);
    }

    return (
        <li className='todoItem'>
            {children}
            <h2>{asset.name}</h2>
            <h3>{asset.price}</h3>
            <p>{asset.boughtAt.toDateString()}</p>
            <p>{asset.description}</p>
            <h3>{calculateCurrentValue(asset)}</h3>
            <div className="actionsContainer">
                <button onClick={() => onEditAsset(asset.id)}>
                    <i className="fa-solid fa-pen-to-square"></i>
                </button>
                <button onClick={() => onDeleteAsset(asset.id)}>
                    <i className="fa-regular fa-trash-can"></i>
                </button>
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

        const date1UTC = getUtcDate(date1);
        //console.log(date1UTC);
        const date2UTC = getUtcDate(date2);
        //console.log(date2UTC);

        // Calculate the difference in milliseconds and take the absolute value
        const differenceMs = Math.abs(date1UTC.getTime() - date2UTC.getTime());
        //console.log(differenceMs);

        // Convert back to days and return, rounding to handle DST shifts
        return Math.round(differenceMs / ONE_DAY);
    }

    /**
 * Calculates the difference in total days between two dates.
 * @param {Date} date1 The first date.
 * @param {Date} date2 The second date.
 * @returns {number} The number of days between the two dates.
 */
    function getUtcDate(date: Date) {

        const utc = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(),
            date.getUTCDate(), date.getUTCHours(),
            date.getUTCMinutes(), date.getUTCSeconds());

        const utcDate = new Date(utc);
        //console.log(utcDate);

        return utcDate;
    }

}
