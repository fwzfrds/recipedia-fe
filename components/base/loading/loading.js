import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const Loading = ({style}) => {
    return (
        <div 
            className="d-flex align-items-center justify-content-center gap-3"
            style={style}
        >
            <strong>Loading...</strong>
            <div className="spinner-border m-0" role="status" aria-hidden="true"></div>
        </div>
    )
}

export default Loading