import {useEffect, useState} from "react";
import Button from "../components/Button";
import Input from "../components/Input/index";
import api from "../service/api";
import {Link} from "react-router-dom";


const Validation = () => {

    const validateUser = async (validation) => {
        console.log(validation)
        const result = await api.put(`users/validation`, validation)
            .then((resposta) => resposta.data)
            .then((json) => alert(json))
            .catch((error) => console.error(error))
    };

    const [email, setEmail] = useState(null);
    const [code, setCode] = useState(null);
    const [click, setclick] = useState(false);

    const clicked = (value) => {
        setclick(value)
    }

    useEffect(() => {
        if(email != null && code != null){
            const validation = {
                email: email,
                validatecode: parseInt(code)
            }
            validateUser(validation);
            setEmail(null);
            setCode(null);
            setclick(false);
        }
        setclick(false)

    }, [click]);

    return (
      <>
        <h1 style={{marginTop:100}}>Efetue Validação</h1>
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
         <Link to="/">
              <label style={{cursor: "pointer", textDecoration: "none",
                  color: "#f0576b",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  width: "auto",}}>Efetue login</label>

         </Link>
        <Button 
          title='Validar' onClick={clicked}
        />
      </>
    );
  }

  export default Validation;