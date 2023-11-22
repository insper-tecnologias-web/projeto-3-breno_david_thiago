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


export function Logged() {

  const checkCEP = (e) => {
    const cep = e.target.value.replace(/\D/g, '');
    axios
    .get(`https://viacep.com.br/ws/${cep}/json/`).then(res => {
      setValue('address', res.data.logradouro);
      setValue('neighborhood', res.data.bairro);
      setValue('city', res.data.localidade);
      setValue('uf', res.data.uf);
      setEndereco(res.data.logradouro);
      setBairro(res.data.bairro);
      setCidade(res.data.localidade);
      setUf(res.data.uf);
      setFocus('complement')
    });
  };

  const { toast } = useToast()
  const [name,setName] = useState("");
  const [errorNome,setErrorNome] = useState(false);
  const [email,setEmail] = useState("");
  const [errorEmail,setErrorEmail] = useState(false);
  const [cpf,setCpf] = useState("");
  const [errorCpf,setErrorCpf] = useState(false);
  const [cep,setCep] = useState("");
  const [phone, setPhone] = useState("");
  const [complement,setComplement] = useState("");
  const [bairro,setBairro] = useState("");
  const [cidade,setCidade] = useState("");
  const [endereco, setEndereco] = useState("");
  const [uf,setUf] = useState("");
  const [password,setPassword] = useState("");
  const [senhaAntiga,setSenhaAntiga] = useState("");
  const [salvo, setSalvo] = useState(false);
  const [mudarSenha, setMudarSenha] = useState(false); 
  const [checkSenhaAtual, setCheckSenhaAtual] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [errorSenha, setErrorSenha] = useState(false);
  const [errorPasswordAgain, setErrorPasswordAgain] = useState(false);
  const {register, setValue, setFocus} = useForm();

  const params = useParams();
  const userId = params.userId;


  const get = () => {
    axios
      .get(`http://127.0.0.1:8000/api/infos/${userId}`)
      .then((res) => {
        setName(res.data.user);
        setPassword(res.data.senha);
        setEmail(res.data.email);
        setCpf(res.data.cpf);
        setCep(res.data.cep);
        setPhone(res.data.celular);
        setComplement(res.data.complemento);
        setValue('address', res.data.endereco);
        setValue('neighborhood', res.data.bairro);
        setValue('city', res.data.cidade);
        setValue('uf', res.data.uf);
        setEndereco(res.data.endereco);
        setBairro(res.data.bairro);
        setCidade(res.data.cidade);
        setUf(res.data.uf);
        setSenhaAntiga(res.data.senha)
      })
  };

  useEffect(() => {get()}, []);

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
  const cellphoneChange = (event) =>{
    setPhone(event.target.value);
  };
  const complementChange = (event) =>{
    setComplement(event.target.value);
  };

  const passwordChange = (event) =>{
    setPassword(event.target.value);
  };

  const changePassword = (event) => {
    event.preventDefault();
    setErrorSenha(false);
    setErrorPasswordAgain(false);
    setMudarSenha(!mudarSenha)}

  const saveData = (event) => {
    event.preventDefault();

    let palavraPasse = senhaAntiga
    if (password !== ""){
      palavraPasse = password
    }

    let erroSenhaAtual = false;
    if (senhaAntiga !== checkSenhaAtual) {
      erroSenhaAtual = true;
    }
    setErrorSenha(erroSenhaAtual);

    // Validação das senhas novas
    let erroSenhaNova = false;
    if (password !== passwordAgain) {
      erroSenhaNova = true;
    }
    setErrorPasswordAgain(erroSenhaNova);
    
    if (!mudarSenha || (!erroSenhaAtual && !erroSenhaNova)){

      const formData = {
        "user" : name,
        "senha" : palavraPasse,
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

      if (mudarSenha){
        setSenhaAntiga(palavraPasse);
      }

      axios
      .post(`http://127.0.0.1:8000/api/infos/${userId}/`, formData)
      .then((res) => {
          setSalvo(true);
          setTimeout(() => {
            setSalvo(false); // Desativa o botão de carregamento
            setMudarSenha(false);
            toast({
              variant: 'destructive',
              title: "Sucesso",
              description: "Suas informações foram salvas com sucesso.",
            });
          }, 2000);
        })
      }
};

const nameVal = () => {
  const re_n = /^[a-zA-Z]{3,}$/
   if (!re_n.test(String(name)) || String(name).length == 0){
   
     setErrorNome(true)
   } else{
     setErrorNome(false)
   
   }
 }
   
 const cpfVal = () => {
   const re_cpf = /^\d{3}\d{3}\d{3}\d{2}$/
   if (!re_cpf.test(String(cpf)) || String(cpf).length == 0){
     setErrorCpf(true)
     
   } else{
     setErrorCpf(false)
     
   }
 }
   
 const emailVal =() => {
   const re_e = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
   if (!re_e.test(String(email)) || String(email).length == 0){
     setErrorEmail(true)
     
   } else{
     setErrorEmail(false)

   }
 }

  return (
    <div className="inline-block my-12">
        <form className="pb-12" onSubmit={saveData}>
          <h2 className="text-base font-semibold leading-7 text-gray-900">Informações Pessoais</h2>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
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
                {errorNome ? <AlertDestructive> Por favor, insira um nome válido.</AlertDestructive> : null}
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
                {errorEmail ? <AlertDestructive> Por favor, insira um e-mail válido.</AlertDestructive> : null}
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
                {errorCpf ? <AlertDestructive> Por favor, insira um CPF válido.</AlertDestructive> : null}
              </div>

            </div>

            <div className="mt-4 sm:col-span-2">
              <label htmlFor="cep" className="block text-sm font-medium leading-6 text-gray-900">
                CEP
              </label>
              <div className="mt-2">
                <Input
                  {...register("cep")}
                  required
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
                  autoComplete="city"
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
                  autoComplete="uf"
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
          </div>
          <button className="mt-4 text-gray-500 underline underline-offset-4" onClick={changePassword}>Mudar sua senha {mudarSenha ? <FontAwesomeIcon icon="chevron-down" /> : <FontAwesomeIcon icon="chevron-up" />}</button>
          {mudarSenha ? (<>
            <h1 className="text-left m-4 "> Senha atual</h1>
                          <input
                            id="password1"
                            required
                            name="password"
                            type="password"
                            onChange={(event)=>setCheckSenhaAtual(event.target.value)}
                            className="block w-full mb-2 rounded-md px-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                          />

                          {errorSenha ? <AlertDestructive> Senha incorreta. Por favor, tente novamente.</AlertDestructive> : null}

                          <h1 className="text-left m-4 "> Nova senha </h1>
                          <input
                            id="password2"
                            required
                            name="newPassword"
                            type="password"
                            onChange={passwordChange}
                            className="block w-full rounded-md px-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                          />
                          
                          <h1 className="text-left m-4"> Novamente nova senha </h1> 
                          <input
                            id="password3"
                            required
                            name="passwordAgain"
                            type="password"
                            onChange={(event)=>setPasswordAgain(event.target.value)}
                            className="block w-full mb-2 rounded-md px-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                          />
                          
                          {errorPasswordAgain ? <AlertDestructive> Senhas diferentes. Por favor, digite a mesma senha.</AlertDestructive> : null}
                          
                          </>) : null}

          {salvo ? <ButtonLoading/> : <ButtonDemo type="submit" variante = "green" input = "Salvar" disabled={salvo}/>}
        </form>
    </div>
  )
}
