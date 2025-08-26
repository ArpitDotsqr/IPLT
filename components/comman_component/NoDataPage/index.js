import React from 'react'

const NoDataPage = ( props ) => {
    const { name } = props
    return (
        <p className='no_data_page'>
            No {name ? name : 'Data'} To Show!
        </p>
    )
}

export default NoDataPage