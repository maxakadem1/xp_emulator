'use client'

import React, { useEffect, useState } from 'react'
import { Icon } from '../icon/Icon'

export const IconGrid: React.FC = () => {
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null)
  const [expandedTitles, setExpandedTitles] = useState<Record<string, boolean>>(
    {}
  )
  const [bookmarks, setBookmarks] = useState<
    Array<{ title: string; url: string; icon: string }>
  >([])
  const [lastClickInfo, setLastClickInfo] = useState<{
    title: string
    time: number
  } | null>(null)

  useEffect(() => {
    const bookmarksData = localStorage.getItem('bookmarks')
    if (bookmarksData) {
      setBookmarks(JSON.parse(bookmarksData))
    }

    const handleOutsideClick = () => {
      if (selectedIcon) {
        setExpandedTitles((prev) => ({ ...prev, [selectedIcon]: false }))
        setSelectedIcon(null)
      }
    }
    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [selectedIcon])

  const handleIconClick = (
    event: React.MouseEvent<HTMLDivElement>,
    title: string,
    url: string
  ) => {
    event.stopPropagation()
    const now = Date.now()

    // Check for double-click
    if (
      lastClickInfo &&
      title === lastClickInfo.title &&
      now - lastClickInfo.time < 300
    ) {
      window.open(url, '_blank') // Open the URL on double-click
      setLastClickInfo(null) // Reset last click info
    } else {
      // Handle as single click: set or toggle expansion
      const isExpanded = !!(selectedIcon === title && expandedTitles[title])
      if (selectedIcon !== title) {
        if (selectedIcon) {
          setExpandedTitles((prev) => ({ ...prev, [selectedIcon]: false }))
        }
        setSelectedIcon(title)
        setExpandedTitles((prev) => ({ ...prev, [title]: true }))
      } else {
        setExpandedTitles((prev) => ({ ...prev, [title]: !isExpanded }))
      }
      setLastClickInfo({ title, time: now }) // Update last click info for double-click detection
    }
  }

  const handleTrashClick = () => {
    // Clear bookmarks from state and local storage
    setBookmarks([])
    localStorage.removeItem('bookmarks')
  }

  return (
    <div className='grid grid-cols-12 gap-2 z-[1] p-8'>
      {bookmarks.map((bookmark) => (
        <Icon
          key={bookmark.title}
          name={
            expandedTitles[bookmark.title]
              ? bookmark.title
              : bookmark.title.length > 10
              ? bookmark.title.substring(0, 10) + '...'
              : bookmark.title
          }
          iconImage={bookmark.icon || '/icons/default.ico'}
          isSelected={bookmark.title === selectedIcon}
          onClick={(e) => handleIconClick(e, bookmark.title, bookmark.url)}
        />
      ))}
      {/* Trash Icon */}
      <Icon
        key='Trash'
        name='Trash'
        iconImage='/icons/trash.ico'
        isSelected={false}
        onClick={handleTrashClick}
      />
    </div>
  )
}
