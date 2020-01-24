import React from 'react'
import { useRouter } from 'next/router'
import Modal from './modal'
import MovieCreateForm from './movieCreateForm'
import { createMovie } from '../actions/index'

const SideMenu = (props) => {

    const router = useRouter()
    const { categories } = props
    let modal = null

    const handleCreateMovie = (movie) => {
        createMovie(movie).then(movies => {
            modal.closeModal()
            router.push('/')
        })
    }

    return (
        <div>
            <Modal ref={ele => modal = ele} hasSubmit={false} >
                <MovieCreateForm handleCreateMovie={handleCreateMovie} />
            </Modal>
            <h1 className="my-4">{props.appName}</h1>
            <div className="list-group">
            {
                categories.map((cate) => 
                    <a 
                        onClick={()=> props.changeCategory(cate.name)}
                        key={cate.id} 
                        href="#" 
                        className={`list-group-item ${props.activeCategory === cate.name ? 'active' : ''}`}>{cate.name}
                    </a>
                )
            }
            </div>
        </div>
        )
}

export default SideMenu