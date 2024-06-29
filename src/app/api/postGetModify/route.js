import { NextResponse } from "next/server";
import db from "../../../../scripts/database";
import { cookies } from "next/headers";

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