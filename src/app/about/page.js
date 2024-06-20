import styles from "./page.module.css";
import Header from "../../../components/Header";

export default function Home() {
  return (
    <>
    <main>
      <Header isPage="about"></Header>
      <div id="heroComponents" className={styles.hero + " d-flex flex-column justify-content-center align-items-center"}>
        <h1>TESTO SEGNAPOSTO</h1>
      </div>
    </main>
    </>
  );
}
