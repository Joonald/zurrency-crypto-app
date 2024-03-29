export {}

export const CoinMarketList: string = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=cad&order=market_cap_desc&per_page=25&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d%2C30d%2C1y';

export const CoinMarketData: string = 'https://api.coingecko.com/api/v3/global';

export const SingleCoinData = (id: string | undefined) => `https://api.coingecko.com/api/v3/coins/${id}`;

export const CoinHistoryChart = (id: string, days: number | string) => `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}&interval=daily`;