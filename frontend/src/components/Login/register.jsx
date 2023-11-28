import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"
import axios from "axios";
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { ButtonDemo } from "@/components/Button/button";
import { ButtonLoading } from "@/components/Button/loading";
import { useToast } from "@/components/ui/use-toast"
import { library } from '@fortawesome/fontawesome-svg-core';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AlertDestructive } from '@/components/Error/error';
library.add(faChevronDown, faChevronUp);


export function Register() { 

  const { toast } = useToast()
  const params = useParams();
  const userId = params.userId;

  const [name,setName] = useState("");
  const [erroNome,setErroNome] = useState(false);
  const [erroUsername, setErroUsername] = useState(false);
  const [email,setEmail] = useState("");
  const [erroEmail,setErroEmail] = useState(false);
  const [password,setPassword] = useState("");
  const [passwordAgain,setPasswordAgain] = useState("");
  const [salvo, setSalvo] = useState(false);
  const [errorGeral, setErrorGeral] = useState(false);
  const [erroSenhas, setErroSenhas] = useState(false); 
  const {register, setValue, setFocus} = useForm();

  const nameChange = (event) =>{
    setName(event.target.value);
  };
  const emailChange = (event) =>{
    setEmail(event.target.value);
  };
  const passwordChange = (event) =>{
    setPassword(event.target.value);
  };
  const passwordAgainChange = (event) =>{
    setPasswordAgain(event.target.value);
  };

  const nameVal = () => {
   const re_n = /^[a-zA-Z\-0-9]{3,}$/
    if (!re_n.test(String(name)) || String(name).length == 0){
    
      setErroNome(true)
    } else{
      setErroNome(false)
    
    }    
  }
    
  const emailVal =() => {
    const re_e = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!re_e.test(String(email)) || String(email).length == 0){
      setErroEmail(true)
      
    } else{
      setErroEmail(false)

    }
  }

  const passwordVal = () => {
    if (!(password === passwordAgain)){
      setErroSenhas(true)
  }
  else{
      setErroSenhas(false)
  }}
    

 

  const saveData = (event) => {

    event.preventDefault();
    const formData = {
      "username" : name,
      "password" : password,
      "email" : email,
    }

    if(erroNome==true || erroEmail==true || erroSenhas){
      console.log("erro ok")
      setTimeout(() => {
        toast({
          variant: "red",
          title: "Erro",
          description: "Resolva os erros antes de salvar",
        });
      }, 2000);
    }else{
      let erro = false
      axios
    .post(`https://cryptooracle-projeto-3.onrender.com/api/users/`, formData)
    .then((res) => {
        setSalvo(true);
        setTimeout(() => {
          setSalvo(false); // Desativa o botão de carregamento
          toast({
            variant: 'destructive',
            title: "Sucesso",
            description: "Suas informações foram salvas com sucesso",
          });
        }, 2000);
      })
      .catch((error) => {
        if (error.response.status == 500) {
          erro = true
          setErroUsername(true);
        }else{
          erro = false
          setErroUsername(false)
        }
      })
      .then((res) => {
        if (erro !== true){
            window.location.href = "/login"
          }
      })
      
      
    };

    

    
  };

  return (
    <div className="mx-auto w-full sm:max-w-sm">
        <form className="pb-12" onSubmit={saveData}>
          <div className="flex flex-row justify-center">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Informações Pessoais</h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-6">
            <div className="mt-4 sm:col-span-6">
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                Nome de Usuário
              </label>
              <div className="mt-2">
                <Input
                  value = {name}
                  onBlur={nameVal}
                  onChange= {nameChange}
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="given-name"
                  className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                />
              </div>

              <div className="mt-2 sm:col-span-6">
                {erroNome ? <AlertDestructive>Seu username precisa ter pelomenos 3 letras ou números.</AlertDestructive> : null}
                {erroUsername ? <AlertDestructive>Username já em uso, por favor utilize um nome único.</AlertDestructive> : null}
            </div>
            </div>

            <div className="mt-4 sm:col-span-6">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email
              </label>
              <div className="mt-2">
                <Input
                  value={email}
                  onBlur={emailVal}
                  onChange={emailChange}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                />
              </div>

              <div className="mt-2">
                {erroEmail ? <AlertDestructive> Por favor, insira um e-mail válido.</AlertDestructive> : null}
              </div>
              

            </div>

            <div className="mt-4 sm:col-span-3">
              <label htmlFor="complement" className="block text-sm font-medium leading-6 text-gray-900">
                Digite sua Senha
              </label>
              <div className="mt-2">
                <Input
                id="password"
                name="password"
                type="password"
                onChange={passwordChange}
                className="block w-full rounded-md px-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="mt-4 sm:col-span-3">
              <label htmlFor="complement" className="block text-sm font-medium leading-6 text-gray-900">
                Digite Novamente sua Senha
              </label>
              <div className="mt-2">
                <Input
                id="password"
                name="password"
                type="password"
                onBlur={passwordVal}
                onChange={passwordAgainChange}
                className="block w-full rounded-md px-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-6">
                {erroSenhas ? <AlertDestructive> As senhas não coincidem.</AlertDestructive> : null}
            </div>
          </div>
          {salvo ? <ButtonLoading/> : <ButtonDemo type = "submit" variante = "blue" input = "Salvar" disabled={errorGeral}/>}
        </form>
        <p className="text-center text-sm text-gray-500">
          <Link to = "/login" className="font-semibold leading-6 text-blue-500 hover:text-blue-500">
            Return to login
          </Link>
        </p>
  
        
    </div>
  )
}
