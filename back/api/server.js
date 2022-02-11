const { api_key, base_url, img_url, language } = require('./api.js')
const express = require('express')
const server = express()
const axios = require('axios')
const cors = require('cors')
let result
let i = 0

server.use(cors())

async function newFilme() {
  const id = Math.floor(Math.random() * 1000 + 1)
  const movie_films = `${base_url}${id}?${api_key}&${language}`

  axios
    .get(movie_films)
    .then(response => (result = response.data))
    .catch(err => {
      console.log(i++)
      newFilme()
    })

  return { result, img_url }
}

server.get('/api', (req, res) => {
  newFilme()

  if (result.backdrop_path === null) {
    console.log('Error ***********')
    newFilme()
  }

  return res.json({ result, img_url })
})

server.listen(3000, () => console.log('Rodando o servidor'))
