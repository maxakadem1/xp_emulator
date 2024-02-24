export const Folder: React.FC = () => {
  return (
    <div className='window w-[400px] z-[1]'>
      <div className='title-bar'>
        <div className='title-bar-text'>How Does This Work?</div>
        {/* <div className='title-bar-controls'>
          <button aria-label='Minimize'></button>
          <button aria-label='Maximize'></button>
          <button aria-label='Close'></button>
        </div> */}
      </div>
      <div className='window-body'>
        <p>Click the import button and import stuff.</p>
        <button>Close</button>
      </div>
    </div>
  )
}
