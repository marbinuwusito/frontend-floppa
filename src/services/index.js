import axios from 'axios';

export async function postReceta (receta) {
   const formData = new FormData();

   formData.append("nombre", receta.nombre);
   formData.append("ingredientes", receta.ingredientes);
   formData.append("pasos", receta.pasos);
   formData.append("description", receta.description);
   formData.append("codigoUsuario", receta.codigoUsuario);
   formData.append("imgURL", receta.imgURL);

   const response = await axios({
      url: 'http://localhost:3050/recetas',
      method: 'POST',
      data: formData
   })

   return response;

}

export async function updateRecta (receta, id) {
   const formData = new FormData();

   formData.append("nombre", receta.nombre);
   formData.append("ingredientes", receta.ingredientes);
   formData.append("pasos", receta.pasos);
   formData.append("description", receta.description);
   formData.append("codigoUsuario", receta.codigoUsuario);
   formData.append("imgURL", receta.imgURL);

   const response = await axios({
      url: `http://localhost:3050/recetas/${id}`,
      method: 'PUT',
      data: formData
   })

   return response;

}

export async function deleteReceta(id) {
   const response = await axios.delete(`http://localhost:3050/recetas/${id}`)
   return response;
}
