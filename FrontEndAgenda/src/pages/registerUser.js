import {useEffect, useState} from "react";
import Button from "../components/Button";
import Input from "../components/Input/index";

import { Navigate, Link } from "react-router-dom";
import api from "../service/api";


const RegisterUser = () => {

  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [click, setclick] = useState(false);

  const clicked = (value) => {
      setclick(value)
  }
    const registerNewUser = async (user) => {
        const result = await api.post(`users/register`, user)
            .then((resposta) => resposta.data)
            .then((json) => confirmRegister(json.usuario.username))
            .catch((error) => console.error(error))
    };

  const confirmRegister = (username) => {
      return alert(`${username} seu cadastrado foi realizado com sucesso!`);
  }

  useEffect(() => {
      if(name != null && email != null && password != null){
          const user = {
              username: name,
              email: email,
              password: password
          }
          registerNewUser(user);
          setName(null);
          setEmail(null);
          setPassword(null);
          setclick(false);

      }else {
          setclick(false)
      }
  }, [click]);

  return (
    <>
      <h1 style={{marginTop:100}}>Cadastro de Usuário</h1>
      <form>
        <Input
          label='Nome'
          placeholder='Digite seu nome'
          type='text'
          value={name}
          onChange={setName}
        />
        <Input
          label='Email'
          placeholder='Digite seu email'
          type='text'
          value={email}
          onChange={setEmail}
        />
        <Input
          label='Senha'
          placeholder='Digite sua senha'
          type='password'
          value={password}
          onChange={setPassword}
        />

      </form>
       <Link to="/validation">
           <label style={{cursor: "pointer", textDecoration: "none",
               color: "#f0576b",
               display: "flex",
               justifyContent: "center",
               alignItems: "center",
               textAlign: "center",
               width: "auto",}}>Efetue validação</label>

       </Link>
            <Button
                title='Cadastrar' onClick={clicked}
            />


    </>
  );
}

export default RegisterUser;