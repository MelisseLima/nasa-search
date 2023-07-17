import Image from "next/image";
import Link from "next/link";

interface ImageNasaPreview {
    thumbnailUrl: string;
    nasaId: string;
    location: string;
}

export default function ImagePreview({ thumbnailUrl, nasaId, location } : ImageNasaPreview) {
  return (
    <div>
      <Link as={`/photo/${nasaId}`} href="/photo/[id]">
        <Image alt="" width={250} height={125} src={thumbnailUrl} />
        <div className="nasaId">{location} </div>
      </Link>
    </div>
  );
}