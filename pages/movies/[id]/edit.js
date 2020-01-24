import React from 'react'
import Router from 'next/router'
import MovieCreateForm from '../../../components/movieCreateForm'
import { getMovieById, updateMovie } from '../../../actions/index'


class EditMovie extends React.Component {

    static getInitialProps = async ({query}) => {
        const movie = await getMovieById(query.id)
        return { movie }
    }

    handleUpdateMovie = (movie) => {
        
        updateMovie(movie).then(updatedMovie => {
            Router.push(`/movies/${movie.id}`)
        })
    }

    render(){

        const { movie } = this.props

        return(
            <div className='container'>
                <h1>Edit - Page</h1>
                <MovieCreateForm 
                submitButton="Update"
                initialData={movie} 
                handleCreateMovie={this.handleUpdateMovie} />
            </div>
        )
    }
}

export default EditMovie