import React, {useEffect, useState} from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';
import Axios from 'axios';

const Navbar =() => {

   const [image, setImage] = useState();
   const [name, setName] = useState("");

   const getUserData = async () => {
      const res = await Axios.get('http://localhost:3050/users/1');
      setImage(res.data[0].imgURL);
      setName(res.data[0].nombre)
   }

   useEffect(() => {
      getUserData();
   }, [])

   return (
      <div className="navbar">
         <Link to="/">
            <img src={logo} alt="logo" width={217} height={41.5}/>
         </Link>
         <Link to="/user" className="userImage">
            <p>{name}</p>
            <img src={image} alt="user" width={50} height={50}/>
         </Link>
      </div>
   );

}

export default Navbar;
