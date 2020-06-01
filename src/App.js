import React, { Fragment, useState, useEffect } from 'react';
import Header from './Components/Header';
import Formulario from './Components/Formulario';
import ListadoProductos from './Components/ListadoProductos';
import axios from 'axios';

function App() {

  const [bebidas, setbebidas] = useState({
    txtingrediente: '',
    cmbcategoria: ''
  });

  const [recetas, setrecetas] = useState([]);
  

  useEffect(() => {
    const ConsultarRecetasAPI = async () =>{
      const { txtingrediente, cmbcategoria } = bebidas;
      if(txtingrediente.trim() === '' || cmbcategoria.trim() === '') return;
      const urlAPI = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${txtingrediente}&c=${cmbcategoria}`;
      const respuesta = await axios.get(urlAPI);
      setrecetas(respuesta.data.drinks);
    }
    ConsultarRecetasAPI();
  }, [bebidas])

  return (
    <Fragment>
      <Header />
      <div className="container-fluid">        
        <Formulario
          setbebidas={setbebidas}
        />      
        <div className="row justify-content-center my-4">
          <div className="col-11">
            <ListadoProductos
              recetas={recetas}
            />
          </div>        
        </div>
      </div>
    </Fragment>
  );
}

export default App;
