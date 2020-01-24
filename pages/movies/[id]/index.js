import React from 'react'
import { useRouter } from 'next/router'
import { getMovieById, deleteMovie } from '../../../actions/index'
import Link from 'next/link'

const Movie = (props) => {

    const { movie } = props
    const router = useRouter()
    const { id } = router.query

    const handleDelete = (id) => {
        deleteMovie(id).then((resp) => {
            console.log(resp)
        })
        router.push('/')
    }


    return(
        <div className="container">
            <div className="jumbotron">
                <h1 className="display-4">{movie.name}</h1>
                <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
                <hr className="my-4" />
                <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
                <button className="btn btn-primary btn-lg mr-1" href="#" role="button">Learn more</button>
                <button onClick={()=>handleDelete(id)} className="btn btn-danger btn-lg mr-1" href="#" role="button">Delete</button>
                <Link href="/movies/[id]/edit" as={`/movies/${id}/edit`} >
                    <button 
                    className="btn btn-warning btn-lg" 
                    href="#" 
                    role="button">Edit</button>
                </Link>
            </div>
            <p>
            Some description about the movie
            </p>
        </div>
    )
}

// call getMovieById

Movie.getInitialProps = async (context) => {

    const { id } = context.query
    const movie = await getMovieById(id)

    return { movie }
}

export default Movie