import { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input/index";


const EditContact = () => {

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

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
        title='Confirmar'
      />
    </>
  );
}

export default EditContact;