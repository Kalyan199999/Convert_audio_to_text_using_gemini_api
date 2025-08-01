const {
  GoogleGenAI,
  createUserContent,
  createPartFromUri,
} = require( "@google/genai" );

const ai = new GoogleGenAI({});

const conversion = async ( filepath ,prompt)=>
{
  const myfile = await ai.files.upload({
    file: filepath,
    config: { mimeType: "audio/mp3" },
  });

//   const response = await ai.models.generateContent(
//     {
//         model: "gemini-2.5-flash",
//         contents: createUserContent([
//           createPartFromUri(myfile.uri, myfile.mimeType),
//         prompt,
//         ]),
//     }
//     );

  console.log(response.text);

}

module.exports = conversion