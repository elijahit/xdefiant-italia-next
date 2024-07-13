"use client"
import styles from "./page.module.css";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import Hero from "../../../components/Hero";
import { useEffect, useState } from "react";
import CardNewsHeaderV2 from "../../../components/CardNewsV2";
import Image from "next/image";
import { redirect } from "next/dist/server/api-utils";

export default function Stats(params) {
  const schemaSite = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "url": "https://playxdefiant.it/news",
    "image": '/header-images/logo.webp',
    "name": "XDefiant Italia - Tracker",
    "description": "Tracker ufficiale di XDefiant Italia per vedere l'andamento del proprio account su XDefiant",
    "isPartOf": {
      "@type": "WebSite",
      "url": "https://playxdefiant.it",
      "name": "XDefiant Italia"
    },
    "publisher": {
      '@type': 'Organization',
      'name': 'XDefiant Italia',
      'logo': '/header-images/logo.webp',
      'keywords': 'xdefiant italia, xdefiant, news xdefiant italia, news, tornei, community, discord',
      'founder': [{
        '@type': 'Person',
        'name': 'Gabriele Mario Tosto',
        'description': 'CEO e Developer di XDefiant Italia, lavora attualmente come sviluppatore attivo.',
        'jobTitle': 'Software Engineer',
        'givenName': 'Gabriele',
        'email': 'gabriele.tosto@outlook.com'
      }]
    }
  }
  const [platform, setPlatform] = useState(0);
  const [username, setUsername] = useState("");
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(1);
  const [error, setError] = useState("");
  const [timeOut, setTimeOut] = useState(0);
  const [submitClick, setSubmitClick] = useState(0);

  function platformHandling(e, p) {
    setPlatform(p);
  }

  useEffect(() => {
    getData().then(value => {
      setNews(value);
    });
    if (params.searchParams.error) {
      setError(1);
    }
    setLoading(0);
  }, [])

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitClick(submitClick+1);
    if (timeOut == 0) {
      fetch(`/api/statsGetUsers?username=${username}&platform=${platform == 0 ? "uplay" : platform == 1 ? "psn" : platform == 2 ? "xbl" : ""}`).then(response => response.json())
      .then(value => {
        if (value.error) {
          setError(value.error);
        } else {
          window.location.href = `${value.url}`
        }
      })
      setTimeOut(1);
      setTimeout(() => {
        setTimeOut(0);
      }, 60000);
    }
  }

  return (
    <>
      {/* HEADER */}
      <Header isPage="tracker"></Header>
      <main>
        <h1 className="d-none">XDEFIANT ITALIA TRACKER</h1>
        {/* HERO SECTION */}
        <Hero />
        {/* FIRST SECTION */}
        {loading == 0 ? (
          <><h1 className="fs-4 text-center mt-3 mb-3">XDEFIANT ITALIA TRACKER</h1><form onSubmit={(e) => handleSubmit(e)} action={"/api/statsGetUsers"} method="get">
            <div className="container mb-3">
              <div className="row g-3 justify-content-center align-items-center">
                <div className={"col-auto d-flex gap-2 rounded-start-3 " + styles.searchbackground}>
                  <div onClick={(e) => platformHandling(e, 0)} className={platform == 0 ? styles.btnCustomActive : styles.btnCustom}><i className="bi bi-pc"></i></div>
                  <div onClick={(e) => platformHandling(e, 1)} className={platform == 1 ? styles.btnCustomActive : styles.btnCustom}><i className="bi bi-playstation"></i></div>
                  <div onClick={(e) => platformHandling(e, 2)} className={platform == 2 ? styles.btnCustomActive : styles.btnCustom}><i className="bi bi-xbox"></i></div>
                </div>
                <div className="col-auto p-0">
                  <div className="input-group">
                    <input onChange={(e) => setUsername(e.target.value)} type="text" id="inputAccountSearch" name="username" className="form-control rounded-0" placeholder={platform == 0 ? "UBISOFT ID" : platform == 1 ? "PSN ID" : platform == 2 ? "XBOX ID" : ""} />
                    <button type="submit" className="input-group-text rounded-end-4"><i className="bi bi-search"></i></button>
                    <input className="d-none" type="text" name="platform" />
                  </div>
                </div>
              </div>
              {error.length > 0 ? <p className="text-center text-danger">{error}</p> : ""}
            </div>
          </form><div className="container d-flex flex-column align-items-center">
              <svg className="mb-2" xmlns="http://www.w3.org/2000/svg" width="494" height="1" viewBox="0 0 494 1" fill="none">
                <line y1="0.5" x2="494" y2="0.5" stroke="#DCC600"></line>
              </svg>
              <h2 className="fs-4 mb-5">LE TUE STATS A PORTATA DI CLICK</h2>
            </div><div className="flex-column flex-lg-row d-flex gap-5 justify-content-center align-items-center mb-3 mb-5">
              {news != null ? news.map((object, i) => <CardNewsHeaderV2 key={i} image={object.image_url} title={object.titolo.length > 49 ? object.titolo.slice(0, 49) + "..." : object.titolo} uri={object.uri_article} />) : ""}
            </div><div className="container">
              <p className="fs-5 text-center">Benvenuto nel tracker ufficiale di XDefiant Italia! Questo è il tuo punto di riferimento per monitorare tutte le tue statistiche di gioco in XDefiant. Che tu sia un veterano della serie o un nuovo giocatore, qui troverai tutte le informazioni necessarie per analizzare le tue prestazioni, confrontarti con altri giocatori e migliorare le tue abilità. Scopri il numero di vittorie, le tue percentuali di precisione, i tuoi punteggi migliori e molto altro ancora. Con il nostro tracker, avrai sempre sotto controllo la tua evoluzione nel gioco. Unisciti alla community di XDefiant Italia e porta il tuo gioco al livello successivo!</p>
            </div>
            <section className="mb-5">
              <div className="d-none d-lg-block">
                <a href="https://discord.com/servers/xdefiant-italia-1124809941744619602" target="_blank"><Image src={"/home-images/discordbanner.png"} alt="Banner discord" className="img-fluid" width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto' }}></Image> </a>
              </div>

              <div className="d-block d-lg-none">
                <a href="https://discord.com/servers/xdefiant-italia-1124809941744619602" target="_blank"><Image src={"/home-images/discordbannerMobile.png"} alt="Banner discord" className="img-fluid" width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto' }}></Image> </a>
              </div>
            </section>
          </>
        ) :
          <div className="d-flex justify-content-center mt-5"><div className="spinner-border text-warning" role="status">
            <span className="visually-hidden">Loading...</span>
          </div></div>}
      </main>
      {/* FOOTER */}
      <Footer />
      <script
        id="page-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaSite),
        }}
      />
    </>
  );
}


async function getData() {
  try {
    const res = await fetch(`/api/postNews?limit=2`, { next: { revalidate: 1 } });

    return await res.json();
  } catch (error) {
    console.log(error)
  }
}