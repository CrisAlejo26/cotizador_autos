import { Fragment } from "react"
import { marcas, years, planes } from "../constants"
import useCotizador from './../hooks/useCotizador';
import {Error} from './Error'

export const Formulario = () => {

    const {datos, handleChangeDatos, validandoTrue, validandoFalse, validacion, cotizarSeguro} = useCotizador()

    const handleSubmit = (e) => {
        e.preventDefault()

        if (Object.values(datos).includes('')) {
            return validandoTrue()
        }
        validandoFalse()
        cotizarSeguro()
    }

    return (
        <>  
            {validacion ? (<Error/>) : null}
            <form onSubmit={handleSubmit}>
                <div className="my-5">
                    <label className="block mb-3 font-bold text-gray-400 uppercase">Marca</label>
                    <select 
                        name="marca" 
                        className="w-full p-3 bg-white border border-gray-200"
                        onChange={e => handleChangeDatos(e)}
                        value = {datos.marca}
                        >
                            <option value="">-- Selecciona Marca --</option>
                            {marcas.map(mar => {
                                return (
                                    <option
                                        key = {mar.id}
                                        value = {mar.id}
                                    >{mar.nombre}</option>
                                )
                            })}
                    </select>
                </div>
                <div className="my-5">
                    <label className="block mb-3 font-bold text-gray-400 uppercase">Año</label>
                    <select 
                        name="year" 
                        className="w-full p-3 bg-white border border-gray-200"
                        onChange={e => handleChangeDatos(e)}
                        value = {datos.year}
                        >
                            <option value="">-- Selecciona Año --</option>
                            {years.map(yea => {
                                return (
                                    <option
                                        key = {yea}
                                        value = {yea}
                                    >{yea}</option>
                                )
                            })}
                    </select>
                </div>
                <div className="my-5">
                    <label className="block mb-3 font-bold text-gray-400 uppercase">Elige un Plan</label>
                    <div className="flex gap-3 items-center">
                            {planes.map(plan => {
                                return (
                                    <Fragment 
                                        key={plan.id}
                                    >
                                        <label>
                                            {plan.nombre}
                                        </label>
                                        <input
                                            type = "radio"
                                            name = "plan"
                                            value= {plan.id}
                                            onChange={e => handleChangeDatos(e)}
                                        />
                                    </Fragment>
                                )
                            })}
                    </div>
                </div>
                <input
                    type = "submit"
                    className="w-full bg-indigo-500 hover:bg-indigo-600 transition-colors text-white cursor-pointer p-3 uppercase font-bold"
                    value= "Cotizar"
                />
            </form>
        </>
    )
}
