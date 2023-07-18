'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import { Input, Typography, Button, ImagePreview, FileDetail } from '../components';
import { searchItems } from '../services/api';
import { useRouter, useSearchParams } from 'next/navigation'
import InfoImage from '../interfaces/InfoImage';
import { ImageSelected } from '@/interfaces/ImageSelected';
import SearchIcon from './../public/search-icon.svg'

export default function Home() {

  const params = useSearchParams()
  const router = useRouter()

  const [results, setResults] = useState<any[]>();
  const [totalHits, setTotalHits] = useState<number>();
  const [selected, setSelected] = useState<ImageSelected>()
  const [isLoading, setIsLoading] = useState(false); 
  const [isModalOpen, setIsModalOpen] = useState(false);

  const keyword = params.get("keyword")
  const yearStart = parseInt(params.get("yearStart") || '')
  const yearEnd = parseInt(params.get("yearEnd") || '')

  
  useEffect(() => {
    if(keyword){
      searchSearch(keyword?.toString(), yearStart || 0 , yearEnd || 0)
    }
  }, [])

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalOpen = (data: InfoImage, thumbnails: string, ) => {
    const newSelected = {data, thumbnails} as ImageSelected
    setSelected(newSelected)

    setIsModalOpen(true);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault()
    const keyword = event.target.elements.keyword.value;
    const yearStart = event.target.elements.yearStart.value == '' ? 0 : parseInt(event.target.elements.yearStart.value);
    const yearEnd = event.target.elements.yearEnd.value == '' ? 0 : parseInt(event.target.elements.yearEnd.value);

    searchSearch(keyword, yearStart, yearEnd)
    router.push(`?keyword=${keyword}&yearStart=${yearStart}&yearEnd=${yearEnd}`)

  };

  const searchSearch = (keyword: string, yearStart: number, yearEnd: number | undefined) => {
    setIsLoading(true);

    const options : { media_type:string, year_start?: number, year_end?: number } = { media_type: 'image', year_start: yearStart, year_end: yearEnd};

    if (yearStart === 0) {
      delete options.year_start;
    }
    if (yearEnd === 0) {
      delete options.year_end
    }

    searchItems(keyword, options)
      .then(response => {
        setResults(response.collection.items)
        setTotalHits(response.collection.metadata.total_hits)
        setIsLoading(false); // Set loading state to false after the API request
      })
      .catch(error => {
        console.error('An error occurred during the search:', error);
        setIsLoading(false); // Set loading state to false if an error occurs
      });
  }

  return (
    <main className="flex min-h-screen max-h-screen flex-col h-auto items-center bg-home fixed inset-0 bg-background bg-cover bg-no-repeat">
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
        <div className='hidden md:flex md:flex-col md:pb-4'>
          <Typography variant='bold1' align='center' className="py-4 text-transparent bg-clip-text bg-gradient-to-tr from-blue-400 via-purple-300 to-pink-400 bg-gradient-to-lt from-white-alpha-56 via-white-alpha-56 to-white bg-gradient-to-t">Find Something Amazing </Typography>
          <Typography variant='bold1' align='center' className='text-center text-white'>in our vast file library!</Typography>
        </div>
        <form className='flex flex-col gap-4 md:flex-row md:items-center ' onSubmit={handleSubmit} >

          <Input name='keyword' defaultValue={keyword?.toString()} required type="text" placeholder='Search' className='w-full md:w-80'/>
          <Input
              name='yearStart'
              defaultValue={yearStart || undefined}
              placeholder='Year Start'
              className='md:w-28' type={'text'} />

          <Input
              name='yearEnd'
              defaultValue={yearEnd || undefined}
              placeholder='Year End'
              className='md:w-28' type={'text'} />
        
          <Button 
            type="submit" 
            className='bg-transparent border flex flex-row border-gray-400 text-white rounded-full md:w-10 h-10 justify-center items-center hover:bg-white hover:border-white transition-all' 
            label={''}
            endAddornment={<SearchIcon className='m-auto w-4 h-4'/>} 
          >
          </Button>
        </form>
      
        {isLoading ? (
          <div className="flex justify-center items-center h-64 text-white">
            <div className="w-12 h-12 rounded-full animate-spin absolute border-2 border-solid border-indigo border-t-transparent"></div>
          </div>
        ) : results && results.length > 0 ? (
          <div className="pb-2 pt-12 px-24 align-start min-h-1/5 w-full">
            {results && results.length > 0 && (
              <div className="pb-2 pt-12 px-24 align-start min-h-1/5 w-full">
              <div className="flex flex-row justify-between border-b border-indigo " >
                <div className='flex flex-row'>
                  <Typography variant='regular2' className="text-primary text-white mr-2">Results for </Typography> 
                  <Typography variant='bold4' className='text-white'> &quot;{keyword}&quot;</Typography>
                </div>
                <Typography variant='light5' className="hidden text-primary text-white md:flex">About {totalHits} results</Typography>
              </div>

              <div className='flex flex-wrap gap-4 py-8 justify-center'>
                {results.map((result: {links: any[], data: InfoImage[]}) => (
                  <ImagePreview
                    key={result.data[0].nasa_id}
                    thumbnailUrl={result.links[0].href}
                    data={result.data[0]}
                    handleModalOpen={handleModalOpen}
                  />
                ))}
          </div>
        </div>
        )}
          </div>)
          : <></>
        }

        {keyword && !isLoading && results && (
            <div className="flex justify-center items-center h-64 text-white">
              <Typography variant='regular4'>No results found.</Typography>
            </div>
          
        )}
      
      </div>


        
        <FileDetail isOpen={isModalOpen} onClose={handleModalClose} selected={selected}/>
      </div>
    </main>
  )
}
