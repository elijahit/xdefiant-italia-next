import { NextResponse } from "next/server";
import db from "../../../../scripts/database";
import { cookies } from "next/headers";
import { unlink } from 'fs';

export async function GET() {
  const email = cookies().get('email');
  const auth = cookies().get('authToken');

  if (!email && !auth) return NextResponse.json({ text: "Non hai i permessi necessari per utilizzare questa funzione.", success: 0 }, { status: 400 });

  const { id_utente, level_admin } = await db.get("SELECT * FROM utente WHERE email = ? AND authorization_token = ?", email.value, auth.value);

  if (level_admin < 2) return NextResponse.json({ text: "Non hai i permessi necessari per utilizzare questa funzione.", success: 0 }, { status: 400 });

  const dataModify = await db.all("SELECT * FROM actions_article WHERE action = ?", 0);
  let ultimateData = [];
  for (const modified of dataModify) {

    const dataUser = await db.get("SELECT * FROM utente WHERE id_utente = ?", modified.id_utente);
    const dataArticle = await db.get("SELECT * FROM article WHERE id_article = ?", modified.id_article);
    const obj = {
      idArticle: dataArticle.id_article,
      titolo: dataArticle.titolo,
      testo: dataArticle.testo,
      immagine: dataArticle.image_url,
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

  const { id_article, id_utente } = await request.json();


  db.run("DELETE FROM actions_article WHERE id_article = ? AND id_utente = ?", id_article, id_utente);


  return NextResponse.json({ text: "L'articolo non è stato rimosso, la richiesta è stata rifiutata con successo", success: 1 }, { status: 200 });


}

export async function POST(request) {
  const email = cookies().get('email');
  const auth = cookies().get('authToken');

  if(!email && !auth) return NextResponse.json({ text: "Non hai i permessi necessari per utilizzare questa funzione.", success: 0 }, { status: 400 });


  const {id_utente, level_admin} = await db.get("SELECT * FROM utente WHERE email = ? AND authorization_token = ?", email.value, auth.value);

  if(level_admin < 2) return NextResponse.json({ text: "Non hai i permessi necessari per utilizzare questa funzione.", success: 0 }, { status: 400 });

  const {idPost, idUtenteRichiesta, image, titolo, contenuto} = await request.json();

  if(image) {
    unlink(`./public${image}`, function (err) {
      if (err) return console.log(err);
    });
  } 
  db.run("DELETE FROM actions_article WHERE id_article = ? AND id_utente = ?", idPost, idUtenteRichiesta);
  db.run("DELETE FROM article WHERE id_article = ?", idPost);


  return NextResponse.json({ text: "L'articolo è stato eliminato.", success: 1 }, { status: 200 });

  
}