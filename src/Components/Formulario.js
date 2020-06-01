import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';

const Formulario = ({setbebidas}) => {

    const [categorias, setcategorias] = useState([]);
    const [error, seterror] = useState(false);

    useEffect(() => {
        
        const ListarCategoriasAPI = async () => {
            const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
            const respuesta = await axios.get(url);

            setcategorias(respuesta.data.drinks);            
        }
        ListarCategoriasAPI();
    }, []);

    const [bebida, setbebida] = useState({
        txtingrediente: '',
        cmbcategoria: ''
    });

    const { txtingrediente, cmbcategoria } = bebida;

    const FnCapturarDatos = (e) =>{
        setbebida({
            ...bebida,
            [e.target.name] : e.target.value
        })
    }

    const FnEnviarDatos = (e) =>{
        e.preventDefault();
        if(txtingrediente.trim() === '' || cmbcategoria.trim() === ''){
            seterror(true);
            return;
        }
        seterror(false);
        setbebidas(bebida);
    }

    return ( 
        <Fragment>
            <form
                onSubmit={FnEnviarDatos}
            >
                {
                    error ?
                    (
                        <div className="alert alert-danger my-3 h4">
                            Todos los campos son obligatorios
                        </div>
                    )
                    : null
                }
                <div className="row my-4">
                    <div className="col-12 col-md-4">
                        <input 
                            type="text"
                            className="form-control"
                            placeholder="Ingrediente"
                            name="txtingrediente"
                            onChange={FnCapturarDatos}
                            value={txtingrediente}
                        />
                    </div>
                    <div className="col-12 col-md-4">
                        <select
                            className="form-control"
                            name="cmbcategoria"
                            onChange={FnCapturarDatos}
                            value={cmbcategoria}
                        >
                            <option value="">-- Selecciona una --</option>
                            {categorias.map(categoria => (
                                <option key={categoria.strCategory} value={categoria.strCategory}>{categoria.strCategory}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-12 col-md-4">
                        <input 
                            type="submit"
                            className="btn btn-block btn-danger"
                            onChange={FnCapturarDatos}
                        />
                    </div>
                </div>
            </form>       
        </Fragment>
     );
}
 
export default Formulario;