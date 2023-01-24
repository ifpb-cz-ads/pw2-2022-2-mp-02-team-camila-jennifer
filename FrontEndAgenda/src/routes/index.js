
import EditContact from '../pages/editContact';
import EditUser from '../pages/editUser';
import RegisterContact from '../pages/registerContact';
import Login from '../pages/login';
import RegisterUser from '../pages/registerUser';
import Validation from '../pages/validation';
import Contact from '../pages/contact';
import UserAdmin from '../pages/userAdmin';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const AppRoutes = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<RegisterUser />} />
          <Route path='/validation' element={<Validation /> } />
          <Route path='/login' element={<Login /> } />
          <Route path='/editUser' element={<EditUser /> } />
          <Route path='/registerContatct' element={<RegisterContact /> } />
          <Route path='/editContatct' element={<EditContact /> } />
          <Route path='/contact' element={<Contact /> } />
          <Route path='/userAdmin' element={<UserAdmin /> } />
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default AppRoutes;
