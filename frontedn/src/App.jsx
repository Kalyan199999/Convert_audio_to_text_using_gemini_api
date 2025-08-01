
import './App.css';

// import {useState} from 'react'

function App() {

  // const [file , setFile] = useState(null)

  const handleFile = (e)=>{

    console.log(e.target.files[0]);
    
  }

  return (
   <>

   <input type="file" accept="audio/*" onChange={(e)=>handleFile(e)} />

   </>
  );
}

export default App;
