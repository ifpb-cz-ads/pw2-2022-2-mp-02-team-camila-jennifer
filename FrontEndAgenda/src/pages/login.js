import {useContext, useEffect, useState} from "react";
import Button from "../components/Button";
import Input from "../components/Input/index";
import api from "../service/api";
import GlobalContext from './../Context/globalContexto'
import {Link, Navigate} from 'react-router-dom';

const Login = () => {
  const [user, setUser] = useContext(GlobalContext);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [click, setclick] = useState(false);

    const clicked = (value) => {
        setclick(value)
    }

    const authUser = async (auth) => {
        const result = await api.post(`users/login`, auth)
            .then((resposta) => resposta.data)
            .then((json) => {
                localStorage.setItem("token", json.token)
                // console.log(json.user)
                setUser(json.user)
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
    <GlobalContext.Provider value={{user}}>
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
            <Link to="/validation">
                <label
                    style={{
                        cursor: "pointer", textDecoration: "none",
                        color: "#f0576b",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                        width: "auto"
                    }}
                >
                    Efetue validação
                </label>

            </Link>
            <Link to="/registerUser">
                <label
                    style={{
                        cursor: "pointer", textDecoration: "none",
                        color: "#f0576b",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                        width: "auto"
                    }}
                >
                    Cadastre-se
                </label>

            </Link>
          <Button
            title='Entrar' onClick={clicked}
          />
            {
                user.id && ( <Navigate to="/contact" />)
            }
        </>
    </GlobalContext.Provider>
  );
}

export default Login;