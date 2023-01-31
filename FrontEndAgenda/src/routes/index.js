
import EditContact from '../pages/editContact';
import EditUser from '../pages/editUser';
import RegisterContact from '../pages/registerContact';
import Login from '../pages/login';
import RegisterUser from '../pages/registerUser';
import Validation from '../pages/validation';
import Contact from '../pages/contact';
import UserAdmin from '../pages/userAdmin';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import * as React from "react";


const isLoggedIn = () => {
  return localStorage.getItem('token') ? 'true' : false;
};

const PrivateRoute = ({Component}) => {
  return isLoggedIn() ? <Component /> : <Navigate to='/' />;
}


const AppRoutes = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login /> } />
          <Route path='/registerUser' element={<RegisterUser />} />
          <Route path='/validation' element={<Validation/>}/>
          <Route path='/editUser' element={<PrivateRoute Component={EditUser} />} />
          <Route path='/registerContact' element={<PrivateRoute Component={RegisterContact} />} />
          <Route path='/editContact' element={<PrivateRoute Component={EditContact} />} />
          <Route path='/contact' element={<PrivateRoute Component={Contact}/>} />
          <Route path='/userAdmin' element={<PrivateRoute Component={UserAdmin} />} />
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default AppRoutes;
