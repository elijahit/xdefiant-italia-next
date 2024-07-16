import styles from "./page.module.css";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import Hero from "../../../components/Hero";
import Image from "next/image";
import CardNewsHeader from "../../../components/CardComponents/CardNewsV2"
import { notFound } from "next/navigation";

export default async function Home() {
  const postData = await getData();
  const postDataAll = await getDataAll();
  const schemaSite = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "url": "https://playxdefiant.it/news",
  "image": '/header-images/logo.webp',
  "name": "XDefiant Italia - News",
  "description": "Notizie sul gioco di XDefiant e approfondimenti forniti dalla redazione di XDefiant Italia",
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
      <Header isPage="news"></Header>
      <main>
        {/* HERO SECTION */}
        <Hero />
        {/* FIRST SECTION */}
        <h1 className="d-none">Le novità di XDefiant Italia</h1>
        <section className="mt-5">
          <div className="container mb-5 d-flex flex-column align-items-center">
            <h3 className="fs-5 text-center mb-4">LE ULTIME NEWS</h3>
            <div className="flex-column flex-lg-row d-flex gap-5 justify-content-center align-items-center mb-3">
              {postData.map((object, i) => <CardNewsHeader key={i} image={object.image_url} title={object.titolo.length > 49 ? object.titolo.slice(0, 49) + "..." : object.titolo} uri={object.uri_article} />)}
            </div>
          </div>
        </section>
        {/* DESKTOP VIEW */}
        <section className="mb-5 d-none d-lg-block">
          <div className="container">
            <h3 className="fs-5 text-center mb-4">TUTTI I NOSTRI ARTICOLI</h3>
            {postDataAll.map((object, i) =>
              <div className={styles.allpost + " row"} key={i}>
                <div className="d-flex align-items-center">
                  <span>
                    <span className="me-3"> • </span> <a className="fs-5" href={`/posts/${object.uri_article}`}>{object.titolo}</a>
                  </span>
                </div>
              </div>)}
          </div>
        </section>
        {/* MOBILE VIEW */}
        <section className="mb-5 d-block d-lg-none">
          <div className="container">
            <h3 className="fs-5 text-center mb-4">TUTTI I NOSTRI ARTICOLI</h3>
            {postDataAll.map((object, i) =>
              <div className={styles.allpostMobile + " row"} key={i}>
                <div className="d-flex align-items-center">
                  <span className="me-3"> • </span><a className="fs-5" href={`/posts/${object.uri_article}`}>{object.titolo}</a>
                </div>
              </div>)}
          </div>
        </section>
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
    const res = await fetch(`http://localhost:3000/api/postNews?limit=2`, { next: { revalidate: 1 } });

    return await res.json();
  } catch {
    notFound();
  }
}

async function getDataAll() {
  try {
    const res = await fetch(`http://localhost:3000/api/postNews`, { next: { revalidate: 1 } });

    return await res.json();
  } catch {
    notFound();
  }
}