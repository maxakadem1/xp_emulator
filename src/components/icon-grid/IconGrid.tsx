'use client'

import React, { useEffect, useState } from 'react'
import { Icon } from '../icon/Icon'

const icons = [
  {
    name: 'Internet Explorer',
    iconImage: '/icons/trash.ico',
    link: 'https://www.example.com',
  },
  {
    name: 'Internet Expsloresr',
    iconImage: '/icons/trash.ico',
    link: 'https://www.example.com',
  },
]

export const IconGrid: React.FC = () => {
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null)
  const [lastClick, setLastClick] = useState<{
    name: string
    time: number
  } | null>(null)

  useEffect(() => {
    const handleOutsideClick = () => {
      setSelectedIcon(null)
    }

    document.addEventListener('mousedown', handleOutsideClick)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [])

  const handleIconClick = (
    event: React.MouseEvent<HTMLDivElement>,
    name: string,
    link: string
  ) => {
    event.stopPropagation()

    const now = Date.now()
    if (lastClick && name === lastClick.name && now - lastClick.time < 300) {
      // Treat as double-click
      window.open(link, '_blank')
      setSelectedIcon(null) // Optionally reset or leave selected
    } else {
      // Update lastClick with the current click info
      setLastClick({ name, time: now })
      // Treat as single click
      setSelectedIcon(name)
    }
  }

  return (
    <div className='grid grid-cols-4 gap-4 z-[1] p-8'>
      {icons.map((icon) => (
        <Icon
          key={icon.name}
          name={icon.name}
          iconImage={icon.iconImage}
          isSelected={icon.name === selectedIcon}
          onClick={(e) => handleIconClick(e, icon.name, icon.link)}
        />
      ))}
    </div>
  )
}
