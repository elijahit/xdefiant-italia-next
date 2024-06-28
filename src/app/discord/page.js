import styles from "./page.module.css";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import Hero from "../../../components/Hero";
import Image from "next/image";
import CardNewsHeader from "../../../components/CardNews"
import { notFound } from "next/navigation";

export default async function Home() {
  const postData = await getData();
  const postDataAll = await getDataAll();

  return (
    <>
      {/* HEADER */}
      <Header isPage="discord"></Header>
      <main>
        {/* HERO SECTION */}
        <Hero />
        {/* FIRST SECTION DESKTOP*/}
        <section className="d-none d-lg-block">
          <div className="position-relative h-100">
            <iframe className="rounded-4 position-absolute top-50 start-50 translate-middle" src="https://discord.com/widget?id=1124809941744619602&theme=dark" width={"25%"} height="80%" allowtransparency="true" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>
            <Image src={"/discord-images/image.png"} alt="Banner discord" className="img-fluid" width={0} height={0} sizes="100" style={{ width: '100vw', height: 'auto' }}></Image>
          </div>
        </section>
        {/* FIRST SECTION MOBILE */}
        <section className="d-flex justify-content-center d-block d-lg-none">
          <a href="https://discord.com/servers/xdefiant-italia-1124809941744619602">
            <Image src={"/discord-images/discordbannerMobile.png"} alt="Banner discord" className="img-fluid" width={0} height={0} sizes="100" style={{ width: '100vw', height: 'auto' }}></Image>
          </a>
        </section>
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