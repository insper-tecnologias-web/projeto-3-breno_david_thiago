import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { useState, useEffect } from "react";
import avatarDeslogado from '../../assets/deslogado.png';

export function AvatarDemo(props) {

  const [source, setSource] = useState("");

  useEffect(() => {
    let logado = false;
    const isLogged = localStorage.getItem('logged');
    
    if (isLogged !== null) {
      logado = (isLogged === 'true'); 
    } else {
      localStorage.setItem('logged', false.toString());
    }

    if (logado) {
      setSource("https://github.com/shadcn.png");
    } else {
      setSource(avatarDeslogado);
    }
  }, []);

  return (
    <Avatar className = {props.tamanho}>
      <AvatarImage src={source} alt="@shadcn" />
      <AvatarFallback>Icon</AvatarFallback>
    </Avatar>
  )
}
