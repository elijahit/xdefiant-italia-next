"use client"

import { useState } from "react";
import "./AdminCommandsPosts.css";


export default function AdminCommands({ adminLevel, author, author_id, request_username, request_id, post_id }) {

  const [deleteRes, setDeleteRes] = useState("");
  const [deleteResSuccess, setDeleteResSuccess] = useState(null);

  function deleteArticle() {
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
            <button data-bs-toggle="modal" data-bs-target="#myModal" className="button-custom"><i className="bi bi-backspace"></i> Elimina articolo</button>
          </div>
        </div>
        : ""}

      {/* MODALE */}
      <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              ...
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}