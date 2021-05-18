import React, { useEffect, useState } from 'react';
import Receta from './Receta';
import Axios from 'axios';
import './floppaMain.css';

const FloppaMain = () => {

   const [recetas, setRecetas] = useState();
   const [q, setQ] = useState("");

   const getRecetas = async () => {
      const res = await Axios.get('http://localhost:3050/recetas');
      setRecetas(res.data);
   }

   useEffect(() => {
      getRecetas();
   }, [])

   if (recetas === undefined) {
      return <p className="loading"></p>
   }

   const filterSearch = (data) => {
      return data.filter(data => data.nombre.toLowerCase().indexOf(q) > - 1);
   }

   return (
      <div className="main">
         <div className="logo">
         </div>
         <div className="text">
            <h1>Descubre, explora y crea<br />nuevas recetas</h1>
            <h3>Recetas mas buscadas: </h3>
            <input
               type="text"
               className="searchBar"
               placeholder="&#xf002; Buscar Recetas"
               style={{ fontFamily: "FontAwesome"}}
               value={q}
               onChange={(e) => setQ(e.target.value)}
            />
         </div>
         <Receta receta={filterSearch(recetas)}/>
      </div>
   );

}

export default FloppaMain;
