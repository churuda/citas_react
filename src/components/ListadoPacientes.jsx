import { Pacientes } from "./Pacientes"

export const ListadoPacientes = ({pacientes,setPaciente, eliminarPaciente}) => {

  return (
    <div className=' md:w-1/2 lg:w-3/5 md:h-screen overflow-y-scroll'>
       
      {pacientes && pacientes.length ? (
      <>
      <h2 className=' font-black text-3xl text-center '>Listado de Pacientes</h2> 

        <p className=' text-xl mt-5 mb-10 text-center '>Administra tus {' '}
          <span className=' text-indigo-600 font-bold text-center'>Pacientes y citas</span>      
        </p>

      {pacientes.map(paciente => (<Pacientes
        //props
        key={paciente.id}
        paciente={paciente}
        setPaciente={setPaciente}
        eliminarPaciente={eliminarPaciente}
        />
        
       ))}
      
      </>
      ) : (
      <>
        <h2 className=' font-black text-3xl text-center '>No hay pacientes</h2>

        <p className=' text-xl mt-5 mb-10 text-center '>Comienza agregando Pacientes y {' '}
          <span className=' text-indigo-600 font-bold text-center'>Aparecerán en este lugar</span>
        </p> </>
          )
      }       
    </div>
  )
}
