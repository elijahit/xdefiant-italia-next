import { NextResponse } from "next/server";
import db from "../../../../scripts/database";
import { cookies } from "next/headers";
import { convert } from 'url-slug'
import { redirect } from "next/navigation";
import { headers } from "next/headers";


// To handle a POST request to /api
export async function POST(request) {
  const email = cookies().get('email');
  const auth = cookies().get('authToken');

  if (!email && !auth) return NextResponse.json({ text: "Non hai i permessi necessari per utilizzare questa funzione.", success: 0 }, { status: 400 });


  const { id_utente, level_admin } = await db.get("SELECT * FROM utente WHERE email = ? AND authorization_token = ?", email.value, auth.value);

  if (level_admin < 2) return NextResponse.json({ text: "Non hai i permessi necessari per utilizzare questa funzione.", success: 0 }, { status: 400 });

  const { id } = await request.json();

  db.run("UPDATE article SET isApproved = ? WHERE id_article = ?", 1, id);
  const { uri_article, id_article } = await db.get("SELECT * FROM article WHERE id_article = ?", id);

  const headersList = headers();
  const ip = headersList.get("x-forwarded-for");

  db.run("INSERT INTO admin_logs (id_utente, id_article, azione, timestamp, ip) VALUES(?, ?, 3, ?, ?)", id_utente, id_article, new Date().getTime(), ip);

  // INDEX NOW PROTOCOL FOR BING
  fetch(`https://bing.com/indexnow?url=https://playxdefiant.it/posts/${uri_article}&key=2b74988ce52cfaf5ab0e7e1d10a8d8fc`);



  return NextResponse.json({ text: "L'articolo è stato approvato.", success: 1 }, { status: 200 });


}