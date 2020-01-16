import React, {Fragment, useState, useEffect} from 'react';
import Formulario from "./components/Formulario";
import Cita from "./components/Cita";
import PropTypes from 'prop-types';

function App() {

    // citas en localStorage
    let citasIniciales = JSON.parse(localStorage.getItem('citas'));
    if(!citasIniciales) {
        citasIniciales = [];
    }

    // Arreglo de citas
    const [citas, guardarCitas] = useState(citasIniciales);

    // use Effect para realizar ciertas operaciones cuando el state cambia

    useEffect( () => {
        // cada vez que el state se actualiza se ejecuta esto
        if(citasIniciales){
            localStorage.setItem('citas', JSON.stringify(citas));
        }else{
            localStorage.setItem('citas', JSON.stringify([]));
        }
    }, [citas, citasIniciales]);

    // funcion que toma las citas actuales y agregue la nueva

    const crearCita = cita => {
        guardarCitas([
            ...citas, // copia del state
            cita      // agregamos la nueva cita
        ]);
    };

    // fincion que elimina una cita por id
    const eliminarCita = id => {
        const nuevasCitas = citas.filter( cita => cita.id !== id);
        guardarCitas(nuevasCitas);
    };

    // mensaje condicional
    const titulo = citas.length === 0 ? 'No hay citas' : 'Administra tus citas';

    return (
      <Fragment>
          <h1>Administrador de Pacientes</h1>
          <div className="container">
            <div className="row">
              <div className="one-half column">
                <Formulario
                    crearCita={crearCita}/>
              </div>
              <div className="one-half column">
                <h2>{titulo}</h2>
                  {citas.map(cita => (
                      <Cita key={cita.id} cita={cita}
                          eliminarCita={eliminarCita}/>
                  ))}
              </div>
            </div>
          </div>
      </Fragment>

    );
}

Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired
}

export default App;
