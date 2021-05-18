import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './recetaPage.css'

const RecetaPage = () => {
   const [receta, setReceta] = useState();
   const params = useParams();

   const getData = async () => {
      const res = await axios.get(`http://localhost:3050/recetas/${params.id}`);
      setReceta(res.data[0]);
   }

   useEffect(() => {
      getData()
      // eslint-disable-next-line
   }, []);

   if(receta === undefined) {
      return <p className="loading"></p>
   }

   let ingredientes = receta.ingredientes.split('\n' || '\r');
   let pasos = receta.pasos.split('\n' || '\r');

   return (
      <div className="receta">
         <h1 className="recetaNombre">{receta.nombre}</h1>
         <div className="owo">
            <div className="ingredientes">
               <div className="ingredientes-lista">
                  <h3 className="XD">Ingredientes de la receta:</h3>
                  {
                     ingredientes.map((ingrediente, index) => {
                        return(
                           <ul key={index}>
                              <li>{ingrediente}</li>
                           </ul>
                        )
                     })
                  }
                  <h3 className="XD">Descripcion:</h3>
                  <div>{receta.description}</div>
               </div>
            </div>
            <div className="receta-pasos">
               <div className="pasos-lista">
                  <h3 className="XD">Pasos a realizar:</h3>
                  {
                     pasos.map((paso, index) => {
                        return (
                           <ul key={index}>
                              <li>{paso}</li>
                           </ul>
                        )
                     })
                  }
                  <h3 className="XD">Resultado final:</h3>
                  <img className="receta-img" src={receta.imgURL} alt="" />
               </div>
            </div>
         </div>

      </div>
   );
}

export default RecetaPage;
