import { NextResponse } from "next/server";
import db from "../../../../scripts/database";
import { cookies } from "next/headers";
import  {  convert  }  from  'url-slug' 
import { redirect } from "next/navigation";


// To handle a POST request to /api
export async function POST(request) {
  const email = cookies().get('email');
  const auth = cookies().get('authToken');

  if(!email && !auth) return NextResponse.json({ text: "Non hai i permessi necessari per utilizzare questa funzione.", success: 0 }, { status: 400 });


  const {id_utente, level_admin} = await db.get("SELECT * FROM utente WHERE email = ? AND authorization_token = ?", email.value, auth.value);

  if(level_admin < 2) return NextResponse.json({ text: "Non hai i permessi necessari per utilizzare questa funzione.", success: 0 }, { status: 400 });

  const {title, content, image} = await request.json();

  if (title.length == 0) return NextResponse.json({ text: "Abbiamo riscontrato un problema, controllo il titolo del tuo post.", success: 0 }, { status: 400 });
  if (content.length == 0) return NextResponse.json({ text: "Abbiamo riscontrato un problema, controlla il contenuto del tuo post.", success: 0 }, { status: 400 });
  if (image.length == 0) return NextResponse.json({ text: "Abbiamo riscontrato un problema controlla l'immagine del tuo post.", success: 0 }, { status: 400 });

  const uri = convert(title);

  const checkUri = await db.get("SELECT * FROM article WHERE uri_article = ?", uri);

  if(checkUri) return NextResponse.json({ text: "Abbiamo riscontrato un problema controlla il titolo del tuo post, sembra che già sia utilizzato.", success: 0 }, { status: 400 });

  const date = new Date();

  db.all("INSERT INTO article (titolo, testo, id_utente, image_url, uri_article, created_at, isApproved) VALUES (?, ?, ?, ?, ?, ?, ?)", title, content, id_utente, image, uri, `${date.getTime()}`, 0);


  return NextResponse.json({ text: "Il tuo articolo è stato caricato correttamente, attendi che venga approvato.", success: 1 }, { status: 200 });

  
}