const express = require('express');

const userRouter = require('./users/userRouter');
const postRouter = require('./posts/postRouter');

const server = express();

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  const { ip, method, url } = req
  const agent = req.get("User-Agent")

    console.log(`${ip} ${method} ${url} ${agent}`)
  }

  next()
}

server.use((err, req, res, next) => {
	console.log(err)
	res.status(500).json({
		// keep server errors generic, we don't want to expose details of potential bugs
		message: "Something went wrong",
	})
})

server.use(logger())

module.exports = server;
