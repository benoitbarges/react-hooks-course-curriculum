import React from 'react'
import PropTypes from 'prop-types'
import { fetchMainPosts } from '../utils/api'
import Loading from './Loading'
import PostsList from './PostsList'

const postsReducer = (state, action) => {
  if (action.type === 'fetchPosts') {
    return {
      error: null,
      posts: action.posts,
      loading: false
    }
  } else if (action.type === 'error') {
    return {
      ...state,
      error: action.error.message,
      loading: false
    }
  } else {
    throw new Error("This action type isn't supported.")
  }
}

export default function Posts ({ type }) {
  const [state, dispatch] = React.useReducer(
    postsReducer,
    { posts: null, error: null, loading: true }
  )

  React.useEffect(() => {
    fetchMainPosts(type)
      .then(posts => dispatch({ type: 'fetchPosts', posts }))
      .catch(error => dispatch({ type: 'error', error }))
  }, [type])

  const { posts, error, loading } = state

  if (loading === true) {
    return <Loading />
  }

  if (error) {
    return <p className='center-text error'>{error}</p>
  }

  return <PostsList posts={posts} />
}
