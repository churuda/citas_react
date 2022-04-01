import {useState,useEffect}from 'react'
import Header from "./components/Header";
import { Formulario } from "./components/Formulario";
import { ListadoPacientes } from "./components/ListadoPacientes";

function App() {

  const [pacientes, setPacientes]=useState([]);
  const [paciente, setPaciente]=useState({});

  useEffect(() => {
    const obtenerLS =()=>{
      const pacientesLs= JSON.parse(localStorage.getItem('pacientes')) ??[]
      setPacientes(pacientesLs)
    }

    obtenerLS();
  }, [])
  

  useEffect(() => {
    localStorage.setItem('pacientes', JSON.stringify(pacientes))
  }, [pacientes])



  const eliminarPaciente = (id) =>{
    const pacientesActualizados=pacientes.filter(paciente => paciente.id !== id)
    setPacientes(pacientesActualizados);
  }

  return (
    <div className="container mx-auto">    
      <Header/>
      
      <div className=" mt-12 md:flex ">
          <Formulario 
          //props
          pacientes={pacientes}
          setPacientes={setPacientes}
          paciente={paciente}
          setPaciente={setPaciente}
          />
          <ListadoPacientes 
          pacientes={pacientes}
          setPaciente={setPaciente}
          eliminarPaciente={eliminarPaciente}
          />
      </div>   

    </div>


  )
}

export default App;
