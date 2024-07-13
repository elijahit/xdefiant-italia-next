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
      rememberMe: false,
    }),
  })
    .then(response => {
      if (response.headers.has('Retry-After')) {
        console.log('Retry-After:', response.headers.get('Retry-After'));
      }
      if (response.headers.has('X-RateLimit-Limit')) {
        console.log('X-RateLimit-Limit:', response.headers.get('X-RateLimit-Limit'));
      }
      if (response.headers.has('X-RateLimit-Remaining')) {
        console.log('X-RateLimit-Remaining:', response.headers.get('X-RateLimit-Remaining'));
      }
      if (response.headers.has('X-RateLimit-Reset')) {
        console.log('X-RateLimit-Reset:', response.headers.get('X-RateLimit-Reset'));
      }
      return response.json()
    })
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
      if (data.profiles.length == 0) {
        const errorUrl = new URL("/stats", "https://playxdefiant.it");
        errorUrl.searchParams.set('error', "L\'utente non è stato trovato");
        return NextResponse.redirect(errorUrl);
      } else {
        const successUrl = new URL("/stats/user", "https://playxdefiant.it");
        successUrl.searchParams.set('userId', data.profiles[0].userId);
        successUrl.searchParams.set('platform', data.profiles[0].platformType);
        successUrl.searchParams.set('username', username);
        return NextResponse.redirect(successUrl);
      }
    })
    .catch(error => {
      const errorUrl = new URL("/stats", "https://playxdefiant.it");
      errorUrl.searchParams.set('error', "Abbiamo riscontrato un errore, controlla di aver inserito tutti i campi, altrimenti contatta lo sviluppatore.");
      return NextResponse.redirect(errorUrl);
    });
  // return NextResponse.json({"res": "ciao"});
}