// import palmeiras from '../assets/palmeiras.png';
import { useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



export function Login() {
    const [loginStats, setLoginStats] = useState(false);
    const [user, setUser] = useState("");
    const [senha, setSenha] = useState("");
    const [submitted, setSubmitted] = useState(false)
    const navigate = useNavigate();
    
      const saveToken = (userToken) => {
        localStorage.setItem('token', JSON.stringify(userToken));
      };
    

    const handleInputUser = (event) => {
        setUser(event.target.value);
      };

    const handleInputSenha = (event) => {
        const { name, value } = event.target;
        setSenha(value);
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
                console.log('Usuário ou senha incorretos.');
              } else {
                console.error('Ocorreu um erro:', error);
              }
            });
        

    };

      return (
        <>
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              {/* <img
                className="mx-auto h-10 w-auto"
                src= {palmeiras}
                alt="Your Company"
              /> */}
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
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
    
                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center mb-4 rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500"
                  >
                    Sign in
                  </button>
                </div>
              </form>
                {/* {submitted ? (loginStats ? (navigate(`/logged/${id}`)) : (<AlertDestructive> Usuário ou Senha incorreto. Por favor, tente novamente. </AlertDestructive>)) : (null)} */}
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

