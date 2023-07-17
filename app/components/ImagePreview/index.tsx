import Image from "next/image";
import Link from "next/link";
import Typography from "../Typography";
import InfoImage from "@/app/interfaces/InfoImage";

interface ImageNasaPreview {
    thumbnailUrl: string;
    data: InfoImage
}

export default function ImagePreview({ thumbnailUrl, data } : ImageNasaPreview) {
  return (
    <div className="py-4 grid grid-cols-3">
      <Link as={`/photo/${data.nasa_id}`} href="/photo/[id]">
        <Image alt="" width={250} height={125} src={thumbnailUrl} className="rounded-md"/>
        <div className="nasaId text-white flex flex-col">
          <Typography variant="regular5" className="pt-2">{data.title}</Typography>
          <Typography variant="light5" className="text-gray-300">{data.location}</Typography>
          <Typography variant="light5" className="text-gray-300">By: {data.photographer}</Typography>
        </div>
      </Link>
    </div>
  );
}