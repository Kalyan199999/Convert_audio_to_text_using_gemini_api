const {
  GoogleGenAI,
  createUserContent,
  createPartFromUri,
} = require("@google/genai");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const conversion = async (filepath, prompt = "Write the summary of the audio file!") => {
  try {
    const uploadedFile = await ai.files.upload({
      file: filepath,
      config: { mimeType: "audio/mpeg" },
    });

    console.log("Uploaded file:");
    console.log(uploadedFile);

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: createUserContent([
        createPartFromUri(uploadedFile.uri, uploadedFile.mimeType),
        { text: prompt },
      ]),
    });

    const result = await response.text;

    console.log("Transcription Result:");
    console.log(result);

    return { ok: true, text: result };
  } 
  catch (error) 
  {

    console.error("Gemini API Error:", error);

    return { ok: false, text: "Error occurred during transcription." };

  }
};

module.exports = conversion;