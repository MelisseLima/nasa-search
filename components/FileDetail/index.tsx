import { Dialog, Transition } from '@headlessui/react';
import React, { HTMLAttributes, PropsWithChildren } from 'react';
import Typography from '../Typography';
import { ImageSelected } from '@/interfaces/ImageSelected';
import Button from '../Button';
import Image from 'next/image'

interface IFileDetail extends PropsWithChildren<HTMLAttributes<HTMLButtonElement>> {
  selected: ImageSelected | undefined
  isOpen: boolean;
  onClose: () => void;
}

export default function FileDetail({ isOpen, children, selected, onClose }: IFileDetail) {

  const date = selected ? new Date(selected?.data?.date_created?.toString()) : '';

  const formattedDate = date instanceof Date ? date.toLocaleDateString() : '';

  return (
    <Dialog
      as="div"
      className="fixed inset-0 z-50 overflow-y-auto"
      open={isOpen}
      onClose={onClose}
    >
      <div className="flex items-center justify-center h-screen w-screen">
        {selected?.data && (
          <div className="bg-indigo text-white shadow-xl h-screen w-screen">
            <div className="w-full border-b border-indigo">
              <div className="justify-between flex w-full py-4">
                <div className="flex flex-col pl-4">
                  <Typography variant="regular3">{selected.data.title}</Typography>
                  <Typography variant="light5" className="text-gray-300">By: {selected.data.photographer || 'Unknown'} | Location: {selected.data.location} </Typography>
                </div>
                <Button type="submit" className="bg-transparent text-white px-4 justify-center items-center border-l border-indigo" label={''}>
                  <Image 
                    src="/close-icon.svg"
                    width={16}
                    height={16}
                    alt="Search Logo"
                    className="m-auto"
                  />
                </Button>
              </div>
            </div>
            <div id='container-info' className="overflow-y-auto ">
              <div className="relative h-[60vh] w-[70vw] m-auto mt-4">
                <Image alt="" layout='fill' objectFit="cover" src={selected.thumbnails} className="rounded-md"/>
              </div>
              <div className='w-[70vw] m-auto mt-4 border-b border-indigo'>
                <Typography variant='regular3'>Information</Typography>
              </div>
              <div className='w-[70vw] m-auto mt-4 border-b border-indigo justify-between flex'>
                <Typography variant='regular5' className='text-gray-300'>Created By</Typography>
                <Typography variant='regular5' >{selected.data.photographer}</Typography>
              </div>
              <div className='w-[70vw] m-auto mt-4 border-b border-indigo justify-between flex'>
                <Typography variant='regular5' className='text-gray-300'>Date created</Typography>
                <Typography variant='regular5' >{formattedDate || 'Unknown'}</Typography>
              </div>
              <div className='w-[70vw] m-auto mt-4 flex flex-col'>
                <Typography variant='light4'>Description</Typography>
                <Typography variant='light5'>{selected.data.description}</Typography>
              </div>
            </div>
          </div>
        )}
      </div>
    </Dialog>
  );
};