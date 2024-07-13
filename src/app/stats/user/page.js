import styles from "./page.module.css";
import Header from "../../../../components/Header";
import Footer from "../../../../components/Footer";
import Hero from "../../../../components/Hero";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Database } from "sqlite";

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

  async function resolveRank() {
    const rank = await getUserData(userId, "rank") != 0 ? (await getUserData(userId, "rank"))
      .replace("BRONZE", "Bronzo")
      .replace("SILVER", "Argento")
      .replace("GOLD", "Oro")
      .replace("RUBY", "Rubino")
      .replace("EMERALD", "Smeraldo")
      .replace("DIAMOND", "Diamante")
      .replace("LEGENDS", "Leggenda") : "Non classificato"
    let image;
    if (rank != "Non classificato") {
      switch (rank.split(" ")[0]) {
        case "Bronzo":
          image = "Bronzo.png";
          break;
        case "Argento":
          image = "Argento.png";
          break;
        case "Oro":
          image = "Oro.png";
          break;
        case "Rubino":
          image = "Rubino.png";
          break;
        case "Smeraldo":
          image = "Smeraldo.png";
          break;
        case "Diamante":
          image = "Diamante.png";
          break;
        case "Leggenda":
          image = "Leggenda.png";
          break;
      }

    }

    return { rank: rank, image: image };
  }

  async function getWinPercentage(userId) {
    try {
      // Ottieni i valori di win e lose dall'API
      const win = await getUserData(userId, "win");
      const lose = await getUserData(userId, "lose");

      // Converti i valori in numeri (caso in cui siano stringhe)
      const winNum = Number(win);
      const loseNum = Number(lose);

      // Calcola la percentuale di vittorie
      const totalGames = winNum + loseNum;
      const winPercentage = (winNum / totalGames) * 100;

      // Restituisci la percentuale di vittorie
      return isNaN(winPercentage) ? 0 : winPercentage;
    } catch (error) {
      console.error("Errore nel calcolo della percentuale di vittorie:", error);
      throw error; // Rilancia l'errore per la gestione esterna
    }
  }

  async function getKillMatchRatio(userId) {
    try {
      // Ottieni i valori di kills e matches dall'API
      const kills = await getUserData(userId, "kill");
      const win = await getUserData(userId, "win");
      const lose = await getUserData(userId, "lose");
      const matches = +win + +lose;

      // Converti i valori in numeri (caso in cui siano stringhe)
      const killsNum = Number(kills);
      const matchesNum = Number(matches);

      // Controlla che matchesNum non sia zero per evitare divisione per zero
      if (matchesNum === 0) {
        return 0;
      }

      // Calcola il rapporto Kill/Match
      const killMatchRatio = killsNum / matchesNum;

      // Restituisci il rapporto Kill/Match
      return killMatchRatio;
    } catch (error) {
      console.error("Errore nel calcolo del rapporto Kill/Match:", error);
      throw error; // Rilancia l'errore per la gestione esterna
    }
  }

  function getHumanReadableMinutes(data) {
    const milliseconds = Number(data);

    // Calcola le ore, minuti, secondi e millisecondi
    const hours = Math.floor(milliseconds / 3600000);
    const minutes = Math.floor((milliseconds % 3600000) / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const remainingMilliseconds = milliseconds % 1000;

    // Formatta il risultato in una stringa leggibile
    return `${minutes}m ${seconds}s`;
  }

  function getHumanReadableHourFaction(data) {
    const milliseconds = Number(data);

    // Calcola le ore, minuti, secondi e millisecondi
    const hours = Math.floor(milliseconds / 60);
    const minutes = Math.floor((milliseconds % 3600000) / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const remainingMilliseconds = milliseconds % 1000;

    // Formatta il risultato in una stringa leggibile
    return `${hours}h`;
  }


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
                <div className="col-lg-3 col-12">
                  <div id="rank" className="mb-3">
                    <div className="text-center fs-3 d-flex gap-2 align-items-center mb-3 justify-content-center justify-content-lg-start">
                      <img className={styles.avatar} src={`https://ubisoft-avatars.akamaized.net/${userId}/default_146_146.png`} />{username}</div>
                    <div className={styles.backgroundPrimary + " d-flex flex-column align-items-center pt-2 pb-2 border"}>
                      <h4 className="fs-5">Rank attuale</h4>
                      <svg className="mb-2" width="48" height="1" viewBox="0 0 48 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line y1="0.5" x2="48" y2="0.5" stroke="#DCC600" />
                      </svg>
                      <div className="d-flex gap-2 align-items-center">
                        {(await resolveRank()).rank != "Non classificato" ? <Image className="img-fluid" width={32} height={32} src={`/stats-images/${(await resolveRank()).image}`} alt="rank image"></Image> : ""}{(await resolveRank()).rank}
                      </div>
                    </div>
                  </div>
                  <div className={styles.backgroundPrimary + " border"}>

                    <h3 className="pt-2 ps-2 fs-4"><i className="bi bi-globe"></i> Modalità</h3>
                    <div className="table-responsive">
                      <table className={"table table-striped " + styles.table}>
                        <thead>
                          <tr className="text-end">
                            <th scope="col"></th>
                            <th scope="col">Vittorie</th>
                            <th scope="col">Sconfitte</th>
                          </tr>
                        </thead>
                        <tbody>
                          {(await getUserData(userId, "mode")).occupy.win && (await getUserData(userId, "mode")).occupy.lose ?
                            <>
                              <tr>
                                <td>Occupazione</td>
                                <td className="text-end">{(await getUserData(userId, "mode")).occupy.win}</td>
                                <td className="text-end">{(await getUserData(userId, "mode")).occupy.lose}</td>
                              </tr>
                            </>
                            : ""}
                          {(await getUserData(userId, "mode")).escort.win && (await getUserData(userId, "mode")).escort.lose ?
                            <>
                              <tr>
                                <td>Scorta</td>
                                <td className="text-end">{(await getUserData(userId, "mode")).escort.win}</td>
                                <td className="text-end">{(await getUserData(userId, "mode")).escort.lose}</td>
                              </tr>
                            </>
                            : ""}
                          {(await getUserData(userId, "mode")).hotShot.win && (await getUserData(userId, "mode")).hotShot.lose ?
                            <>
                              <tr>
                                <td>Fenomeno</td>
                                <td className="text-end">{(await getUserData(userId, "mode")).hotShot.win}</td>
                                <td className="text-end">{(await getUserData(userId, "mode")).hotShot.lose}</td>
                              </tr>
                            </>
                            : ""}
                          {(await getUserData(userId, "mode")).zoneControl.win && (await getUserData(userId, "mode")).zoneControl.lose ?
                            <>
                              <tr>
                                <td>Controllo</td>
                                <td className="text-end">{(await getUserData(userId, "mode")).zoneControl.win}</td>
                                <td className="text-end">{(await getUserData(userId, "mode")).zoneControl.lose}</td>
                              </tr>
                            </>
                            : ""}
                          {(await getUserData(userId, "mode")).domination.win && (await getUserData(userId, "mode")).domination.lose ?
                            <>
                              <tr>
                                <td>Dominio</td>
                                <td className="text-end">{(await getUserData(userId, "mode")).domination.win}</td>
                                <td className="text-end">{(await getUserData(userId, "mode")).domination.lose}</td>
                              </tr>
                            </>
                            : ""}
                          {(await getUserData(userId, "mode")).teamDeathmatch.win && (await getUserData(userId, "mode")).teamDeathmatch.lose ?
                            <>
                              <tr>
                                <td>Team Deathmatch</td>
                                <td className="text-end">{(await getUserData(userId, "mode")).teamDeathmatch.win}</td>
                                <td className="text-end">{(await getUserData(userId, "mode")).teamDeathmatch.lose}</td>
                              </tr>
                            </>
                            : ""}
                          {(await getUserData(userId, "mode")).captureTheFlag.win && (await getUserData(userId, "mode")).captureTheFlag.lose ?
                            <>
                              <tr>
                                <td>Cattura</td>
                                <td className="text-end">{(await getUserData(userId, "mode")).captureTheFlag.win}</td>
                                <td className="text-end">{(await getUserData(userId, "mode")).captureTheFlag.lose}</td>
                              </tr>
                            </>
                            : ""}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="col-lg-9 col-12 mt-5">
                  <div className={styles.backgroundPrimary + " border mb-4"}>
                    <div id="headerStats" className="d-block d-lg-flex align-items-center">
                      <h3 className="pt-2 ps-2 fs-4"><i className="bi bi-globe"></i> Overview generale</h3>
                      <div className="ms-auto me-3 text-center text-lg-none">
                        <span id="hourPlay" className="me-3">
                          <i className="bi bi-clock"></i> {(await getUserData(userId, "playTime") / 3600).toFixed().toLocaleString(undefined, { minimumFractionDigits: 0 })}h giocate
                        </span>
                        <span id="totalPlay" className="me-3">
                          {(+(await getUserData(userId, "win")) + +(await getUserData(userId, "lose"))).toLocaleString(undefined, { minimumFractionDigits: 0 })} partite
                        </span>
                        <span id="level">
                          Livello {(await getUserData(userId, "level")).toLocaleString(undefined, { minimumFractionDigits: 0 })}
                        </span>
                      </div>
                    </div>
                    <svg width="auto" height="2" viewBox="0 0 779 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <line y1="1" x2="779" y2="1" stroke="#132241" strokeWidth="2" />
                    </svg>
                    <div id="statistics" className="container ps-5 pe-5  d-lg-flex flex-wrap gap-2 mb-5">
                      <div className={styles.card}>
                        <h4 className="text-center fs-5">Vittorie %</h4>
                        <p className="text-center fs-5">{(await getWinPercentage(userId)).toFixed(2)}</p>
                      </div>
                      <div className={styles.card}>
                        <h4 className="text-center fs-5">Vittorie</h4>
                        <p className="text-center fs-5">{(+await getUserData(userId, "win")).toLocaleString(undefined, { minimumFractionDigits: 0 })}</p>
                      </div>
                      <div className={styles.card}>
                        <h4 className="text-center fs-5">Sconfitte</h4>
                        <p className="text-center fs-5">{(+await getUserData(userId, "lose")).toLocaleString(undefined, { minimumFractionDigits: 0 })}</p>
                      </div>
                      <div className={styles.card}>
                        <h4 className="text-center fs-5">Uccisioni/Partite %</h4>
                        <p className="text-center fs-5">{(await getKillMatchRatio(userId)).toFixed(2)}</p>
                      </div>
                      <div className={styles.card}>
                        <h4 className="text-center fs-5">Kill</h4>
                        <p className="text-center fs-5">{(+await getUserData(userId, "kill")).toLocaleString(undefined, { minimumFractionDigits: 0 })}</p>
                      </div>
                      <div className={styles.card}>
                        <h4 className="text-center fs-5">Assist</h4>
                        <p className="text-center fs-5">{(+await getUserData(userId, "assist")).toLocaleString(undefined, { minimumFractionDigits: 0 })}</p>
                      </div>
                      <div className={styles.card}>
                        <h4 className="text-center fs-5">MVP</h4>
                        <p className="text-center fs-5">{(+await getUserData(userId, "mvp")).toLocaleString(undefined, { minimumFractionDigits: 0 })}</p>
                      </div>
                      <div className={styles.card}>
                        <h4 className="text-center fs-5">Score</h4>
                        <p className="text-center fs-5">{(+await getUserData(userId, "score")).toLocaleString(undefined, { minimumFractionDigits: 0 })}</p>
                      </div>
                      <div className={styles.card}>
                        <h4 className="text-center fs-5">Danno Armi</h4>
                        <p className="text-center fs-5">{(+await getUserData(userId, "weaponDamage")).toLocaleString(undefined, { minimumFractionDigits: 0 })}</p>
                      </div>
                      <div className={styles.card}>
                        <h4 className="text-center fs-5">Ultimate</h4>
                        <p className="text-center fs-5">{(+await getUserData(userId, "ultimateUse")).toLocaleString(undefined, { minimumFractionDigits: 0 })} volte</p>
                      </div>
                      <div className={styles.card}>
                        <h4 className="text-center fs-5">Skill ultimate</h4>
                        <p className="text-center fs-5">{(+await getUserData(userId, "skillUsed")).toLocaleString(undefined, { minimumFractionDigits: 0 })}</p>
                      </div>
                      <div className={styles.card}>
                        <h4 className="text-center fs-5">Tempo in vita</h4>
                        <p className="text-center fs-5">{getHumanReadableMinutes(await getUserData(userId, "longestLifetime"))}</p>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-6 col-12 mb-4 mb-lg-0">
                      <div className={styles.backgroundPrimary + " border table-responsive"}>
                      <h3 className="pt-2 ps-2 fs-4"><i className="bi bi-globe"></i> Fazioni</h3>
                        <table className={"table table-striped " + styles.table}>
                          <thead>
                            <tr className="text-end">
                              <th scope="col"></th>
                              <th scope="col">Tempo di gioco</th>
                            </tr>
                          </thead>
                          <tbody>
                            {(await getUserData(userId, "faction")).deadsec ?
                              <>
                                <tr>
                                  <td>DedSec</td>
                                  <td className="text-end">{getHumanReadableHourFaction((await getUserData(userId, "faction")).deadsec)}</td>
                                </tr>
                              </>
                              : ""}
                            {(await getUserData(userId, "faction")).phantoms ?
                              <>
                                <tr>
                                  <td>Fantasmi</td>
                                  <td className="text-end">{getHumanReadableHourFaction((await getUserData(userId, "faction")).phantoms)}</td>
                                </tr>
                              </>
                              : ""}
                            {(await getUserData(userId, "faction")).echelon ?
                              <>
                                <tr>
                                  <td>Echelon</td>
                                  <td className="text-end">{getHumanReadableHourFaction((await getUserData(userId, "faction")).echelon)}</td>
                                </tr>
                              </>
                              : ""}
                            {(await getUserData(userId, "faction")).cleaners ?
                              <>
                                <tr>
                                  <td>Purificatori</td>
                                  <td className="text-end">{getHumanReadableHourFaction((await getUserData(userId, "faction")).cleaners)}</td>
                                </tr>
                              </>
                              : ""}
                            {(await getUserData(userId, "faction")).libertad ?
                              <>
                                <tr>
                                  <td>Libertad</td>
                                  <td className="text-end">{getHumanReadableHourFaction((await getUserData(userId, "faction")).libertad)}</td>
                                </tr>
                              </>
                              : ""}
                            {(await getUserData(userId, "faction")).gsk ?
                              <>
                                <tr>
                                  <td>GSK</td>
                                  <td className="text-end">{getHumanReadableHourFaction((await getUserData(userId, "faction")).gsk)}</td>
                                </tr>
                              </>
                              : ""}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="col-lg-6 col-12 mb-4 mb-lg-0">
                      <div className={styles.backgroundPrimary + " border table-responsive"}>
                      <h3 className="pt-2 ps-2 fs-4"><i className="bi bi-globe"></i> Armi</h3>
                        <table className={"table table-striped " + styles.table}>
                          <thead>
                            <tr className="text-end">
                              <th scope="col"></th>
                              <th scope="col">Kill</th>
                            </tr>
                          </thead>
                          <tbody>
                            {(await getUserData(userId, "weapons")).assaultRifle ?
                              <>
                                <tr>
                                  <td>Assalto</td>
                                  <td className="text-end">{(+(await getUserData(userId, "weapons")).assaultRifle).toLocaleString(undefined, { minimumFractionDigits: 0 })}</td>
                                </tr>
                              </>
                              : ""}

                            {(await getUserData(userId, "weapons")).lightMachineGun ?
                              <>
                                <tr>
                                  <td>Mitragliatrice Leggera</td>
                                  <td className="text-end">{(+(await getUserData(userId, "weapons")).lightMachineGun).toLocaleString(undefined, { minimumFractionDigits: 0 })}</td>
                                </tr>
                              </>
                              : ""}

                            {(await getUserData(userId, "weapons")).pistol ?
                              <>
                                <tr>
                                  <td>Pistola</td>
                                  <td className="text-end">{(+(await getUserData(userId, "weapons")).pistol).toLocaleString(undefined, { minimumFractionDigits: 0 })}</td>
                                </tr>
                              </>
                              : ""}

                            {(await getUserData(userId, "weapons")).rifle ?
                              <>
                                <tr>
                                  <td>Fucile</td>
                                  <td className="text-end">{(+(await getUserData(userId, "weapons")).rifle).toLocaleString(undefined, { minimumFractionDigits: 0 })}</td>
                                </tr>
                              </>
                              : ""}

                            {(await getUserData(userId, "weapons")).shotgun ?
                              <>
                                <tr>
                                  <td>Shotgun</td>
                                  <td className="text-end">{(+(await getUserData(userId, "weapons")).shotgun).toLocaleString(undefined, { minimumFractionDigits: 0 })}</td>
                                </tr>
                              </>
                              : ""}

                            {(await getUserData(userId, "weapons")).sniper ?
                              <>
                                <tr>
                                  <td>Cecchino</td>
                                  <td className="text-end">{(+(await getUserData(userId, "weapons")).sniper).toLocaleString(undefined, { minimumFractionDigits: 0 })}</td>
                                </tr>
                              </>
                              : ""}

                            {(await getUserData(userId, "weapons")).subMachineGun ?
                              <>
                                <tr>
                                  <td>SMG</td>
                                  <td className="text-end">{(+(await getUserData(userId, "weapons")).subMachineGun).toLocaleString(undefined, { minimumFractionDigits: 0 })}</td>
                                </tr>
                              </>
                              : ""}

                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
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
      </main >
      {/* FOOTER */}
      < Footer />
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
    battlessIsCompleted: dataAPI?.stats?.BattlepassCompleted?.value,
    winStreak: dataAPI?.stats?.CurrentMatchStreak?.value,
    bestWinStreak: dataAPI?.stats?.['HighestWinStreak.IsPractice.false']?.value,
    rank: dataAPI?.stats?.CurrentRank?.value,
    playTime: dataAPI?.stats?.Playtime?.value,
    faction: {
      deadsec: dataAPI?.stats?.['FactionUse.Faction.Dedsec']?.value,
      echelon: dataAPI?.stats?.['FactionUse.Faction.Echelon']?.value,
      libertad: dataAPI?.stats?.['FactionUse.Faction.Libertad']?.value,
      phantoms: dataAPI?.stats?.['FactionUse.Faction.Phantoms']?.value,
      cleaners: dataAPI?.stats?.['FactionUse.Faction.cleaners']?.value,
      gsk: dataAPI?.stats?.['FactionUse.Faction.GSK']?.value,
    },
    weapons: {
      assaultRifle: dataAPI?.stats?.['KillsByWeaponCategory.IsPractice.false.WeaponCategory.AssaultRifle']?.value,
      lightMachineGun: dataAPI?.stats?.['KillsByWeaponCategory.IsPractice.false.WeaponCategory.LightMachinegun']?.value,
      pistol: dataAPI?.stats?.['KillsByWeaponCategory.IsPractice.false.WeaponCategory.Pistol']?.value,
      rifle: dataAPI?.stats?.['KillsByWeaponCategory.IsPractice.false.WeaponCategory.Rifle']?.value,
      shotgun: dataAPI?.stats?.['KillsByWeaponCategory.IsPractice.false.WeaponCategory.Shotgun']?.value,
      sniper: dataAPI?.stats?.['KillsByWeaponCategory.IsPractice.false.WeaponCategory.SniperRifle']?.value,
      subMachineGun: dataAPI?.stats?.['KillsByWeaponCategory.IsPractice.false.WeaponCategory.SubMachinegun']?.value,
    },
    assist: dataAPI?.stats?.NumAssists?.value,
    kill: dataAPI?.stats?.['TotalKills.IsPractice.false']?.value,
    level: dataAPI?.stats?.PlayerLevel?.value,
    win: dataAPI?.stats?.['MatchesWTL.IsPractice.false.Win.1']?.value,
    lose: dataAPI?.stats?.['MatchesWTL.IsPractice.false.Win.-1']?.value,
    score: dataAPI?.stats?.['Score.IsPractice.false']?.value,
    ultimateUse: dataAPI?.stats?.['UltimateUseCount.IsPractice.false.SkillType.Ultimate']?.value,
    skillUsed: dataAPI?.stats?.['UltimateUseCount.IsPractice.false.SkillType.Skill']?.value,
    longestLifetime: dataAPI?.stats?.PlayersLongestLifetime?.value,
    mvp: dataAPI?.stats?.['MVPCount.MedalMVP.true.IsPractice.false']?.value,
    weaponDamage: dataAPI?.stats?.['WeaponDamageDealt.IsPractice.false']?.value,
    mode: {
      occupy: { win: dataAPI?.stats?.['MatchesWTLbyGM.Win.1.GameMode.Occupy']?.value, lose: dataAPI?.stats?.['MatchesWTLbyGM.Win.-1.GameMode.Occupy']?.value },
      escort: { win: dataAPI?.stats?.['MatchesWTLbyGM.Win.1.GameMode.Escort']?.value, lose: dataAPI?.stats?.['MatchesWTLbyGM.Win.-1.GameMode.Escort']?.value },
      hotShot: { win: dataAPI?.stats?.['MatchesWTLbyGM.Win.1.GameMode.Hot Shot']?.value, lose: dataAPI?.stats?.['MatchesWTLbyGM.Win.-1.GameMode.Hot Shot']?.value },
      zoneControl: { win: dataAPI?.stats?.['MatchesWTLbyGM.Win.1.GameMode.Zone Control']?.value, lose: dataAPI?.stats?.['MatchesWTLbyGM.Win.-1.GameMode.Zone Control']?.value },
      domination: { win: dataAPI?.stats?.['MatchesWTLbyGM.Win.1.GameMode.Domination']?.value, lose: dataAPI?.stats?.['MatchesWTLbyGM.Win.-1.GameMode.Domination']?.value },
      teamDeathmatch: { win: dataAPI?.stats?.['MatchesWTLbyGM.Win.1.GameMode.Team Deathmatch']?.value, lose: dataAPI?.stats?.['MatchesWTLbyGM.Win.-1.GameMode.Team Deathmatch']?.value },
      captureTheFlag: { win: dataAPI?.stats?.['MatchesWTLbyGM.Win.1.GameMode.Capture the Flag']?.value, lose: dataAPI?.stats?.['MatchesWTLbyGM.Win.-1.GameMode.Capture the Flag']?.value },

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
      rememberMe: false,
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