import { NextResponse } from "next/server";
import db from "../../../../scripts/database";

// To handle a GET request to /api
export async function GET(request) {
  const searchParams = request.nextUrl.searchParams
  let email = searchParams.get('email')
  let token = searchParams.get('authToken')

  let res = await db.get("SELECT username FROM utente WHERE email = ? AND authorization_token = ?", email, token);
  const errorLogin = new URL('/admin/login?error=invalid', request.url)
  const postArticle = new URL('/admin/newpost', request.url)
  if(res) {
    let response = NextResponse.next();
    response.cookies.set('email', email);
    response.cookies.set('authToken', token);
    return;
  } else {
    return NextResponse.redirect(errorLogin);
  }
  

}

// // To handle a POST request to /api
// export async function POST(request) {
//   // Do whatever you want
//   return NextResponse.json({ message: "Hello World" }, { status: 200 });
// }