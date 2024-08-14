import Styles from "./page.module.css";
import { notFound } from "next/navigation";
import Header from "../../../../components/Header";
import Footer from "../../../../components/Footer";
import { remark } from 'remark';
import html from 'remark-html';
import strip from 'strip-markdown';
import Hero from "../../../../components/Hero";
import { cookies } from "next/headers";
import Article from "./Components/Article";
import siteConfig from "../../../../siteConfig.json"


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
      description: await remark().use(strip).process(articleObject.testo),
      copyright: articleObject.author,
      creator: articleObject.author,
      openGraph: {
        title: articleObject.titolo,
        description: await remark().use(strip).process(articleObject.testo),
        url: siteConfig.site.baseUri,
        siteName: 'XDefiant Italia - Community',
        images: [
          {
            url: articleObject.imageUrl, // Must be an absolute URL
            width: 800,
            height: 600,
          },
          {
            url: articleObject.imageUrl, // Must be an absolute URL
            width: 1800,
            height: 1600,
            alt: 'Background XDefiant Italia',
          },
        ],
        locale: 'it_IT',
        type: 'website',
      },
    }
  }
  catch (error) {
    console.log(error)
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

  const schemaSite = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": `${postData.titolo}`,
    "description": `${postData.testo}`,
    "author": {
      "@type": "Person",
      "name": `${postData.author}`
    },
    "datePublished": `${createdDate.getFullYear()}-${monthCreate}-${dayCreate}T:${hourCreate}:${minuteCreate}`,
    "dateModified": `${createdDate.getFullYear()}-${monthCreate}-${dayCreate}T:${hourCreate}:${minuteCreate}`,
    "publisher": {
      '@type': 'Organization',
      'name': 'XDefiant Italia',
      'logo': '/header-images/logo.webp',
      'keywords': 'xdefiant italia, xdefiant, news xdefiant italia, news, tornei, community, discord',
      'founder': [{
        '@type': 'Person',
        'name': 'Gabriele Mario Tosto',
        'description': 'CEO e Developer di XDefiant Italia, lavora attualmente come sviluppatore attivo.',
        'jobTitle': 'Software Engineer',
        'givenName': 'Gabriele',
        'email': 'gabriele.tosto@outlook.com'
      }]
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://playxdefiant.it/posts/${params.titolo}`
    },
    "image": {
      "@type": "ImageObject",
      "url": `${postData.imageUrl}`,
      "height": 720,
      "width": 1280
    }
  }


  return (
    <>

      <section id="upPage"></section>
      {/* HEADER */}
      <Header />
      {/* HERO SECTION */}
      <Hero />
      <Article titolo={postData.titolo} day={dayCreate} month={monthCreate} year={createdDate.getFullYear()} hour={hourCreate} minute={minuteCreate} author={postData.author} id={postData.id} html={contentHtml} testoNoHtml={postData.testo} adminLevel={userData.admin_level} author_id={postData.utenteId} request_username={userData.username} request_id={userData.id_utente} post_id={postData.id} image={postData.imageUrl} />
      <Footer />
      <script
        id="page-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaSite),
        }}
      />
    </>
  );
}

async function getData(params) {
  try {
    const res = await fetch(`http://localhost:3000/api/post?uri=${params.titolo}`, { next: { revalidate: 1 } });

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
  const res = await fetch(`http://localhost:3000/api/adminCheck?email=${email}&authToken=${auth}`, { next: { revalidate: 1 } });

  if (res.status === 200) {
    const { admin_level, username, id_utente } = await res.json();
    if (admin_level) {
      return { admin_level, username, id_utente };
    }
    else {
      return null;
    }

  } else {
    return null;
  }
}
