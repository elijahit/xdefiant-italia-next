import styles from "./page.module.css";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import Hero from "../../../components/Hero";
import Image from "next/image";
import CardNewsHeader from "../../../components/CardNews"
import { notFound } from "next/navigation";

export default async function Home() {
  const postData = await getData();
  const postDataAll = await getDataAll();

  const schemaSite = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "url": "https://playxdefiant.it/news",
    "image": '/header-images/logo.webp',
    "name": "XDefiant Italia - Discord",
    "description": "Discod ufficiale di XDefiant Italia, vieni subito e trova i tuoi teammate per le tue partite sul titolo!",
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
      <Header isPage="discord"></Header>
      <main>
        {/* HERO SECTION */}
        <Hero />
        <h1 className="d-none">Entra sul discord di XDefiant Italia</h1>
        {/* FIRST SECTION DESKTOP*/}
        <section className="d-none d-lg-block">
          <div className="position-relative h-100">
            <iframe className="rounded-4 position-absolute top-50 start-50 translate-middle" src="https://discord.com/widget?id=1124809941744619602&theme=dark" width={"25%"} height="80%" allowtransparency="true" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>
            <Image src={"/discord-images/image.png"} alt="Banner discord" className="img-fluid" width={0} height={0} sizes="100" style={{ width: '100vw', height: 'auto' }}></Image>
          </div>
        </section>
        {/* FIRST SECTION MOBILE */}
        <section className="d-flex justify-content-center d-block d-lg-none">
          <a href="https://discord.com/servers/xdefiant-italia-1124809941744619602">
            <Image src={"/discord-images/discordbannerMobile.png"} alt="Banner discord" className="img-fluid" width={0} height={0} sizes="100" style={{ width: '100vw', height: 'auto' }}></Image>
          </a>
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