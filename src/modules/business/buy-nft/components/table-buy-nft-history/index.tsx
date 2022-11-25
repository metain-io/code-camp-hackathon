import { useBuyNftHistory } from './use-buy-nft-history';

const TableBuyNftHistory = () => {
    const { buyNftHistory } = useBuyNftHistory();

    return (
        <form>
            <div>
                <label></label>
                <input />
            </div>
            <div>
                <label></label>
                <input />
            </div>
            <div>
                <label></label>
                <input />
            </div>
        </form>
    );
};

export { TableBuyNftHistory };
