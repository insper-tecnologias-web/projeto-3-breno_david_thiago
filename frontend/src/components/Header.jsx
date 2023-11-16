import {Currency, Star, ShieldHalf, Aperture} from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = (props) => {
    return(
        <div className = 'flex flex-col'>
        
        <div className = 'flex flex-row grow items-center px-4 justify-between  bg-gradient-to-l from-blue-500 h-36 divide-stone-800 flex-wrap'>
            <div className='flex flex-row justify-between items-center '>
                <Link to = {'/'}>
                <div className = 'flex flex-row justify-between items-center mr-14 self-center'>
                    <Aperture className = 'self-center'></Aperture>
                    <h1 className = ' text-xl md:text-3xl self-center font-extrabold px-2.5'>Crypto Oracle</h1> 
                </div>
                </Link>
                <Link className='self-center' to = {'/'}>
                    <button className = "text-lg md:text-2xl font-medium">Cryptocurrency</button>
                </Link>
            </div>
            
                <Link to = {'watchlist/'}>
                <div className = 'flex flex-row items-center'>
                    <Star></Star>
                    <button className = ' text-lg md:text-2xl font-medium px-2.5'>Watchlist</button>
                </div>
                </Link>
            
        </div>
        <div className="border-b border-stone-300 w-full"></div>
        </div>
    )
}

export default Header;