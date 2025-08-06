
import './App.css';

import useAxios from './API/useAxios'
import Main from './Components/Main'

function App() {

  const { data, isLoading, error } = useAxios({
    method: 'GET',
    url: 'https://jsonplaceholder.typicode.com/users'
  });

  const handleFile = (e)=>{

    console.log(e.target.files[0]);
    
  }

  return (
   <>

   {/* <input type="file" accept="audio/*" onChange={(e)=>handleFile(e)} /> */}
   <Main />

   </>
  );
}

export default App;
