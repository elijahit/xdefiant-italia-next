import styles from "./page.module.css";

export default function AuditLogAccordion({ audit_id, azione_id, username, timestamp }) {
  let iconElements;
  let textAction = "";
  let textSpoiler = "";

  // GESTORE DATE
  let date = new Date(1720210347593);

  const dayCreate = date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`;
  const monthCreate = date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;

  const hourCreate = date.getHours() >= 10 ? date.getHours() : `0${date.getHours()}`;
  const minuteCreate = date.getMinutes() >= 10 ? date.getMinutes() : `0${date.getMinutes()}`;
  ///////////////////////////////////////////////

  switch (azione_id) {
    case 1:
      iconElements = <i className="bi bi-box-arrow-in-right"></i>;
      textAction = "ha effettuato il Log in";
      textSpoiler = "Ha effettuato l'accesso al sito"
      break;
    case 2:
      iconElements = <i className="bi bi-box-arrow-in-left"></i>;
      textAction = "ha effettuato il Log out";
      textSpoiler = "Si è disconnesso dal sito"
      break;
  }

  return (
    <div className={styles.accordion + " accordion"} id="accordionAuditLogs">
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button className="accordion-button collapsed d-block" type="button" data-bs-toggle="collapse" data-bs-target={"#collapse"+audit_id} aria-expanded="false" aria-controls={"collapse"+audit_id}>
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
        <div id={"collapse"+audit_id} className="accordion-collapse collapse" data-bs-parent="#accordionAuditLogs">
          <div className="accordion-body">
            <p className="text-center fs-5">{textSpoiler}</p>
          </div>
        </div>
      </div>
    </div>
  )
}