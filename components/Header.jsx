"use client"
import { useEffect } from "react"
import Image from "next/image.js";

function Header({ isPage }) {
  useEffect(() => {
    require("../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
        <div className="container">
          <a className="navbar-brand" href="/">
            <Image src="/header-images/logo.webp" width={32} height={25} alt="Logo di XDefiant Italia" />
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className={isPage == "home" ? "nav-link active" : "nav-link"} aria-current="page" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className={isPage == "about" ? "nav-link active" : "nav-link"} href="/about">Chi siamo</a>
              </li>
              <li className="nav-item">
                <a className={isPage == "news" ? "nav-link active" : "nav-link"} href="#">News</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Discord</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;