import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import { CoinMarketList } from "../config/apiConfig";

interface ICoin {
    Coin: {
      id: string;
      symbol: string;
      name: string;
      image: string;
      current_price: number;
      market_cap: number;
      market_cap_rank: number;
      fully_diluted_valuation: number;
      total_volume: number;
      high_24h: number;
      low_24h: number;
      price_change_24h: number;
      price_change_percentage_24h: number;
      circulating_supply: number;
      total_supply: number;
      max_supply: number;
      ath: number;
      ath_change_percentage: number;
      atl_date: string;
      roi?: unknown;
      last_updated: string;
    }[]
  }

const Home = () => {
    const [coinData, setData] = useState<ICoin['Coin']>([]);
    const [isLoaded, setLoaded] = useState<boolean>(false);

  useEffect( () => {
   const getData = async () => {
    const list = await fetch(CoinMarketList);
    if ( list.ok ) {
      const data = await list.json()
      setData(data)
      setLoaded(true)
    } else {
      setLoaded(false)
    }
   }
   getData();
  }, [])
  
    return (
        <section className='home'>
            { isLoaded ? coinData.map((coin,i) => {
              return (
              <section key={i} className={`${coin.name} crypto`}>
                <figure>
                  <img src={coin.image} alt={coin.name} />
                  <figcaption>{coin.name}</figcaption>
                </figure>
                <p>{coin.market_cap_rank}</p>
                <h2>{coin.name}</h2>
                <p>{coin.symbol}</p>
                <p>{coin.current_price}</p>
                <p>{coin.price_change_percentage_24h}</p>
              </section>
              )
            })
            :
            <Loading />
            }
        </section>
    )
}

export default Home;