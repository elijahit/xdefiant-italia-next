import { NextResponse } from "next/server";
import db from "../../../../scripts/database";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


// To handle a POST request to /api
export async function DELETE(request) {
  const email = cookies().get('email');
  const auth = cookies().get('authToken');

  if(!email && !auth) return NextResponse.json({ text: "Non hai i permessi necessari per utilizzare questa funzione.", success: 0 }, { status: 400 });


  const {id_utente, level_admin} = await db.get("SELECT * FROM utente WHERE email = ? AND authorization_token = ?", email.value, auth.value);

  
  const {id_article, id_request, id_author} = await request.json();
  
  if(level_admin <= 2 && id_author != id_request) return NextResponse.json({ text: "Non hai i permessi necessari per utilizzare questa funzione.", success: 0 }, { status: 400 });

  db.run("INSERT INTO actions_article (id_article, id_utente, action) VALUES(?, ?, ?)", id_article, id_request, 0);


  return NextResponse.json({ text: "La richiesta di rimozione dell'articolo è stata inviata, attendi che un responsabile approvi la tua richiesta.", success: 1 }, { status: 200 });

  
}