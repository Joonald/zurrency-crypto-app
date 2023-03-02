import { useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { SingleCoinData } from "../config/apiConfig";
import { ICoin } from "../components/CoinTable";

type CoinParam = {
    id: any
}
interface ISingleCoin {
    name: string;
}
const SingleCrypto = () => {
    const { id } = useParams<CoinParam>();
    const [coinData, setData] = useState<ISingleCoin>({
        name: ''
    });
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
                {coinData.name}
            </section>
        </main>
        
    )
}

export default SingleCrypto;