import { NextResponse } from "next/server";
import db from "../../../../scripts/database";

// To handle a GET request to /api
export async function GET(request) {
  const searchParams = request.nextUrl.searchParams
  if(searchParams.get('limit')) {
    let query = searchParams.get('limit')
    let res = await db.all("select a.id_article , a.titolo, a.testo, a.id_utente, a.image_url, a.uri_article, u.username, u.email, u.discord_name from article a join utente u on u.id_utente = a.id_utente ORDER BY a.id_article DESC LIMIT ?", query)
    return NextResponse.json(res);
  } else {
    let res = await db.all("select a.id_article , a.titolo, a.testo, a.id_utente, a.image_url, a.uri_article, u.username, u.email, u.discord_name from article a join utente u on u.id_utente = a.id_utente ORDER BY a.id_article DESC")
    return NextResponse.json(res);
  }
}

// // To handle a POST request to /api
// export async function POST(request) {
//   // Do whatever you want
//   return NextResponse.json({ message: "Hello World" }, { status: 200 });
// }