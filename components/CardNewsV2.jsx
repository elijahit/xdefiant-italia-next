import Image from "next/image";
import "./CardNewsV2.css";

export default function CardNewsHeaderV2({ image, title, uri }) {
  return (
    <>
      <div className="imgContainer d-none d-lg-block">
        <div className="position-relative d-none d-lg-block">
          <a href={"/posts/" + uri}>
            <Image className="rounded-3" alt="Immagine post" src={image} width={630} height={350} unoptimized ></Image>
            <p className="bg-primary-custom rounded-start ps-2 position-absolute bottom-0 end-0 pe-4 d-none d-lg-block">{title}</p>
            <p className="fs-5 d-lg-none text-center bg-secondary-custom mt-1">{title}</p></a>
        </div>
      </div>
      <div className="position-relative d-lg-none">
        <a href={"/posts/" + uri}>
          <Image className="rounded-3 img-fluid" alt="Immagine post" src={image} width={630} height={350} unoptimized ></Image>
          <p className="bg-primary-custom rounded-start ps-2 position-absolute bottom-0 end-0 pe-4 d-none d-lg-block">{title}</p>
          <p className="fs-5 d-lg-none text-center bg-secondary-custom mt-1">{title}</p></a>
      </div>
    </>
  )
}