import {useContext, useEffect, useState} from "react";
import Button from "../components/Button";
import Input from "../components/Input/index";
import GlobalContext from "../Context/globalContexto";
import api from "../service/api";
import {Navigate} from "react-router-dom";


const EditUser = ({userEdit, action}) => {

  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [click, setClick] = useState(false);
  const [user, setUser] = useContext(GlobalContext);

  const getUser = async (id) => {
    await api.get(`users/getUser/${id}`,{headers: {
            'Auth-Token': localStorage.getItem("token")
        }})
        .then((resposta) => resposta.data)
        .then((json) => {
            console.log(json)
            setName(json.user.username)
            setEmail(json.user.email)
        })
        .catch((error) => console.error(error))
  }

  const update = async (id) => {
      console.log()
      const newUser = {
          id: id,
          username: name,
          email: email,
          password: password,
      }
      await api.put(`users/updateUser/${id}`, newUser, {
          headers: {
              'Auth-Token': localStorage.getItem("token")
          }
      })
          .then((resposta) => resposta.data)
          .then((json) => {
              alert(json.message)
          })
          .catch((error) => console.error(error))
  }
    const clicked = async (value) => {
       if(userEdit && name && email && password){
           update(userEdit)
           action(value)
       } else if (name && email && password) {
            update(user.id)
           setClick(true)
           setUser({id: null, username: null, email: null})
        }
    }

    useEffect( () => {
        console.log(userEdit)
        if (userEdit) {
            getUser(userEdit)
        }else {
            setName(user.username)
            setEmail(user.email)
        }
    }, [])

    useEffect( () => {
        if (!user.id) {
            localStorage.removeItem('token')
        }
    }, [user])

  return (
    <>
      <h1 style={{marginTop:100}}>Editar Dados</h1>
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

      <Button
        title='Confirmar' onClick={clicked}
      />

        {
            click && ( <Navigate to="/contact" />)
        }

    </>
  );
}

export default EditUser;