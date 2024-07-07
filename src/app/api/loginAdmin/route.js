import { NextResponse } from "next/server";
import db from "../../../../scripts/database";
import { headers } from "next/headers";

// To handle a GET request to /api
export async function GET(request) {
  const searchParams = request.nextUrl.searchParams
  let email = searchParams.get('email')
  let token = searchParams.get('authToken')
  
  const headersList = headers();
  const ip = headersList.get("x-forwarded-for");

  let res = await db.get("SELECT * FROM utente WHERE email = ? AND authorization_token = ?", email, token);
  const originalUrl = request.nextUrl.protocol + request.headers.get('host') + request.nextUrl.pathname
  const errorLogin = new URL('/admin/login?error=invalid', originalUrl)
  const postArticle = new URL('/', originalUrl)
  if(res) {
    let response = NextResponse.redirect(postArticle);
    response.cookies.set('email', email);
    response.cookies.set('authToken', token);
    db.run("INSERT INTO admin_logs (id_utente, azione, timestamp, ip) VALUES(?, 1, ?, ?)", res.id_utente, new Date().getTime(), ip);
    return response;
  } else {
    return NextResponse.redirect(errorLogin);
  }
  

}

// // To handle a POST request to /api
// export async function POST(request) {
//   // Do whatever you want
//   return NextResponse.json({ message: "Hello World" }, { status: 200 });
// }