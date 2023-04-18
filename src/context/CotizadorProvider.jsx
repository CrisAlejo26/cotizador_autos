import {createContext, useState} from 'react'
import { calcularMarca, calcularPlan, obtenerDiferenciaYear, formaterDinero } from '../../helpers';

const CotizadorContext = createContext();


const CotizadorProvider = ({children}) => {

    const [datos, setDatos] = useState({
        marca: '',
        year: '',
        plan: ''
    })

    const handleChangeDatos = e => {
        setDatos({
            ...datos,
            [e.target.name] : e.target.value
        })
    }

    const [validacion, setValidacion] = useState(false)
    const [resultado, setResultado] = useState(0)
    const [cargando, setCargando] = useState(false)

    const validandoTrue = (error) => {
        setValidacion(true)
    }
    
    const validandoFalse = () => {
        setValidacion(false)
    }

    const cotizarSeguro = () => {

        let resultado = 2000
        const diferencia = obtenerDiferenciaYear(datos.year)
        // Va a reducir un 3% por cada año de diferencia
        resultado -= ((diferencia * 3) * resultado) / 100;
        // Encontrar la reduccion dependiendo de la region
        resultado *= calcularMarca(datos.marca)
        resultado *= calcularPlan(datos.plan)
        resultado = formaterDinero(resultado)
        setCargando(true)
        setTimeout(() => {
            setResultado(resultado)
            setCargando(false)
        }, 3000);
    }

    return (
        <CotizadorContext.Provider
            value = {{
                datos,
                handleChangeDatos,
                validandoTrue,
                validandoFalse,
                validacion,
                cotizarSeguro,
                resultado,
                cargando
            }}
        >
            {children}
        </CotizadorContext.Provider>
    )
}

export {
    CotizadorProvider
}

export default CotizadorContext