"use client"
import { useEffect, useState } from "react"
import Image from "next/image.js";
import { deleteCookie, getCookie } from "cookies-next";
import "./Header.css";
import { useRouter } from "next/navigation.js";

export default function Header({ isPage }) {
  const [adminLevel, setAdminLevel] = useState(0);
  const [username, setUsername] = useState("");
  getData().then((value) => {
    if(value) {
      setAdminLevel(value.admin_level);
      if(value.admin_level > 0) {
        setUsername(value.username);
      }
    }
  });
  useEffect(() => {
    require("../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  const router = useRouter();

  function logout() {
    deleteCookie("email");
    deleteCookie("authToken");
  }

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
            <nav aria-label="principale" className="d-block d-flex w-100">
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
              </ul>
              <div className="align-lg-self-center align-self-end mb-2 mb-lg-0">
                {adminLevel == 0 ? <button onClick={() => router.push("/admin/login")} className="login">
                  <i className="bi bi-person-circle"></i> Login
                </button> : ""}
                {adminLevel > 0 ? 
                <div className="dropdown">
                  <button className="login dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <i className="bi bi-person-circle"></i> {username}
                  </button>
                  <ul className="dropdown-menu">
                    {adminLevel >= 2 ? <li><a className="dropdown-item" href="/admin/newpost">Pubblica nuovo articolo</a></li> : ""}
                    {adminLevel >= 3 ? <li><a className="dropdown-item" href="/admin/approvepost">Gestione articoli</a></li> : ""}
                    {adminLevel >= 4 ? <li><a className="dropdown-item" href="/admin/admin-logs">Audit Logs</a></li> : ""}
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item" href="" onClick={logout}>Logout</a></li>
                  </ul>
                </div> : ""}
              </div>
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
  if (!auth && !email) return 0;
  const res = await fetch(`/api/adminCheck?email=${email}&authToken=${auth}`, { next: { revalidate: 1 } });

  if (res.status === 200) {
    const { admin_level, username } = await res.json();
    if(admin_level) {
      return {admin_level, username};
    }
    else {
      return null;
    }

  } else {
    return 0;
  }
}