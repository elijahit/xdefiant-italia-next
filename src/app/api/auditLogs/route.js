import { NextResponse } from "next/server";
import db from "../../../../scripts/database";
import { cookies } from "next/headers";
import  {  convert  }  from  'url-slug' 
import { redirect } from "next/navigation";


// To handle a POST request to /api
export async function GET(request) {
  const email = cookies().get('email');
  const auth = cookies().get('authToken');

  if(!email && !auth) return NextResponse.json({ text: "Non hai i permessi necessari per utilizzare questa funzione.", success: 0 }, { status: 400 });


  const {id_utente, level_admin} = await db.get("SELECT * FROM utente WHERE email = ? AND authorization_token = ?", email.value, auth.value);

  if(level_admin < 4) return NextResponse.json({ text: "Non hai i permessi necessari per utilizzare questa funzione.", success: 0 }, { status: 400 });

  const res = await db.all(`SELECT a.azione, a.id_admin_logs, a.id_article, u.id_utente, u.username, a.timestamp, a.id_utente_perform, a.ip 
  FROM admin_logs a 
  JOIN utente u ON u.id_utente = a.id_utente`);
  

  return NextResponse.json(res, { status: 200 });

  
}