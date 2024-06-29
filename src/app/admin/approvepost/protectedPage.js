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
  // APPROVE
  const [postApproveArray, setPostApproveArray] = useState([]);
  const [previewApprove, setPreviewApprove] = useState(-1);

  // MODIFY
  const [postModifyArray, setPostModifyArray] = useState([]);
  const [previewModify, setPreviewModify] = useState(-1);


  useEffect(() => {
    getDataApproveAll().then((value) => {
      value.json().then(result => {
        setPostApproveArray(result);
      })
    })

    getDataModifyApproveAll().then((value) => {
      value.json().then(result => {
        setPostModifyArray(result);
      })
    })
  }, []);


  function buttonApproveRifiuta(e) {
    fetch('/api/post', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id_article: e.id_article,
        image: e.image_url
      })
    });
    window.location.reload();
  }

  function buttonApproveAccetta(e) {
    fetch('/api/postApprove', {
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
    if (previewApprove == e) return setPreviewApprove(-1);
    return setPreviewApprove(e);
  }

  function buttonPreviewModify(e) {
    if (previewModify == e) return setPreviewModify(-1);
    return setPreviewModify(e);
  }

  return (
    <>
      {/* HEADER */}
      <Header />
      <main>
        {/* HERO SECTION */}
        <Hero />
        {/* APPROVE SECTION */}
        <h2 className="fs-4 text-center mt-3 mb-3">APPROVA POST</h2>
        <div className="container">
          {postApproveArray.length > 0 ? postApproveArray.map((value, i) =>
            <div key={i}>
              <div className={styles.row + " d-none row d-lg-flex align-items-center"}>
                <div className="col-6">
                  {value.titolo}
                </div>
                <div className="col-3">
                  {value.username}
                </div>
                <div className="col-3 d-flex justify-content-center gap-2">
                  <button onClick={() => buttonApproveRifiuta(value)} type="button" className="btn btn-danger" title="Rifiuta post"><i className="bi bi-trash2-fill"></i></button>
                  <button onClick={() => buttonPreview(value.id_article)} type="button" className="btn btn-light" title="Guarda la preview"><i className="bi bi-eye-fill"></i></button>
                  <button onClick={() => buttonApproveAccetta(value)} type="button" className="btn btn-success" title="Accetta post"><i className="bi bi-send-check-fill"></i></button>
                </div>
                {previewApprove == value.id_article ? <div className="container">
                  <h1 className="fs-3 text-center">{value.titolo}</h1>
                  <p dangerouslySetInnerHTML={{ __html: marked.parse(value.testo) }} />
                  <div className="d-flex justify-content-center">
                    <img src={value.image_url} className="img-fluid " width={600} height={0} />
                  </div>
                </div> : ""}
              </div>
              {/* MOBILE */}
              <div className={styles.rowMobile + " d-lg-none row d-flex align-items-center"} key={i}>
                <div className="col-12 text-center mb-2">
                  {value.titolo} ({value.username})
                </div>
                <div className="col-12 d-flex gap-2 justify-content-center">
                  <button onClick={() => buttonApproveRifiuta(value)} type="button" className="btn btn-danger" title="Rifiuta post"><i data-id-post={value.id_article} className="bi bi-trash2-fill"></i></button>
                  <button onClick={() => buttonPreview(value.id_article)} type="button" className="btn btn-light" title="Guarda la preview"><i className="bi bi-eye-fill"></i></button>
                  <button onClick={() => buttonApproveAccetta(value)} type="button" className="btn btn-success" title="Accetta post"><i className="bi bi-send-check-fill"></i></button>
                </div>
                {previewApprove == value.id_article ? <div className="container">
                  <h1 className="fs-3 text-center">{value.titolo}</h1>
                  <p dangerouslySetInnerHTML={{ __html: marked.parse(value.testo) }} />
                  <div className="d-flex justify-content-center">
                    <img src={value.image_url} className="img-fluid " width={600} height={0} />
                  </div>
                </div> : ""}
              </div>
            </div>
          ) : <div className={styles.row + " text-center mb-5"}>Non ci sono post da approvare in questo momento</div>}
        </div>

        {/* APPROVE MODIFY SECTION */}
        <h2 className="fs-4 text-center mt-3 mb-3">APPROVA MODIFICHE POST</h2>
        <div className="container">
          {postModifyArray.length > 0 ? postModifyArray.map((value, i) =>
            <div key={i}>
              <div className={styles.row + " d-none row d-lg-flex align-items-center"}>
                <div className="col-6">
                  {value.titoloVecchio}
                </div>
                <div className="col-3">
                  {value.richiestDa}
                </div>
                <div className="col-3 d-flex justify-content-center gap-2">
                  <button onClick={() => buttonModifyRifiuta(value)} type="button" className="btn btn-danger" title="Rifiuta post"><i className="bi bi-trash2-fill"></i></button>
                  <button onClick={() => buttonPreviewModify(value.id_article)} type="button" className="btn btn-light" title="Guarda la preview"><i className="bi bi-eye-fill"></i></button>
                  <button onClick={() => buttonModifyAccetta(value)} type="button" className="btn btn-success" title="Accetta post"><i className="bi bi-send-check-fill"></i></button>
                </div>
                {previewModify == value.idArticle ?
                  <div className="accordion" id="modifyCollapse">
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button className={styles.accordion +" accordion-button collapsed"} type="button" data-bs-toggle="collapse" data-bs-target="#contenutoOriginale" aria-expanded="false" aria-controls="contenutoOriginale">
                          Vecchio contenuto
                        </button>
                      </h2>
                      <div id="contenutoOriginale" className="accordion-collapse collapse" data-bs-parent="#modifyCollapse">
                        <div className="accordion-body">
                          <div className="container">
                            <h1 className="fs-3 text-center">{value.titoloVecchio}</h1>
                            <p dangerouslySetInnerHTML={{ __html: marked.parse(value.testoVecchio) }} />
                            <div className="d-flex justify-content-center">
                              <img src={value.immaggineVecchia} className="img-fluid " width={600} height={0} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button className={styles.accordion +" accordion-button collapsed"} type="button" data-bs-toggle="collapse" data-bs-target="#contenutoModificato" aria-expanded="false" aria-controls="contenutoModificato">
                          Nuovo contenuto
                        </button>
                      </h2>
                      <div id="contenutoModificato" className="accordion-collapse collapse" data-bs-parent="#modifyCollapse">
                        <div className="accordion-body">
                          <div className="container">
                            <h1 className="fs-3 text-center">{value.titoloVecchio}</h1>
                            <p dangerouslySetInnerHTML={{ __html: marked.parse(value.testoVecchio) }} />
                            <div className="d-flex justify-content-center">
                              <img src={value.immaggineVecchia} className="img-fluid " width={600} height={0} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  : ""}
              </div>
              {/* MOBILE */}
              <div className={styles.rowMobile + " d-lg-none row d-flex align-items-center"} key={i}>
                <div className="col-12 text-center mb-2">
                  {value.titoloVecchio} ({value.richiestDa})
                </div>
                <div className="col-12 d-flex gap-2 justify-content-center">
                  <button onClick={() => buttonModifyRifiuta(value)} type="button" className="btn btn-danger" title="Rifiuta post"><i data-id-post={value.id_article} className="bi bi-trash2-fill"></i></button>
                  <button onClick={() => buttonModifyPreview(value.id_article)} type="button" className="btn btn-light" title="Guarda la preview"><i className="bi bi-eye-fill"></i></button>
                  <button onClick={() => buttonModifyAccetta(value)} type="button" className="btn btn-success" title="Accetta post"><i className="bi bi-send-check-fill"></i></button>
                </div>
                {previewModify == value.idArticle ? <div className="container">
                  <h1 className="fs-3 text-center">{value.titoloVecchio}</h1>
                  <p dangerouslySetInnerHTML={{ __html: marked.parse(value.testoVecchio) }} />
                  <div className="d-flex justify-content-center">
                    <img src={value.immaggineVecchia} className="img-fluid " width={600} height={0} />
                  </div>
                </div> : ""}
              </div>
            </div>
          ) : <div className={styles.row + " text-center mb-5"}>Non ci sono post modificati da approvare in questo momento</div>}
        </div>
      </main >
      {/* FOOTER */}
      < Footer />
    </>
  );
}

function getDataApproveAll() {
  try {
    const res = fetch(`/api/postNews?approved=0`, { next: { revalidate: 1 } });
    console.log(res)
    return res;
  } catch (error) {
    notFound();
  }
}

function getDataModifyApproveAll() {
  try {
    const res = fetch(`/api/postGetModify`, { next: { revalidate: 1 } });
    console.log(res, "testInside")
    return res;
  } catch (error) {
    notFound();
  }
}