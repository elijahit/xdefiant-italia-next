import styles from "./page.module.css";
import Header from "../../../../components/Header";
import Footer from "../../../../components/Footer";
import Hero from "../../../../components/Hero";
import Image from "next/image";
import CardNewsHeader from "../../../../components/CardNewsHeader"
import { notFound, redirect } from "next/navigation";
import { cookies } from 'next/headers'
import db from "../../../../scripts/database";

export default async function newPost(params) {
  const auth = cookies().get("authToken")?.value;
  const email = cookies().get("email")?.value;

  let res = await db.get("SELECT * FROM utente WHERE email = ? AND authorization_token = ?", email, auth);
  if (!res || res?.admin_level < 2) {
    if (res?.admin_level < 2) {
      return redirect("/");
    }
    return redirect("/admin/login");
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
          <h1 className="fs-4 text-center mt-3 mb-5">AREA REDAZIONE</h1>
          <form className={styles.form + " mb-5"}>
            <div className="mb-3">
              <input type="text" className={"form-control"} id="titolo" name="titolo" placeholder="Titolo" required />
            </div>
            <div className="row">
              <div className="col-9">
                <div>
                  <textarea className="form-control mb-3" placeholder="Inserisci qui il tuo contenuto" id="contenuto" name="contenuto" rows={20}></textarea>
                </div>
              </div>
              <div className="col-3">
                TESTO MARKDOWN
              </div>
            </div>
            <div className="mb-5">
              <input type="text" className={"form-control"} id="image" name="image" placeholder="Link immagine" required />
            </div>
            <div className="d-flex justify-content-center mb-5">
              <svg width="267" height="1" viewBox="0 0 267 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="-0.00390625" y1="0.5" x2="267.004" y2="0.5" stroke="white" />
              </svg>
            </div>
            <div className="d-flex justify-content-end">
              <button type="submit" className="btn ps-5 pe-5">Pubblica ora</button>
            </div>
          </form>
        </div>
      </main>
      {/* FOOTER */}
      <Footer />
    </>
  );
}
