import Stats from "@/app/stats/page";
import { NextResponse } from "next/server";

// To handle a GET request to /api
export async function GET(request) {
  const searchParams = request.nextUrl.searchParams
  let username = searchParams.get('username');
  let platform = searchParams.get('platform');

  // AGGIORNO IL TICKET
  const email = 'gabriele.tosto@outlook.com';
  const password = 'Ubuntu019@';
  let ticketAuth;
  
  const spaceId = 'e3014688-25dd-4a03-ae5a-82e80eb5053c';
  const ubiAppId = '4bc245f2-b998-4574-9574-6ab93ec9e44c';

  const urlGetTicket = 'https://public-ubiservices.ubi.com/v3/profiles/sessions';

  await fetch(urlGetTicket, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Ubi-AppId': ubiAppId,
      'Authorization': `Basic ${Buffer.from(`${email}:${password}`).toString('base64')}`
    },
    body: JSON.stringify({
      email: email,
      password: password,
      rememberMe: true,
    }),
  })
  .then(response => response.json())
  .then(data => {
    if (data.ticket) {
      ticketAuth = data.ticket;
      // Puoi salvare il ticket per usi successivi
    } else {
      console.error('Failed to get Ubisoft Ticket:', data);
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });


const urlGetProfiles = `https://public-ubiservices.ubi.com/v1/profiles?platformType=${platform}&namesOnPlatform=${username}`;

return await fetch(urlGetProfiles, {
  method: 'GET',
  headers: {
    'Authorization': `Ubi_v1 t=${ticketAuth}`,
    'Ubi-AppId': ubiAppId
  }
})
.then(response => response.json())
.then(data => {
  console.log('Profile Stats:', data);
  if(data.profiles.length == 0) {
    const errorUrl = new URL("/stats", request.url);
    errorUrl.searchParams.set('error', "L\'utente non è stato trovato");
    return NextResponse.redirect(errorUrl);
  };
})
.catch(error => {
  console.error('Error fetching profile stats:', error);
});
  // return NextResponse.json({"res": "ciao"});
}