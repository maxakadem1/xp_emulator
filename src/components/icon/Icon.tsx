'use client'

import React, { useCallback, useState } from 'react'

interface IconProps {
  name: string
  iconImage?: string
  isSelected: boolean
  // Update the onClick type to accept a React.MouseEvent argument
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void
}

export const Icon: React.FC<IconProps> = ({
  name,
  iconImage,
  isSelected,
  onClick,
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center w-20 h-20 cursor-pointer ${
        isSelected ? 'bg-blue-600' : 'bg-transparent'
      }`}
      // Pass the event to the onClick handler
      onClick={(e) => onClick(e)}
    >
      <img src={iconImage} alt={name} className='w-12 h-12' />
      <span className='text-xs text-center text-white'>{name}</span>
    </div>
  )
}
