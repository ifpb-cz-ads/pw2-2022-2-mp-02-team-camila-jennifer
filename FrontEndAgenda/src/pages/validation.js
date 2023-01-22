import { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input/index";


const Validation = () => {

  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');


    return (
      <>
        <h1 style={{marginTop:100}}>Validação</h1>
        <form>
            <Input 
              label= 'Email'
              placeholder='Digite seu email'
              type='text'
              value={email}
              onChange={setEmail}
            />
            <Input 
              label= 'Código'
              placeholder='Digite o código'
              type='text'
              value={code}
              onChange={setCode}
            />
        </form>

        <Button 
          title='Validar'
        />
      </>
    );
  }

  export default Validation;