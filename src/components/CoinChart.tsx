import {
    useEffect,
    useState
} from "react";
import { CoinHistoryChart } from "../config/ApiConfig";

interface IHistoricData {
    prices: [],
    market_cap: [],
    total_volume: []
}

type CoinID = {
    id: string;
}

const CoinChart = ( {id}: CoinID ) => {
    const [historicData, setHistoricData] = useState<IHistoricData>(
        {
            prices: [],
            market_cap: [],
            total_volume: [],
        }
    );
    const [days, setDays] = useState<number>(1);
    const [isLoaded, setLoaded] = useState<boolean>(false);
    
    useEffect( () => {
        const getData = async () => {
            const res = await fetch(CoinHistoryChart(id, days));
            if ( res.ok ) {
                const result = await res.json();
                setHistoricData(result);
                setLoaded(true);
            } else {
                setLoaded(false);
            }
        }
        getData();
    },[ id, days ]);

    console.log(historicData);

    return(
        <>
        </>
    )
}
export default CoinChart;