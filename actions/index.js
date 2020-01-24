import axios from 'axios'

const BASE_URL = 'http://localhost:3000'

const MOVIE_DATA = []

const CATAGORY_DATA = [
  {id: 'c-1', name: 'drama'},
  {id: 'c-2', name: 'action'},
  {id: 'c-3', name: 'adventure'},
  {id: 'c-4', name: 'historical'}
]

export const getMovies = () => {
  return axios.get(`${BASE_URL}/api/v1/movies`)
    .then(resp => resp.data)
    .catch(err => console.log({err: err.message}))
}


export const getMovieById = (id) => {
  return axios.get(`${BASE_URL}/api/v1/movies/${id}`)
    .then(resp => resp.data)
    .catch(err => console.log({err: err.message}))
}

export const getCategories = () => {
  return new Promise( (resolve, reject) => {
    setTimeout( () => {
      resolve(CATAGORY_DATA)
      reject('Cant fetch data')
    }, 50)
  })
}

export const createMovie = (movie) => {
  movie.id = Math.random().toString(36).substr(2, 5)
  return axios.post(`${BASE_URL}/api/v1/movies`, movie)
    .then( resp => resp.data)
}

export const deleteMovie = (id) => {
  return axios.delete(`${BASE_URL}/api/v1/movies/${id}`)
    .then( resp => resp.data)
}

export const updateMovie = (movie) => {
  return axios.put(`${BASE_URL}/api/v1/movies/${movie.id}`, movie)
    .then(resp => resp.data)
    .catch(err => console.log({err: err.message}))
}

export const getPosts = () => {
  return axios.get(`${BASE_URL}/api/v1/posts`)
    .then( resp => resp.data)
}
