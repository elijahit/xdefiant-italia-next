"use client"
import { useEffect, useState } from "react"
import Image from "next/image.js";
import { getCookie } from "cookies-next";

export default function Header({ isPage }) {
  const [adminLevel, setAdminLevel] = useState(0);
  getData().then((value) => {
    setAdminLevel(value);
  });
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
            <nav aria-label="principale">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className={isPage == "home" ? "nav-link active" : "nav-link"} aria-current="page" href="/">Home</a>
                </li>
                <li className="nav-item">
                  <a className={isPage == "news" ? "nav-link active" : "nav-link"} href="/news">News</a>
                </li>
                <li className="nav-item">
                  <a className={isPage == "discord" ? "nav-link active" : "nav-link"} href="/discord">Discord</a>
                </li>
                {adminLevel > 0 ? 
                  <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    ACP
                  </a>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="/admin/newpost"><i className="bi bi-file-post"></i> Aggiungi Articolo</a></li>
                    {adminLevel >= 3 ? 
                    <li><a className="dropdown-item" href="/admin/approvepost"><i className="bi bi-file-earmark-post"></i> Approva Articoli</a></li> : ""}
                  </ul>
                </li>
                : ""}
              </ul>
            </nav>
          </div>
        </div>
      </nav>
    </header>
  );
}

export async function getData() {
  // Esegui una richiesta API lato server
  const email = getCookie("email");
  const auth = getCookie("authToken");
  if(!auth && !email) return 0;
  const res = await fetch(`https://playxdefiant.it/api/adminCheck?email=${email}&authToken=${auth}`);

  if (res.status === 200) {
    const { admin_level } = await res.json();
    return admin_level ? admin_level : 0;

  } else {
    return 0;
  }
}