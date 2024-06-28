"use client"

import { useState } from "react";
import "./AdminCommandsPosts.css";


export default function AdminCommands({adminLevel, author, author_id, request_username, request_id, post_id}) {

  const [deleteRes, setDeleteRes] = useState("");
  const [deleteResSuccess, setDeleteResSuccess] = useState(null);

  function deleteArticle () {
    fetch('/api/postRequestRemove', {
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
          <p className="text-danger text-center">{deleteRes}</p>
        : <p className="text-success text-center">{deleteRes}</p>}
      </div> : ""}
      <div className="col-6 d-flex justify-content-end">
        <button className="button-custom"><i className="bi bi-pencil-square"></i> Modifica articolo</button>
      </div>
      <div className="col-6 d-flex justify-content-start">
        <button onClick={() => deleteArticle()} className="button-custom"><i className="bi bi-backspace"></i> Elimina articolo</button>
      </div>
    </div>
    : ""}
    </>
  );
}