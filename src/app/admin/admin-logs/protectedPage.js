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


export default function AdminLogs() {
  const [data, setData] = useState(null);
  useEffect(() => {
    getDataAll().then( async value => {
      let res = await value.json();
      setData(res);
    })

  }, [])

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
            <AuditLogAccordion key={value.id_admin_logs} audit_id={value.id_admin_logs} username={value.username} azione_id={value.azione} timestamp={+value.timestamp} />
          ) : 
            <div className={styles.noData}>
              <p className="text-center m-0">Non ci sono dati disponibili</p>
            </div>}
        </div>
      </div>
      <Footer />
    </>
  );
}

async function getDataAll() {
  try {
    const res = await fetch(`http://localhost:3000/api/auditLogs`, { next: { revalidate: 1 } });
    if(res.status == 400) {
      return "";
    }
    return res;
  } catch (error) {
    notFound();
  }
}