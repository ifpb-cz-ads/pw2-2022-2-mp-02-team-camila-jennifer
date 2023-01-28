import './App.css';
import AppRoutes from './routes';
import GlobalContext from './Context/globalContexto'
import Login from "./pages/login";
import {useState} from "react";

const App = () => {
    const [user, setUser] = useState({id: null, username: null, email: null});

  return (
    <GlobalContext.Provider value={[user, setUser]}>
        <div className="App">
            <AppRoutes />
        </div>
    </GlobalContext.Provider>
  );
}

export default App;
