import { useState, useEffect } from "react"
import axios from "axios"
import HeaderWatch from "../Watchlist/HeaderWatch";



    
const getCoin = async(options) => {
    try {
        const response = await axios.request(options);
        return response;
    } catch (error) {
        console.error(error);
    }
}

const Coin = (props) => {
    const [coin, setCoin] = useState({})
    const [high, setHigh] = useState("")
    const [total, setTotal] = useState("")
    const [max, setMax] = useState("")
    const [circulating, setCirculating] = useState("")

    const options = {
        method: 'GET',
        url: `https://coinranking1.p.rapidapi.com/coin/${props.coinKey}`,
        params: {
            referenceCurrencyUuid: 'yhjMzLPhuIDl',
            timePeriod: '24h'
        },
        headers: {
            'X-RapidAPI-Key': '7541aac9e3msh547581af012693ap19f8f7jsnb851a3edca13',
            'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
        }
        };
    useEffect(() => {
        getCoin(options)
        .then((response) => {
            if (response.data.data.coin != undefined){
                setCoin(response.data.data.coin);
            }
          
          if(response.data.data.coin.allTimeHigh.price != undefined ){
            setHigh(response.data.data.coin.allTimeHigh.price);
          }
          if(response.data.data.coin.supply.max != undefined){
            setMax(response.data.data.coin.supply.max );
          } 
          if(response.data.data.coin.supply.total != undefined){
            setTotal(response.data.data.coin.supply.total);
          }
          if(response.data.data.coin.supply.circulating != undefined ){
            setCirculating(response.data.data.coin.supply.circulating);
          }
          
        })
      }, []);

    return(
        
        <div className = ' h-full w-max-screen-md w-min-screen-sm'>
            <HeaderWatch/>
            <div className=' flex flex-row mx-14 grow justify-center flex-wrap mt-14 md:mt-20'>
                <div className = 'flex grow max-w-screen-sm flex-col 2xl md:mx-48 '>
                    <div className = 'flex flex-row wrap items-center mb-7'>
                        <img className='max-h-28' src={coin.iconUrl}></img>
                        <div className = "flex flex-col ml-4 mr-7">
                            <h1 className=' text-black text-4xl md:text-5xl font-extrabold'>{coin.name}</h1>
                            <h1 className="font-medium mt-1.5 text-2xl md:text-3xl text-gray-500 font-mono">{coin.symbol}</h1>
                        </div>
                    </div>
                    <h1 className=' mt-7 mb-11 text-black text-4xl md:text-5xl self-center md:self-start font-bold'>${parseFloat(coin.price).toFixed(2)}</h1>
                    <div className="flex flex-row grow justify-between mb-2.5">
                        <h1 className="font-medium text-xl md:text-2xl text-gray-500"> All Time High:</h1>
                        <h1 className="font-medium text-xl md:text-2xl text-black">{parseFloat(high).toFixed(2)}</h1>
                    </div>
                    <div className="flex flex-row grow justify-between mb-2.5">
                        <h1 className="font-medium text-xl md:text-2xl text-gray-500"> Change(%):</h1>
                        <h1 className="font-medium text-xl md:text-2xl text-black">{coin.change}</h1>
                    </div>
                    <div className="flex flex-row grow justify-between mb-2.5">
                        <h1 className="font-medium text-xl md:text-2xl text-gray-500">Market Cap:</h1>
                        <h1 className="font-medium text-xl md:text-2xl text-black">{parseFloat(coin.marketCap)}</h1>
                    </div>
                    <div className="flex flex-row grow justify-between mb-2.5">
                        <h1 className="font-medium text-xl md:text-2xl text-gray-500">Volume(24h):</h1>
                        <h1 className="font-medium text-xl md:text-2xl text-black">{coin['24hVolume']}</h1>
                    </div>
                    <div className="flex flex-row grow justify-between mb-2.5">
                        <h1 className="font-medium text-xl md:text-2xl text-gray-500">Number of Markets:</h1>
                        <h1 className="font-medium text-xl md:text-2xl text-black">{coin.numberOfMarkets}</h1>
                    </div>
                    <div className="flex flex-row grow justify-between mb-2.5">
                        <h1 className="font-medium text-xl md:text-2xl text-gray-500">Number of Exchanges:</h1>
                        <h1 className="font-medium text-xl md:text-2xl text-black">{coin.numberOfExchanges}</h1>
                    </div>
                    <div className="flex flex-row grow justify-between mb-2.5">
                        <h1 className="font-medium text-xl md:text-2xl text-gray-500">Total Supply:</h1>
                        <h1 className="font-medium text-xl md:text-2xl text-black">{parseFloat(total).toFixed(2)}</h1>
                    </div>
                    <div className="flex flex-row grow justify-between mb-2.5">
                        <h1 className="font-medium text-xl md:text-2xl text-gray-500">Max Supply:</h1>
                        <h1 className="font-medium text-xl md:text-2xl text-black">{parseFloat(max).toFixed(2)}</h1>
                    </div>
                    <div className="flex flex-row grow justify-between mb-2.5">
                        <h1 className="font-medium text-xl md:text-2xl text-gray-500">Circulating Supply:</h1>
                        <h1 className="font-medium text-xl md:text-2xl text-black">{parseFloat(circulating).toFixed(2)}</h1>
                    </div>
                </div>
                <div className = 'flex flex-col mt-11 my-4 max-w-screen-sm wrap'>
                    <h1 className=" text-md font-bold text-2xl md:text-3xl text-start mb-4 font-mono">What is {coin.name}?</h1>
                    <h1 className=" text-md font-medium text-2xl md:text-3xl text-start text-gray-700 font-mono ">{coin.description}</h1>
                </div>
            </div>
            
        </div>
    )
}
export default Coin