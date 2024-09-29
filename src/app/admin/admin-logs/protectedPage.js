"use client"
import styles from "./page.module.css";
import Header from "../../../../components/Header";
import Footer from "../../../../components/Footer";
import Hero from "../../../../components/Hero";
import AuditLogAccordion from "./AuditLogAccordion";
import { remark } from 'remark';
import html from 'remark-html';
import { useEffect, useState } from "react";
import { redirect } from "next/dist/server/api-utils";
import { marked } from "marked";
import Image from "next/image";
/* 
  AZIONI ID DB:
  ID: 1 - Ha effettuato il login
  ID: 2 - Ha effettuaot il logout
  ID: 3 - Ha approvato la pubblicazione di un articolo (id_article)
  ID: 4 - Ha inviato un articolo in attesa di approvazione (id_article)
  ID: 5 - Ha eliminato un articolo in attesa di approvazione (id_article)
  ID: 6 - Ha modificato un articolo in attesa di approvazione (id_article)
  ID: 7 - Ha approvato l'eliminazione di un articolo (id_article)
  ID: 8 - Ha approvato la modifica di un articolo (id_article)
*/


export default function AdminLogs(props) {
  const [data, setData] = useState(null)
  const [count, setCount] = useState(null)
  let pag = props['data-pag'].pag ? +props['data-pag'].pag : 1;
  const currentPage = +pag;
  useEffect(() => {
    getDataAllByLimit(pag).then( async value => {
      let res = await value['data'].json();
      setData(res);
      setCount(value['count']);
    })

  }, [pag])

  const generatePages = () => {
    let pages = [];
    let totalPages = Math.ceil(count/10);

    // Mostra tutte le pagine se sono 5 o meno
    if (totalPages <= 3) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Mostra i primi 3, l'ultimo e puntini in mezzo
      pages = [(currentPage - 1) == 0 ? null : currentPage -1 , currentPage, currentPage == totalPages ? null : currentPage + 1, currentPage == totalPages ? null : "...", currentPage == totalPages ? null : totalPages];
    }

    return pages;
  };

  return (
    <>
      <Header />
      <Hero />
      <div className="container">
        <div>
          <h1 className="fs-3 text-start mt-4">Audit Log</h1>
          {/* DA INSERIRE FILTERING */}
        </div>
        <div className="mb-5">
          {data != null ? data.map((value) =>
            <AuditLogAccordion key={value.idLogs} auditId={value.idLogs} username={value.username} azioneId={value.azioneId} timestamp={+value.timestamp} idUtentePerform={value.idUtentePerform} ip={value.ip} idArticle={value.idArticle} articleName={value.titoloArticle} articleAuthor={value.authorArticle} articleUri={value.uriArticle} utentePerform={value.utentePerform} />
          ) : 
            <div className={styles.noData}>
              <p className="text-center m-0">Non ci sono dati disponibili</p>
            </div>}
        </div>
        <nav aria-label="Page navigation" className="d-flex justify-content-center mt-3">
              <ul className="pagination">
              {generatePages().map((page, i) => (
                  <li key={i} className={page === currentPage ? "page-item ms-1 me-1 active" : "page-item ms-1 me-1"}>
                    {page == null ? "" : page === '...' ? (
                      <span className="page-link">...</span>
                    ) : (
                      <a className="page-link" href={`?pag=${page}`}>{page}</a>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
      </div>
      <Footer />
    </>
  );
}

async function getDataAllByLimit(pag) {
  try {
    const res = await fetch(`/api/auditLogs?pag=${pag}`, { next: { revalidate: 1 } });
    const resCount = await fetch(`/api/auditLogs?count=1`, { next: { revalidate: 1 } });
    if(res.status == 400) {
      return "";
    }
    return { "data": res, "count": Object.keys(await resCount.json()).length };
  } catch (error) {
    notFound();
  }
}