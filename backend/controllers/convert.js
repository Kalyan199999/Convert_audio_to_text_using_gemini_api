const {
  GoogleGenAI,
  createUserContent,
  createPartFromUri,
} = require( "@google/genai" );


const ai = new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY});

const conversion = async ( filepath ,prompt)=>
{
  
    const uploadedFile = await ai.files.upload({
      file: filepath,
      config: { mimeType: 'audio/mpeg' }, // or audio/wav or whatever your file really is
    });

  console.log(uploadedFile);
  

//   const response = await ai.models.generateContent(
//     {
//         model: "gemini-2.5-flash",
//         contents: createUserContent([
//           createPartFromUri(myfile.uri, myfile.mimeType),
//         prompt,
//         ]),
//     }
//     );

  // console.log(response.text);

}

module.exports = conversion