import React from 'react'
import { FaArrowAltCircleLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const BackButton = ({url}) => {
  return (
    <Link to={url} className='btn btn-reverse btn-back'>
        <FaArrowAltCircleLeft />
    </Link>
  )
}

export default BackButton