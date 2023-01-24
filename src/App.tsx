import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/header';
import { CoinMarketList } from './config/apiConfig';

interface Coin {
  id: boolean;
  symbol: string;
  name: string;
  // image: string;
  // current_price: number;
  // market_cap: number;
  // market_cap_rank: number;
  // fully_diluted_valuation: number;
  // total_volume: number;
  // high_24h: number;
  // low_24h: number;
  // price_change_24h: number;
  // price_change_percentage_24h: number;
  // circulating_supply: number;
  // total_supply: number;
  // max_supply: number;
  // ath: number;
  // ath_change_percentage: number;
  // atl_date: string;
  // roi?: unknown;
  // last_updated: string;
}

const App = () => {
  const [coinData, setData] = useState<Coin>();
  const [isLoaded, setLoaded] = useState<boolean>(false);

  useEffect( ()=> {
   async function getData() {
    const list = await fetch(CoinMarketList);
    if ( list.ok ) {
      const data = await list.json()
      setData(data)
      setLoaded(true)
    }
    else {
      setLoaded(false)
    }
   }
   getData();
  }, [])

  return (
    <div className="App">
      <Header title='Zurrency'/>
      {coinData.map((coin, i) => <>{coin.id}{coin.name}{coin.symbol}</>)}
    </div>
  );
}

export default App;
