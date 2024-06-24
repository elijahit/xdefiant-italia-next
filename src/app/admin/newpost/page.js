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
    if(!res || res?.admin_level < 2) {
      if(res?.admin_level < 2) {
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
          <h1>PAGINA POST</h1>
        </div>
      </main>
      {/* FOOTER */}
      <Footer />
    </>
  );
}
