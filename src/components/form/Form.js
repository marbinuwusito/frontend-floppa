import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import './form.css';

const Form = ({ handleSubmit, res }) => {

   const initialState = {
      nombre: '',
      pasos: '',
      ingredientes: '',
      codigoUsuario: 1,
      description: ''
   }

   const [formDataValues, setFormDataValues] = useState(initialState);
   const params = useParams();
   const inputFileRef = useRef();
   const history = useHistory();

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormDataValues({ ...formDataValues, [name]: value });
   }

   const _handleSubmit = () => {

      if (!params.id) {
         handleSubmit({ ...formDataValues, imgURL: inputFileRef.current.files[0] }, 'POST');
         toast.success('Receta agregada con exito');
      } else {
         handleSubmit({ ...formDataValues, imgURL: inputFileRef.current.files[0] }, 'PUT', params.id);
         toast.info('Receta editada con exito');
      }

      history.push('/user');
   }

   const getReceta = async (id) => {
      const res = await axios.get(`http://localhost:3050/recetas/${id}`)
      const resJSON = res.data[0];
      const { nombre, ingredientes, pasos, codigoUsuario, description } = resJSON;
      setFormDataValues({nombre, pasos, ingredientes, codigoUsuario, description})
   }

   useEffect(() => {
      window.scrollTo(0, 0);
      if (params.id) getReceta(params.id);
   }, [params.id]);

   console.log(formDataValues);

   return (
      <div className="recetaForm">

         {
            params.id ?
            <h2>Editar Receta</h2>
            :
            <h2>Agregar Receta</h2>
         }

         <form className="Form" action="submit" onSubmit={_handleSubmit}>

            <label>
               1. Nombre de la receta <i className="fas fa-pizza-slice"></i>
            </label>

            <input
               name="nombre"
               value={formDataValues.nombre}
               type="text"
               placeholder="Ej: Carne Asada"
               autoFocus
               onChange={handleChange}
            />

            <label>
               2. Ingredientes de la receta <i className="fas fa-list"></i>
            </label>

            <textarea
               name="ingredientes"
               cols="30" rows="10"
               placeholder="Ej: &#10;- 2lb de Carne de res &#10;- Aceite &#10;- ..."
               value={formDataValues.ingredientes}
               onChange={handleChange}
            />

            <label>
               3. Pasos a realizar <i className="fas fa-shoe-prints"></i>
            </label>

            <textarea
               name="pasos"
               cols="30" rows="10"
               placeholder="Ej: &#10;- Preparar la carne con mostaza &#10;- Enceder la parrilla &#10;- ..."
               value={formDataValues.pasos}
               onChange={handleChange}
            />

            <label>
               4. Descripcion <i className="fas fa-scroll"></i>
            </label>

            <textarea
               name="description"
               cols="30"
               rows="5"
               placeholder="Agregue una descripcion simple de su receta"
               value={formDataValues.description}
               onChange={handleChange}
            />

            <label>
               5. Foto del resultado final <i className="fas fa-images"></i>
            </label>

            <input type="file" className="img-input" ref={inputFileRef}/>

            <hr />

            {
               params.id ?
                  <button>Editar</button>
                  :
                  <button>Agregar</button>
            }
         </form>

      </div>
   );
}

export default Form;
