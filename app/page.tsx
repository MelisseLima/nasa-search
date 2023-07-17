'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import { Input, Typography, Button, ImagePreview } from '../components';
import { searchItems } from '../services/api';
import { useSearchParams } from 'next/navigation'
import InfoImage from '../interfaces/InfoImage';

export default function Home() {

  const params = useSearchParams()
  const [results, setResults] = useState([]);
  const keyword = params.get("keyword")
  const yearStart = params.get("yearStart")
  const yearEnd = params.get("yearEnd")

  
  useEffect(() => {
    if(keyword){
      searchSearch(keyword?.toString(), yearStart?.toString(), yearEnd?.toString())
    }
  }, [])
  
  const handleSubmit = async (event: any) => {
    const keyword = event.target.elements.keyword.value;
    const yearStart = event.target.elements.yearStart.value;
    const yearEnd = event.target.elements.yearEnd.value;

    searchSearch(keyword, yearStart, yearEnd)
  };

  const searchSearch = (keyword: string, yearStart: string | undefined, yearEnd: string | undefined) =>{
    searchItems(keyword, { media_type: 'image'})
    .then(response => {
      setResults(response.collection.items)
    })
    .catch(error => {
      console.error('An error occurred during the search:', error);
    });
  }

  return (
    <main className="flex min-h-screen flex-col h-auto items-center bg-home fixed inset-0 bg-background bg-cover bg-no-repeat">
      <div className='relative overflow-y-auto h-screen'>
        <div className='w-full py-16 min-h-4/5 gap-4 flex flex-col items-center'>
          <div className='flex flex-row'>
            <Image
              className="relative"
              src="/nasa-icon.svg"
              alt="Nasa Logo"
              width={90}
              height={17}
              priority
            />
            <Typography variant='medium1' className='text-white'>NASA Search</Typography>

          </div>
        <div className='flex flex-col pb-4'>
          <Typography variant='bold1' align='center' className="py-4 text-transparent bg-clip-text bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 bg-gradient-to-lt from-white-alpha-56 via-white-alpha-56 to-white bg-gradient-to-t">Find Something Amazing </Typography>
          <Typography variant='bold1' align='center' className='text-center text-white'>in our vast file library!</Typography>
        </div>
        <form className='flex flex-row gap-4 md:flex-row md:items-center' onSubmit={handleSubmit} >

          <Input name='keyword' defaultValue={keyword?.toString()} required type="text" placeholder='Search' className='w-96'/>
          <Input name='yearStart' defaultValue={yearStart?.toString()} type="text" placeholder='Year Start' className='w-25'/>
          <Input name='yearEnd' defaultValue={yearEnd?.toString()} type="text" placeholder='Year End' className='w-25'/>
        
          <Button type="submit" className='bg-white text-white rounded-full w-10 h-10 justify-center items-center' label={''}>
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
        {results && results.length > 0 && (
          <div className="pb-2 pt-12 px-24 align-start min-h-1/5 w-full">
          <div className="flex flex-row justify-between border-b border-indigo " >
            <div className='flex flex-row'>
              <Typography variant='regular4' className="text-primary text-white mr-2">Results for </Typography> 
              <Typography variant='bold4' className='text-white'> &quot;{keyword}&quot;</Typography>
            </div>
            <Typography variant='light5' className="text-primary text-white">About {results.length} results</Typography>
          </div>

          <div className='flex flex-wrap gap-3 py-8'>
            {results.map((result: {links: any[], data: InfoImage[]}) => (
              <ImagePreview
                key={result.data[0].nasa_id}
                thumbnailUrl={result.links[0].href}
                data={result.data[0]}
              />
            ))}
          </div>
        </div>
        )}
      </div>
    </main>
  )
}
