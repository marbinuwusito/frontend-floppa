import React from 'react';
import { useHistory }from 'react-router-dom';
import './receta.css';

const Receta = ({ receta }) => {

   const history = useHistory();

   return (
      receta.map(receta => {
         return (
            <div className="card" key={receta.id} onClick={() => history.push(`/receta/${receta.id}`)}>
               <div className="card-image">
                  <img src={receta.imgURL} alt="" width={200} height={100}/>
               </div>
               <div className="card-body">
                  <h2>{receta.nombre}</h2>
                  <p>{receta.description}</p>
               </div>
            </div>
         )
      })
   );
}

export default Receta;
