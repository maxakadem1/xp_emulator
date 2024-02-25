'use client'

import React, { useState } from 'react'
import Draggable from 'react-draggable'

interface IconProps {
  name: string
  iconImage?: string
  isSelected: boolean
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void
}

export const Icon: React.FC<IconProps> = ({
  name,
  iconImage,
  isSelected,
  onClick,
}) => {
  // State to determine if the element is being dragged
  const [isDragging, setIsDragging] = useState(false)

  // Enhanced click handler to prevent onClick action when dragging
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) {
      onClick(e)
    }
    setIsDragging(false) // Reset drag state after click action
  }

  return (
    <Draggable
      onStart={() => setIsDragging(true)}
      onStop={() => setIsDragging(false)}
    >
      <div
        className={`flex flex-col items-center justify-center w-20 h-20 cursor-pointer gap-2`}
        onClick={handleClick}
      >
        <img
          style={{
            userSelect: 'none',
            WebkitUserSelect: 'none',
            KhtmlUserSelect: 'none',
            MozUserSelect: 'none',
            pointerEvents: 'none',
          }}
          src={iconImage}
          alt={name}
          className='w-7 h-7'
        />
        <span
          className={`text-xs text-center text-white ${
            isSelected ? 'bg-blue-600' : 'bg-transparent'
          }`}
        >
          {name}
        </span>
      </div>
    </Draggable>
  )
}
