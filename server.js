const express = require('express');

const userRouter = require('./users/userRouter');

const server = express();

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger() {
  return (req, res, next) => {
  const { ip, method, url } = req
  const agent = req.get("User-Agent")

  if (format === "short") {
    console.log(`${method} ${url}`)
  } else {
    console.log(`${ip} ${method} ${url} ${agent}`)
  }
  next()
}}

server.use((err, req, res, next) => {
	console.log(err)
	res.status(500).json({
		// keep server errors generic, we don't want to expose details of potential bugs
		message: "Something went wrong",
	})
})
server.use(express.json())
server.use("/api/users", userRouter)
server.use(logger('short'))

module.exports = server;
