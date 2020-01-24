const next = require('next')
const express = require('express');
const bodyParser = require('body-parser')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const fs = require('fs')
const path = require('path')
const filePath = './data.json'
const movieData = require(filePath)

app.prepare().then(() => {

  const server = express();
  server.use(bodyParser.json())

  server.get('/api/v1/movies', (req, res) => {
      return res.json(movieData)
  })

  server.get('/api/v1/movies/:id', (req, res) => {
    const { id } = req.params
    const movie = movieData.find( m => m.id === id)
    return res.json(movie)
  })

  server.post('/api/v1/movies', (req, res) => {
    const movie = req.body
    movieData.push(movie)
    const pathToFile = path.join(__dirname, filePath)
    const stringifiedData = JSON.stringify(movieData, null, 2)

    fs.writeFile(pathToFile, stringifiedData, (err) => {
      if (err) {
        return res.status(422).send(err)
      }
      return res.json('movie has been create')
    })
  })

  server.delete('/api/v1/movies/:id', (req, res) => {
    const { id } = req.params
    const movieIndex = movieData.findIndex( m => m.id === id)
    console.log(movieIndex)
    movieData.splice(movieIndex, 1)

    const pathToFile = path.join(__dirname, filePath)
    const stringifiedData = JSON.stringify(movieData, null, 2)

    fs.writeFile(pathToFile, stringifiedData, (err) => {
      if (err) {
        return res.status(422).send(err)
      }
      return res.json('movie has been delete')
    })
  })

  server.put('/api/v1/movies/:id', (req, res) => {
    const { id } = req.params
    const movie = req.body
    const movieIndex = movieData.findIndex( m => m.id === id)

    movieData[movieIndex] = movie

    const pathToFile = path.join(__dirname, filePath)
    const stringifiedData = JSON.stringify(movieData, null, 2)

    fs.writeFile(pathToFile, stringifiedData, (err) => {
      if (err) {
        return res.status(422).send(err)
      }
      return res.json('movie has been update')
    })
  })


  server.get('*', (req, res) => {
    return handle(req, res)
  })

  const PORT = process.env.PORT || 3000;

  server.use(handle).listen(PORT, (err) => {
    if (err) throw err
    console.log('> Ready on port ' + PORT)
  })
})