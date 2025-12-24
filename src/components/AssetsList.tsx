
import AssetsCard from './AssetsCard'
import type { Asset } from '../models/Asset';


export default function AssetsList(props: { assets: Asset[], onDeleteAsset: (id: number) => void, onEditAsset: (id: number) => void }) {

    const { assets, onDeleteAsset, onEditAsset } = props;
    const actions = { onDeleteAsset, onEditAsset };

    // if (assets.length === 0) {
    //     return (
    //         <EmptyCard >
    //             <p className=""></p>
    //         </EmptyCard>
    //     );
    // }
    // else {
    return (
        <ul className='main-grid'>
            {assets.map((asset, index) => {
                const newProps = { ...actions, asset };
                return (
                    <AssetsCard key={index} {...newProps}>
                        <p></p>
                    </AssetsCard>
                )
            })}
        </ul>
    )
    // }
}
