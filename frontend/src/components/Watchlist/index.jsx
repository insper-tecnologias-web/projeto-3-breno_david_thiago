import { useParams } from "react-router-dom";
import ContainerWatch from "./ContainerWatch";
import { useState } from "react";
import axios from "axios";
import Header from "../Header";
import { useEffect } from "react";


const Watchlist = (props) => {
    const [watchlist, setWatchlist] = useState([]);
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

    const getWatchlist = async () => {
        try {
            const res = await axios.get("http://127.0.0.1:8000/api/watchlist/",header);
            setWatchlist(res.data);
        } catch (error) {
            console.error("Error fetching watchlist:", error);
        }
    }

    useEffect(() => {
        getWatchlist();
    },[]); // Empty dependency array to run the effect only once on mount

    return (
        <div className='bg-white h-full w-max-screen-3xl w-min-screen-sm'>
            <Header/>
            <h1 className='ml-7 mt-20 mb-10 mr-4 font-mono font-black text-xl md:text-4xl mx-0.5 md:mx-36'>Your Crypto Watchlist</h1>
            <ContainerWatch coins={watchlist}></ContainerWatch>
        </div>
    )
}

export default Watchlist;