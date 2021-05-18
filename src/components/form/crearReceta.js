import React from 'react';
import Form from './Form';
import { postReceta, updateRecta } from '../../services/index';

const CrearReceta = () => {

   const handleSubmit = (data, res, id) => {
      if (res === 'POST') {
         postReceta(data);
      } else if (res === 'PUT') {
         updateRecta(data, id);
      }
   }

   return <Form handleSubmit={handleSubmit}/>
}

export default CrearReceta;
