import Image from 'next/image'
import imageXp from '../../public/images/xpBackground.webp'
import { IconGrid } from '@/components/icon-grid/IconGrid'
import { BottomBar } from '@/components/bottom-bar/BottomBar'

// Home page.
// Has a background image of Windows XP.
// Showcases a grid of items that resemble the Windows XP desktop.
export default function Home() {
  return (
    <main className='relative min-h-screen min-w-full flex items-start justify-start'>
      <IconGrid />
      <BottomBar />
      <Image
        src={imageXp}
        alt='xp'
        layout='fill'
        objectFit='cover'
        quality={100}
        className='z-0'
      />
    </main>
  )
}
