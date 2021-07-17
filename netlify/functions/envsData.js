/* function obtenerEnvsData(){
data = process.env.apiKey
return data
} */
const apiKey = process.env.apiKey;

exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    body: apiKey,
  };
};