import { 
    Container,
    TableContainer,
    Typography, 
    TableHead, 
    TableRow, 
    TableCell, 
    Paper, Table, 
    TableBody, 
    Box, 
    LinearProgress 
} from "@mui/material";
import { 
    useState, 
    useEffect 
} from "react";
import { CoinMarketList } from "../config/ApiConfig";
import { useNavigate } from "react-router-dom";

export interface ICoin {
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
    price_change_percentage_7d_in_currency: number;
    price_change_percentage_30d_in_currency: number;
  }

const CoinTable = ()  => {
    const [coinData, setData] = useState<ICoin[]>([]);
    const [isLoaded, setLoaded] = useState<boolean>(false);
    const navigate = useNavigate();
    
    useEffect( () => {
        const getData = async () => {
        const res = await fetch(CoinMarketList);
        if ( res.ok ) {
            const result = await res.json()
            setData(result);
            setLoaded(true);
        } else {
            setLoaded(false);
        }
   }
   getData();
  }, [])

    return (
        <>
        { isLoaded 
            ? <Container sx={{ textAlign: 'right', paddingLeft: '.7rem', paddingRight: '.7rem'}}>
            <Typography
            variant="h2"
            sx={{ textAlign: 'left', fontSize: '1.5rem', paddingTop: '.5rem'} }
            >
            Today's Cryptocurrency Prices by Market Cap
            </Typography>

            <TableContainer
            component={Paper}
            sx={{ marginLeft: 'auto', backgroundColor: 'transparent', boxShadow: 0 }}
            >

                <Table
                aria-label="simple table"
                sx={{ borderCollapse: 'separate', borderSpacing: '0 2rem', borderRadius: '15%' }}
                >
                    
                    <TableHead sx={{ marginBottom: '1rem', backgroundColor: '#4F4C9E' }}>
                        <TableRow sx={{ borderRadius: '30px' }}>
                            <TableCell align='center' colSpan={2} sx={{ color: 'white', borderBottom: 0 }}>
                                Name
                            </TableCell>
                            <TableCell align='right' sx={{ color: 'white', borderBottom: 0 }}>
                                Price
                            </TableCell>
                            <TableCell align='right' sx={{ color: 'white', borderBottom: 0 }}>
                                24h%
                            </TableCell>
                            <TableCell align='right' sx={{ color: 'white', borderBottom: 0 }}>
                                7d%
                            </TableCell>
                            <TableCell align='right' sx={{ color: 'white', borderBottom: 0 }}>
                                30d%
                            </TableCell>
                            <TableCell align='center' sx={{ color: 'white', borderBottom: 0 }}>
                                Market Cap
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody sx={{ backgroundColor: '#4F4C9E' }}>
                        {coinData.map((coin: ICoin) =>{
                            return (
                                <TableRow className={`${coin.name} coin`} key={coin.id} sx={{overflowX: 'visible'}} onClick={ () => {navigate(`/single-crypto/${coin.id}`)}}>
                                    <TableCell align='left' sx={{ borderBottom: 0 }}>
                                        <img src={coin.image} alt={coin.name} className={`coinImage ${coin.symbol}`}/>
                                        <span className='marketRank'>{coin.market_cap_rank}</span>
                                    </TableCell>
                                    <TableCell className='coinName' align='left' sx={{ borderBottom: 0 }}>
                                        <p>{coin.name}</p>
                                    </TableCell>
                                    <TableCell align='right' sx={{ borderBottom: 0 }}>
                                        <p>${coin.current_price.toLocaleString()}</p>
                                    </TableCell>
                                    <TableCell align='right' sx={{ borderBottom: 0 }}>
                                        <p><span style={coin.price_change_percentage_24h > 0 ? {color: '#05FF00'} : {color: 'red'}}>
                                            {coin.price_change_percentage_24h.toPrecision(3)}%
                                        </span></p>
                                    </TableCell>
                                    <TableCell align='right' sx={{ borderBottom: 0 }}>
                                        <p><span style={coin.price_change_percentage_7d_in_currency > 0 ? {color: '#05FF00'} : {color: 'red'}}>
                                            {coin.price_change_percentage_7d_in_currency.toPrecision(3)}%
                                        </span></p>
                                    </TableCell>
                                    <TableCell align='right' sx={{ borderBottom: 0 }}>
                                        <p><span style={coin.price_change_percentage_30d_in_currency > 0 ? {color: '#05FF00'} : {color: 'red'}}>
                                            {coin.price_change_percentage_30d_in_currency.toPrecision(3)}%
                                        </span></p>
                                    </TableCell>
                                    <TableCell align='center' sx={{ borderBottom: 0 }}>
                                        <p>${coin.market_cap.toLocaleString()}</p>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            </Container> 
            : <Box sx={{ width: '100%' }}>
                <LinearProgress color='inherit' />
            </Box>
        }
        </>
    )
}
export default CoinTable;
