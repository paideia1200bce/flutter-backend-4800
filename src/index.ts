// const http = require('http')

// const server = http.createServer(
//   //Callback for the received request
//   (req, res) => {
//   if(req.method === 'GET' && req.url  === "/"){
//     //res.statusCode(200)
//     console.log("testing server")
//     res.end()
//   }
// })

// server.listen(3001, () => {
//   console.log('server listening on http://localhost:3001')
// })

//replaced with the following:
import app from "./server"

app.listen(3001, () => 
{
    console.log("hello on http://localhost:3001")
})