import styles from "./page.module.css";
import Header from "../../../../components/Header";
import Footer from "../../../../components/Footer";
import Hero from "../../../../components/Hero";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Stats(params) {
  if (!params.searchParams?.userId) redirect("/stats");
  if (!params.searchParams?.platform) redirect("/stats");
  if (!params.searchParams?.username) redirect("/stats");

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
  const userId = params.searchParams?.userId;
  const username = params.searchParams?.username;


  // await getUserData(userId, "kill")

  return (
    <>
      {/* HEADER */}
      <Header isPage="tracker"></Header>
      <main>
        <h1 className="d-none">XDEFIANT ITALIA TRACKER</h1>
        {/* HERO SECTION */}
        <Hero />
        {/* FIRST SECTION */}
        <>
          <h1 className="fs-4 text-center mt-3 mb-3">XDEFIANT ITALIA TRACKER</h1>
          <div className="container d-flex flex-column align-items-center">
            <svg className="mb-2" xmlns="http://www.w3.org/2000/svg" width="494" height="1" viewBox="0 0 494 1" fill="none">
              <line y1="0.5" x2="494" y2="0.5" stroke="#DCC600"></line>
            </svg>
          </div>

          <section className="mb-5">
            <div className="container">
              <div className="row">
                <div className="col-3">
                  <h3 className="text-center">{username}</h3>
                  <div className={styles.backgroundPrimary + " d-flex flex-column align-items-center pt-2 pb-2"}>
                    <h4 className="fs-5">Rank attuale</h4>
                    <svg width="48" height="1" viewBox="0 0 48 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <line y1="0.5" x2="48" y2="0.5" stroke="#DCC600" />
                    </svg>
                    <div>
                      {await getUserData(userId, "rank") != 0 ? (await getUserData(userId, "rank"))
                      .replace("BRONZE", "Bronzo")
                      .replace("SILVER", "Argento")
                      .replace("GOLD", "Gold")
                      .replace("RUBY", "Ruby")
                      .replace("EMERALD", "Smeraldo")
                      .replace("DIAMOND", "Diamante")
                      .replace("LEGENDS", "Leggenda") : "Non classificato"}
                    </div>
                  </div>
                </div>
                <div className="col-9">
                  test
                </div>
              </div>
            </div>
          </section>

          <section className="mb-5">
            <div className="d-none d-lg-block">
              <a href="https://discord.com/servers/xdefiant-italia-1124809941744619602" target="_blank"><Image src={"/home-images/discordbanner.png"} alt="Banner discord" className="img-fluid" width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto' }}></Image> </a>
            </div>

            <div className="d-block d-lg-none">
              <a href="https://discord.com/servers/xdefiant-italia-1124809941744619602" target="_blank"><Image src={"/home-images/discordbannerMobile.png"} alt="Banner discord" className="img-fluid" width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto' }}></Image> </a>
            </div>
          </section>
        </>
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

async function getUserData(user, value) {

  const dataAPI = await getData(user);
  const userData = {
    battlessIsCompleted: dataAPI.stats.BattlepassCompleted?.value,
    winStreak: dataAPI.stats.CurrentMatchStreak?.value,
    bestWinStreak: dataAPI.stats['HighestWinStreak.IsPractice.false']?.value,
    rank: dataAPI.stats.CurrentRank?.value,
    faction: {
      deadsec: dataAPI.stats['FactionUse.Faction.Dedsec']?.value,
      echelon: dataAPI.stats['FactionUse.Faction.Echelon']?.value,
      libertad: dataAPI.stats['FactionUse.Faction.Libertad']?.value,
      phantoms: dataAPI.stats['FactionUse.Faction.Phantoms']?.value,
      gsk: dataAPI.stats['FactionUse.Faction.GSK']?.value,
    },
    weapons: {
      assaultRifle: dataAPI.stats['KillsByWeaponCategory.IsPractice.false.WeaponCategory.AssaultRifle']?.value,
      lightMachineGun: dataAPI.stats['KillsByWeaponCategory.IsPractice.false.WeaponCategory.LightMachinegun']?.value,
      pistol: dataAPI.stats['KillsByWeaponCategory.IsPractice.false.WeaponCategory.Pistol']?.value,
      rifle: dataAPI.stats['KillsByWeaponCategory.IsPractice.false.WeaponCategory.Rifle']?.value,
      shotgun: dataAPI.stats['KillsByWeaponCategory.IsPractice.false.WeaponCategory.Shotgun']?.value,
      sniper: dataAPI.stats['KillsByWeaponCategory.IsPractice.false.WeaponCategory.SniperRifle']?.value,
      subMachineGun: dataAPI.stats['KillsByWeaponCategory.IsPractice.false.WeaponCategory.SubMachinegun']?.value,
    },
    assist: dataAPI.stats.NumAssists?.value,
    kill: dataAPI.stats['TotalKills.IsPractice.false']?.value,
    level: dataAPI.stats.PlayerLevel?.value,
    win: dataAPI.stats['MatchesWTL.IsPractice.false.Win.1']?.value,
    lose: dataAPI.stats['MatchesWTL.IsPractice.false.Win.-1']?.value,
    score: dataAPI.stats['Score.IsPractice.false']?.value,
    ultimateUse: dataAPI.stats['UltimateUseCount.IsPractice.false.SkillType.Ultimate']?.value,
    weaponDamage: dataAPI.stats['WeaponDamageDealt.IsPractice.false']?.value,
    mode: {
      occupy: { win: dataAPI.stats['MatchesWTLbyGM.Win.1.GameMode.Occupy']?.value, lose: dataAPI.stats['MatchesWTLbyGM.Win.-1.GameMode.Occupy']?.value },
      escort: { win: dataAPI.stats['MatchesWTLbyGM.Win.1.GameMode.Escort']?.value, lose: dataAPI.stats['MatchesWTLbyGM.Win.-1.GameMode.Escort']?.value },
      hotShot: { win: dataAPI.stats['MatchesWTLbyGM.Win.1.GameMode.Hot Shot']?.value, lose: dataAPI.stats['MatchesWTLbyGM.Win.-1.GameMode.Hot Shot']?.value },
      zoneControl: { win: dataAPI.stats['MatchesWTLbyGM.Win.1.GameMode.Zone Control']?.value, lose: dataAPI.stats['MatchesWTLbyGM.Win.-1.GameMode.Zone Control']?.value },
      domination: { win: dataAPI.stats['MatchesWTLbyGM.Win.1.GameMode.Domination']?.value, lose: dataAPI.stats['MatchesWTLbyGM.Win.-1.GameMode.Domination']?.value },
      teamDeathmatch: { win: dataAPI.stats['MatchesWTLbyGM.Win.1.GameMode.Team Deathmatch']?.value, lose: dataAPI.stats['MatchesWTLbyGM.Win.-1.GameMode.Team Deathmatch']?.value },
      captureTheFlag: { win: dataAPI.stats['MatchesWTLbyGM.Win.1.GameMode.Capture the Flag']?.value, lose: dataAPI.stats['MatchesWTLbyGM.Win.-1.GameMode.Capture the Flag']?.value },

    }

  }
  return userData[value] == undefined ? 0 : userData[value];
}

async function getData(userId) {
  // AGGIORNO IL TICKET
  const email = 'gabriele.tosto@outlook.com';
  const password = 'Ubuntu019@';
  const spaceId = 'e3014688-25dd-4a03-ae5a-82e80eb5053c';
  let ticketAuth;

  const ubiAppId = '4bc245f2-b998-4574-9574-6ab93ec9e44c';

  const urlGetTicket = 'https://public-ubiservices.ubi.com/v3/profiles/sessions';

  await fetch(urlGetTicket, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Ubi-AppId': ubiAppId,
      'Authorization': `Basic ${Buffer.from(`${email}:${password}`).toString('base64')}`
    },
    body: JSON.stringify({
      email: email,
      password: password,
      rememberMe: true,
    }),
  })
    .then(response => response.json())
    .then(data => {
      if (data.ticket) {
        ticketAuth = data.ticket;
        // Puoi salvare il ticket per usi successivi
      } else {
        console.error('Failed to get Ubisoft Ticket:', data);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });

  const urlData = `https://public-ubiservices.ubi.com/v1/profiles/${userId}/stats?spaceId=${spaceId}`;
  return await fetch(urlData, {
    method: 'GET',
    headers: {
      'Authorization': `Ubi_v1 t=${ticketAuth}`,
      'Ubi-AppId': ubiAppId
    }
  })
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(error => {
      console.error('Error fetching profile stats:', error);
    });
}