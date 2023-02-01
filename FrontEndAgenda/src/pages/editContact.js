import {useContext, useEffect, useState} from "react";
import Button from "../components/Button";
import Input from "../components/Input/index";
import api from "../service/api";
import {Navigate} from "react-router-dom";
import contact from "./contact";
import GlobalContext from "../Context/globalContexto";


const EditContact = ({contactEdit, action}) => {

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [user, setUser] = useContext(GlobalContext);

  const update = async (id) => {
      await api.get(`contato/${id}`,{headers: {
          'Auth-Token': localStorage.getItem("token")
      }})
          .then((resposta) => resposta.data)
          .then((json) => {
              console.log(json.contato)
              setName(json.contato.nome)
              setPhone(json.contato.telefone)
          })
          .catch((error) => console.error(error))
  }

  const clicked = async (value) => {
      const newContact = {
          id: contactEdit,
          nome: name,
          telefone: phone,
          idUser: user.id
      }
      console.log("newContact")
      console.log(user)
      await api.patch(`contato/${contactEdit}`,newContact, {
          headers: {
              'Auth-Token': localStorage.getItem("token")
          }
      })
          .then((resposta) => resposta.data)
          .then((json) => {
              console.log(json)
          })
          .catch((error) => console.error(error))
      action(false)
  }

  useEffect( () => {
      if (contactEdit) {
         update(contactEdit)
      }
  }, [contactEdit])

  return (
    <>
      <h1 style={{marginTop:100}}>Editar Contato</h1>
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
        title='Confirmar' onClick={clicked}
      />
        {
            // click && ( <Navigate to="/contact" />)
        }
    </>
  );
}

export default EditContact;