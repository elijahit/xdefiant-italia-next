import { NextResponse } from "next/server";
import db from "../../../../scripts/database";
import { cookies, headers } from "next/headers";
import { unlink } from 'fs';


export async function GET() {
  const email = cookies().get('email');
  const auth = cookies().get('authToken');

  if (!email && !auth) return NextResponse.json({ text: "Non hai i permessi necessari per utilizzare questa funzione.", success: 0 }, { status: 400 });

  const { id_utente, level_admin } = await db.get("SELECT * FROM utente WHERE email = ? AND authorization_token = ?", email.value, auth.value);

  if (level_admin < 2) return NextResponse.json({ text: "Non hai i permessi necessari per utilizzare questa funzione.", success: 0 }, { status: 400 });

  const dataModify = await db.all("SELECT * FROM actions_article WHERE action = ?", 1);
  let ultimateData = [];
  for (const modified of dataModify) {

    const dataUser = await db.get("SELECT * FROM utente WHERE id_utente = ?", modified.id_utente);
    const dataArticle = await db.get("SELECT * FROM article WHERE id_article = ?", modified.id_article);
    const obj = {
      idArticle: dataArticle.id_article,
      titoloVecchio: dataArticle.titolo,
      titoloNuovo: modified.titolo,
      testoVecchio: dataArticle.testo,
      testoNuovo: modified.testo,
      immagineVecchia: dataArticle.image_url,
      immagineNuova: modified.image,
      richiestDa: dataUser.username,
      richiestaDaID: dataUser.id_utente
    };
    ultimateData.push(obj);
  }
  return NextResponse.json(ultimateData, { status: 200 });;
}

export async function DELETE(request) {
  const email = cookies().get('email');
  const auth = cookies().get('authToken');

  if (!email && !auth) return NextResponse.json({ text: "Non hai i permessi necessari per utilizzare questa funzione.", success: 0 }, { status: 400 });


  const { level_admin } = await db.get("SELECT * FROM utente WHERE email = ? AND authorization_token = ?", email.value, auth.value);

  if (level_admin < 2) return NextResponse.json({ text: "Non hai i permessi necessari per utilizzare questa funzione.", success: 0 }, { status: 400 });

  const { id_article, image, id_utente } = await request.json();

  if (image) {
    const imageResolver = image.split('/');
    imageResolver.length - 1
    unlink(`./public/posts-images/${imageResolver[imageResolver.length - 1]}`, function (err) {
      if (err) return console.log(err);
    });
  }


  db.run("DELETE FROM actions_article WHERE id_article = ? AND id_utente = ?", id_article, id_utente);


  return NextResponse.json({ text: "L'articolo non è stato modificato, la richiesta è stata rifiutata con successo", success: 1 }, { status: 200 });


}

export async function POST(request) {
  const email = cookies().get('email');
  const auth = cookies().get('authToken');

  if (!email && !auth) return NextResponse.json({ text: "Non hai i permessi necessari per utilizzare questa funzione.", success: 0 }, { status: 400 });


  const { id_utente, level_admin } = await db.get("SELECT * FROM utente WHERE email = ? AND authorization_token = ?", email.value, auth.value);

  if (level_admin < 2) return NextResponse.json({ text: "Non hai i permessi necessari per utilizzare questa funzione.", success: 0 }, { status: 400 });

  const { idPost, idUtenteRichiesta, image, titolo, contenuto } = await request.json();

  if (image) {
    const imageDb = await db.get('SELECT image_url FROM article WHERE id_article = ?', idPost);
    const imageResolver = imageDb.image_url.split('/');
    imageResolver.length - 1
    unlink(`./public/posts-images/${imageResolver[imageResolver.length - 1]}`, function (err) {
      if (err) return console.log(err);
    });
    db.run("UPDATE article SET titolo = ?, testo = ?, image_url = ? WHERE id_article = ?", titolo, contenuto, image, idPost);
  } else {
    db.run("UPDATE article SET titolo = ?, testo = ? WHERE id_article = ?", titolo, contenuto, idPost);
  }

  const headersList = headers();
  const ip = headersList.get("x-forwarded-for");

  await db.run("INSERT INTO admin_logs (id_utente, id_utente_perform, azione, timestamp, ip) VALUES(?, ?, 8, ?, ?)", id_utente, idUtenteRichiesta, new Date().getTime(), ip);

  db.run("DELETE FROM actions_article WHERE id_article = ? AND id_utente = ?", idPost, idUtenteRichiesta);


  return NextResponse.json({ text: "L'articolo è stato modificato.", success: 1 }, { status: 200 });


}