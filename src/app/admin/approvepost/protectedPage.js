"use client"
import styles from "./page.module.css";
import Header from "../../../../components/Header";
import Footer from "../../../../components/Footer";
import Hero from "../../../../components/Hero";
import { remark } from 'remark';
import html from 'remark-html';
import { useEffect, useState } from "react";
import { redirect } from "next/dist/server/api-utils";
import { marked } from "marked";


export default function Post() {
  const [postArray, setPostArray] = useState([]);
  const [previewDisplay, setpreviewDisplay] = useState(-1);
  useEffect(() => {
    getDataAll().then((value) => {
      value.json().then(result => {
        setPostArray(result);
      })
    })
  }, []);


  function buttonRifiuta(e) {
    fetch('https://playxdefiant.it/api/postRemove', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id_article: e.id_article
      })
    });
    window.location.reload();
  }

  function buttonAccetta(e) {
    fetch('https://playxdefiant.it/api/postApprove', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: e.id_article
      })
    });
    window.location.reload();
  }

  function buttonPreview(e) {
    if(previewDisplay == e) return setpreviewDisplay(-1);
    return setpreviewDisplay(e);
  }

  return (
    <>
      {/* HEADER */}
      <Header />
      <main>
        {/* HERO SECTION */}
        <Hero />
        {/* FIRST SECTION */}
        <h1 className="fs-4 text-center mt-3 mb-5">APPROVA POST</h1>
        {postArray.length > 0 ? postArray.map((value, i) =>
          <div key={i}>
            <div className="container">
              <div className="container ps-5 pe-5">
                <div className={styles.row + " d-none row d-lg-flex align-items-center"}>
                  <div className="col-6">
                    {value.titolo}
                  </div>
                  <div className="col-4">
                    {value.username}
                  </div>
                  <div className="col-2 d-flex gap-2">
                    <button onClick={() => buttonRifiuta(value)} type="button" className="btn btn-danger" title="Rifiuta post"><i className="bi bi-trash2-fill"></i></button>
                    <button onClick={() => buttonPreview(value.id_article)} type="button" className="btn btn-light" title="Guarda la preview"><i className="bi bi-eye-fill"></i></button>
                    <button onClick={() => buttonAccetta(value)} type="button" className="btn btn-success" title="Accetta post"><i className="bi bi-send-check-fill"></i></button>
                  </div>
                  {previewDisplay == value.id_article ? <div className="container">
                <h1 className="fs-3 text-center">{value.titolo}</h1>
                <p dangerouslySetInnerHTML={{ __html: marked.parse(value.testo) }} />
                <div className="d-flex justify-content-center">
                  <img src={value.image_url} className="img-fluid " width={600} height={0} />
                </div>
              </div> : ""}
                </div>
              </div>
            </div>
            {/* MOBILE */}
            <div className={styles.rowMobile + " d-lg-none row d-flex align-items-center"} key={i}>
              <div className="col-12 text-center mb-2">
                {value.titolo} ({value.username})
              </div>
              <div className="col-12 d-flex gap-2 justify-content-center">
                <button onClick={() => buttonRifiuta(value)} type="button" className="btn btn-danger" title="Rifiuta post"><i data-id-post={value.id_article} className="bi bi-trash2-fill"></i></button>
                <button onClick={() => buttonPreview(value.id_article)}  type="button" className="btn btn-light" title="Guarda la preview"><i className="bi bi-eye-fill"></i></button>
                <button onClick={() => buttonAccetta(value)} type="button" className="btn btn-success" title="Accetta post"><i className="bi bi-send-check-fill"></i></button>
              </div>
              {previewDisplay == value.id_article ? <div className="container">
                <h1 className="fs-3 text-center">{value.titolo}</h1>
                <p dangerouslySetInnerHTML={{ __html: marked.parse(value.testo) }} />
                <div className="d-flex justify-content-center">
                  <img src={value.image_url} className="img-fluid " width={600} height={0} />
                </div>
              </div> : ""}
            </div>
          </div>
        ) : <div className={styles.row + " text-center mb-5"}>Non ci sono post da approvare in questo momento</div>}
      </main >
      {/* FOOTER */}
      < Footer />
    </>
  );
}

function getDataAll() {
  try {
    const res = fetch(`https://playxdefiant.it/api/postNews?approved=0`, { next: { revalidate: 1 } });
    return res;
  } catch (error) {
    notFound();
  }
}