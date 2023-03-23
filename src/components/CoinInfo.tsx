import { ISingleCoin } from "../pages/SingleCrypto";
import CoinChart from "./CoinChart";

type CoinInfoProps = { coinInfo: ISingleCoin};

const CoinInfo = ( {coinInfo}: CoinInfoProps ) => {
    return (
        <>
            <CoinChart id={coinInfo.id} />
        </>
    )
}

export default CoinInfo;