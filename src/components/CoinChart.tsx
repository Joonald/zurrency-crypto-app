import {
    useEffect,
    useState
} from "react";
import { CoinHistoryChart } from "../config/ApiConfig";
import SortButton from "../components/SortButton";
import {
    Chart as ChartJs,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
  );

interface IHistoricData {
    prices: number[][],
    market_cap: number[][],
    total_volume: number[][],
}

type CoinID = {
    id: string;
}

const CoinChart = ( {id}: CoinID ) => {
    const [historicData, setHistoricData] = useState<IHistoricData>(
        {
            prices: [
                
            ],
            market_cap: [
                
            ],
            total_volume: [

            ],
        }
    );
    const [days, setDays] = useState<number | string>('max');
    const [isLoaded, setLoaded] = useState<boolean>(false);
    const sortDays: (string|number)[] = [1,7,30,60,180,365, 'max']
    const handleClick = (value: number | string) => {
        setDays(value)
    };
    
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

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: false,
            }
        },
        elements: {
            point: {
                radius: 2,
            }
        }
    };

    const data = {
        labels: historicData.prices.map( (coin) => {
            let date = new Date(coin[0]);
            let time = 
                date.getHours() > 12
                ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                : `${date.getHours()}:${date.getMinutes()} AM`;

        return days === 1 ? time : date.toLocaleTimeString();
        }),
        datasets: [
            {
                fill: true,
                data: historicData.prices.map( (coin) => coin[1] ),
                borderColor: '#7E47C9',
                backgroundColor: '#12132D',
                label: `Price (Past ${days}) days`,
            }
        ],
    }

    return(
        <>
        <Line options={options} data={data} />
        {sortDays.map((day => {
            return (
            <SortButton handleClick={handleClick} day={day}></SortButton>
            )
        }))}
        </>
    )
}
export default CoinChart;