import {Star, LogOut, Aperture} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Options } from './Options/options';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';

const Header = (props) => {
    const navigate = useNavigate();

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

    const isLogged = localStorage.getItem('logged');
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")

    if (isLogged !== null) {
      if (isLogged){
        useEffect(() => {
            axios.get("https://cryptooracle-projeto-3.onrender.com/api/user/info/", header)
              .then((res) => {
                setUsername(res.data['username']);
                setEmail(res.data['email']);
              })},[]);
      }
    }

    const logOut = () => {
        localStorage.setItem('token', JSON.stringify(""));
        localStorage.setItem('logged', false.toString());
        navigate('/');
        window.location.reload();
    }

    const logIn = () => {
        navigate('/login')
    }

    const signUp = () => {
        navigate('/register')
    }

    return(
        <div className = 'flex flex-col flex-wrap'>
        
        <div className = 'flex flex-row grow items-center px-4 justify-between  bg-gradient-to-l from-blue-500 h-36 divide-stone-800 flex-wrap'>
            <div className='flex flex-row justify-between items-center flex-wrap '>
                <Link to = {'/'}>
                <div className = 'flex flex-row justify-between items-center mr-14 self-center'>
                    <Aperture className = 'self-center'></Aperture>
                    <h1 className = ' text-xl md:text-3xl self-center font-extrabold px-2.5'>Crypto Oracle</h1> 
                </div>
                </Link>
                <Link className='self-center' to = {'/'}>
                    <button className = "text-lg md:text-2xl font-medium">Cryptocurrency</button>
                </Link>
                <Link className='self-center' to = {'/community'}>
                    <button className = "text-lg md:text-2xl ml-11 font-medium">Community</button>
                </Link>
            </div>
        <div className='flex flex-row '>
            <Options logOut = {logOut} logIn = {logIn} signUp = {signUp}/>
            <div className='flex flex-col justify-center'>
                <h1>{username}</h1>
                <p className='text-gray-600'>{email}</p>
            </div>
        </div>
        </div>
        <div className="border-b border-stone-300 w-full"></div>
        </div>
    )
}

export default Header; 