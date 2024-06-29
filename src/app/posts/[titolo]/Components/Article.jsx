"use client"
import "./Article.css";
import { useState } from "react";
import Modal from "../../../../../components/Modal";


export default function Article({ adminLevel, author, author_id, request_username, request_id, post_id, titolo, day, month, year, hour, minute, html, testoNoHtml, modify }) {

  const [deleteRes, setDeleteRes] = useState("");
  const [deleteResSuccess, setDeleteResSuccess] = useState(null);

  const [modifyEnable, setModifyEnaable] = useState(0);

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
    setModifyEnaable(1);
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
          <div className=" mb-3 mb-lg-0 col-12 col-lg-6 d-flex justify-content-center justify-content-lg-end">
            <button onClick={() => modifyArticle()} className="button-custom"><i className="bi bi-pencil-square"></i> Modifica articolo</button>
          </div>
          <div className="col-12 col-lg-6 d-flex justify-content-center justify-content-lg-start">
            <button data-bs-toggle="modal" data-bs-target="#modalConfirmCancel" className="button-custom"><i className="bi bi-backspace"></i> Elimina articolo</button>
          </div>
        </div>
        : ""}

      {/* MODALE */}
      <Modal id="modalConfirmCancel" titolo="ATTENZIONE!!!" testo="Stai cercando di eliminare un articolo, sei sicuro di volerlo fare ?" click={() => deleteArticle()} />

      {/* ARTICOLO */}
      {modifyEnable == 0 ? <article>
        <h1 className="fs-4 text-center">{titolo}</h1>
        <div className="d-flex justify-content-center align-items-center">
          <p className="author">
            {day}/{month}/{year} | {hour}:{minute} - {author}
          </p>
        </div>
        <div className="mb-5" dangerouslySetInnerHTML={{ __html: html }} />
      </article> :
        <form action="">
          <div className="mb-3">
            <input type="text" className={" form-control"} id="titolo" name="titolo" placeholder="Titolo" value={titolo} required />
          </div>
          <div className="row">
            <div className="col-12">
              <div>
                <textarea className={" form-control mb-3"} placeholder="Inserisci qui il tuo contenuto" id="contenuto" name="contenuto" rows={20} value={testoNoHtml} required></textarea>
              </div>
            </div>
          </div>
        </form>
      }
    </>
  )
}