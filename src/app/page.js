import styles from "./page.module.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Hero from "../../components/Hero";
import Image from "next/image";
import CardNewsHeader from "../../components/CardNews"
import { notFound } from "next/navigation";

export default async function Home() {
  const postData = await getData();
  const schemaSite = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "url": "https://playxdefiant.it",
    "image": '/header-images/logo.webp',
    "name": "XDefiant Italia - Community",
    "description": "Community italiana di XDefiant dal 2021. Su discord aggiorniamo i giocatori su novità, eventi e competizioni. Unisciti a noi per condividere esperienze, strategie e partecipare a tornei.",
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

  return (
    <>
      {/* HEADER */}
      <Header isPage="home"></Header>
      <main>
        {/* HERO SECTION */}
        <Hero />
        {/* FIRST SECTION */}
        <section className="mt-5">
          <h1 className="d-none">XDefiant Italia</h1>
          <div className="container">
            <p className="text-center mb-5 fs-4">
              Siamo la community italiana di XDefiant online e su discord, attiva dal 2021, dedicata a tenere i giocatori aggiornati su novità, eventi speciali e competizioni del gioco. Utilizziamo vari canali social per informare la community e creare un ambiente accogliente dove condividere esperienze, strategie e partecipare a tornei. Invitiamo tutti i fan a unirsi a noi per rimanere aggiornati e far parte di una community vibrante e attiva.
            </p>
          </div>
        </section>
        <div className="d-flex justify-content-center mb-3">
          <svg className="d-none d-lg-block" width="494" height="1" viewBox="0 0 494 1" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line y1="0.5" x2="494" y2="0.5" stroke="#DCC600" />
          </svg>
        </div>
        <section>
          <div className="container mb-5 d-flex flex-column align-items-center">  
            <h3 className="fs-5 text-center mb-4">LE ULTIME NEWS</h3>
            <div className="flex-column flex-lg-row d-flex gap-5 justify-content-center align-items-center mb-5">
              {postData.map((object, i) => <CardNewsHeader key={i} image={object.image_url} title={object.titolo.length > 49 ? object.titolo.slice(0, 49)+"..." : object.titolo} uri={object.uri_article}/>)}
            </div>
            <a href="/news"  className="btn btn-outline-light">Visualizza tutti i nostri articoli</a>
          </div>
        </section>
        <section className="mb-5">
          <div className="d-none d-lg-block">
            <a href="https://discord.com/servers/xdefiant-italia-1124809941744619602" target="_blank"><Image src={"/home-images/discordbanner.png"} alt="Banner discord" className="img-fluid" width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto' }}></Image> </a>
          </div>

          <div className="d-block d-lg-none">
            <a href="https://discord.com/servers/xdefiant-italia-1124809941744619602" target="_blank"><Image src={"/home-images/discordbannerMobile.png"} alt="Banner discord" className="img-fluid" width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto' }}></Image> </a>
          </div>
        </section>
      </main>
      {/* FOOTER */}
      <Footer />
      <script
        id="faq-schema"
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
    const res = await fetch(`http://localhost:3000/api/postNews?limit=2`,  { next: { revalidate: 1 } });

    return await res.json();
  } catch {
    notFound();
  }
}