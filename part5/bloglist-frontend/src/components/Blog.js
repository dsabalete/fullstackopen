import React, { useState } from 'react'
const Blog = ({ blog, likeBlog }) => {
    const [detailsVisible, setDetailsVisible] = useState(false)

    const showDetails = () => {
        setDetailsVisible(!detailsVisible)
    }

    const label = detailsVisible ? 'hide' : 'view'

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const handleClickLike = () => {
        likeBlog(blog)
    }

    return (
        <div style={blogStyle}>
            <div>
                {blog.title} {blog.author}
                <button onClick={showDetails}>{label}</button>
            </div>

            {detailsVisible && (
                <div>
                    <div>{blog.url}</div>
                    <div>
                        likes {blog.likes}{' '}
                        <button onClick={handleClickLike}>like</button>
                    </div>
                    <div>{blog.user.name}</div>
                </div>
            )}
        </div>
    )
}

export default Blog
