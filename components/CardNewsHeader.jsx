import Image from "next/image";

export default function CardNewsHeader({image, title, uri}) {
  return (
    <>
      <div className="position-relative">
        <img className="img-fluid rounded-3" alt="Immagine post" src={image} width={630} height={0}></img>
        <a href={"/posts/" + uri}>
          <p className="bg-primary-custom rounded-start ps-2 position-absolute bottom-0 end-0 pe-4 d-none d-lg-block">{title}</p>
          <p className="fs-5 d-lg-none text-center bg-secondary-custom mt-1">{title}</p></a>
      </div>
    </>
  )
}