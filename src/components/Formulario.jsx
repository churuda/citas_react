import {useState,useEffect} from 'react'
import { Error } from './Error';


export const Formulario = ({pacientes, setPacientes, paciente, setPaciente}) => {
  const [nombre, setNombre] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState('');
  const [sintomas, setSintomas] = useState('');

  const [error, setError] = useState(false);

  useEffect(()=>{
    if(Object.keys(paciente).length > 0){
        setNombre(paciente.nombre)
         setPropietario(paciente.propietario);
         setEmail(paciente.email);
         setFecha(paciente.fecha);
         setSintomas(paciente.sintomas)
    }
  },[paciente]) //Lo que va dentro de las llaves son las dependencias que va a revisar para cambiar el state

  const generarId =()=>{
    const random = Math.random().toString(36).substring(2);
    const fecha= Date.now().toString(36);
    return fecha+random;
  }


  const handleSubmit=(e)=>{
      e.preventDefault();    

      //validación
      if([nombre, propietario, email, fecha, sintomas].includes('')){
          setError(true)
          return;
      } 
          setError(false);

          //OBJETO DE PACIENTE
          const objetoPaciente={
            nombre, 
            propietario, 
            email, 
            fecha, 
            sintomas,
          } 
          
        if (paciente.id){
          //editando el registro
          objetoPaciente.id=paciente.id
          const pacientesActualizados = pacientes.map(pacienteState => paciente.id===pacienteState.id ? objetoPaciente : pacienteState )

            setPacientes(pacientesActualizados);
            setPaciente({})

        } else{
          //nuevo registro
          //se usa spread operator porque no se debe alterar el estado del arreglo con push sino con la funcion state
          objetoPaciente.id = generarId()
          setPacientes([...pacientes, objetoPaciente]);

        }

          //reiniciar el formulario
          setNombre('');
          setPropietario('');
          setEmail('');
          setFecha('');
          setSintomas('');  
  }

  return (
    <div className='md:w-1/2 lg:w-2/5 mx-5 '> 
      <h2 className=' font-black text-3xl text-center ' >Seguimiento Pacientes</h2>
      
      <p className=' text-lg mt-5 text-center mb-10'>
      Añade Pacientes y {''}
      <span className='  text-indigo-600 font-bold'>
        Administralos
      </span>
      </p>

      <form 
        onSubmit={handleSubmit}
        className='bg-white shadow-md rounded-lg py-10 px-5 mb-10'>
        {error && <Error> <p>Todos los campos son obligatorios</p> </Error> }
       
        <div className=' mb-5'>
            <label  htmlFor='mascota' className='block text-gray-700 font-bold uppercase'>
              Nombre Mascota</label>
            <input 
              id='mascota'
              type="text" 
              placeholder='Nombre de la Mascota'
              className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
              value={nombre}
              onChange={(e)=> setNombre(e.target.value)}
            />
        </div>

        <div className=' mb-5'>
          <label htmlFor='propietario' className='block text-gray-700 font-bold uppercase'>
            Nombre Propietario</label>
          <input
            id='propietario'
            type="text"
            placeholder='Nombre del Propietario'
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            value={propietario}
            onChange={(e) => setPropietario(e.target.value)}
          />
        </div>

        <div className=' mb-5'>
          <label htmlFor='email' className='block text-gray-700 font-bold uppercase'>
          E-mail</label>
          <input
            id='email'
            type="email"
            placeholder='Email del Propietario'
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className=' mb-5'>
          <label htmlFor='fecha' className='block text-gray-700 font-bold uppercase'>
            Alta</label>
          <input
            id='fecha'
            type="date"
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </div>

        <div className=' mb-5'>
          <label htmlFor='sintomas' className='block text-gray-700 font-bold uppercase'>
            Sintomas</label>
          <textarea className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
          id="sintomas" 
          placeholder='Describe los síntomas'
            value={sintomas}
            onChange={(e) => setSintomas(e.target.value)}
         ></textarea>
        </div>

        <div>
          <input 
          type="submit" 
          className=' bg-indigo-600 w-full  p-3 text-gray-300 uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all'
          value={paciente.id ? 'Editar Paciente' : 'Agregar Paciente'}         
          />
        </div>


        

      </form>

    </div>
  )
}

//  