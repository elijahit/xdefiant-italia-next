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
    name: "XDefiant Italia - Discord",
    description:
      "Discod ufficiale di XDefiant Italia, vieni subito e trova i tuoi teammate per le tue partite sul titolo!",
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
        <h1 className="d-none">Privacy Policy di XDefiant Italia</h1>
        {/* FIRST SECTION DESKTOP*/}
        <section className="container mt-4 d-none d-lg-block">
          <h1 className="text-center">Informativa sulla Privacy</h1>
          <p>
            Benvenuti su XDefiant Italia (playxdefiant.it). La tua privacy è
            importante per noi. Questa Informativa sulla Privacy spiega come
            raccogliamo, utilizziamo, divulghiamo e proteggiamo i tuoi dati
            personali in conformità al Regolamento Generale sulla Protezione dei
            Dati (GDPR).
          </p>

          <h2 className="text-center">Chi Siamo</h2>
          <p>
            PlayXDefiant.it è un portale dedicato al gioco e agli aggiornamenti
            di XDefiant in Italia, non è in alcun modo affiliato a Ubisoft
            Entertainment. Per qualsiasi domanda o richiesta relativa alla
            privacy, puoi contattarci all&apos;indirizzo email:{" "}
            <a href="mailto:info@playxdefiant.it">info@playxdefiant.it</a>.
          </p>

          <h2 className="text-center">Dati Personali che Raccogliamo</h2>
          <p>
            Raccogliamo diversi tipi di dati personali, inclusi ma non limitati
            a:
          </p>
          <ul>
            <li>
              <strong>Informazioni di contatto:</strong> nome, indirizzo email,
              numero di telefono.
            </li>
            <li>
              <strong>Dati di navigazione:</strong> indirizzo IP, tipo di
              browser, pagine visitate, tempo di permanenza.
            </li>
            <li>
              <strong>Informazioni fornite volontariamente:</strong> commenti,
              feedback, richieste di supporto.
            </li>
          </ul>

          <h2 className="text-center">Come Utilizziamo i Dati Personali</h2>
          <p>I tuoi dati personali possono essere utilizzati per:</p>
          <ul>
            <li>Fornire e migliorare i nostri servizi.</li>
            <li>Rispondere alle tue richieste e fornire supporto.</li>
            <li>
              Inviare aggiornamenti e comunicazioni relative ai nostri servizi.
            </li>
            <li>
              Analizzare e monitorare l&apos;uso del sito per migliorare
              l&apos;esperienza utente.
            </li>
          </ul>

          <h2 className="text-center">
            Base Giuridica per il Trattamento dei Dati
          </h2>
          <p>
            Trattiamo i tuoi dati personali solo se abbiamo una base giuridica
            per farlo. Le basi giuridiche includono:
          </p>
          <ul>
            <li>Il tuo consenso.</li>
            <li>L&apos;adempimento di un contratto.</li>
            <li>L&apos;adempimento di obblighi legali.</li>
            <li>
              I nostri legittimi interessi, purché non prevalgano i tuoi diritti
              e libertà fondamentali.
            </li>
          </ul>

          <h2 className="text-center">Condivisione dei Dati Personali</h2>
          <p>
            Non vendiamo, scambiamo o trasferiamo i tuoi dati personali a terze
            parti senza il tuo consenso, tranne nei casi previsti dalla legge o
            se necessario per fornire i nostri servizi.
          </p>

          <h2 className="text-center">Google AdSense</h2>
          <p>
            Questo sito utilizza Google AdSense, un servizio di pubblicità
            fornito da Google Inc. Google AdSense utilizza i &quot;cookie&quot;, file di
            testo che vengono depositati sul tuo computer per consentire al sito
            web di analizzare come gli utenti utilizzano il sito. Le
            informazioni generate dal cookie sull&apos;utilizzo del sito web da parte
            tua (compreso il tuo indirizzo IP) verranno trasmesse e depositate
            presso i server di Google negli Stati Uniti. Google utilizzerà
            queste informazioni allo scopo di tracciare ed esaminare l&apos;utilizzo
            del sito web, compilare report sulle attività del sito web per gli
            operatori del sito web e fornire altri servizi relativi alle
            attività del sito web e all&apos;utilizzo di Internet.
          </p>
          <p>
            Google può anche trasferire queste informazioni a terzi ove ciò sia
            imposto dalla legge o laddove tali terzi trattino le suddette
            informazioni per conto di Google. Google non assocerà il tuo
            indirizzo IP a nessun altro dato posseduto da Google. Puoi rifiutare
            di usare i cookie selezionando l&apos;impostazione appropriata sul tuo
            browser, ma ciò potrebbe impedirti di utilizzare tutte le
            funzionalità di questo sito web. Utilizzando il presente sito web,
            acconsenti al trattamento dei tuoi dati da parte di Google per le
            modalità e i fini sopraindicati.
          </p>

          <h2 className="text-center">Diritti dell&apos;Interessato</h2>
          <p>Hai il diritto di:</p>
          <ul>
            <li>Accedere ai tuoi dati personali.</li>
            <li>Richiedere la rettifica o la cancellazione dei tuoi dati.</li>
            <li>Opporsi al trattamento dei tuoi dati.</li>
            <li>Richiedere la limitazione del trattamento.</li>
            <li>Richiedere la portabilità dei dati.</li>
          </ul>
          <p>
            Per esercitare i tuoi diritti, puoi contattarci all&apos;indirizzo
            email:{" "}
            <a href="mailto:info@playxdefiant.it">info@playxdefiant.it</a>.
          </p>

          <h2 className="text-center">Sicurezza dei Dati</h2>
          <p>
            Adottiamo misure di sicurezza adeguate per proteggere i tuoi dati
            personali da accessi non autorizzati, alterazioni, divulgazioni o
            distruzioni.
          </p>

          <h2 className="text-center">Modifiche a Questa Informativa</h2>
          <p>
            Ci riserviamo il diritto di aggiornare questa Informativa sulla
            Privacy. Eventuali modifiche saranno pubblicate su questa pagina. Ti
            invitiamo a consultare periodicamente questa Informativa per
            rimanere informato su come proteggiamo i tuoi dati.
          </p>

          <h2 className="text-center">Contatti</h2>
          <p>
            Per domande o richieste relative a questa Informativa sulla Privacy,
            contattaci all&apos;indirizzo email:{" "}
            <a href="mailto:info@playxdefiant.it">info@playxdefiant.it</a>.
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
