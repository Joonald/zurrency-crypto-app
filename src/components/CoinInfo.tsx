import { ISingleCoin } from "../pages/SingleCrypto";

type CoinInfoProps = { coinInfo: ISingleCoin};

const CoinInfo = ( {coinInfo}: CoinInfoProps ) => {
    console.log(coinInfo);
    return (
        <>
        </>
    )
}

export default CoinInfo;