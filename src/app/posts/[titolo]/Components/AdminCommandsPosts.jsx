"use client"

import { useState } from "react";
import "./AdminCommandsPosts.css";
import Modal from "../../../../../components/Modal";


export default function AdminCommands({ adminLevel, author, author_id, request_username, request_id, post_id }) {

  const [deleteRes, setDeleteRes] = useState("");
  const [deleteResSuccess, setDeleteResSuccess] = useState(null);

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
            <button className="button-custom"><i className="bi bi-pencil-square"></i> Modifica articolo</button>
          </div>
          <div className="col-12 col-lg-6 d-flex justify-content-center justify-content-lg-start">
            <button data-bs-toggle="modal" data-bs-target="#modalConfirmCancel" className="button-custom"><i className="bi bi-backspace"></i> Elimina articolo</button>
          </div>
        </div>
        : ""}

      {/* MODALE */}
      <Modal id="modalConfirmCancel" titolo="ATTENZIONE!!!" testo="Stai cercando di eliminare un articolo, sei sicuro di volerlo fare ?" click={() => deleteArticle()} />
    </>
  );
}