// Componente funcional

// Función flecha
// Función anónima
// Función de expresión
// Función de asignación
// IIEF (Inmediately Invoked Function Expresion) Función de expresión invocada inmediatamente

// Función de expresión

"use client";
import { useState } from "react"
import styles from "./page.module.css"

export default function Page() {

  const [tareas, setTareas] = useState([]);
  const [filtroTexto, setfiltroTexto] = useState("");
  const [filtroPrioridad, setfiltroPrioridad] = useState("");

  const [nuevaTarea, setNuevaTarea] = useState({
    nombre: "",
    fecha: "",
    prioridad: ""
  })
  console.log(nuevaTarea)
  console.log(tareas)

  function handleChange(event) {
    setNuevaTarea({
      ...nuevaTarea,
      [event.target.name]: event.target.value
    })
  }
  
  function handleChangeSearchText(event) {
    setfiltroTexto(event.target.value)
  }

  function handleChangeSearchPrioridad(event) {
    setfiltroPrioridad(event.target.value)
  }

  function agregarTarea() {
    const newListaTareas = tareas.slice();
    const newTarea = {
      nombre: nuevaTarea.nombre,
      fecha: nuevaTarea.fecha,
      prioridad: nuevaTarea.prioridad,
      creadoEl: new Date().toISOString()
    }
    newListaTareas.push(newTarea);
    setTareas(newListaTareas);
    setNuevaTarea({
      nombre: "",
      fecha: "",
      prioridad: ""
    })
  }

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h1>Todo-list</h1>
        <input value={nuevaTarea.nombre} onChange={handleChange} type="text" placeholder="Agregar tarea..." name="nombre"/>
        <input value={nuevaTarea.fecha} onChange={handleChange} type="date" name="fecha"/>
        <select name="prioridad" onChange={handleChange} value={nuevaTarea.prioridad}>
          <option>Prioridad</option>
          <option>Alta</option>
          <option>Media</option>
          <option>Baja</option>
        </select>
        <button onClick={agregarTarea}>Agregar</button>

        <div style={{marginTop: "20px"}}>
          <h4>Filtros</h4>
          <input  value={filtroTexto} onChange={handleChangeSearchText} className={styles.busqueda} type="text" placeholder="Buscar tarea..."></input>

          <div>
            <p>Ordenar por prioridad</p>
            <select className={styles.busqueda} onChange={handleChangeSearchPrioridad} value={filtroPrioridad}>
              <option>Prioridad</option>
              <option>Alta</option>
              <option>Media</option>
              <option>Baja</option>
            </select>
          </div>
        </div>
        
        <div style={{marginTop: "20px"}}>
          <ul>
            {
              tareas
              .filter((tarea) => tarea.nombre.toLowerCase().includes(filtroTexto.toLowerCase()))
              .filter(tarea => {
                if (filtroPrioridad === "") {
                  return true;
                }
                return tarea.prioridad === filtroPrioridad;
              })
              .map(
                (tarea) => {
                  return(
                    <li className={styles.tarea}>
                      <h4>{tarea.nombre}</h4>
                      <p>{tarea.fecha}</p>
                      <p>{tarea.prioridad}</p>
                    </li>
                  )
                }
              )
            }
          </ul>
        </div>

      </div>
    </div>
  )
}