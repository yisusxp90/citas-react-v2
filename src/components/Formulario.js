import React, {Fragment, useState} from 'react';
import uuid from 'uuid/v4';

// aca pasamos las props
const Formulario = ({crearCita}) => {

    // Crear State de citas el state es cita y la funcion que actualiza el state es actualizarCita
    const [cita, actualizarCita] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    });

    const [error, actualizarError] = useState(false);

    // funcion que se ejecuta cada vez q el usuario escribe en el input
    const actualizarState = e => {
        actualizarCita({
            ...cita, // copia del state
            [e.target.name] : e.target.value // agregamos el nuevo valor
        })
    };

    // extraer valores
    const { mascota, propietario, fecha, hora, sintomas } = cita;

    // cuando se agrega la cita
    const submitCita = e => {
        e.preventDefault();

        // validar
        if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === ''){
            actualizarError(true);
            return;
        }
        actualizarError(false);
        // asignar un id

        cita.id = uuid();

        // crear cita a traves de la funcion pasada del app mediante props
        crearCita(cita);

        // reiniciar form
        actualizarCita({
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: ''
        });
    };

    return (
        <Fragment>
            <h2>Crear Cita</h2>

            {error ? <p className="alerta-error">Todos los campos son obligatorios</p> : null}

            <form onSubmit={submitCita}>
                <label>Nombre Mascota</label>
                <input type="text"
                       name="mascota"
                       className="u-full-width"
                       placeholder="Nombre mascota"
                       onChange={actualizarState}
                       value={mascota}/>

                <label>Nombre Propietario</label>
                <input type="text"
                       name="propietario"
                       className="u-full-width"
                       placeholder="Nombre propetario mascota"
                       onChange={actualizarState}
                       value={propietario}/>

                <label>Fecha</label>
                <input type="date"
                       name="fecha"
                       className="u-full-width"
                       onChange={actualizarState}
                       value={fecha}/>

                <label>Hora</label>
                <input type="time"
                       name="hora"
                       className="u-full-width"
                       onChange={actualizarState}
                       value={hora}/>

                <label>Sintomas</label>
                <textarea name="sintomas"
                       className="u-full-width"
                       onChange={actualizarState}
                       value={sintomas}>
                </textarea>

                <button type="submit" className="u-full-width button-primary">Agregar Cita</button>
            </form>
        </Fragment>

    );
};

export default Formulario;