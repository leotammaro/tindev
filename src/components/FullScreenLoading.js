import React from 'react'
import LoopIcon from '@material-ui/icons/Loop';
import './FullScreenLoading.scss'
function FullScreenLoading() {
    return (
        <div className="loading-container">
            <LoopIcon className="loading-icon"></LoopIcon>
        </div>
    )
}

export default FullScreenLoading
