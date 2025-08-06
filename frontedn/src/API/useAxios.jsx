
import { useState, useEffect } from 'react';

import axios from 'axios';

const useAxios = () => 
{

  const [data, setData] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  const fetchData = async ( { method, url, body = null, headers = null} ) => 
  {
    setLoading(true);

    try {
      const response = await axios({
        method: method.toLowerCase(),
        url,
        data: body,
        headers,
      });
      
      setData(response.data);

    } 
    catch (err) 
    {
      setError(err.response?.data || err.message);
    } 
    finally 
    {
      setLoading(false);
    }
  };

  const transcribe = async ( { method, url, body = null, headers = null} ) =>{

    setLoading(true);

    try {
      const response = await axios({
        method: method.toLowerCase(),
        url,
        data: body,
        headers,
      });
      
      setData(response.data);

      return response.data;

    } 
    catch (err) 
    {
      setError(err.response?.data || err.message);
    } 
    finally 
    {
      setLoading(false);
    }

  }

  // useEffect(() => {
  //   if (method.toUpperCase() === 'GET') 
  //   {
  //     fetchData();
  //   }
  // }, [url, trigger]);

  
  return { data, isLoading:loading, error, refetch: fetchData , transcribe };
};

export default useAxios;