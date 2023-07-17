import Image from "next/image";
import Typography from "../Typography";
import InfoImage from "@/interfaces/InfoImage";

import './styles.css'

interface ImageNasaPreview {
    thumbnailUrl: string;
    data: InfoImage | null
    handleModalOpen: (data: any, thumbnailsURL: any) => void
}

export default function ImagePreview({ thumbnailUrl, data, handleModalOpen } : ImageNasaPreview) {

  const handleClick = () => {
    handleModalOpen(data, thumbnailUrl)
    console.log(data)
  }
  return (
    <div className="py-4 hover:scale-105 transition-all cursor-pointer">
      <div onClick={handleClick}>
        {data && (
          <>
          <div className="image-container">
            <Image alt="" layout='fill' objectFit="cover" src={thumbnailUrl} className="rounded-md"/>
          </div>
          
          <div className="nasaId text-white flex flex-col">
            <Typography variant="regular5" className="pt-2 break-word w-[250px]">{data.title}</Typography>
            <Typography variant="light5" className="text-gray-300">{data.location}</Typography>
            <Typography variant="light5" className="text-gray-300">By: {data.photographer || 'Unknown'}</Typography>
          </div>
        </>
        )}
      </div>
    </div>
  );
}