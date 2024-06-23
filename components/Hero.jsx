"use client"
import Image from "next/image.js";
import "./Hero.css";

function Hero() {
  return (
    <div id="heroComponents" className="hero d-flex flex-column justify-content-center align-items-center">
      <Image src="/hero-images/logo.webp" alt="Logo XDefiant Italia" className="img-fluid d-none d-lg-block" width={467} height={131}></Image>
      <Image src="/hero-images/logo.webp" alt="Logo XDefiant Italia" className="img-fluid d-lg-none" width={300} height={131}></Image>
    </div>
  );
}

export default Hero;