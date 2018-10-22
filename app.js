const express = require(`express`)
const path = require(`path`)
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const blogsRouter = require(`./routes/blogs`)

const app = express()

const port = process.env.PORT || 3000
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, `public`)))

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.use(`/blogs`, blogsRouter)
// handle 404
app.use((req, res, next) => {
  let error = new Error(`Not found`)
  error.status = 404
  next(error)
})
// handle all errors
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.send(err)
})

app.listen(port, () => console.log(`listening on ${port}`))

module.exports = app