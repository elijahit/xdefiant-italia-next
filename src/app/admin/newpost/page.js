import styles from "./page.module.css";
import Header from "../../../../components/Header";
import Footer from "../../../../components/Footer";
import Hero from "../../../../components/Hero";
import Image from "next/image";
import CardNewsHeader from "../../../../components/CardNewsHeader"
import { notFound } from "next/navigation";

export default async function newPost(params) {
  console.log(params)

  return (
    <>
      {/* HEADER */}
      <Header />
      <main>
        {/* HERO SECTION */}
        <Hero />
        {/* FIRST SECTION */}
        <div className="container">
          <h1>PAGINA POST</h1>
        </div>
      </main>
      {/* FOOTER */}
      <Footer />
    </>
  );
}
