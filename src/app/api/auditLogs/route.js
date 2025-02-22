import { NextResponse } from "next/server";
import db from "../../../../scripts/database";
import { cookies } from "next/headers";
import  {  convert  }  from  'url-slug' 
import { redirect } from "next/navigation";


// To handle a POST request to /api
export async function GET(request) {
  const email = cookies().get('email');
  const auth = cookies().get('authToken');

  const searchParams = request.nextUrl.searchParams;
  let pag = searchParams.get('pag') ? searchParams.get('pag') : 0;

  if(!email && !auth) return NextResponse.json({ text: "Non hai i permessi necessari per utilizzare questa funzione.", success: 0 }, { status: 400 });


  const {id_utente, level_admin} = await db.get("SELECT * FROM utente WHERE email = ? AND authorization_token = ?", email.value, auth.value);

  if(level_admin < 4) return NextResponse.json({ text: "Non hai i permessi necessari per utilizzare questa funzione.", success: 0 }, { status: 400 });

  let res;
  if(searchParams.get('count') == 1) {
      res = await db.all(`SELECT a.azione as azioneId, a.id_admin_logs as idLogs, a.id_article as idArticle, u.id_utente as utenteLogsId, u.username, a.timestamp, a.id_utente_perform as idUtentePerform, a.ip, ar.titolo as titoloArticle, ar.uri_article as uriArticle, ur.username as authorArticle, up.username as utentePerform
      FROM admin_logs a 
      JOIN utente u ON u.id_utente = a.id_utente
      LEFT JOIN article ar ON a.id_article = ar.id_article
      LEFT JOIN utente ur ON ar.id_utente = ur.id_utente
      LEFT JOIN utente up on a.id_utente_perform = up.id_utente
      ORDER BY a.id_admin_logs`);
  } else {
    res = await db.all(`SELECT a.azione as azioneId, a.id_admin_logs as idLogs, a.id_article as idArticle, u.id_utente as utenteLogsId, u.username, a.timestamp, a.id_utente_perform as idUtentePerform, a.ip, ar.titolo as titoloArticle, ar.uri_article as uriArticle, ur.username as authorArticle, up.username as utentePerform
    FROM admin_logs a 
    JOIN utente u ON u.id_utente = a.id_utente
    LEFT JOIN article ar ON a.id_article = ar.id_article
    LEFT JOIN utente ur ON ar.id_utente = ur.id_utente
    LEFT JOIN utente up on a.id_utente_perform = up.id_utente
    ORDER BY a.id_admin_logs DESC LIMIT ? OFFSET ?`, 10, +pag == 1 ? 1 : +pag * 10);
  }
  return NextResponse.json(res, { status: 200 });
  

  
}