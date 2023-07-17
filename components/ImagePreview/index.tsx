import Image from "next/image";
import Link from "next/link";
import Typography from "../Typography";
import InfoImage from "@/interfaces/InfoImage";

import './styles.css'

interface ImageNasaPreview {
    thumbnailUrl: string;
    data: InfoImage
}

export default function ImagePreview({ thumbnailUrl, data } : ImageNasaPreview) {
  return (
    <div className="py-4">
      <Link as={`/photo/${data.nasa_id}`} href="/photo/[id]">
        <div className="image-container">
          <Image alt="" layout='fill' objectFit="cover" src={thumbnailUrl} className="rounded-md"/>
        </div>
        
        <div className="nasaId text-white flex flex-col">
          <Typography variant="regular5" className="pt-2">{data.title}</Typography>
          <Typography variant="light5" className="text-gray-300">{data.location}</Typography>
          <Typography variant="light5" className="text-gray-300">By: {data.photographer}</Typography>
        </div>
      </Link>
    </div>
  );
}