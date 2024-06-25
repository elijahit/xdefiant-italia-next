import { NextResponse } from "next/server";
import db from "../../../../scripts/database";

// To handle a GET request to /api
export async function GET(request) {
  const searchParams = request.nextUrl.searchParams
  let email = searchParams.get('email')
  let token = searchParams.get('authToken')

  let res = await db.get("SELECT * FROM utente WHERE email = ? AND authorization_token = ?", email, token);
  if(res) {
    return NextResponse.json(res, {status: 200});
  } else {
    return NextResponse.json({ message: "invalido" }, { status: 400 });
  }
  

}

// // To handle a POST request to /api
// export async function POST(request) {
//   // Do whatever you want
//   return NextResponse.json({ message: "Hello World" }, { status: 200 });
// }