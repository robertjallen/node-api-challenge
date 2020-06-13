const express = require('express');
const server = express();
const helmet = require('helmet');
var cors = require('cors')
const actionsRouter = require('./data/helpers/actionsRouter');
const projectsRouter = require('./data/helpers/projectsRouter');
const colors = require('colors');

server.use(cors());
server.use(logger);
server.use(helmet());
server.use(express.json())

server.use('/api/projects', projectsRouter);
// server.use('/api/actions', actionsRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Dont worry be happy!😀😀😀😀😀</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url}`
  );
  next();
}


module.exports = server;