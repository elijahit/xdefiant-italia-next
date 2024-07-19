import styles from "./page.module.css";

export default function AuditLogAccordion({ auditId, azioneId, username, timestamp, idUtentePerform, ip, idArticle, articleName, articleAuthor, articleUri, utentePerform }) {
  /* 
  AZIONI ID DB:
  ID: 1 - Ha effettuato il login
  ID: 2 - Ha effettuaot il logout
  ID: 3 - Ha approvato la pubblicazione di un articolo (id_article)
  ID: 4 - Ha inviato un articolo in attesa di approvazione (id_article)
  ID: 5 - Ha eliminato un articolo in attesa di approvazione (id_article)
  ID: 6 - Ha modificato un articolo in attesa di approvazione (id_article)
  ID: 7 - Ha approvato l'eliminazione di un articolo (id_article)
  ID: 8 - Ha approvato la modifica di un articolo (id_article)
*/

  let iconElements;
  let textAction = "";
  let textSpoiler = "";

  // GESTORE DATE
  let date = new Date(timestamp);

  const dayCreate = date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`;
  const monthCreate = date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;

  const hourCreate = date.getHours() >= 10 ? date.getHours() : `0${date.getHours()}`;
  const minuteCreate = date.getMinutes() >= 10 ? date.getMinutes() : `0${date.getMinutes()}`;
  ///////////////////////////////////////////////

  switch (azioneId) {
    case 1:
      iconElements = <i className="bi bi-box-arrow-in-right"></i>;
      textAction = `ha effettuato il Log in`;
      textSpoiler = `${username} ha effettuato l'accesso al sito`
      break;
    case 2:
      iconElements = <i className="bi bi-box-arrow-in-left"></i>;
      textAction = `${username} ha effettuato il Log out`;
      textSpoiler = "Si è disconnesso dal sito"
      break;
    case 3:
      iconElements = <i className="bi bi-check-square-fill"></i>;
      textAction = "ha approvato un articolo";
      textSpoiler = `${username} ha approvato l\'articolo ${articleName ? articleName : "(Non più disponibile)"} di ${articleAuthor ? articleAuthor : "(Autore non disponibile)"} `
      break;
    case 4:
      iconElements = <i className="bi bi-paperclip"></i>;
      textAction = "ha pubblicato un nuovo articolo";
      textSpoiler = `${username} ha pubblicato un nuovo articolo (in approvazione) con titolo ${articleName ? articleName : "(Non più disponibile)"}`
      break;
    case 5:
      iconElements = <i className="bi bi-trash"></i>;
      textAction = "ha eliminato un articolo";
      textSpoiler = `${username} ha eliminato un articolo (in approvazione) con titolo ${articleName ? articleName : "(Non più disponibile)"} di ${articleAuthor ? articleAuthor : "(Autore non disponibile)"}`
      break;
    case 6:
      iconElements = <i className="bi bi-pencil-fill"></i>;
      textAction = "ha modificato un articolo";
      textSpoiler = `${username} ha modificato un articolo (in approvazione) con titolo ${articleName ? articleName : "(Non più disponibile)"} di ${articleAuthor ? articleAuthor : "(Autore non disponibile)"}`
      break;
    case 7:
      iconElements = <i className="bi bi-trash"></i>;
      textAction = "ha approvato l\'eliminazione dell\'articolo";
      textSpoiler = `${username} ha approvato l\'eliminazione di ${utentePerform}`
      break;
    case 8:
      iconElements = <i className="bi bi-pencil-fill"></i>;
      textAction = "ha approvato la modifica dell\'articolo";
      textSpoiler = `${username} ha approvato la modifica dell\'articolo di ${utentePerform}`
      break;
    case 9:
      iconElements = <i className="bi bi-device-ssd"></i>;
      textAction = "è stato cercato nel tracker";
      textSpoiler = `${username} è stato cercato nel tracker di XDefiant`
      break;

  }

  return (
    <div className={styles.accordion + " accordion"} id="accordionAuditLogs">
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button className="accordion-button collapsed d-block" type="button" data-bs-toggle="collapse" data-bs-target={"#collapse" + auditId} aria-expanded="false" aria-controls={"collapse" + auditId}>
            <div className="row">
              <div className="col-12 col-lg-8 d-flex align-items-center">
                <p className="fs-3 me-3 mb-0">{iconElements}</p>
                <p className="fs-3 me-3 mb-0">{username}</p>
                <p className="fs-5 mb-0">{textAction}</p>
              </div>
              <div className="col-12 col-lg-3 d-flex align-items-center justify-content-lg-between justify-content-center">
                <p className="fs-5 mb-0">{dayCreate + "/" + monthCreate + "/" + date.getFullYear()}</p>
                <p className="fs-5 mb-0 me-3 d-none d-lg-flex">{hourCreate + ":" + minuteCreate}</p>
              </div>
              <div className="d-none d-lg-flex col-lg-1 d-flex justify-content-center align-items-center">
                <i className="bi bi-caret-down"></i>
              </div>
            </div>
          </button>
        </h2>
        <div id={"collapse" + auditId} className="accordion-collapse collapse" data-bs-parent="#accordionAuditLogs">
          <div className="accordion-body">
            <p className="text-center fs-5">{textSpoiler}</p>
            <p className="text-center fs-5"><code>IP: {ip}</code></p>
          </div>
        </div>
      </div>
    </div>
  )
}