import React from 'react'

const Filter = ({ handle, filter }) => (
    <div>
        filter shown with <input onChange={handle} value={filter} />
    </div>
)

export default Filter
