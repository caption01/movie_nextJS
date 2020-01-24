import React, { useState, useEffect } from 'react'
import SideMenu from '../components/sideMenu'
import Carousel from '../components/carousel'
import MovieList from '../components/movieList'


import { getMovies, getCategories } from '../actions/index'

class Home extends React.Component {

  // to get initalprops link by _app form nextJS
  static getInitialProps = async () => {
    const movies = await getMovies()
    const categories = await getCategories()

    const image = movies.map(movie => {
      return {
        id: `image-${movie.id}`,
        url: movie.cover,
        name: movie.name
      }
    })
      return { movies, categories, image }
  }

  constructor(props){
    super(props)
    this.state = {
      filter: ''
    }
  }

  
  changeCategory = (category) => {
    this.setState({filter: category})
  }

  filterMovies = (movies) => {

    return movies.filter((movie) => {
      return movie.genre && movie.genre.includes(this.state.filter)
    })
  }


  render(){

    const { movies, image, categories } = this.props

    return(
      <div >
        <div className="container">
            <div className="row">
              <div className="col-lg-3">
                <SideMenu 
                appName={'Movie DB'}
                categories={categories}
                changeCategory={this.changeCategory}
                activeCategory={this.state.filter}
                />
              </div>
              <div className="col-lg-9">
                <Carousel images={image} />
                <h1>Display: {this.state.filter}</h1>
                <div className="row">
                  <MovieList movies={this.filterMovies(movies) || []} />
                </div>
              </div>
            </div>
          </div>
      </div>
      )

    
  }
}

export default Home
