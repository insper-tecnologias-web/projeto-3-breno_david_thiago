import {
    LogOut,
    Home,
    Star,
    Users,
  } from "lucide-react"

import { useNavigate } from 'react-router-dom';

const Sidebar = (props) => {
    const navigate = useNavigate();
    const logOut = () => {
        localStorage.setItem('token', JSON.stringify(""));
        localStorage.setItem('logged', false.toString());
        navigate('/');
        window.location.reload();
    }

    return(
    <div className="flex flex-col pt-8 h-full items-center justify-between bg-gray-100 font-bold text-xl">
        <div className="flex flex-col items-center">
            <button className="flex flex-row items-center rounded-lg px-2 transition duration-300 ease-in-out hover:bg-gray-200" onClick={()=>{navigate('/')}}>
                <Home></Home>
                <p className="py-4 px-2">Home</p>
            </button>
            <button className="flex flex-row items-center rounded-lg px-2 transition duration-300 ease-in-out hover:bg-gray-200" onClick={()=>{navigate('/watchlist')}}>
                <Star></Star>
                <p className="py-4 px-2">Watchlist</p>
            </button>
            <button className="flex flex-row items-center rounded-lg px-2 transition duration-300 ease-in-out hover:bg-gray-200" onClick={()=>{navigate('/community')}}>
                <Users></Users>
                <p className="py-4 px-2">Community</p>
            </button>
        </div>
        <button className="flex flex-row items-center rounded-lg px-2 mb-4 text-red-500 transition duration-300 ease-in-out hover:bg-gray-200" onClick={()=>logOut()}>
            <LogOut></LogOut>
            <p className="py-4 px-2">Log Out</p>
        </button>
    </div>
    )
}

export default Sidebar;