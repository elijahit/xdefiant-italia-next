import Image from "next/image";
import "./Footer.css";

function Footer() {
  return (
    <footer>
      <div className="container">
        {/* FOOTER PER DESKTOP */}
        <div className="row">
          <div className="col-12 mt-5 mb-4 d-flex justify-content-center d-lg-block">
            <Image src={"/footer-images/logo.webp"} alt="Logo XDefiant Italia" width={20} height={20}></Image>
          </div>
          <div className="col-4 d-none d-lg-block">
            <h6>Navigazione</h6>
            <ul className="list-unstyled">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/news">News</a>
              </li>
            </ul>
          </div>
          <div className="col-12 col-lg-8">
            <h6 className="text-center text-lg-start">Informazioni</h6>
            <p className="text-center text-lg-start">playxdefiant.it non è in nessun modo affiliato a <b>Ubisoft Entertainment</b></p>
            <p className="text-center text-lg-start">
              Developed by: <a href="https://www.linkedin.com/in/gabriele-tosto/"><u>Gabriele Mario Tosto</u></a> <br />
              Design by: <a href="https://www.behance.net/gabuzzinialessio"><u>Gabuzzini Alessio</u></a>
            </p>
          </div>
          <div className="col-12 d-flex flex-column align-items-center align-items-lg-end mb-5">
            <div className="d-flex gap-3">
              <div className="social-background">
                <a href="https://x.com/playxdefiant_it" target="_blank">
                  <i className="bi bi-twitter-x"></i>
                </a>
              </div>
              <div className="social-background">
                <a href="https://www.instagram.com/playxdefiant_IT/" target="_blank">
                  <i className="bi bi-instagram"></i>
                </a>
              </div>
              <div className="social-background">
                <a href="https://www.facebook.com/PlayXDefiantIT/" target="_blank">
                  <i className="bi bi-facebook"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;