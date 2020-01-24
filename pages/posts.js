import React from 'react'
import { getPosts } from '../actions/index'

class Posts extends React.Component {

    static getInitialProps = async () => {
        const posts = await getPosts()
        return { posts }
    }

    render(){
        const { posts } = this.props
        return(
            <div>
                I'm POST
                <ul >
                {
                    posts.map(post => {
                        return (
                            <li key={posts.id}>
                            <span>{post.id}</span>
                            <span>{post.title}</span>
                            </li>
                        )
                    })
                }
                </ul>
            </div>
        )
    }
}

export default Posts