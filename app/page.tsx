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

  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState<ImageSelected>()
  const [isLoading, setIsLoading] = useState(false); 
  const [isModalOpen, setIsModalOpen] = useState(false);

  const keyword = params.get("keyword")
  const yearStart = params.get("yearStart")
  const yearEnd = params.get("yearEnd")

  
  useEffect(() => {
    if(keyword){
      searchSearch(keyword?.toString(), yearStart?.toString(), yearEnd?.toString())
    }
  }, [])

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalOpen = (data: InfoImage, thumbnails: string) => {
    const newSelected = {data, thumbnails} as ImageSelected
    setSelected(newSelected)

    setIsModalOpen(true);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault()
    const keyword = event.target.elements.keyword.value;
    const yearStart = event.target.elements.yearStart.value;
    const yearEnd = event.target.elements.yearEnd.value;

    searchSearch(keyword, yearStart, yearEnd)
    router.push(`?keyword=${keyword}&yearStart=${yearStart}&yearEnd=${yearEnd}`)

  };

  const searchSearch = (keyword: string, yearStart: string | undefined, yearEnd: string | undefined) => {
    setIsLoading(true);

    searchItems(keyword, { media_type: 'image' })
      .then(response => {
        setResults(response.collection.items)
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
        <div className='flex flex-col pb-4'>
          <Typography variant='bold1' align='center' className="py-4 text-transparent bg-clip-text bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 bg-gradient-to-lt from-white-alpha-56 via-white-alpha-56 to-white bg-gradient-to-t">Find Something Amazing </Typography>
          <Typography variant='bold1' align='center' className='text-center text-white'>in our vast file library!</Typography>
        </div>
        <form className='flex flex-row gap-4 md:flex-row md:items-center' onSubmit={handleSubmit} >

          <Input name='keyword' defaultValue={keyword?.toString()} required type="text" placeholder='Search' className='w-80'/>
          <Input
              name='yearStart'
              value={yearStart || undefined}
              placeholder='Year Start'
              className='w-28' type={'text'} />

          <Input
              name='yearEnd'
              value={yearEnd || undefined}
              placeholder='Year End'
              className='w-28' type={'text'} />
        
          <Button 
            type="submit" 
            className='bg-transparent border border-gray-400 text-white rounded-full w-10 h-10 justify-center items-center hover:border-white transition-all' 
            label={''}
            endAddornment={<SearchIcon className='m-auto w-4 h-4'/>} 
          />
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
                <Typography variant='light5' className="text-primary text-white">About {results.length} results</Typography>
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
          </div>
        ) : (
          <div className="flex justify-center items-center h-64 text-white">
            <Typography>No results found.</Typography>
          </div>
        )}
      
      </div>


        
        <FileDetail isOpen={isModalOpen} onClose={handleModalClose} selected={selected}/>
      </div>
    </main>
  )
}
