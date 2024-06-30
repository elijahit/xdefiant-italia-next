"use client"
import styles from "./page.module.css";
import Header from "../../../../components/Header";
import Footer from "../../../../components/Footer";
import Hero from "../../../../components/Hero";
import { remark } from 'remark';
import html from 'remark-html';
import { useState } from "react";
import Image from "next/image";


export default function Post() {

  // VARIABLE RESPONSE
  const [responseError, setResponseError] = useState("");
  const [responseSuccess, setresponseSuccess] = useState("");

  // VARIABLE ERROR
  const [titleError, setTitleError] = useState(0);
  const [contentError, setContentError] = useState(0);
  const [imageError, setImageError] = useState(0);


  // VARIABLE

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [contentNoHtml, setcontentNoHtml] = useState("");
  const [image, setImage] = useState(null);

  // FUNZIONE PER HTML MARKDOWN
  async function handleContent(e) {
    const processedContent = await remark()
      .use(html)
      .process(e.target.value);
    setContent(processedContent.toString());
    setcontentNoHtml(e.target.value);
  }

  // FUNZIONI DI VALIDATE
  async function handleSubmit(event) {
    event.preventDefault();
    setresponseSuccess("");
    setResponseError("");
    if (title.length == 0) setTitleError(1);
    if (content.length == 0) setContentError(1);
    if (image.length == 0) setImageError(1);
    const imageFetching = await fetch(image);
    if (imageFetching.status != 200) setImageError(1);
    if (titleError == 0 && contentError == 0 && imageError == 0) {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', contentNoHtml);
      formData.append('image', image?.target?.files[0]);
      setTitleError(0);
      setContentError(0);
      setImageError(0);
      fetch('/api/post', {
        method: 'post',
        headers: {
        },
        body: formData
      })
        .then(response => response.text())
        .then(body => {
          if (JSON.parse(body).success == 1) {
            setresponseSuccess(JSON.parse(body).text);
            setTitle("");
            setContent("");
            setImage("");
            event.target[0].value = "";
            event.target[1].value = "";
            event.target[2].value = "";
          } else {
            setResponseError(JSON.parse(body).text);
          }
        });
    } else {
      return;
    }
  }

  return (
    <>
      {/* HEADER */}
      <Header />
      <main>
        {/* HERO SECTION */}
        <Hero />
        {/* FIRST SECTION */}
        <div className="container">
          <h1 className="fs-4 text-center mt-3 mb-5">PUBBLICA ARTICOLO</h1>
          <form onSubmit={handleSubmit} method="POST" action="" className={styles.form + " mb-5"}>
            <div className="mb-3">
              <input onChange={(e) => setTitle(e.target.value)} type="text" className={titleError == 1 ? "is-invalid" + " form-control" : "" + " form-control"} id="titolo" name="titolo" placeholder="Titolo" required />
            </div>
            <div className="row">
              <div className="col-12 col-lg-9">
                <div>
                  <textarea onChange={(e) => handleContent(e)} className={contentError == 1 ? "is-invalid" + " form-control mb-3" : "" + " form-control mb-3"} placeholder="Inserisci qui il tuo contenuto" id="contenuto" name="contenuto" rows={20} required></textarea>
                </div>
              </div>
              <div className="col-lg-3 d-none d-lg-block">
                <h3 className="text-center fs-5">MARKDOWN</h3>
              </div>
            </div>
            <div className={styles.customFile + " d-flex flex-column align-items-center mb-5"}>
                <label className={styles.customFileLabel + " fs-4"} htmlFor="bannerFile"><i className="bi bi-card-image"></i> Banner</label>
                <p>Se non vuoi modificare il banner, non caricare nessun file</p>
                <input type="file" onChange={(t) => setImage(t)} name="bannerFile" className={styles.customFileInput} id="bannerFile" accept="image/*" required/>
              </div>
            <div className="d-flex flex-column align-items-center mb-5">
              <svg className="mb-5" width="267" height="1" viewBox="0 0 267 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="-0.00390625" y1="0.5" x2="267.004" y2="0.5" stroke="white" />
              </svg>
              <div className="container">
                <div className={title.length > 0 ? styles.preview + " position-relative" : styles.previewCenteredText}>
                  {title.length > 0 ?
                    <div className="container ">
                      <h1 className="fs-3 text-center">{title}</h1>
                      <p dangerouslySetInnerHTML={{ __html: content }} />
                    </div>
                    :
                    <div className="d-flex flex-column justify-content-center align-items-center w-100 h-100">
                      <h2>Preview</h2>
                      <p>(Per visualizzare la preview, inserisci un titolo)</p>
                    </div>
                  }
                </div>
                <div>
                  {image?.target?.files[0] ?
                    <div className="d-flex justify-content-center align-items-end">
                      <Image className={styles.imagePreview + " " + styles.imagePreviewBorder + " d-none d-lg-flex"} src={URL.createObjectURL(image.target.files[0])} alt="Immagine di gestione"></Image>
                      <Image className={styles.imagePreviewBorder + " d-lg-none img-fluid"} src={URL.createObjectURL(image.target.files[0])} alt="Immagine di gestione"></Image>
                    </div>
                    : ""}
                </div>
              </div>
            </div>
            {responseError.length > 0 ? <p className="text-center text-lg-start text-danger">
              <i className="bi bi-emoji-expressionless"></i> {responseError}
            </p> : ""}
            {responseSuccess.length > 0 ? <p className="text-center text-lg-start text-success">
              <i className="bi bi-check2-all"></i> {responseSuccess}
            </p> : ""}
            <div className="d-flex justify-content-center justify-content-lg-end">
              <button type="submit" className="btn ps-5 pe-5">Pubblica ora</button>
            </div>
          </form>
        </div >
      </main >
      {/* FOOTER */}
      < Footer />
    </>
  );
}