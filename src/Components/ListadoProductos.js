import React, { Fragment } from 'react';
import Producto from './Producto';

const ListadoProductos = ({recetas}) => {
    if(Object.keys(recetas).length === 0) return null;

    return ( 
        <Fragment>
            <div className="card">
                <div className="card-header bg-danger text-white h4">
                    Listado de mejores recetas
                </div>
                <div className="card-body">
                    <div className="row">                    
                        {
                            recetas.map(receta =>(
                                <Producto 
                                    key={receta.idDrink}
                                    receta={receta}
                                />
                            ))
                        }                    
                    </div>                             
                </div>
            </div>
        </Fragment>
     );
}
 
export default ListadoProductos;