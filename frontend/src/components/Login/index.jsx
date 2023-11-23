import {Aperture} from 'lucide-react';
import { useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AlertDestructive } from '../Error/error';


export function Login() {
    const [erro, setErro] = useState(false);
    const [user, setUser] = useState("");
    const [senha, setSenha] = useState("");
    const navigate = useNavigate();
    
      const saveToken = (userToken) => {
        localStorage.setItem('token', JSON.stringify(userToken));
        localStorage.setItem('logged', true.toString());
      };
    

    const handleInputUser = (event) => {
        setUser(event.target.value);
        setErro(false);
      };

    const handleInputSenha = (event) => {
        setSenha(event.target.value);
        setErro(false);
    };

    const checkLogin = (event) => {
        event.preventDefault();
        const formData = {
          "username" : user,
          "password" : senha,
        }

        axios
          .post("http://127.0.0.1:8000/api/token/", formData)
          .then((res) => {
              console.log(res.data);
              saveToken(res.data);
              navigate('/')
            }).catch((error) => {
              if (error.response && error.response.status === 403) {
                setErro(true);
              } else {
                console.error('Ocorreu um erro:', error);
              }
            });
        

    };

      return (
        <>
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <div className=' flex flex-row justify-center mt-4'>
                <Aperture/>
              </div>
              <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Sign in to your account
              </h2>
            </div>
    
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" onSubmit={checkLogin}>
                <div>
                  <label htmlFor="user" className="flex flex-row justify-start text-sm font-medium leading-6 text-gray-900">
                    User
                  </label>
                  <div className="mt-2">
                    <input
                      id="user"
                      name="user"
                      type="user"
                      required
                      onChange= {handleInputUser}
                      className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
    
                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                      Password
                    </label>
                    <div className="text-sm">
                      <a href="#" className="font-semibold text-blue-500 hover:text-blue-500">
                        Forgot password?
                      </a>
                    </div>
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      onChange= {handleInputSenha}
                      className="block w-full rounded-md px-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                {erro ? <AlertDestructive>Usuário ou senha incorretos. Por favor tente novamente.</AlertDestructive> : null}
                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center mb-4 rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500"
                  >
                    Sign in
                  </button>
                </div>
              </form>
              <p className="mt-10 text-center text-sm text-gray-500">
                Not a member?{' '}
                <Link to = "/register" className="font-semibold leading-6 text-blue-500 hover:text-blue-500">
                  Register
                </Link>
              </p>
            </div>
          </div>
        </>
  )
}

