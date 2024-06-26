import styles from "./page.module.css";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import Hero from "../../../components/Hero";
import Image from "next/image";
import CardNewsHeader from "../../../components/CardNewsHeader"
import { notFound } from "next/navigation";
import db from "../../../scripts/database";

export default async function Home() {
  
  let postData = await db.all("select a.id_article , a.titolo, a.testo, a.id_utente, a.image_url, a.uri_article, u.username, u.email, u.discord_name from article a join utente u on u.id_utente = a.id_utente ORDER BY a.id_article DESC LIMIT ?", 2);
  let postDataAll = await db.all("select a.id_article , a.titolo, a.testo, a.id_utente, a.image_url, a.uri_article, u.username, u.email, u.discord_name from article a join utente u on u.id_utente = a.id_utente ORDER BY a.id_article DESC");

  return (
    <>
      {/* HEADER */}
      <Header isPage="news"></Header>
      <main>
        {/* HERO SECTION */}
        <Hero />
        {/* FIRST SECTION */}
        <section className="mt-5">
          <div className="container mb-5 d-flex flex-column align-items-center">
            <h3 className="fs-5 text-center mb-4">LE ULTIME NEWS</h3>
            <div className="flex-column flex-lg-row d-flex gap-5 justify-content-center align-items-center mb-3">
              {postData.map((object, i) => <CardNewsHeader key={i} image={object.image_url} title={object.titolo.length > 49 ? object.titolo.slice(0, 49) + "..." : object.titolo} uri={object.uri_article} />)}
              {db.close()}
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
    </>
  );
}


async function getData() {
  try {
    const res = await fetch(`http://localhost:3000/api/postNews?limit=2`);

    return await res.json();
  } catch {
    notFound();
  }
}

async function getDataAll() {
  try {
    const res = await fetch(`http://localhost:3000/api/postNews`);

    return await res.json();
  } catch {
    notFound();
  }
}