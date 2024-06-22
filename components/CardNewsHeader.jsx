import Image from "next/image";

export default function CardNewsHeader({image, title, uri}) {
  return (
    <>
      <div className="position-relative">
        <img className="img-fluid rounded-3" src={image} width={430} height={0}></img>
        <a href={"/posts/" + uri}><p className="bg-primary-custom rounded-start ps-2 position-absolute bottom-0 end-0 pe-4">{title}</p></a>
      </div>
    </>
  )
}