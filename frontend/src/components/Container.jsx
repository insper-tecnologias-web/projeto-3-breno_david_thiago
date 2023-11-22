import { Bitcoin, Star, DollarSign, CandlestickChart } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Container = (props) => {
  
  const [watch, setWatch] = useState([]);
  const [uuidArray, setUuidArray] = useState([]);
  const uuidList = [];

  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const getToken = () => {
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken?.token
  };

  const [token, setToken] = useState(getToken());

  function get_header(){
    const options = {
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization' : `Token ${token}`}
    };
    return options
}

  const header = get_header()
 
  // Fetch watchlist data and update uuidArray when the component mounts
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/watchlist/", header)
      .then((res) => {
        setWatch(res.data);
        res.data.map((coin) => {
          uuidList.push(coin.key)
          setUuidArray(uuidList);
        })
      })}); 
  
  
  const handleStar = (uuid) => {
    return uuidArray.includes(uuid);
  }
  
    

  const handleClick = (coin) => {
    axios.get("http://127.0.0.1:8000/api/watchlist/", header)
      .then((res) => {
        setWatch(res.data);
        res.data.map((coin) => {
          uuidList.push(coin.key)
          setUuidArray(uuidList);
        });
  
        const data = {
          "name": coin.name,
          "symbol": coin.symbol,
          "price": coin.price,
          "iconUrl": coin.iconUrl,
          "rank": coin.rank,
          "key": coin.uuid,
          "change": coin.change,
          "marketCap": coin.marketCap,
          "volume": coin['24hVolume']
        };
  
        // Make the API request to update the watchlist
        axios.post(`http://127.0.0.1:8000/api/watchlist/${coin.uuid}/`, data, header)
          .then(() => {
            // After the request is successful, update the watchlist and uuidArray
            setWatch([...watch, data]);
            setUuidArray([...uuidArray, data.key]);
          })
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          handleShow();
        } else {
          console.error('Ocorreu um erro na primeira requisição:', error);
        }
      });
  };

  const getVolume = (coin) => {
    // Check if the "volume" property exists, if not, use "24hVolume"
    if (coin.hasOwnProperty('volume')) {
      return coin.volume;
    } else if (coin.hasOwnProperty('24hVolume')) {
      return coin['24hVolume'];
    } else {
      return null; // Handle the case where the property is missing
    }
  };
  const getKey = (coin) => {
    // Check if the "volume" property exists, if not, use "24hVolume"
    if (coin.hasOwnProperty('key')) {
      return coin.key;
    } else {
      return coin.uuid;
    }
    
  };
  const upOrDown = (change) => {
    if (change>=0) {
      return true;
    } else{
      return false;
    }
  }

  
  return (
    <div className='max-w-screen-3xl min-w-screen-sm flex justify-center grow overflow-x-scroll'>
      {showModal && (
        <div className="backdrop-blur fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none"
        onClick={() => setShowModal(false)}>
          <div className="relative w-auto max-w-lg mx-auto my-6">
            <div className="bg-white border-0 rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none"  
            onClick={(e) => e.stopPropagation()}>
              <div className="flex h-auto items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                <h3 className="text-3xl mx-4 font-semibold">
                  Você deve estar logado
                </h3>
                <button
                  className="absolute top-1 right-2 ml-auto bg-transparent border-0 text-black opacity-40 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => setShowModal(false)}
                >
                  ×
                </button>
              </div>
              <div className="relative p-6 flex-auto">
                <p>Faça login para continuar.</p>
                <a href="/login" className="text-blue-500">Fazer Login</a>
              </div>
            </div>
          </div>
        </div>
      )}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]"></TableHead>
            <TableHead className="text-md md:text-xl">#</TableHead>
            <TableHead className="text-md md:text-xl">Name</TableHead>
            <TableHead className="text-md md:text-xl">Price</TableHead>
            <TableHead className="text-md md:text-xl">Change(%)</TableHead>
            <TableHead className="text-md md:text-xl">Market Cap</TableHead>
            <TableHead className="text-md md:text-xl">Volume</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          
          {props.coins.map((coin) => (
           
            <TableRow key={getKey(coin)}>
               
              <TableCell>
                <button onClick={() => handleClick(coin)}>  
                  <Star absoluteStrokeWidth={false} color =  {handleStar(getKey(coin)) ? "#ffc40c": "black"}className={`max-h-4 aling-center bg-origin-content`}></Star> 
                </button>
              </TableCell>
              <TableCell className='text-gray-700 font-semibold text-md md:text-lg self-center'>{coin.rank}</TableCell>
              <TableCell >
                <Link to = {`/coin/${getKey(coin)}`} className='flex flex-row space-between flex-wrap items-center'>
                <img className='max-h-7 md:max-h-11 mr-4' src={coin.iconUrl}></img>
                <div className='mr-4 text-black font-semibold text-md md:text-xl'>{coin.name}</div>
                <div className="font-medium text-gray-500 text-md md:text-xl">{coin.symbol}</div>
                </Link>
              </TableCell>
              <TableCell className="text-black font-semibold text-md md:text-xl self-center">{parseFloat(coin.price).toFixed(4)}</TableCell>
              <TableCell className={`text-black font-semibold text-md md:text-xl self-center ${upOrDown(coin.change)? 'text-green-500': 'text-red-500'}`}>{parseFloat(coin.change).toFixed(2)}</TableCell>
              <TableCell className="text-black font-semibold text-md md:text-xl self-center">{parseFloat(coin.marketCap).toFixed(2)}</TableCell>
              <TableCell className="text-black font-semibold text-md md:text-xl self-center">{parseFloat(getVolume(coin)).toFixed(2)}</TableCell>
            </TableRow>
           
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default Container;
