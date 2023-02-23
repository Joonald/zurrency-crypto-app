import { Container, TableContainer, Typography, TableHead, TableRow, TableCell, Paper, Table, TableBody } from "@mui/material";
import { useState, useEffect } from "react";
import { CoinMarketList } from "../config/apiConfig";

interface ICoin {
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
  }



const CoinTable = ()  => {
    const [coinData, setData] = useState<ICoin[]>([]);
    const [isLoaded, setLoaded] = useState<boolean>(false);

    useEffect( () => {
        const getData = async () => {
        const res = await fetch(CoinMarketList);
        if ( res.ok ) {
            const result = await res.json()
            setData(result)
            setLoaded(true)
        } else {
            setLoaded(false)
        }
   }
   getData();
  }, [])

  console.log(coinData);

    return (
        <Container sx={{ textAlign: 'center', width: '97%', paddingRight: 0, paddingLeft: '1.75rem', marginRight: '.5rem' }}>
            <Typography
            variant="h2"
            sx={{ textAlign: 'left', fontSize: '1.5rem'} }
            >
            Today's Cryptocurrency Prices by Market Cap
            </Typography>

            <TableContainer
            component={Paper}
            sx={{ marginLeft: 'auto', backgroundColor: 'transparent', boxShadow: 0, overflowX: 'visible' }}
            >

                <Table
                aria-label="simple table"
                sx={{ borderCollapse: 'separate', borderSpacing: '0 2rem', borderRadius: '15%' }}
                >
                    
                    <TableHead sx={{ marginBottom: '1rem', backgroundColor: '#4F4C9E' }}>
                        <TableRow sx={{ borderRadius: '30px' }}>
                            <TableCell align='center' sx={{ color: 'white', borderBottom: 0 }}>
                                Name
                            </TableCell>
                            <TableCell align='center' sx={{ color: 'white', borderBottom: 0 }}>
                                Price
                            </TableCell>
                            <TableCell align='center' sx={{ color: 'white', borderBottom: 0 }}>
                                24h%
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody sx={{ backgroundColor: '#4F4C9E' }}>
                        {coinData.map((coin: ICoin, i) =>{
                            return (
                                <TableRow className={`${coin.name} coin`} key={i}>
                                    <TableCell className='coin-name' align='center' sx={{ borderBottom: 0 }}>
                                        <img src={coin.image} alt={coin.name} className={`coin-image ${coin.symbol}`}/>
                                        <span className='market-rank'>{coin.market_cap_rank}</span>
                                        <p>{coin.name}</p>
                                    </TableCell>
                                    <TableCell align='center' sx={{ borderBottom: 0 }}>
                                        <p>${coin.current_price.toLocaleString()}</p>
                                    </TableCell>
                                    
                                    <TableCell align='center' sx={{ borderBottom: 0 }}>
                                        <p><span style={coin.price_change_percentage_24h > 0 ? {color: '#05FF00'} : {color: 'red'}}>
                                            {coin.price_change_percentage_24h.toPrecision(3)}%
                                        </span></p>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    )
}
export default CoinTable;
