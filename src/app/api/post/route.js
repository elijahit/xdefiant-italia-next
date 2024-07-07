import { NextResponse } from "next/server";
import db from "../../../../scripts/database";
import { cookies } from "next/headers";
import { convert } from 'url-slug'
import { writeFile, unlink } from 'fs';
import sizeOf from "image-size";
import { headers } from "next/headers";

// To handle a GET request to /api
export async function GET(request) {
  const searchParams = request.nextUrl.searchParams
  let query = searchParams.get('uri')
  let res = await db.get("select a.id_article , a.titolo, a.testo, a.id_utente, a.image_url, a.created_at, u.username, u.email, u.discord_name from article a join utente u on u.id_utente = a.id_utente where uri_article = ?", query)
  return NextResponse.json(res);
}

function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

// To handle a POST request to /api
export async function POST(request) {
  const email = cookies().get('email');
  const auth = cookies().get('authToken');
  const randomFileName = getRandomInt(10000, 99999999999);

  if (!email && !auth) return NextResponse.json({ text: "Non hai i permessi necessari per utilizzare questa funzione.", success: 0 }, { status: 400 });


  const { id_utente, level_admin } = await db.get("SELECT * FROM utente WHERE email = ? AND authorization_token = ?", email.value, auth.value);

  if (level_admin < 2) return NextResponse.json({ text: "Non hai i permessi necessari per utilizzare questa funzione.", success: 0 }, { status: 400 });
  const FormData = await request.formData();
  const title = FormData.get('title');
  const content = FormData.get('content');
  const image = FormData.get('image');

  const arrbuf = await image.arrayBuffer();
  const buffer = Buffer.from(arrbuf);

  let sizeImage = sizeOf(buffer);
  if(sizeImage.height != 720 || sizeImage.width != 1280) return NextResponse.json({ text: "La dimensione consentita per la tua immagine è 1280 x 720.", success: 0 }, { status: 400 });

  const imageFormat = ["image/png", "image/jpeg", "image/webp", "image/jpg"]
  if (!imageFormat.find((value) => value == image.type)) return NextResponse.json({ text: "Il file inserito non è tra i formati consentiti (png, jpg, jpeg, webp)", success: 0 }, { status: 400 });

  writeFile(`./public/posts-images/${randomFileName}.webp`, buffer, function (err) {
    if (err) {
      return console.log(err);
    }
  });

  if (title.length == 0) return NextResponse.json({ text: "Abbiamo riscontrato un problema, controllo il titolo del tuo post.", success: 0 }, { status: 400 });
  if (content.length == 0) return NextResponse.json({ text: "Abbiamo riscontrato un problema, controlla il contenuto del tuo post.", success: 0 }, { status: 400 });
  if (image.length == 0) return NextResponse.json({ text: "Abbiamo riscontrato un problema controlla l'immagine del tuo post.", success: 0 }, { status: 400 });

  const uri = convert(title);

  const checkUri = await db.get("SELECT * FROM article WHERE uri_article = ?", uri);

  if (checkUri) return NextResponse.json({ text: "Abbiamo riscontrato un problema controlla il titolo del tuo post, sembra che già sia utilizzato.", success: 0 }, { status: 400 });

  const date = new Date();

  await db.all("INSERT INTO article (titolo, testo, id_utente, image_url, uri_article, created_at, isApproved) VALUES (?, ?, ?, ?, ?, ?, ?)", title, content, id_utente, `https://postimage.playxdefiant.it/${randomFileName}.webp`, uri, `${date.getTime()}`, 0);

  const {id_article} = await db.get("SELECT * FROM article WHERE uri_article = ?", uri);
  const headersList = headers();
  const ip = headersList.get("x-forwarded-for");

  await db.run("INSERT INTO admin_logs (id_utente, id_article, azione, timestamp, ip) VALUES(?, ?, 4, ?, ?)", id_utente, id_article, new Date().getTime(), ip);


  return NextResponse.json({ text: "Il tuo articolo è stato caricato correttamente, attendi che venga approvato.", success: 1 }, { status: 200 });


}

// To handle a POST request to /api
export async function DELETE(request) {
  const email = cookies().get('email');
  const auth = cookies().get('authToken');

  if (!email && !auth) return NextResponse.json({ text: "Non hai i permessi necessari per utilizzare questa funzione.", success: 0 }, { status: 400 });


  const { id_utente, level_admin } = await db.get("SELECT * FROM utente WHERE email = ? AND authorization_token = ?", email.value, auth.value);

  if (level_admin < 2) return NextResponse.json({ text: "Non hai i permessi necessari per utilizzare questa funzione.", success: 0 }, { status: 400 });

  const { id_article, image } = await request.json();
  const imageResolver = image.split('/');
  imageResolver.length-1
  unlink(`./public/posts-images/${imageResolver[imageResolver.length-1]}`, function (err) {
    if (err) return console.log(err);
  });


  db.run("DELETE FROM article WHERE id_article = ?", id_article);


  return NextResponse.json({ text: "L'articolo è stato rimosso con successo.", success: 1 }, { status: 200 });


}