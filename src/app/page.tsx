'use client'

import Image from 'next/image'
import imageXp from '../../public/images/xpBackground.webp'
import { IconGrid } from '@/components/icon-grid/IconGrid'
import { BottomBar } from '@/components/bottom-bar/BottomBar'
import { Folder } from '@/components/folder/Folder'
import { Fragment, useState } from 'react'
import 'xp.css/dist/XP.css'

export default function Home() {
  // content for the tutorial folder
  const tutorialContent = `This website provides you with a way to showcase your bookmarks as a Windows XP-like interface.
  \nYou can import your bookmarks and they will be displayed as icons on the desktop.
  \nTo export bookmarks from your chrome, go to three dots on the left top of your chrome -> Bookmarks and Lists -> Bookmark Manager.`

  const [isTutorialVisible, setIsTutorialVisible] = useState(false)
  const [isGenericFolderVisible, setIsGenericFolderVisible] = useState(true) // Add this state

  const handleOpenTutorial = () => {
    setIsTutorialVisible(true)
  }

  const handleCloseTutorial = () => {
    setIsTutorialVisible(false)
  }

  const handleCloseGenericFolder = () => {
    setIsGenericFolderVisible(false) // Add this function
  }

  return (
    <main className='relative h-screen w-screen flex items-start justify-start overflow-hidden'>
      <IconGrid />

      {/* {isGenericFolderVisible && (
        <Folder
          closeFolder={handleCloseGenericFolder}
          title='Folder'
          content='some content here'
        />
      )} */}

      {/* Tutorial folder */}
      {isTutorialVisible && (
        <Folder
          closeFolder={handleCloseTutorial}
          title='How Does This Work'
          content={tutorialContent.split('\n').map((line, index) => (
            <Fragment key={index}>
              {line}
              <br />
            </Fragment>
          ))}
        />
      )}

      <BottomBar openTutorial={handleOpenTutorial} />
      <Image
        src={imageXp}
        alt='xp'
        layout='fill'
        objectFit='cover'
        quality={100}
        className='z-0 not-selectable'
        style={{
          userSelect: 'none',
          WebkitUserSelect: 'none',
          KhtmlUserSelect: 'none',
          MozUserSelect: 'none',
          pointerEvents: 'none',
        }}
      />
    </main>
  )
}
