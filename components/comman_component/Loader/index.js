import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { PuffLoader } from 'react-spinners'

const LoaderComponent = () => {
    return (
        <div className='loader_page'>
            <PuffLoader
                color="#3457D5"
                cssOverride={{
                    width: '100px'
                }}
            />
            <span className='loading'>Loading...</span>
        </div>

    )
}

export default LoaderComponent