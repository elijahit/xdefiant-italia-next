import styles from "./page.module.css";
import Header from "../../../../components/Header";
import Footer from "../../../../components/Footer";
import Hero from "../../../../components/Hero";
import Image from "next/image";
import CardNewsHeader from "../../../../components/CardNewsHeader"
import { notFound } from "next/navigation";

export default async function LoginStaff(params) {

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
          <form method="GET" action={"/api/loginAdmin"} className={styles.form + " mb-5"}>
            {params.searchParams.error == "invalid" ? <p className="text-danger"><i className="bi bi-exclamation-octagon"></i> I dati inseriti non sono corretti, riprova.</p> : <p></p>}
            <div className="mb-3">
              <input type="email" className={params.searchParams.error == "invalid" ? "is-invalid" +  " form-control" : "form-control"}  id="email" name="email" placeholder="Email" required/>
            </div>
            <div className="mb-3">
              <input type="password" className={params.searchParams.error == "invalid" ? "is-invalid" +  " form-control" : "form-control"} id="auth" name="authToken" placeholder="Auth Token" required/>
            </div>
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn ps-5 pe-5">Accedi</button>
            </div>
          </form>
        </div>
      </main>
      {/* FOOTER */}
      <Footer />
    </>
  );
}
