import styles from "./page.module.css";
import Header from "../../../../components/Header";
import Footer from "../../../../components/Footer";
import Hero from "../../../../components/Hero";
import Image from "next/image";
import CardNewsHeader from "../../../../components/CardNewsHeader"
import { notFound } from "next/navigation";

export default async function Home() {
  const postData = await getData();
  const postDataAll = await getDataAll();

  return (
    <>
      {/* HEADER */}
      <Header />
      <main>
        {/* HERO SECTION */}
        <Hero />
        {/* FIRST SECTION */}
        <div className="container">
          <h5 className="fs-5 text-center mb-5 mt-4">AREA RISERVATA ALLO STAFF</h5>
          <form className={styles.form + " mb-5"}>
            <div className="mb-3">
              <input type="email" className="form-control" id="floatingInput" placeholder="Email" required/>
            </div>
            <div className="mb-3">
              <input type="password" className="form-control" id="floatingPassword" placeholder="Auth Token" required/>
            </div>
            <div className="d-flex justify-content-center">
              <button type="submit" class="btn ps-5 pe-5">Accedi</button>
            </div>
          </form>
        </div>
      </main>
      {/* FOOTER */}
      <Footer />
    </>
  );
}


async function getData() {
  try {
    const res = await fetch(`http://localhost:3000/api/postNews?limit=2`);

    return await res.json();
  } catch {
    notFound();
  }
}

async function getDataAll() {
  try {
    const res = await fetch(`http://localhost:3000/api/postNews`);

    return await res.json();
  } catch {
    notFound();
  }
}