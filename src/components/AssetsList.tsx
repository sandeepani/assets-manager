
import AssetsCard from './AssetsCard'
import type { Asset } from '../models/Asset';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';


export default function AssetsList(props: { assets: Asset[], onDeleteAsset: (id: number) => void, onEditAsset: (id: number) => void }) {

    const { assets, onDeleteAsset, onEditAsset } = props;
    const actions = { onDeleteAsset, onEditAsset };

    const [items, setItems] = useState<Asset[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const [listHeight, setListHeight] = useState(0);

    const batchLength = 5;

    const fetchItems = async () => {
        // await new Promise((resolve) => setTimeout(resolve, 5000));
        const data = assets.slice(items.length, items.length + batchLength);
        setItems((prev: Asset[]) => [...prev, ...data]);
        if (data.length < batchLength) setHasMore(false);
    };

    useEffect(() => {
        fetchItems();
    }, []);

    useEffect(() => {
        const element = document.querySelector('.main-grid');
        if (element) {
            // const height = element.clientHeight + element.clientTop; // Height including padding
            const rect = element.getBoundingClientRect();
            const bottomPosition = rect.bottom; // This is top + height
            console.log(bottomPosition);
            setListHeight(bottomPosition);
        }
    });

    if (assets?.length === 0) {
        return (

            <li className='todoItemDummy' >
                <p id="dummyText">No assets added yet. Start by adding your first asset.</p>
            </li>
        );
    }
    return (
        <InfiniteScroll
            dataLength={items.length}
            next={fetchItems}
            hasMore={hasMore}
            loader={<div style={{ height: "100px", textAlign: "center" }}><p>Loading...</p></div>}
            endMessage={getEndMessage()}
        // height={500}
        >
            <ul className='main-grid'>
                {assets.map((asset, index) => {
                    const newProps = { ...actions, asset };
                    return (
                        <AssetsCard key={index} {...newProps}>
                        </AssetsCard>
                    )
                })}
            </ul>
        </InfiniteScroll>
    )

    function getEndMessage() {
        console.log("document.documentElement.clientHeight " + document.documentElement.clientHeight);
        console.log("listHeight " + listHeight);

        const isListTaller = document.documentElement.clientHeight < listHeight;
        if (isListTaller) {
            return <div style={{ height: "100px", textAlign: "center" }}><p>You have reached the end</p></div>;
        }
        return <div></div>;
    }
}
