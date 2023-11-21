import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"
import { PhoneInput } from 'react-international-phone'
import 'react-international-phone/style.css'
import axios from "axios";
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { ButtonDemo } from "../components/Button/button";
import { ButtonLoading } from "@/components/Button/loading";
import { useToast } from "@/components/ui/use-toast"
import { library } from '@fortawesome/fontawesome-svg-core';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AlertDestructive } from '../components/Error/error';
library.add(faChevronDown, faChevronUp);


export function Register() { 

  const { toast } = useToast()
  const params = useParams();
  const userId = params.userId;

  const checkCEP = (e) => {
    const cep = e.target.value.replace(/\D/g, '');
    fetch(`https://viacep.com.br/ws/${cep}/json/`).then(res => res.json()).then(data => {
      setValue('address', data.logradouro);
      setValue('neighborhood', data.bairro);
      setValue('city', data.localidade);
      setValue('uf', data.uf);
      setEndereco(res.data.logradouro);
      setBairro(res.data.bairro);
      setCidade(res.data.localidade);
      setUf(res.data.uf);
      setFocus('complement')
    });
  };

  const [name,setName] = useState("");
  const [erroNome,setErroNome] = useState(false);
  const [email,setEmail] = useState("");
  const [erroEmail,setErroEmail] = useState(false);
  const [cpf,setCpf] = useState("");
  const [erroCpf,setErroCpf] = useState(false);
  const [cep,setCep] = useState("");
  const [phone, setPhone] = useState("");
  const [complement,setComplement] = useState("");
  const [bairro,setBairro] = useState("");
  const [cidade,setCidade] = useState("");
  const [endereco, setEndereco] = useState("");
  const [uf,setUf] = useState("");
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
  const cpfChange = (event) =>{
    setCpf(event.target.value);
  };
  const cepChange = (event) =>{
    setCep(event.target.value);
  };
  const complementChange = (event) =>{
    setComplement(event.target.value);
  };
  const passwordChange = (event) =>{
    setPassword(event.target.value);
  };
  const passwordAgainChange = (event) =>{
    setPasswordAgain(event.target.value);
  };

  const nameVal = () => {
   const re_n = /^[a-zA-Z]{3,}$/
    if (!re_n.test(String(name)) || String(name).length == 0){
    
      setErroNome(true)
    } else{
      setErroNome(false)
    
    }    
  }
    
  const cpfVal = () => {
    console.log("erroNome")
    console.log(erroNome)
    console.log("erroCpf")
    console.log(erroCpf)
    console.log("erroEmail")
    console.log(erroEmail)
    const re_cpf = /^(([0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2})|([0-9]{11}))$/
    if (!re_cpf.test(String(cpf)) || String(cpf).length == 0){
      setErroCpf(true)
      
    } else{
      setErroCpf(false)
      
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
    console.log("erroNome")
    console.log(erroNome)
    console.log("erroCpf")
    console.log(erroCpf)
    console.log("erroEmail")
    console.log(erroEmail)

    event.preventDefault();
    const formData = {
      "user" : name,
      "senha" : password,
      "email" : email,
      "celular" : phone,
      "cpf" : cpf,
      "cep" : cep,
      "complemento" : complement,
      "bairro" : bairro,
      "endereco" : endereco,
      "cidade" : cidade, 
      "uf" : uf,
    }

    if(erroNome==true || erroCpf==true || erroEmail==true){
      console.log("erro ok")
      setTimeout(() => {
        toast({
          variant: "red",
          title: "Erro",
          description: "Resolva os erros antes de salvar",
        });
      }, 2000);
    }else{
      axios
    .post(`http://127.0.0.1:8000/api/infos/`, formData)
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
    }

    
  };

  return (
    <div className="inline-block my-12">
        <form className="pb-12" onSubmit={saveData}>
          <h2 className="text-base font-semibold leading-7 text-gray-900">Informações Pessoais</h2>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-6">
            <div className="mt-4 sm:col-span-4">
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
                  className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-700 sm:text-sm sm:leading-6"
                />
              </div>

              <div className="mt-2 sm:col-span-4">
                {erroNome ? <AlertDestructive> Por favor, insira um nome válido.</AlertDestructive> : null}
            </div>

            </div>

            <div className="mt-4 sm:col-span-2">
              <label htmlFor="cellphone" className="block text-sm font-medium leading-6 text-gray-900">
                Celular
              </label>
              <div className="mt-2 ">
                <PhoneInput
                  defaultCountry="br"
                  value={phone}
                  onChange={(value) => {setPhone(value)}}
                  type="text"
                  name="phone"
                  id="phone"
                  autoComplete="phone"
                  className="w-full"
                />
              </div>
            </div>

            <div className="mt-4 sm:col-span-4">
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
                  className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-700 sm:text-sm sm:leading-6"
                />
              </div>

              <div className="mt-2">
                {erroEmail ? <AlertDestructive> Por favor, insira um e-mail válido.</AlertDestructive> : null}
              </div>
              

            </div>

            <div className="mt-4 sm:col-span-2">
              <label htmlFor="cpf" className="block text-sm font-medium leading-6 text-gray-900">
                CPF
              </label>
              <div className="mt-2">
                <Input
                  value={cpf}
                  onBlur={cpfVal}
                  onChange={cpfChange}
                  type="text"
                  name="cpf"
                  id="cpf"
                  autoComplete="cpf"
                  className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-700 sm:text-sm sm:leading-6"
                />
              </div>

              <div className="mt-2">
                {erroCpf ? <AlertDestructive> Por favor, insira um CPF válido.</AlertDestructive> : null}
              </div>

            </div>

            <div className="mt-4 sm:col-span-2">
              <label htmlFor="cep" className="block text-sm font-medium leading-6 text-gray-900">
                CEP
              </label>
              <div className="mt-2">
                <Input
                  {...register("cep")}
                  require 
                  value={cep}
                  onChange={cepChange}
                  onBlur={checkCEP}
                  type="text"
                  name="cep"
                  id="cep"
                  autoComplete="cep"
                  className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-700 sm:text-sm sm:leading-6"
                />
              </div>

            </div>

            <div className="mt-4 col-span-4">
              <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
                Endereço
              </label>
              <div className="mt-2">
                <Input disabled
                  {...register("address")} 
                  type="text"
                  name="address"
                  id="address"
                  autoComplete="address"
                  className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-700 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="mt-4 sm:col-span-2 sm:col-start-1">
              <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                Cidade
              </label>
              <div className="mt-2">
                <Input disabled
                  {...register("city")} 
                  type="text"
                  name="city"
                  id="city"
                  autoComplete="address-level2"
                  className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-700 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="mt-4 sm:col-span-2">
              <label htmlFor="uf" className="block text-sm font-medium leading-6 text-gray-900">
                Estado
              </label>
              <div className="mt-2">
                <Input disabled
                  {...register("uf")} 
                  type="text"
                  name="uf"
                  id="uf"
                  autoComplete="address-level1"
                  className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-700 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="mt-4 sm:col-span-2">
              <label htmlFor="complement" className="block text-sm font-medium leading-6 text-gray-900">
                Complemento
              </label>
              <div className="mt-2">
                <Input
                  {...register("complement")} 
                  value={complement}
                  onChange={complementChange}
                  type="text"
                  name="complement"
                  id="complement"
                  autoComplete="complement"
                  className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-700 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="mt-4 sm:col-span-3">
              <label htmlFor="complement" className="block text-sm font-medium leading-6 text-gray-900">
                Digite sua Senha
              </label>
              <div className="mt-2">
                <input
                id="password"
                name="password"
                type="password"
                onChange={passwordChange}
                className="block w-full rounded-md px-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="mt-4 sm:col-span-3">
              <label htmlFor="complement" className="block text-sm font-medium leading-6 text-gray-900">
                Digite Novamente sua Senha
              </label>
              <div className="mt-2">
                <input
                id="password"
                name="password"
                type="password"
                onBlur={passwordVal}
                onChange={passwordAgainChange}
                className="block w-full rounded-md px-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="mt-2 sm:col-span-6">
                {erroSenhas ? <AlertDestructive> As senhas não coincidem.</AlertDestructive> : null}
              </div>
          </div>
          {salvo ? <ButtonLoading/> : <ButtonDemo type = "submit" variante = "green" input = "Salvar" disabled={errorGeral}/>}
        </form>
        <a src="https://projeto-2-frontend-thiago-breno-u7sb.vercel.app" href="https://projeto-2-frontend-thiago-breno-u7sb.vercel.app">
          <button className="h-9 rounded-lg px-3 border-black">
          Voltar para o Login
        </button>
        </a>
        
        
    </div>
  )
}
