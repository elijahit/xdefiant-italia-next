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
  const data = getDataAll();

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
          <AuditLogAccordion audit_id={1} username={"EazY"} azione_id={1} timestamp={0} />
          <AuditLogAccordion audit_id={2} username={"EazY"} azione_id={2} timestamp={0} />
        </div>
      </div>
      <Footer />
    </>
  );
}

function getDataAll() {
  try {
    const res = fetch(`/api/auditLogs`, { next: { revalidate: 1 } });
    return res;
  } catch (error) {
    notFound();
  }
}