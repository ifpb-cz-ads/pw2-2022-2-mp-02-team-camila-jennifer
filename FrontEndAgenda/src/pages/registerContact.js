import { useState, useContext, useEffect } from "react";
import GlobalContext from "../Context/globalContexto";
import Button from "../components/Button";
import Input from "../components/Input/index";
import api from "../service/api";
import { Navigate } from "react-router-dom";

const RegisterContact = () => {

  const [user, setUser] = useContext(GlobalContext);
  const [name, setName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [click, setclick] = useState(false);

  const clicked = (value) => {
    setclick(value)
  }

  const registerNew = async (contact) => {
    await api.post(`contato/`, contact, {
      headers: {
        'Auth-Token': localStorage.getItem("token")
      }
    })
      .then((resposta) => resposta.data)
      .then((json) => {
        console.log(json)
      })
      .catch((error) => console.error(error))
  };

  useEffect(() => {
    if (name != null && phone != null) {
      const contact = {
        idUser: user.id,
        nome: name,
        telefone: phone,
      }
      console.log(user)
      registerNew(contact);
      setName(null);
      setPhone(null);
    }else {
      setclick(false)
    }

  }, [click]);

  return (
    <>
      <h1 style={{ marginTop: 100 }} >Cadastro de Contatos</h1>
      <form>
        <Input
          label='Nome'
          placeholder='Digite o nome'
          type='text'
          value={name}
          onChange={setName}
        />
        <Input
          label='Telefone'
          placeholder='Digite numero do telefone'
          type='text'
          value={phone}
          onChange={setPhone}
        />
      </form>

      <Button
        title='Entrar' onClick={clicked}
      />
      {
          click && name && phone && (<Navigate to="/contact" />)
      }
    </>
  );
}

export default RegisterContact;