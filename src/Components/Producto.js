import React, { Fragment, useState, useEffect } from 'react';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

function getModalStyle(){
    const top = 50;
    const left = 50;

    return{
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`
    };
}

const useStyles = makeStyles(theme => ({
    paper: {
        position: 'absolute',
        width: 600,
        textAlign:"center",
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const Producto = ({receta}) => {

    // Configurar Modal
    const [ modalStyle ] = useState(getModalStyle);

    const [open, setopen] = useState(false);

    const classes = useStyles();

    const AbrirModal = () =>{
        setopen(true);
    }

    const CerrarModal = () =>{
        setopen(false);
    }




    const { strDrink, strDrinkThumb, idDrink } = receta;
    const [idreceta, setidreceta] = useState(null);
    const [recetalista, setrecetalista] = useState({});

    const FnVerReceta = () =>{
        setidreceta(idDrink);
        AbrirModal();
    }

    useEffect(() => {
        const obtenerReceta = async () =>{
            if(idreceta === null) return;

            const urlAPI = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idreceta}`;
            const respuesta = await axios.get(urlAPI);
            setrecetalista(respuesta.data.drinks[0]);    
        }
        obtenerReceta();
    }, [idreceta]);

    const mostrarIngredientes = (informacion) =>{
        let ingredientes = [];
        for(let i=1; i<16; i++){
            if(informacion[`strIngredient${i}`]){
                ingredientes.push(
                    <li key={informacion[`strIngredient${i}`]}>
                        { informacion[`strIngredient${i}`] } { informacion[`strMeasure${i}`] }
                    </li>
                )
            }
        }
        return ingredientes;  
    }

    return ( 
        <Fragment>
            <div className="col-12 col-md-4">
                <div className="card my-2">
                    <div className="card-header bg-primary text-white text-center h5 p-4">
                        {strDrink}
                    </div>
                    <div className="card-body">
                        <img src={strDrinkThumb} alt={strDrink} height="200" width="200" />
                    </div>
                    <div className="card-footer">
                        <input 
                            type="submit"
                            className="btn btn-block btn-outline-primary"
                            value="Ver receta"
                            onClick={FnVerReceta}              
                        />

                        <Modal
                            open={open}
                            onClose={() => {
                                setidreceta(null);
                                setrecetalista({});                            
                                CerrarModal();
                            }}
                        >
                            <div style={modalStyle} className={classes.paper} >
                                <h1>{strDrink}</h1><hr />
                                <h5 className="text-left">Instrucciones</h5>
                                <p className="text-left lead">
                                    {recetalista.strInstructions}
                                </p>
                                <img src={strDrinkThumb} alt={strDrink} height="300" width="300" /><hr />
                                <h5 className="text-left">Ingredientes y cantidades</h5>
                                <ul className="text-left">
                                    {mostrarIngredientes(recetalista)}
                                </ul>
                            </div>
                        </Modal>
                    </div>
                </div>
            </div>
        </Fragment>
     );
}
 
export default Producto;