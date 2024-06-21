import { NextResponse } from "next/server";
import db from "../../../../scripts/database";

// To handle a GET request to /api
export async function GET(request) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('uri')
  let res = await db.get("select a.id_article , a.titolo, a.testo, a.id_utente, a.image_url, u.username, u.email, u.discord_name from article a join utente u on u.id_utente = a.id_utente where uri_article = ?", query)
  return NextResponse.json(res);
}

// // To handle a POST request to /api
// export async function POST(request) {
//   // Do whatever you want
//   return NextResponse.json({ message: "Hello World" }, { status: 200 });
// }