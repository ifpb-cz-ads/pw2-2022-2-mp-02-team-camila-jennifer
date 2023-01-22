import { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input/index";


const Login = () => {

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <h1 style={{marginTop:100}} >Login</h1>
      <form>
        <Input
          label='Email'
          placeholder='Digite seu email'
          type='text'
          value={name}
          onChange={setName}
        />
        <Input
          label='Senha'
          placeholder='Digite sua senha'
          type='password'
          value={password}
          onChange={setPassword}
        />
      </form>

      <Button
        title='Entrar'
      />

    </>
  );
}

export default Login;