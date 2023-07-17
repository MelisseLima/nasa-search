'use client'
import Image from 'next/image'
import { useState } from 'react';
import { Input, Typography, Button, ImagePreview } from './components';
import { searchItems, getItems } from './services/api';
import { useSearchParams } from 'next/navigation'

export default function Home() {

  const params = useSearchParams()
  const [results, setResults] = useState([]);
  const [keyword, ] = useState(params.get("keyword"))
  const [yearStart,] = useState(params.get("yearStart"))
  const [yearEnd, ] = useState(params.get("yearEnd"))

  

  
  const handleSubmit = async (event: any) => {
    const keyword = event.target.elements.keyword.value;
    const yearStart = event.target.elements.yearStart.value;
    const yearEnd = event.target.elements.yearEnd.value;

    searchItems(keyword, { media_type: 'image'})
    .then(response => {
      setResults(response.collection.items)
    })
    .catch(error => {
      console.error('An error occurred during the search:', error);
    });

  };

  return (
    <main className="flex min-h-screen flex-col h-auto items-center  bg-home bg-cover bg-reapeat">
    <div className='w-full py-16 min-h-4/5 gap-4 flex flex-col items-center'>
      <div className='flex flex-row '>
        <Image
          className="relative "
          src="/nasa-icon.svg"
          alt="Nasa Logo"
          width={90}
          height={17}
          priority
        />
        <Typography variant='medium1'>NASA Search</Typography>

      </div>
      <div className='flex flex-col pb-4'>
        <Typography variant='bold1' align='center' className="py-4 text-transparent bg-clip-text bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 bg-gradient-to-lt from-white-alpha-56 via-white-alpha-56 to-white bg-gradient-to-t">Find Something Amazing </Typography>
        <Typography variant='bold1' align='center' className='text-center'>in our vast file library!</Typography>
      </div>
      <form className='flex flex-row gap-4' onSubmit={handleSubmit} >

        <Input name='keyword' defaultValue={keyword?.toString()} required type="text" placeholder='Search' className='w-96'/>
        <Input name='yearStart' defaultValue={yearStart?.toString()} type="text" placeholder='Year Start' className='leading-9 px-2 bg-transparent border border-gray-400 rounded-full w-24 text-white outline-none focus:ring-0'/>
        <Input name='yearEnd' defaultValue={yearEnd?.toString()} type="text" placeholder='Year End' className='leading-9 px-2 bg-transparent border border-gray-400 rounded-full w-24 text-white outline-none focus:ring-0'/>
       
        <Button type="submit" className='bg-white rounded-full w-10 h-10 justify-center items-center' label={''}>
          <Image 
            src='/search-icon.svg'
            width={24}
            height={24}
            alt="Search Logo"
            className='m-auto'
            />
        </Button>
      </form>
      
      
    </div>
    <div className="pb-2 pt-12 px-24 align-start min-h-1/5 w-full">
      <div className="flex flex-row justify-between border-b border-indigo " >
        <Typography variant='medium3' className="text-primary">Results for </Typography>
        <Typography variant='light5' className="text-primary">About 10,600,000 results</Typography>
      </div>

      {/* Display the search results */}
      <div>
          {results.map((result) => (
            <ImagePreview
              key={result.data[0].nasa_id}
              thumbnailUrl={result.links[0].href}
              nasaId={result.data[0].nasa_id}
              location={result.data[0].title}
            />
          ))}
        </div>
    </div>
    </main>
  )
}
