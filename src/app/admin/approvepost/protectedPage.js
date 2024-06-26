"use client"
import styles from "./page.module.css";
import Header from "../../../../components/Header";
import Footer from "../../../../components/Footer";
import Hero from "../../../../components/Hero";
import { remark } from 'remark';
import html from 'remark-html';
import { useState } from "react";


export default function Post() {

  return (
    <>
      {/* HEADER */}
      <Header />
      <main>
        {/* HERO SECTION */}
        <Hero />
        {/* FIRST SECTION */}
        <div className="container">
          <h1 className="fs-4 text-center mt-3 mb-5">APPROVA POST</h1>
          <div className="row">
            <div className="col-2"></div>
            <div className="col-7">
              Titolo
            </div>
            <div className="col-3">
              Pulsanti
            </div>
          </div>

        </div>
      </main >
      {/* FOOTER */}
      < Footer />
    </>
  );
}