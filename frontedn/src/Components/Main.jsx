import useAxios from '../API/useAxios';
import { useState } from 'react';
import { jsPDF } from "jspdf";   // ✅ Import jsPDF

function Main() 
{
  const { data, isLoading, error,transcribe } = useAxios();

  const [ loading , setLoading ] = useState(false);

  const [ trans_data , setTransData ] = useState({
    ok:false,
    data:"",
    message:""
  });

  const [selectedFile, setSelectedFile] = useState(null);

  const [isSummary , setSummary] = useState(true);

   const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit =async (e) => 
  {
    e.preventDefault();

    setLoading(true)

    try 
    {

       if (!selectedFile) 
        {
            alert("Please select an audio file.");
            return;
        }
    
          let formData = new FormData();
      
          formData.append("audio", selectedFile);
      
          formData.append("summary", isSummary);
      
          // console.log("Uploading:", selectedFile);
      
          const res = await transcribe( { method:"POST", url:"http://localhost:5501/api/transcribe", body : formData } )
      
          // console.log(res);

          setTransData(res)
          setSelectedFile(null);
      
    } 
    catch (error) 
    {
      console.log("Error uploading file:");
      
    }

    setLoading(false)


  };


   // ✅ Generate PDF from transcript
  const handleDownloadPDF = () => {
    if (!trans_data.ok || !trans_data.data) {
      alert("No transcript available to download!");
      return;
    }

    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text("Audio Transcription", 10, 10); // Title
    doc.setFontSize(10);

    // ✅ Automatically split long text into pages
    const textLines = doc.splitTextToSize(trans_data.data, 180);
    doc.text(textLines, 10, 20);

    doc.save("transcript.pdf");
  };

  return (

    <div className='w-full min-h-screen flex flex-col items-center justify-start border-2 border-red-700 relative'>

      {/* Main content container */}

      <div className="w-1/2 min-h-[80vh] max-h-[80vh] px-5 py-6 my-4 bg-gray-800 rounded-lg shadow-lg flex flex-col items-center justify-start border border-red-700 overflow-y-auto scroll-smooth hide-scrollbar">
          {
          trans_data.ok ? (
            <p className="text-white text-lg leading-relaxed whitespace-pre-line">
              {trans_data.data}
            </p>
          ) : (
            loading ? 
            (
              <p className='text-white text-lg leading-relaxed'>Traslating the audio</p>
            ) : 
            (
              <p className="text-gray-400 text-sm italic">
                Transcript will appear here...
              </p>
            )
          )
          }        


  </div>
          
        {/* Form fixed at bottom */}
          <form
            method="POST"
            encType="multipart/form-data"
            className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 px-5 py-4 bg-white border-t border-gray-300 shadow-md flex flex-row items-center justify-center gap-x-4 z-50"
          >
            {/* Display Selected File Name */}
            {selectedFile && (
              <span className="text-sm text-gray-700 truncate max-w-xs">
                {selectedFile.name}
              </span>
            )}
          
            {/* Hidden File Input */}

            {
                selectedFile ? (
                  // to delete the selected file
                  <button 
                  className='bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700'
                  onClick={(e)=>{
                    e.preventDefault()
                    setSelectedFile(null)
                  }}
                  >
                    X </button>
                ) : (
                  // What to show if no file is selected
                  <>
                    <input
                      type="file"
                      accept="audio/*"
                      name="audio"
                      id="audio-upload"
                      className="hidden"
                      onChange={handleFileChange}
                    />
              
                    <label
                      htmlFor="audio-upload"
                      className="flex items-center justify-center cursor-pointer w-12 h-12 rounded-full bg-blue-500 text-white text-3xl hover:bg-blue-600 transition-all"
                    >
                      +
                    </label>
                  </>
                )
              }               

            
          
            {/* Buttons in same row */}
            <button
              className="px-5 py-2 bg-blue-500 hover:bg-blue-400 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out"
              onClick={(e) => {
                e.preventDefault();
                setSummary(true);
              }}
            >
              Summary
            </button>
          
            <button
              className="px-5 py-2 bg-blue-500 hover:bg-blue-400 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out"
              onClick={(e) => {
                e.preventDefault();
                setSummary(false);
              }}
            >
              Description
            </button>
          
            <button
              type="submit"
              className="px-6 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition duration-300 ease-in-out"
              onClick={(e) => {
                e.preventDefault();
                handleSubmit(e);
              }}
            >
              Transcribe
            </button>

            {/* ✅ Download PDF Button */}

            {
              trans_data.ok && 
              <button
                    type="button"
                    onClick={handleDownloadPDF}
                    className="px-6 py-2 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 transition duration-300 ease-in-out"
              >
                Download PDF
              </button>
            }
            
        
          </form>


    </div>
  );
}

export default Main;