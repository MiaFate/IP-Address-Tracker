/* function obtenerEnvsData(){
data = process.env.apiKey
return data
} */
exports.handler = (event, context, callback) => {
    callback(null, {
      statusCode: 200,
      body: 'No worries, all is working fine!'
    })
  }