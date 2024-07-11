"use client"
import styles from "./page.module.css";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import Hero from "../../../components/Hero";
import { useState } from "react";

export default function Home() {
  const schemaSite = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "url": "https://playxdefiant.it/news",
    "image": '/header-images/logo.webp',
    "name": "XDefiant Italia - Tracker",
    "description": "Tracker ufficiale di XDefiant Italia per vedere l'andamento del proprio account su XDefiant",
    "isPartOf": {
      "@type": "WebSite",
      "url": "https://playxdefiant.it",
      "name": "XDefiant Italia"
    },
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
    }
  }
  const [platform, setPlatform] = useState(0);

  function platformHandling(e, p) {
    e.preventDefault();
    setPlatform(p);

  }

  return (
    <>
      {/* HEADER */}
      <Header isPage="tracker"></Header>
      <main>
        {/* HERO SECTION */}
        <Hero />
        {/* FIRST SECTION */}
        <h1 className="d-none">XDEFIANT ITALIA TRACKER</h1>
        <h1 className="fs-4 text-center mt-3 mb-3">XDEFIANT ITALIA TRACKER</h1>
        <form action={"/api/statsGetUsers"} method="get">
          <div className="container mb-5">
            <div className="row g-3 justify-content-center align-items-center">
              <div className={"col-auto d-flex gap-2 " + styles.searchbackground}>
                <button onClick={(e) => platformHandling(e, 0)} className={platform == 0 ? styles.btnCustomActive : styles.btnCustom}><i class="bi bi-pc"></i></button>
                <button onClick={(e) => platformHandling(e, 1)} className={platform == 1 ? styles.btnCustomActive : styles.btnCustom}><i class="bi bi-playstation"></i></button>
                <button onClick={(e) => platformHandling(e, 2)} className={platform == 2 ? styles.btnCustomActive : styles.btnCustom}><i class="bi bi-xbox"></i></button>
              </div>
              <div className="col-auto p-0">
                <div class="input-group">
                  <input onSubmit={() => true} type="text" id="inputAccountSearch" name="username" className="form-control rounded-0" />
                  <span class="input-group-text"><i className="bi bi-search"></i></span>
                  <input className="d-none" type="text" name="platform" value={platform == 0 ? "uplay" : platform == 1 ? "psn" : platform == 2 ? "xbl" : ""}/>
                </div>
              </div>
            </div>
          </div>
        </form>
        <div className="container">
          <p className="fs-5">Benvenuto nel tracker ufficiale di XDefiant Italia! Questo è il tuo punto di riferimento per monitorare tutte le tue statistiche di gioco in XDefiant. Che tu sia un veterano della serie o un nuovo giocatore, qui troverai tutte le informazioni necessarie per analizzare le tue prestazioni, confrontarti con altri giocatori e migliorare le tue abilità. Scopri il numero di vittorie, le tue percentuali di precisione, i tuoi punteggi migliori e molto altro ancora. Con il nostro tracker, avrai sempre sotto controllo la tua evoluzione nel gioco. Unisciti alla community di XDefiant Italia e porta il tuo gioco al livello successivo!</p>
          <div className="row mb-5">
            <h2 className="text-center fs-4">Seguici su Discord per rimanere aggiornato</h2>
            <div className="d-flex justify-content-center">
              <button className="btn btn-primary">Discord</button>
            </div>
          </div>
        </div>
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



/*
// GET /v1/profiles/<profileId>/stats?spaceId=e3014688-25dd-4a03-ae5a-82e80eb5053c
    // Host: public-ubiservices.ubi.com
    // Authorization: Ubi_v1 t=yourUbisoftTicket
    // Ubi-AppId: 4bc245f2-b998-4574-9574-6ab93ec9e44c
    const profileId = 'b67b8ca5-1ba7-4899-9d1d-beef4e0b1977';  // Sostituisci con il profilo ID reale
    const spaceId = 'e3014688-25dd-4a03-ae5a-82e80eb5053c';
    const yourUbisoftTicket = 'ewogICJ2ZXIiOiAiMSIsCiAgImFpZCI6ICI0YmMyNDVmMi1iOTk4LTQ1NzQtOTU3NC02YWI5M2VjOWU0NGMiLAogICJlbnYiOiAiUHJvZCIsCiAgInNpZCI6ICI5ZmFjNDAwZS02OWJlLTQyMDAtYjJhNS1mMjhiYjdmZmE1YmQiLAogICJ0eXAiOiAiSldFIiwKICAiZW5jIjogIkExMjhDQkMiLAogICJpdiI6ICJvZ0JiZ0pHYVRHWkVYM1pjTEdIZXd3IiwKICAiaW50IjogIkhTMjU2IiwKICAia2lkIjogIjY4NDIyNzQxLTA3ZWQtNDdmNy1iNTJmLTNhMDUyMWExZmQ3MiIKfQ.oD1drzt-yBx1j5KUtTKtVGksVYTGRlxRUZ-PnlNXTGY0ou8jAZiKCendmLbCNriTtuiOUBtwUbYEbkUHtuM51rEZVM9KWRwTAjp3ougapQ_wfUiTQzxrRNDuMrlPu9owFmahfGulTViOZk5ngWX_Mud0FgIe2SduGKptPt1cY8kh1UircjmONs90KjK02bvosIxctBhVYD1LRTfzUY9wyOapsBh9JvonKzf73R_AoqEDKoegVW4354XNuMI73kjweQ37EwLwLG_yxm5vjCOL3Eqe_oDUxR3uKmKz2S098xFWJ-rRDPA5Z8NQ-acVE3KAPs_5QcCEjhYdmlF23DgLDXk2QL8pUV6vIdxih4uzuwiJcd5GGYRadxT6B8Pb7IExOcZWsSE45LXPxLaEbjpwBbQXRX_R2Ec_ZCmU5hG5JfTruUOMilPA9XK9BVufDWAzf72URvtr2u2KhvFyEIuQZdHerzD1RcgUdaxrwo-S1ldfO19z-7sGyeZSXfn4UvulBnfL5yXjh5S9TVhJR3gHQCyseJA9xGrOSBeLP4CQ2BhVFQmqs2kr-tdKInr0F8cJpP7E86Zq4PxUzgoPhCUm2dtxnNDZsxfKcmMu8HEytzKi5dWkk8dwGorEOmlwhdx7oDAh23niE5o_8GU3-hZWASIICuqPHo8FnsR-kG3M7Y8uMlzeJZs2a-Mfz_NbP4xszuLHo2x7l3r7q8xKfJwm4b78syzwgu2YApgoQaNXLyY_sC0Iwp2tVr-PoksBB7W07Oatx2POxLnlEiOS3tvomBs3ZGnPHYX3wv8yTriKTjx4olO5aI86mD0fh7U0-1lWqVEwJPEHprAMb-Oim2tXYnhf98abQcWi0qD6xbJ5GRr1bsCQPX7236p_iMQayTxJWUNmbzzLrin7Qbr_iu729jjxIM3O85d25YaOM1EhXTZZJWfbaW19p3m0cKNzGJdXqCMvZDYbkLAdsv6raR2WO56O_BZHpVIPJhFjZKDJZTe6Oz0vNlc25qod8qsEiPSlszj62flYOQ54PfmVh8198LncZttKjUDQ5aMF4SP1r405OtNnE3a1VWRtAewiqbqUJQJ5WpLviI7hmQ2el_QizLlS-ZzkDPKmQoP7kPWLzslWya_0Z7ADZaCDN6NISBRicvXyINRxbjzKnRoJu5koS5mousHViJjT0C8oMNSgCJ5YGVdl4kVuL8ttTJIHz8Cqkmq0LaoBwYN6wKfOo83nS6p_MP9gAYw7426HjFnX8Wg1OB7gzjLPwokQWPhyWo-1_LtG5cBSvGF_rznmtlVMxRmhHaJM6-L2a9afHeQK9QAbGyk-RYKJ2Igg-YAKNdQYuZDsPczHB97QgYzqoOk23mbRy4B2y54RJRBmy47HSJi-1VomfO6EWtHG1v_pjsACOneyacIuWn9iO9BYp2p0HIIMwqhJG9LdyoQG4SpiJWBwUk_fWxnzL1qv8j9C3fGgHTGM4p0LHVIoiHRhYjlH-s61yBx8izRxc7sNPpHsPU_347hVwQ8F69IthZKA8GyG1DpAC3eB6IQrHXgAQE7e36_nxApIc-XVGDFnoBW2l1JC0ubGZy87s9UjH5tSnvONABseklKs7XyFaanICplNbaG3n3EYSP-wm2ps1EuL5L2ZFsQeh1lTYehexP68sOvRViJ2ZmpJgmpL4zn0Xed68O-B81uvyA0B-emPMiYqEMiprgkRH2uFSx0iMlVgvrdvixd7P6D9CF31wqsKzBiXmM4ZzHyPoy1ZdXlldtBO4W27zVuFm0w31YXD9VCPTRZbueQ50Y6bFXWI1LrYFOAWRBKNoqtH5hH6IsG37IhzeCp7VTJ-4XzSSU97JAoIQfwS6Y83GQjmvO6maEOow-0Uu9n41xfjr0rTaZjW6joXScCwFtHrfKhPki7zKJZUhVS6XGt-pQPFHJeSo-Do64uvSlMpkOx4k_kskzgdoyhmeP04kO6v9m3AkQTfR7mVgFIvYva6EzEFW7gSKUUucFUCy9oYxa9usUVhGjRZWmMTZHssXcQFPdsitqPTdmuIL1rogJOfFLXp87wNVQqinTk4ZIO7-JMbqu1WG1IL9rOyCf02-j_6EEW8Jf9Zz0jux9ByM14-TfRSdDT7m5yfe-ITtLKjUrjk2sKMHoGsVEefKJjSoaebR8g271DtogNl3hZhlgptEgBcIwiHgKH-ERP1BnuhzBAtj-yb0LNO_D3WLPMlqYwcOdD52PTMyD4qoQZ9q_20DPIf_1AMTNCIN2bonPcCt3zHMb0rzW7K0GkXxFFGfLwS5cqmz_hyTLzfFGHYOyGul42cJCxIlsJGJ3cZINwEj4e-RvP6FiXNiQKszc2oUAdDIu8EyzbKkRAL6A53WlTmxiVcKZMj6fHPMGAenMaVNfa9HWzrnJVMF7i3bFUBHlnsV35oy485-qBjyV9ny6hf8U_f4Io9Id4TDIBAsA0gPWxp3P22WuyLUO-L73uQcEjjWgRyMob5phcC9fyElBrDy7YbwCAOjE9QBnzNkxNyhcXcYKhCqC-IxpQQGJCW9EHjHIcYDqf6lP5IqIFdTseJWmkgC0FwbXaduOxfuSwTeFBeCpFeT8kCHI-C4cBTlSOZmQzFypJJq5__DJb9SXIRwziqqzGvrLv7q0cUvqaP9LlwyRe2rcLETFZaD6xV4n7jOoU-qRAdxxOllw89G1GT9dJi3wm_DGzOc3L31iOOXTNeZKqkZaUdKvaDRK4.CtYOcrAxrM7DbDdpe9BQj7zphCjgnwpk_DJienMGf10';  // Sostituisci con il tuo ticket Ubisoft
    const ubiAppId = '4bc245f2-b998-4574-9574-6ab93ec9e44c';
    const url = `https://public-ubiservices.ubi.com/v1/profiles/${profileId}/stats?spaceId=${spaceId}`;
    // https://public-ubiservices.ubi.com/v1/profiles?platformType=uplay&namesOnPlatform=iiiTzElijah (PER TROVARE IL PROFILE ID)
    fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Ubi_v1 t=${yourUbisoftTicket}`,
        'Ubi-AppId': ubiAppId
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log('Profile Stats:', data);
    })
    .catch(error => {
      console.error('Error fetching profile stats:', error);
    });

*/

// PLATFORM: uplay, xbl, psn