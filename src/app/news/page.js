import styles from "./page.module.css";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import Hero from "../../../components/Hero";
import Image from "next/image";
import CardNewsHeader from "../../../components/CardComponents/CardNewsV2"
import { notFound } from "next/navigation";

export default async function Home(params) {
  let searchParams = params.searchParams;
  searchParams?.pag ? searchParams.pag : searchParams.pag = 1;
  const postData = await getData();
  const postDataAll = await getDataAll(searchParams.pag ? +(searchParams.pag) * 10 - 10 : 0);
  const currentPage = +searchParams.pag; // Pagina corrente
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

  function DateFormat(timestamp) {
    const date = new Date(timestamp);

    let day = date.getDate();
    let month = date.getMonth() + 1;

    if (day < 10) {
      day = '0' + day;
    }

    if (month < 10) {
      month = `0${month}`;
    }

    return `${day}/${month}/${date.getFullYear()}`;
  }

  const generatePages = () => {
    let pages = [];
    let totalPages = postDataAll['count'];

    // Mostra tutte le pagine se sono 5 o meno
    if (totalPages <= 3) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Mostra i primi 3, l'ultimo e puntini in mezzo
      if (currentPage <= 0) {
        pages = [1, 2, 3, '...', totalPages];
      } else if (currentPage > totalPages - 3) {
        pages = [1, '...', totalPages - 2, totalPages - 1, totalPages];
      } else {
        pages = [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
      }
    }

    return pages;
  };

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
            {postDataAll['data'].map((object, i) =>
              <div className={styles.allpost + " row"} key={i}>
                <div className="col-10">
                  <div className="d-flex align-items-center">
                    <span className="me-3"> • </span> <a className="fs-5" href={`/posts/${object.uri_article}`}>{object.titolo}</a>
                  </div>
                </div>
                <div className="col-2 d-flex align-items-center">
                  <span className="ms-auto">
                    {DateFormat(+object.created_at)}
                  </span>
                </div>
              </div>)}
            <nav aria-label="Page navigation" className="d-flex justify-content-center mt-3">
              <ul className="pagination">
                {[...Array(Math.ceil(postDataAll['count'] / 10))].map((_, i) => (
                  <div key={i}>
                    <li className={i + 1 == (+searchParams.pag) ? "page-item ms-1 me-1 active" : "page-item ms-1 me-1"}><a className="page-link" href={`?pag=${i + 1}`}>{i + 1}</a></li>
                  </div>
                ))}
              </ul>
            </nav>
          </div>
        </section>
        {/* MOBILE VIEW */}
        <section className="mb-5 d-block d-lg-none">
          <div className="container">
            <h3 className="fs-5 text-center mb-4">TUTTI I NOSTRI ARTICOLI</h3>
            {postDataAll['data'].map((object, i) =>
              <div className={styles.allpostMobile + " row"} key={i}>
                <div className="d-flex align-items-center">
                  <span className="me-3"> • </span><a className="fs-5" href={`/posts/${object.uri_article}`}>{object.titolo}</a>
                </div>
              </div>)}
            <nav aria-label="Page navigation" className="d-flex justify-content-center mt-3">
              <ul className="pagination">
                {generatePages().map((page, i) => (
                  <li key={i} className={page === currentPage ? "page-item ms-1 me-1 active" : "page-item ms-1 me-1"}>
                    {page === '...' ? (
                      <span className="page-link">...</span>
                    ) : (
                      <a className="page-link" href={`?pag=${page}`}>{page}</a>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
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

async function getDataAll(pag) {
  try {
    const res = await fetch(`http://localhost:3000/api/postNews?limit=10&pag=${pag}`, { next: { revalidate: 1 } });
    const resCount = await fetch(`http://localhost:3000/api/postNews`, { next: { revalidate: 1 } });

    return { "data": await res.json(), "count": Object.keys(await resCount.json()).length };
  } catch {
    notFound();
  }
}