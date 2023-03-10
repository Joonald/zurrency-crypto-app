import { Grid, Box, LinearProgress } from "@mui/material"
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
        <>
        { isLoaded 
            ? <Grid 
            container 
            wrap='nowrap' 
            alignItems={'center'} 
            justifyContent={'space-between'} 
            direction={'row'} 
            spacing={2} 
            sx={{marginTop: 0, marginLeft: 0, marginBottom: 2, paddingBottom: 2, backgroundColor: '#4F4C9E', overflow: 'hidden', textAlign: 'center', width: '100%'}}
            >
                <Grid 
                item 
                xs={0} sm={0} md={3} 
                sx={{display: {xs: 'none', sm: 'none', md: 'block'}}}
                >
                    <p>Cryptos: <span className='marketText'>{marketData.data.active_cryptocurrencies.toLocaleString()}</span></p>
                </Grid>
                <Grid 
                item 
                xs={12} sm={6} md={3}
                >
                    <p>Market Cap: <span className='marketText'>${marketData.data.total_market_cap.usd.toLocaleString()}</span></p>
                </Grid>
                <Grid 
                item 
                xs={0} sm={6} md={3} 
                sx={{display: {xs: 'none', sm: 'block'}}}
                >
                    <p>Total Volume: <span className='marketText'>${marketData.data.total_volume.usd.toLocaleString()}
                    </span></p>
                </Grid>
                <Grid 
                item 
                xs={0} sm={0} md={3} 
                sx={{display: {xs: 'none', sm: 'none', md: 'block'}}}
                >
                    <p>24h%: <span style={ marketData.data.market_cap_change_percentage_24h_usd > 0 ? {color: '#05FF00'} : {color: 'red'}}>{marketData.data.market_cap_change_percentage_24h_usd.toPrecision(3)}%</span></p>
                </Grid>
            </Grid>
            : <Box sx={{ width: '100%' }}>
                <LinearProgress color='inherit' />
              </Box>
        } 
        </>
    )
}

export default MarketData;