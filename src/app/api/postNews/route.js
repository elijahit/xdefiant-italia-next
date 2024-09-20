import { NextResponse } from "next/server";
import db from "../../../../scripts/database";

// To handle a GET request to /api
export async function GET(request) {
  const searchParams = request.nextUrl.searchParams
  const pagination = searchParams.get('pag') ? searchParams.get('pag') : 0;
  if(searchParams.get('limit')) {
    let query = searchParams.get('limit')
    let res = await db.all("select a.id_article , a.titolo, a.testo, a.id_utente, a.image_url, a.uri_article, u.username, u.email, u.discord_name, a.created_at from article a join utente u on u.id_utente = a.id_utente WHERE isApproved = ? ORDER BY a.id_article DESC LIMIT ? OFFSET ?", 1, query, +pagination)
    return NextResponse.json(res);
  }
  else if (searchParams.get('approved')) {
    let query = searchParams.get('approved')
    let res = await db.all("select a.id_article , a.titolo, a.testo, a.id_utente, a.image_url, a.uri_article, u.username, u.email, u.discord_name, a.created_at from article a join utente u on u.id_utente = a.id_utente WHERE isApproved = ? ORDER BY a.id_article DESC", query)
    return NextResponse.json(res);
  } else {
    let res = await db.all("select a.id_article , a.titolo, a.testo, a.id_utente, a.image_url, a.uri_article, u.username, u.email, u.discord_name, a.created_at from article a join utente u on u.id_utente = a.id_utente WHERE isApproved = ? ORDER BY a.id_article DESC", 1)
    return NextResponse.json(res);
  }
}

// // To handle a POST request to /api
// export async function POST(request) {
//   // Do whatever you want
//   return NextResponse.json({ message: "Hello World" }, { status: 200 });
// }