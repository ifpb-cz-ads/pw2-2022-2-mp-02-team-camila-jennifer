import {useEffect, useState} from "react";
import Button from "../components/Button";
import Input from "../components/Input/index";
import api from "../service/api";

const Login = () => {

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [user, setData] = useState(null);
  const [click, setclick] = useState(false);

    const clicked = (value) => {
        setclick(value)
    }

    const authUser = async (auth) => {
        const result = await api.post(`users/login`, auth)
            .then((resposta) => resposta.data)
            .then((json) => {
                localStorage.setItem("token", json.token)
                setData(json.user)
            })
            .catch((error) => console.error(error))
    };

    useEffect(() => {
        if(email != null && password != null){
            const auth = {
                email: email,
                password: password
            }
            authUser(auth);
            setEmail(null);
            setPassword(null);
            setclick(false);
        }
        setclick(false)

    }, [click]);

  return (
    <>
      <h1 style={{marginTop:100}} >Login</h1>
      <form>
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

      <Button
        title='Entrar' onClick={clicked}
      />

    </>
  );
}

export default Login;