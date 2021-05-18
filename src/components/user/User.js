import React, { useState, useEffect } from 'react';
import { Link , useHistory} from 'react-router-dom';
import Axios from 'axios';
import './user.css';
import { deleteReceta } from '../../services/index';
import { toast } from 'react-toastify';

const User = () => {

   const [data, setData] = useState(undefined);
   const history = useHistory();
   const [userRecetas, setUserRecetas] = useState(undefined);

   const getUserData = async () => {
      const res = await Axios.get('http://localhost:3050/users/1');
      setData(res.data[0]);
   }

   const getUserRecetas = async () => {
      const res = await Axios.get('http://localhost:3050/recetaUser');
      setUserRecetas(res.data);
   }

   useEffect(() => {
      getUserData();
      getUserRecetas();
   }, [])

   if (data === undefined) {
      return <p className="loading"></p>
   }

   if (userRecetas === undefined) {
      return <p className="loading"></p>
   }

   async function confirmDelete (id) {
      if (window.confirm("estas seguro de borrar la receta?")) {
         await deleteReceta(id);
         toast.info('Receta borrada con exito');
      }
      getUserRecetas();
   }

   let date = data.fechaDeCreacion.substring(0, data.fechaDeCreacion.length - 14);

   return (
      <div className="user">
         <div className="perfil">

            <div className="perfilImg">
               <img src={data.imgURL} width={200} height={200} alt="photouser"/>
            </div>
            <p>{data.nombre}</p>

            <div className="seccion">
               <div className="datos">
                  <h2>Datos de {data.nombre}</h2>
                  <ul>
                     <br />
                     <li><i className="fas fa-user"></i> Nombre: {data.nombre}</li> <br/>
                     <li><i className="fas fa-map-marker-alt"></i> Pais: {data.pais}</li> <br/>
                     <li> <i className="fas fa-address-card"></i> Biografia: <br /> {data.biografia}</li> <br/>
                     <li><i className="fas fa-calendar-alt"></i> Se unio: {date}</li>
                  </ul>
               </div>
               <div className="recetas">
                  <h2>Recetas de {data.nombre}</h2>
                  {
                     userRecetas.map(receta => {
                        return (
                           <div className="recetas-container">
                              <Link key={receta.nombre} className="nombre" onClick={() => history.push(`/receta/${receta.id}`)}>
                                 {receta.nombre}
                              </Link>
                              <p className="description">"{receta.description}"</p>

                              <button className="delete" onClick={() => confirmDelete(receta.id)}>
                                 <i className="fas fa-trash-alt"></i>
                              </button>
                              <div onClick={() => history.push(`/update/${receta.id}`)}>
                                 <button className="edit" onClick={ () => history.push(`/update/${receta.id}`)}>
                                    <i className="fas fa-pen"></i>
                                 </button>
                              </div >

                           </div>
                        )
                     })
                  }
                  <Link to="/create" className="buttonAdd">Agregar Receta</Link>
               </div>
            </div>
         </div>
      </div>
   );
}

export default User;
