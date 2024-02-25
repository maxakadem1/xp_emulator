'use client'

import React from 'react'
import Draggable from 'react-draggable'

interface FolderProps {
  title: string
  content: React.ReactNode
  closeFolder: () => void
}

export const Folder: React.FC<FolderProps> = ({
  title,
  content,
  closeFolder,
}) => {
  return (
    <Draggable handle='.title-bar'>
      <div className='window w-[400px] z-[1] absolute top-10 left-10'>
        <div className='title-bar !h-7'>
          <div className='title-bar-text'>{title}</div>
          <div className='title-bar-controls'>
            {/* <button aria-label='Minimize'></button>
            <button aria-label='Maximize'></button> */}
            <button onClick={closeFolder} aria-label='Close'></button>
          </div>
        </div>
        <div className='window-body'>
          <p>{content}</p>
          {/* <button onClick={closeFolder}>Close</button> */}
        </div>
      </div>
    </Draggable>
  )
}
