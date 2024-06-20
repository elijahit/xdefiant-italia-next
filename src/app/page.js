import styles from "./page.module.css";
import Header from "../../components/Header";


export default function Home() {
  return (
    <>
      <main>
        {/* HEADER */}
        <Header isPage="home"></Header>
        {/* HERO SECTION */}
        <div id="heroComponents" className={styles.hero + " d-flex flex-column justify-content-center align-items-center mb-5"}>
          <h1>TESTO SEGNAPOSTO</h1>
        </div>
        {/* FIRST SECTION */}
        <div className="container">
          <p className="text-center mb-5">
            Siamo la community italiana di XDefiant, attiva dal 2021, dedicata a tenere i giocatori aggiornati su novità, eventi speciali e competizioni del gioco. Utilizziamo vari canali social per informare la community e creare un ambiente accogliente dove condividere esperienze, strategie e partecipare a tornei. Invitiamo tutti i fan a unirsi a noi per rimanere aggiornati e far parte di una community vibrante e attiva.
          </p>
        </div>
      </main>
    </>
  );
}
