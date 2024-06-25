import { NextResponse } from "next/server";
import db from "../../../../scripts/database";
import { cookies } from "next/headers";
import  {  convert  }  from  'url-slug' 
import { redirect } from "next/navigation";


// To handle a POST request to /api
export async function POST(request) {
  const email = cookies().get('email').value;
  const auth = cookies().get('authToken').value;

  const {title, content, image} = await request.json();

  if (title.length == 0) return NextResponse.json({ message: "invalido" }, { status: 400 });
  if (content.length == 0) return NextResponse.json({ message: "invalido" }, { status: 400 });
  if (image.length == 0) return NextResponse.json({ message: "invalido" }, { status: 400 });

  const uri = convert(title);

  const checkUri = await db.get("SELECT * FROM article WHERE uri_article = ?", uri);

  if(checkUri) return NextResponse.json({ message: "invalido" }, { status: 400 });

  const {id_utente} = await db.get("SELECT * FROM utente WHERE email = ? AND authorization_token = ?", email, auth);
  const date = new Date();

  db.all("INSERT INTO article (titolo, testo, id_utente, image_url, uri_article, created_at) VALUES (?, ?, ?, ?, ?, ?)", title, content, id_utente, image, uri, `${date.getTime()}`);

  
  return NextResponse.json({ message: "valido" }, { status: 200 });

  
}