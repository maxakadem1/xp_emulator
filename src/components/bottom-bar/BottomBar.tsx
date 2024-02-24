'use client'
import React, { useRef, useState } from 'react'
import 'xp.css/dist/XP.css'

export const BottomBar: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [fileName, setFileName] = useState<string | null>(null) // State to store the file name
  const [bookmarks, setBookmarks] = useState<
    Array<{ title: string; url: string; icon: string }>
  >([]) // State to store bookmarks

  const handleImportClick = () => {
    fileInputRef.current?.click()
  }

  const extractBookmarks = (html: string) => {
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, 'text/html')
    const links = doc.querySelectorAll('a')
    const bookmarks = Array.from(links).map((link) => ({
      title: link.textContent || 'No Title',
      url: link.getAttribute('href') || '#',
      icon: link.getAttribute('icon') || '',
    }))
    // Save bookmarks to local storage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && files.length > 0) {
      const file = files[0]
      setFileName(file.name) // Update state with the file name

      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        extractBookmarks(content)
      }
      reader.readAsText(file)

      // Reset the input value
      event.target.value = ''
    }
  }

  return (
    <div className='fixed bottom-0 w-full flex items-center justify-center z-[100] title-bar !h-8 !rounded-none'>
      <button onClick={handleImportClick}>Import Bookmarks!</button>
      {/* Display the file name if available */}
      {fileName && <span className='text-white text-sm ml-4'>{fileName}</span>}
      <input
        type='file'
        ref={fileInputRef}
        style={{ display: 'none' }}
        accept='.html'
        onChange={handleFileChange}
      />
      <div className='bookmarks-container'>
        {bookmarks.map((bookmark, index) => (
          <div key={index} className='bookmark'>
            <img src={bookmark.icon} alt='' width='16' height='16' />
            <a href={bookmark.url} target='_blank' rel='noopener noreferrer'>
              {bookmark.title}
            </a>
          </div>
        ))}
      </div>
      <span className='text-white text-sm ml-auto pr-4'>
        Made by Maxim Abdulkhalikov, 2024. Tech used: NextJS and xp.css library.
      </span>
    </div>
  )
}
