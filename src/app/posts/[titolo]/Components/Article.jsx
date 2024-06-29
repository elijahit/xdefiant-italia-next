"use client"
import "./Article.css";
import { useState } from "react";
import Modal from "../../../../../components/Modal";
import { remark } from 'remark';
import htmlRemark from 'remark-html';


export default function Article({ image, adminLevel, author, author_id, request_username, request_id, post_id, titolo, day, month, year, hour, minute, html, testoNoHtml, modify }) {

  const [deleteRes, setDeleteRes] = useState("");
  const [deleteResSuccess, setDeleteResSuccess] = useState(null);

  const [modifyEnable, setModifyEnable] = useState(0);
  const [previewEnable, setPreviewEnable] = useState(0);
  const [contentPreviewHtml, setContentPreviewHtml] = useState("");

  const [valueTitolo, setValueTitolo] = useState(titolo);
  const [valueContent, setValueContent] = useState(testoNoHtml);

  function deleteArticle() {
    fetch('/api/postRequest', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id_article: post_id,
        id_request: request_id,
        id_author: author_id
      })
    }).then(value => {
      value.text().then(text => {
        setDeleteRes(JSON.parse(text).text);
        setDeleteResSuccess(JSON.parse(text).success)
      })
    });
  }

  function modifyArticle() {
    if (modifyEnable == 0) {
      setModifyEnable(1);
    }
  }

  function formValueChange(e, input) {
    input(e.target.value);
  }

  // FUNZIONE PER HTML MARKDOWN
  async function markHtml(v) {
    const processedContent = await remark()
      .use(htmlRemark)
      .process(v);
    setContentPreviewHtml(processedContent.toString());
  }

  async function handlePreview() {
    await markHtml(valueContent);
    setPreviewEnable(1);
  }

  return (
    <>
      {adminLevel >= 3 || author_id == request_id ?
        <div className="row mb-4 mt-4">
          {deleteResSuccess != null ? <div className="col-12">
            {deleteResSuccess == 0 ?
              <p className="text-danger text-center"><i className="bi bi-exclamation-octagon"></i> {deleteRes}</p>
              : <p className="text-success text-center"><i class="bi bi-check"></i> {deleteRes}</p>}
          </div> : ""}
          {modifyEnable == 0 ?
            <>
              <div className=" mb-3 mb-lg-0 col-12 col-lg-6 d-flex justify-content-center justify-content-lg-end">
                <button onClick={() => modifyArticle()} className="button-custom"><i className="bi bi-pencil-square"></i> Modifica articolo</button>
              </div>
              <div className="col-12 col-lg-6 d-flex justify-content-center justify-content-lg-start">
                <button data-bs-toggle="modal" data-bs-target="#modalConfirmCancel" className="button-custom"><i className="bi bi-backspace"></i> Elimina articolo</button>
              </div>
            </>
            : ""}
        </div>
        : ""}

      {/* MODALE */}
      <Modal id="modalConfirmCancel" titolo="ATTENZIONE!!!" testo="Stai cercando di eliminare un articolo, sei sicuro di volerlo fare ?" click={() => deleteArticle()} />

      {/* ARTICOLO */}
      {modifyEnable == 0 ?
        <>
          <div className="container mt-2">
            <article>
              <h1 className="fs-4 text-center">{titolo}</h1>
              <div className="d-flex justify-content-center align-items-center">
                <p className="author">
                  {day}/{month}/{year} | {hour}:{minute} - {author}
                </p>
              </div>
              <div className="mb-5" dangerouslySetInnerHTML={{ __html: html }} />
            </article>
          </div>
          <div className="d-lg-none mb-2">
            <img className="img-fluid" src={image}></img>
          </div>
          <div className="banner mb-2 d-none  d-lg-block" style={{ backgroundImage: `url(${image})` }}>
          </div>
          <div className="container">
            <div className="d-flex justify-content-center justify-content-lg-end">
              <a href="#upPage" className="buttonUp mb-5">Torna all&apos;inizio</a>
            </div>
          </div>
        </>
        :
        // MODIFICA DELL'ARTICOLO
        <div className="container mt-2">
          <h1 className="fs-4 text-center mb-1">MODIFICA ARTICOLO</h1>
          <p className="text-center mb-4">{titolo} | {author}</p>
          <form action="">
            <div className="mb-3">
              <input type="text" className={" form-control"} id="titolo" name="titolo" placeholder="Titolo" value={valueTitolo} onChange={(e) => formValueChange(e, setValueTitolo)} required />
            </div>
            <div className="row">
              <div className="col-12">
                <div>
                  <textarea className={" form-control mb-3"} placeholder="Inserisci qui il tuo contenuto" id="contenuto" name="contenuto" onChange={(e) => formValueChange(e, setValueContent)} rows={20} value={valueContent} required></textarea>
                </div>
              </div>
              <div className="custom-file d-flex flex-column align-items-center mb-5">
                <label className="custom-file-label fs-4" htmlFor="bannerFile"><i className="bi bi-card-image"></i> Banner</label>
                <p>Se non vuoi modificare il banner, non caricare nessun file</p>
                <input type="file" className="custom-file-input" id="bannerFile" accept="image/*" />
              </div>
            </div>
            <div className="d-flex justify-content-center justify-content-lg-end gap-2 mb-5">
              <button className="btn buttonSalva">Salva</button>
              <button onClick={() => previewEnable == 0 ? handlePreview() : setPreviewEnable(0)} type="button" className="btn buttonPreview">Preview</button>
              <button type="button" data-bs-toggle="modal" data-bs-target="#modalModifyCancel" className="btn buttonAnnulla">Annulla</button>
            </div>
            <Modal id="modalModifyCancel" titolo="ATTENZIONE!!!" testo="Sei sicuro di voler annullare la modifica? Le modifiche andranno perse." click={() => setModifyEnable(0)} />
          </form>
          {previewEnable == 1 ?
            <div className="container">
              <div className="preview position-relative">
                <div className="container ">
                  <h1 className="fs-3 text-center">{valueTitolo}</h1>
                  <p dangerouslySetInnerHTML={{ __html: contentPreviewHtml}} />
                </div>
              </div>
              <div>
                <div className="d-flex justify-content-center align-items-end">
                  <img className="imagePreview imagePreviewBorder d-none d-lg-flex" src={image}></img>
                  <img className="imagePreviewBorder d-lg-none img-fluid" src={image}></img>
                </div>
              </div>
            </div> : ""}
        </div>
      }
    </>
  )
}