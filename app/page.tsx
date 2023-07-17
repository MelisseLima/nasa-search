import Image from 'next/image'

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col h-auto items-center justify-center bg-gradient-to-r from-sky-500 to-indigo-500">
    <div className='pb-24 w-full min-h-4/5 gap-4 flex flex-col items-center justify-center'>
      <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/nasa-icon.svg"
          alt="Nasa Logo"
          width={90}
          height={17}
          priority
        />
      <div className='flex flex-col'>
        <h5 className='text-5xl font-bold text-white text-center'> Find Something Amazing </h5>
        <h3 className='text-5xl font-bold text-white text-center'> in our vast file library!</h3>
      </div>
      <form className='flex flex-row gap-4'>
        <input name='search' required type="text" placeholder='Search' className='leading-9 px-2 bg-transparent border border-gray-400 rounded-md w-96 text-white'/>
        <input name='year-start' type="text" placeholder='Year Start' className='leading-9 px-2 bg-transparent border border-gray-400 rounded-md w-24 text-white'/>
        <input name='year-end' type="text" placeholder='Year End' className='leading-9 px-2 bg-transparent border border-gray-400 rounded-md w-24 text-white'/>
        
        <button type="submit" className='bg-white rounded-full w-10 h-10 justify-center items-center'>
          <Image 
            src='/search-icon.svg'
            width={24}
            height={24}
            alt="Search Logo"
            className='m-auto'
            />
        </button>
      </form>
      
      
    </div>
    <div className='px-24 pt-12 align-start w-full min-h-1/5 border-t border-gray-400'>
      <h3 className='text-3xl font-bold text-white'>Results: </h3>

    </div>
    </main>
  )
}
