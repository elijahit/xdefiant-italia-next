import styles from "./page.module.css";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import Hero from "../../../components/Hero";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function Home() {
  const postData = await getData();
  const postDataAll = await getDataAll();

  const schemaSite = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    url: "https://playxdefiant.it/news",
    image: "/header-images/logo.webp",
    name: "XDefiant Italia - Termini di Servizio",
    description: "Termini di Servizio di XDefiant Italia",
    isPartOf: {
      "@type": "WebSite",
      url: "https://playxdefiant.it",
      name: "XDefiant Italia",
    },
    publisher: {
      "@type": "Organization",
      name: "XDefiant Italia",
      logo: "/header-images/logo.webp",
      keywords:
        "xdefiant italia, xdefiant, news xdefiant italia, news, tornei, community, discord",
      founder: [
        {
          "@type": "Person",
          name: "Gabriele Mario Tosto",
          description:
            "CEO e Developer di XDefiant Italia, lavora attualmente come sviluppatore attivo.",
          jobTitle: "Software Engineer",
          givenName: "Gabriele",
          email: "gabriele.tosto@outlook.com",
        },
      ],
    },
  };

  return (
    <>
      {/* HEADER */}
      <Header></Header>
      <main>
        {/* HERO SECTION */}
        <Hero />
        <h1 className="d-none">Termini di Servizio di PlayXDefiant.it</h1>
        {/* FIRST SECTION DESKTOP*/}
        <section className="container mt-4 d-none d-lg-block">
          <h1 className="text-center">Termini di Servizio di PlayXDefiant.it</h1>
          <p>
            <strong>Data dell&apos;ultimo aggiornamento:</strong> 31 luglio 2024
          </p>

          <h2>1. Accettazione dei Termini</h2>
          <p>
            Accedendo e utilizzando PlayXDefiant.it (&quot;Sito&quot;), il server Discord
            (&quot;Server&quot;) e il tracker delle statistiche del gioco XDefiant
            (&quot;Tracker&quot;), accetti di essere vincolato da questi Termini di
            Servizio (&quot;Termini&quot;). Se non accetti questi Termini, ti preghiamo di
            non utilizzare i nostri servizi.
          </p>

          <h2>2. Modifiche ai Termini</h2>
          <p>
            Ci riserviamo il diritto di modificare questi Termini in qualsiasi
            momento. Le modifiche saranno pubblicate su questa pagina e la data
            dell&apos;ultimo aggiornamento sarà indicata in cima ai Termini.
            Continuando a utilizzare i nostri servizi dopo la pubblicazione
            delle modifiche, accetti i Termini aggiornati.
          </p>

          <h2>3. Utilizzo del Sito e dei Servizi</h2>
          <h3>3.1. Registrazione</h3>
          <p>
            Per accedere a determinati servizi, potrebbe essere necessario
            creare un account. Sei responsabile della riservatezza delle
            informazioni del tuo account e di tutte le attività che si
            verificano sotto il tuo account.
          </p>

          <h3>3.2. Contenuti dell&apos;Utente</h3>
          <p>
            Gli utenti possono pubblicare contenuti sul Sito e sul Server. Non
            tolleriamo contenuti offensivi, illegali, diffamatori, osceni,
            minacciosi, invadenti della privacy altrui o che violino i diritti
            di proprietà intellettuale.
          </p>

          <h3>3.3. Comportamento</h3>
          <p>
            Gli utenti devono comportarsi in modo rispettoso e civile. Sono
            proibiti comportamenti molesti, abusivi, offensivi o discriminatori.
          </p>

          <h2>4. Proprietà Intellettuale</h2>
          <p>
            Tutti i contenuti, i marchi, i loghi e altri materiali presenti su
            PlayXDefiant.it sono di proprietà dei rispettivi titolari. Non è
            consentito utilizzare, riprodurre o distribuire tali materiali senza
            autorizzazione.
          </p>

          <h2>5. Limitazione di Responsabilità</h2>
          <h3>5.1. Esclusione di Garanzie</h3>
          <p>
            I servizi sono forniti "così come sono" e "come disponibili". Non
            garantiamo che i servizi saranno ininterrotti o privi di errori.
          </p>

          <h3>5.2. Limitazione di Danni</h3>
          <p>
            In nessun caso saremo responsabili per danni indiretti, incidentali,
            speciali, consequenziali o punitivi, inclusi, ma non limitati a,
            perdita di profitti, dati o altre perdite intangibili derivanti
            dall&apos;uso o dall&apos;impossibilità di utilizzare i servizi.
          </p>

          <h2>6. Privacy</h2>
          <p>
            Ci impegniamo a proteggere la tua privacy. Per ulteriori
            informazioni su come raccogliamo, utilizziamo e proteggiamo i tuoi
            dati personali, consulta la nostra Informativa sulla <a href="/privacy">privacy</a>.
          </p>

          <h2>7. Norme Specifiche per il Server Discord</h2>
          <h3>7.1. Comportamento</h3>
          <p>
            Gli utenti devono seguire le linee guida e le regole stabilite dai
            moderatori del Server. Sono proibiti spam, pubblicità non
            autorizzata e comportamenti molesti.
          </p>

          <h3>7.2. Sanzioni</h3>
          <p>
            Violazioni delle regole del Server possono comportare l&apos;espulsione
            temporanea o permanente.
          </p>

          <h2>8. Norme Specifiche per il Tracker delle Statistiche</h2>
          <h3>8.1. Accuratezza dei Dati</h3>
          <p>
            Non garantiamo la completezza o l&apos;accuratezza dei dati forniti dal
            Tracker.
          </p>

          <h3>8.2. Uso dei Dati</h3>
          <p>
            I dati del Tracker sono destinati a uso personale e non commerciale.
            Non è consentito utilizzare i dati per scopi illeciti o non
            autorizzati.
          </p>

          <h2>9. Legge Applicabile</h2>
          <p>
            Questi Termini sono regolati dalle leggi italiane. Qualsiasi
            controversia derivante da questi Termini sarà soggetta alla
            giurisdizione esclusiva dei tribunali italiani.
          </p>

          <h2>10. Contatti</h2>
          <p>
            Per domande o chiarimenti riguardanti questi Termini, contattaci
            all&apos;indirizzo info@playxdefiant.it.
          </p>
        </section>
      </main>
      {/* FOOTER */}
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

async function getData() {
  try {
    const res = await fetch(`http://localhost:3000/api/postNews?limit=2`, {
      next: { revalidate: 1 },
    });

    return await res.json();
  } catch {
    notFound();
  }
}

async function getDataAll() {
  try {
    const res = await fetch(`http://localhost:3000/api/postNews`, {
      next: { revalidate: 1 },
    });

    return await res.json();
  } catch {
    notFound();
  }
}
