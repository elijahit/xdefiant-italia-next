import { notFound } from "next/navigation";
import Header from "../../../../components/Header";
import Footer from "../../../../components/Footer";
import { remark } from 'remark';
import html from 'remark-html';
export async function generateMetadata({ params, }, parent) {
  try {
    // read route params
    const res = await fetch(`http://localhost:3000/api/post?uri=${params.titolo}`);

    const { id_article, titolo, testo, id_utente, image_url, username, email, discord_name } = await res.json();

    const articleObject = {
      id: id_article,
      titolo: titolo,
      testo: testo,
      utenteId: id_utente,
      imageUrl: image_url,
      author: username,
      emailAuthor: email,
      discordAuthor: discord_name
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

  const processedContent = await remark()
    .use(html)
    .process(postData.testo);
  const contentHtml = processedContent.toString();

  return (
    <>
      <Header />
      <div className="container mt-5">
        <article>
          <h1 className="fs-2 text-center">{postData.titolo}</h1>
          <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
          <p className="text-end text-secondary">{postData.author} - Redazione di playxdefiant.it</p>
        </article>
      </div>
      <Footer />
    </>
  );
}

async function getData(params) {
  try {
    const res = await fetch(`http://localhost:3000/api/post?uri=${params.titolo}`);

    const { id_article, titolo, testo, id_utente, image_url, username, email, discord_name } = await res.json();

    const articleObject = {
      id: id_article,
      titolo: titolo,
      testo: testo,
      utenteId: id_utente,
      imageUrl: image_url,
      author: username,
      emailAuthor: email,
      discordAuthor: discord_name
    }

    return articleObject;
  } catch {
    notFound();
  }
}
