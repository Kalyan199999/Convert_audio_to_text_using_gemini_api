import useAxios from '../API/useAxios';
import React, { useState } from 'react';

function Main() {
  const { data, isLoading, error,transcribe } = useAxios();

  const [selectedFile, setSelectedFile] = useState(null);

   const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert("Please select an audio file.");
      return;
    }
    // Handle file upload logic here

    let formData = new FormData();

    formData.append("audio", selectedFile);
    console.log("Uploading:", selectedFile);

    const res = await transcribe( { method:"POST", url:"http://localhost:5501/api/transcribe", body : formData } )

    console.log(res);
    

  };

  return (

    <div className='w-full min-h-screen flex flex-col items-center justify-start border-2 border-red-700 relative'>

      {/* Main content container */}

      {/* <div className='w-1/2 min-h-[80vh] px-5 my-4 flex flex-col items-center justify-center border-2 border-red-700'>
        <p className="text-gray-700 text-center">Audio Transcript Result</p>

      </div> */}

      {/* Form fixed at bottom */}
      <form
        method="POST"
        encType="multipart/form-data"
        className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 px-5 py-4 bg-white border-t border-gray-300 shadow-md flex flex-row items-center justify-center gap-x-4 z-50"
         onSubmit={handleSubmit}
      >       
  {/* Hidden File Input */}

  {/* Display Selected File Name */}
      {selectedFile && (
        <span className="text-sm text-gray-700 truncate max-w-xs">
          {selectedFile.name}
        </span>
      )}

            <input
              type="file"
              accept="audio/*"
              name="audio"
              id="audio-upload"
              className="hidden"
               onChange={handleFileChange}
            />

  {/* File Upload Button (Label) */}
              <label
                htmlFor="audio-upload"
                className="flex items-center justify-center cursor-pointer w-12 h-12 rounded-full bg-blue-500 text-white text-3xl hover:bg-blue-600 transition-all"
              >
                +
              </label>
  
               <button
                 type="submit"
                 className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
               >
                 Upload & Transcribe
               </button>

          </form>

    </div>
  );
}

export default Main;