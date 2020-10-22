import React, { useState } from "react";
import shortid from "shortid";

function App() {

  // Crear nuevas Tareas a travez del input y SetTarea
  const [tarea, setTarea] = useState('');
  // Mostrar y almacenar las multiples tareas creadas
  const [listaTareas, setListaTareas] = useState([]);
  // Realizar cambios visuales al solicitar una modificación de tarea
  const [modoEdicion, setModoEdicion] = useState(false);
  // Obtener id especifico para modificación de tarea
  const [id, setId] = useState('');
  // Almacenar y mostrar Errores
  const [error, setError] = useState(null);

  // Funcion para agregar nuevas tareas y mostrarlas en pantalla
  // en el caso de errores, creara un mensaje de error
  const agregarTarea = e => {
    e.preventDefault();
    if(!tarea.trim()){
      setError('Este campo es Obligatorio');
      return console.log('Elemento Vacio');
    }
    setListaTareas([
      ...listaTareas, { id: shortid.generate() , nombreTarea: tarea}
    ]);
     setTarea('');
     setError(null);
  }

  // Funcion para eliminar tareas dentro de la Lista de tareas
  // Obtiene id de la tarea y realiza un filtrado omitiendo la
  // tarea eliminada
  const eliminarTarea = (id) => {
    const nuevoArray = listaTareas.filter( tarea => tarea.id !== id );
    setListaTareas(nuevoArray);
    console.log(id);
  }

  // Funcion para Editar Tareas
  // Realiza el cambio para visualizar el modo edicion en la interfaz
  // Cambiando y mostrando los datos de la tarea a Editar
  const editarTarea= (tarea) => {
    console.log(tarea);
    setModoEdicion(true);
    setTarea(tarea.nombreTarea);
    setId(tarea.id);
  }

  // Funcion Modificar Tarea,
  // Crea una nueva lista de tareas con la nueva informacion de
  // la tarea modificada, y restablece los valores de modo edicion
  // para poder agregar tareas nuevamente 
  const modificarTarea = (e) => {
    e.preventDefault();

    if(!tarea.trim()){
      setError('Este campo es obligatorio')
      return console.log('Elemento Vacio');
    }

    const tareaEditada = listaTareas.map(item => item.id === id ? {id, nombreTarea: tarea} : item);
    setListaTareas(tareaEditada);
    setModoEdicion(false);
    setTarea('');
    setId('');
    setError(null);
  }

  return (
    // Lista de tareas con sus respectivos campos de CRUD
    // se creara un nuevo elemento, por cada Elemento en la lista de Tareas
    <div className="container">
      <h3 className="text-center">CRUD Simple</h3>
      <hr />
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Lista de tareas </h4>
          <ul className="list-group">
          {
            listaTareas.length === 0 ? (
              <li className="list-group-item">No hay tareas</li>
            ) : (
              listaTareas.map( item => (
                <li className="list-group-item" key={item.id} >
                  <span className="lead">{item.nombreTarea}</span>
                  <button 
                    className="btn btn-danger btn-sm  float-right mx-2"
                    onClick={() => eliminarTarea(item.id)}
                    >Eliminar</button>
                  <button className="btn btn-warning btn-sm float-right"
                          onClick={() => editarTarea(item)}
                          >Editar</button>
                </li>
              ))
            )
          }
          </ul>
        </div>

        // Formulario para Crear y Modificar Tareas,
        // Cambia elementos visuales dependiendo las necesidades del Usuario
        <div className="col-4">
          <h4 className="text-center">
              {
                modoEdicion ? 'Editar Tarea' : 'Agregar Tarea'
              }</h4>
          <form action="" onSubmit={ modoEdicion ? modificarTarea :  agregarTarea}>

          {
            error ? <div class="alert alert-danger" role="alert">{error}</div> : null
          }
            <input type="text"
                   className="form-control mb-2"
                   placeholder="Ingrese Tarea"
                   onChange={e => setTarea(e.target.value)}
                   value= {tarea}
                   />
                    {
                      modoEdicion ? 
                      (
                        <button className="btn btn-warning btn-block" type="submit">Editar</button>
                      ) : 
                      (
                        <button className="btn btn-dark btn-block" type="submit">Agregar</button>
                      )
                    }
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
