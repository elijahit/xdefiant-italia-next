"use client"
import "./Article.css";
import { useState } from "react";
import Modal from "../../../../../components/Modal";
import { remark } from 'remark';
import htmlRemark from 'remark-html';
import Image from "next/image";


export default function Article({ image, adminLevel, author, author_id, request_username, request_id, post_id, titolo, day, month, year, hour, minute, html, testoNoHtml }) {

  const [APIRes, setAPIRes] = useState("");
  const [APIResSuccess, setAPIResSuccess] = useState(null);

  const [modifyEnable, setModifyEnable] = useState(0);
  const [previewEnable, setPreviewEnable] = useState(0);
  const [contentPreviewHtml, setContentPreviewHtml] = useState("");

  const [valueTitolo, setValueTitolo] = useState(titolo);
  const [valueContent, setValueContent] = useState(testoNoHtml);
  const [imageModify, setImageModify] = useState(null);

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
        setAPIRes(JSON.parse(text).text);
        setAPIResSuccess(JSON.parse(text).success)
      })
    });
  }

  function modifyArticle() {
    if (modifyEnable == 0) {
      setModifyEnable(1);
      setAPIResSuccess(null);
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

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("idPost", post_id);
    formData.append("title", valueTitolo);
    formData.append("content", valueContent);
    formData.append("authorId", author_id);
    formData.append("requestAuthor", request_username);
    formData.append("requestAuthorId", request_id);
    if(imageModify) {
      formData.append("image", imageModify.target.files[0]);
    }

    if (valueTitolo.length > 0 && valueContent.length > 0) {
      fetch('/api/postRequest', {
        method: 'post',
        headers: {
        },
        body: formData
      })
        .then(response => response.text())
        .then(body => {
          const res = JSON.parse(body);
          if(res.success == 1) {
            window.scrollTo(0, 0)
            setModifyEnable(0);
            setAPIRes(res.text);
            setAPIResSuccess(1);
          } else {
            window.scrollTo(0, 0)
            setModifyEnable(0);
            setAPIRes(res.text);
            setAPIResSuccess(0);
          }
        });
    } else {
      return;
    }
  }

  return (
    <>
      {adminLevel >= 3 || author_id == request_id ?
        <div className="row mb-4 mt-4">
          {APIResSuccess != null ? <div className="col-12">
            {APIResSuccess == 0 ?
              <p className="text-danger text-center"><i className="bi bi-exclamation-octagon"></i> {APIRes}</p>
              : <p className="text-success text-center"><i className="bi bi-check"></i> {APIRes}</p>}
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
            <Image className="img-fluid" width={1000} height={0} src={image} alt="Immagine di gestione"></Image>
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
          <form>
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
                <input type="file" onChange={(t) => setImageModify(t)} name="bannerFile" className="custom-file-input" id="bannerFile" accept="image/*" />
              </div>
            </div>
            <div className="d-flex justify-content-center justify-content-lg-end gap-2 mb-5">
              <button onClick={(e) => handleSubmit(e)} className="btn buttonSalva">Salva</button>
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
                  <Image className="imagePreview imagePreviewBorder d-none d-lg-flex" src={imageModify ? URL.createObjectURL(imageModify.target.files[0]) : image} alt="Immagine di gestione"></Image>
                  <Image className="imagePreviewBorder d-lg-none img-fluid" src={image} alt="Immagine articolo"></Image>
                </div>
              </div>
            </div> : ""}
        </div>
      }
    </>
  )
}