import { useEffect, useState } from "react"
import { CoinMarketData } from "../config/apiConfig"

interface IMarketData {
    data: {
    active_cryptocurrencies: number
    total_market_cap: {
        usd: number
    }
    total_volume: {
        usd: number;
    }
    market_cap_change_percentage_24h_usd: number
    }
}

const MarketData = () => {
    const [marketData, setMarketData] = useState<IMarketData>(
        {   
            data: {
            active_cryptocurrencies: 0,
            total_market_cap: {
                usd: 0,
            },
            total_volume: {
                usd: 0,
            },
            market_cap_change_percentage_24h_usd: 0,
            }
        }
    );
    const [isLoaded, setLoaded] = useState<boolean>(false);

    useEffect( () => {
        const getData = async () => {
            const res = await fetch(CoinMarketData);
            if (res.ok) {
                const result = await res.json()
                setMarketData(result)
                setLoaded(true)
            } else {
                setLoaded(false)
            }
        }
        getData();
    }, [])

    return (
        <aside>
            <ul>
                <li>Market Cap: {marketData.data.active_cryptocurrencies}</li>
                <li>{marketData.data.total_volume.usd}</li>
                <li>24h% <span style={ marketData.data.market_cap_change_percentage_24h_usd > 0 ? {color: 'green'} : {color: 'red'}}>{marketData.data.market_cap_change_percentage_24h_usd}</span></li>
            </ul>
        </aside>
    )
}

export default MarketData