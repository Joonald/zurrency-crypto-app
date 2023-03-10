import { useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import CoinInfo from "../components/CoinInfo";
import { SingleCoinData } from "../config/apiConfig";

type CoinParam = {
    id: any;
}
export interface ISingleCoin {
    id: string,
    symbol: string,
    name: string,
    market_cap_rank: number,
    description: {
        en: string,
    },
    links: {
        homepage: []
    },
    image: {
        thumb: string,
        small: string,
        large: string,
    },
    market_data: {
        current_price: {
            usd: number,
        }
    },
    market_cap: {
        usd: number,
    },
    total_volume: {
        usd: number,
    },
    high_24h: {
        usd: number,
    },
    low_24h: {
        usd: number,
    },
    price_change_24h: number,
    price_change_percentage_24h: number,
    price_change_percentage_7d: number,
    price_change_percentage_30d: number,
    price_change_percentage_1y: number,
    market_cap_change_24h: number,
    market_cap_change_percentage_24h: number,
    total_supply: number,
    max_supply: number,
    circulating_supply: number,
};

const SingleCrypto = () => {
    const { id } = useParams<CoinParam>();
    const [coinData, setData] = useState<ISingleCoin>(
        {
            id: "",
            symbol: "",
            name: "",
            market_cap_rank: 0,
            description: {
                en: "",
            },
            links: {
                homepage: []
            },
            image: {
                thumb: "",
                small: "",
                large: "",
            },
            market_data: {
                current_price: {
                    usd: 0,
                }
            },
            market_cap: {
                usd: 0,
            },
            total_volume: {
                usd: 0,
            },
            high_24h: {
                usd: 0,
            },
            low_24h: {
                usd: 0,
            },
            price_change_24h: 0,
            price_change_percentage_24h: 0,
            price_change_percentage_7d: 0,
            price_change_percentage_30d: 0,
            price_change_percentage_1y: 0,
            market_cap_change_24h: 0,
            market_cap_change_percentage_24h: 0,
            total_supply: 0,
            max_supply: 0,
            circulating_supply: 0,
        }
    );
        console.log(coinData.links.homepage)
    const [isLoaded, setLoaded] = useState<boolean>(false);

    useEffect( () => {
        const getData = async () => {
            const res = await fetch(SingleCoinData(id));
            if ( res.ok ) {
                const result = await res.json();
                setData(result)
                setLoaded(true)
            } else {
                setLoaded(false)
            }
        }
        getData();
    }, [id])

    return (
        <main>
            <section className='singleCrypto'>
                <>  
                    <section>
                        <span>Rank: {coinData.market_cap_rank}</span>
                        <img src={coinData.image.thumb} alt={coinData.name} />
                        <h1>{coinData.name} {coinData.symbol.toUpperCase()}</h1>
                        <span><p>${coinData.market_data.current_price.usd.toLocaleString()}</p></span>
                    </section>
                    <CoinInfo coinInfo={coinData}/>
                </>
            </section>
        </main>
        
    )
}

export default SingleCrypto;