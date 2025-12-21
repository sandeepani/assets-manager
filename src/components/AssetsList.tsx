import React from 'react'
import AssetsCard from './AssetsCard'
import type { Asset } from '../models/Asset';

export default function AssetsList(props: { assets: Asset[], onDeleteAsset: (id: number) => void, onEditAsset: (id: number) => void }) {

    const { assets, onDeleteAsset, onEditAsset } = props;
    const actions = { onDeleteAsset, onEditAsset };

    return (
        <ul className='main'>
            {assets.map((asset, index) => {
                const newProps = { ...actions, asset };
                return (
                    <AssetsCard key={index} {...newProps}>
                        <p>{index}</p>
                    </AssetsCard>
                )
            })}
        </ul>
    )
}
