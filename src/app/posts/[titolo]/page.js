import Styles from "./page.module.css";
import { notFound } from "next/navigation";
import Header from "../../../../components/Header";
import Footer from "../../../../components/Footer";
import AdminCommands from "./Components/AdminCommandsPosts";
import { remark } from 'remark';
import html from 'remark-html';
import Hero from "../../../../components/Hero";
import { cookies } from "next/headers";

export async function generateMetadata({ params, }) {
  try {
    // read route params
    const res = await getData(params);

    const articleObject = {
      id: res.id_article,
      titolo: res.titolo,
      testo: res.testo,
      utenteId: res.id_utente,
      imageUrl: res.imageUrl,
      author: res.username,
      emailAuthor: res.email,
      discordAuthor: res.discord_name
    }

    return {
      title: articleObject.titolo,
      description: articleObject.testo,
      copyright: articleObject.author
    }
  }
  catch {
    notFound();
  }
}

export default async function Page({ params }) {

  const postData = await getData(params);
  const userData = await getDataUser();

  const processedContent = await remark()
    .use(html)
    .process(postData.testo);
  const contentHtml = processedContent.toString();

  // GESTIAMO LE DATE
  const createdDate = new Date(+postData.createdAt);

  const dayCreate = createdDate.getDate() >= 10 ? createdDate.getDate() : `0${createdDate.getDate()}`;
  const monthCreate = createdDate.getMonth() + 1 >= 10 ? createdDate.getMonth() + 1 : `0${createdDate.getMonth() + 1}`;

  const hourCreate = createdDate.getHours() >= 10 ? createdDate.getHours() : `0${createdDate.getHours()}`;
  const minuteCreate = createdDate.getMinutes() >= 10 ? createdDate.getMinutes() : `0${createdDate.getMinutes()}`;


  return (
    <>
      
      <section id="upPage"></section>
      {/* HEADER */}
      <Header />
      {/* HERO SECTION */}
      <Hero />
      <div className="container mt-2">
        {userData != null ? <AdminCommands adminLevel={userData.admin_level} author={postData.author} author_id={postData.utenteId} request_username={userData.username} request_id={userData.id_utente} post_id={postData.id}/> : ""}
        <article>
          <h1 className="fs-4 text-center">{postData.titolo}</h1>
          <div className="d-flex justify-content-center align-items-center">
            <p className={Styles.author}>
              {dayCreate}/{monthCreate}/{createdDate.getFullYear()} | {hourCreate}:{minuteCreate} - {postData.author}
            </p>
          </div>
          <div className="mb-5" dangerouslySetInnerHTML={{ __html: contentHtml }} />
        </article>
      </div>
      <div className="d-lg-none mb-2">
        <img className="img-fluid" src={postData.imageUrl}></img>
      </div>
      <div className={Styles.banner + " mb-2 d-none  d-lg-block"} style={{backgroundImage: `url(${postData.imageUrl})`}}>
      </div>
      <div className="container">
        <div className="d-flex justify-content-center justify-content-lg-end">
          <a href="#upPage" className={Styles.buttonUp + " mb-5"}>Torna all&apos;inizio</a>
        </div>
      </div>
      <Footer />
    </>
  );
}

async function getData(params) {
  try {
    const res = await fetch(`http://localhost:3000/api/post?uri=${params.titolo}`);

    const { id_article, titolo, testo, id_utente, image_url, created_at, username, email, discord_name } = await res.json();

    const articleObject = {
      id: id_article,
      titolo: titolo,
      testo: testo,
      utenteId: id_utente,
      imageUrl: image_url,
      createdAt: created_at,
      author: username,
      emailAuthor: email,
      discordAuthor: discord_name
    }

    return articleObject;
  } catch {
    notFound();
  }
}

export async function getDataUser() {
  // Esegui una richiesta API lato server
  const email = cookies().get('email')?.value;
  const auth = cookies().get('authToken')?.value;
  if (!auth && !email) return 0;
  const res = await fetch(`http://localhost:3000/api/adminCheck?email=${email}&authToken=${auth}`);
  
  if (res.status === 200) {
    const { admin_level, username, id_utente } = await res.json();
    if(admin_level) {
      return {admin_level, username, id_utente};
    }
    else {
      return null;
    }

  } else {
    return null;
  }
}
