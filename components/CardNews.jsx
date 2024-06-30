import Image from "next/image";

export default function CardNewsHeader({image, title, uri}) {
  return (
    <>
      <div className="position-relative d-none d-lg-block">
        <img className="rounded-3" alt="Immagine post" src={image} width={630} height={350}></img>
        <a href={"/posts/" + uri}>
          <p className="bg-primary-custom rounded-start ps-2 position-absolute bottom-0 end-0 pe-4 d-none d-lg-block">{title}</p>
          <p className="fs-5 d-lg-none text-center bg-secondary-custom mt-1">{title}</p></a>
      </div>
      <div className="position-relative d-lg-none">
        <img className="rounded-3 img-fluid" alt="Immagine post" src={image} width={630} height={350}></img>
        <a href={"/posts/" + uri}>
          <p className="bg-primary-custom rounded-start ps-2 position-absolute bottom-0 end-0 pe-4 d-none d-lg-block">{title}</p>
          <p className="fs-5 d-lg-none text-center bg-secondary-custom mt-1">{title}</p></a>
      </div>
    </>
  )
}