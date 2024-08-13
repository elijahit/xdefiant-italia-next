import { NextResponse } from "next/server";
import db from "../../../../scripts/database";
import { cookies } from "next/headers";
import { convert } from 'url-slug'
import { redirect } from "next/navigation";
import { headers } from "next/headers";

import request from "request";
import { google } from "googleapis";

const keyGoogle = {
  "type": "service_account",
  "project_id": "xdefiant-italia",
  "private_key_id": "06c442f58797221d717e3d0f70b52043a2a64b7c",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCqavAhe96EfOp4\nC+qNjp3uSu1bCbCyWladjofpg0udS0mocFb+D/eBxMSGX5zw8XCIfVOP4a6B9GW0\nlQiFfyrTCGyUAg/3Ox+piZBgPSAB1lV1jpuuY4+fbbOKPRSM+NLPzfmwA9pBNc4i\nmR+oAsIXkC3Rx98j/UrrftKWfzjgvBzvaX2JwLK+RDQmJiTlz7k873q+5DFLksUq\nNpYmwjhwHLQ3zkhezvZbHHZmQZGW7dFwT7P4YrO5BgYUabwWgevZiU7MHa6u+fzU\nwLy8UITS0tDM0hIom+s+PZK3OetKanyx42V/kSPTjDyn8crDHr2xb/LwmzibynR/\ntOVAYG9XAgMBAAECggEAHHaT+OO5fKNoffhviokhc6VsE2KA8qkIAnTF2oilXnYu\nrUVmIjUEf9YfhNn/WnbY9tMH2+YzwVzSh+DEdZeRzYGAsQ/PHtnvJd/mD0zmRahI\nycOx2OSkHlqyPAqLnigI/dBHPdDG6VFVRo4QrX0YcdsQ7BLYACjUFJUwExbYpyA+\nYRGULGUg1j1hILF+DlBAssWt7r256s9q5hDa/6bEZ8JdiwWN0pxw/y8d6od0bZ4a\nur8Zc6QGt/lMs4mK5M3TxNNAExoZqOeTI6QMkgTRZiDlJFnW5/06uBTOZWYr9BUT\nEsri7HDY1YAgoL9OyhUpcdgSXd5ywENM/zhwTwUaUQKBgQDWcXD8/vdcO9Rn8eK3\nOQwMSe5DZAG3z5W5+oPQOdfWiFt3BgCN5vhAQqbRJIcC3HTvMe9pdfc9XI/+tKJn\nVVu+mUoc8+lnNNHjR7Ipoak57Ii1M/Lh7J7G3yF6rgzYzSGoCXoQ2v/4dX2ZVI+5\nhfcbvWScRYO+9eSP5tXiMGjU6wKBgQDLcWOigF85JkjlRh3xrb1KXsQEmB8IapqK\nzQI4F3CIM6cbq9Br7cyd9+bEypt5+2Iwkm9ZFgHh8aBYLpDIAAt0bWhh68yDpzgM\nkN1cv/iN8/DgxZDbh1ce6jrcWJY83JaLOV5MYR9t65N56Mi/3VBWh0G7qDgoDkCD\netrQLwokRQKBgGJnqEvQzL48jlosu7cMrKSvAHFYYRlyXuj7NqXFBXDjHeXekT6M\n8Pq8G0T6GCKN+/MP3SduBMjZwxJE3gnBN9qdCU+D9mVv7aj4a5+DGd8E1i8g6aIX\nLT1hg0GCwU5zw7ASuTsm5DOl5r8H+PRPr3fBT3wOwkhNGleWvCuRv2mFAoGAQYyb\nSbSK+eL4AceBxmjwYJIAHmrVNOUEPkyntmL3AyuBYE0PrnbEQvGpDScqyTbSAExu\nTAnnOWGdBEycoZRCHJVT2JkdIB401PeoG0ZPU42Rwxpk/haxX2ig5nY0kg+RAfLO\nC1YPxl7s+Y6jgA5S4E5cQ5aD4YQWDUb8Ua+WWPECgYEAml69Dkzq//tU5nKj1JUa\nWSFVq61gBwFP9U4JOdzeleKKD7sp3wPIibD+UddF1xHlObTZtHwb367tVOrVlQIA\nGYzimXac1yf2dvix6+7cK+LZsqpJBca1TFvY0owS0umylHNNY7y/h9exqkAbO+7b\nR7v+aNDzdyiX6frUsSak2/E=\n-----END PRIVATE KEY-----\n",
  "client_email": "xdefiant-italia-web@xdefiant-italia.iam.gserviceaccount.com",
  "client_id": "108821009777582223268",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/xdefiant-italia-web%40xdefiant-italia.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}


// To handle a POST request to /api
export async function POST(request) {
  const email = cookies().get('email');
  const auth = cookies().get('authToken');

  if (!email && !auth) return NextResponse.json({ text: "Non hai i permessi necessari per utilizzare questa funzione.", success: 0 }, { status: 400 });


  const { id_utente, level_admin } = await db.get("SELECT * FROM utente WHERE email = ? AND authorization_token = ?", email.value, auth.value);

  if (level_admin < 2) return NextResponse.json({ text: "Non hai i permessi necessari per utilizzare questa funzione.", success: 0 }, { status: 400 });

  const { id } = await request.json();

  db.run("UPDATE article SET isApproved = ? WHERE id_article = ?", 1, id);
  const { uri_article, id_article } = await db.get("SELECT * FROM article WHERE id_article = ?", id);

  const headersList = headers();
  const ip = headersList.get("x-forwarded-for");

  db.run("INSERT INTO admin_logs (id_utente, id_article, azione, timestamp, ip) VALUES(?, ?, 3, ?, ?)", id_utente, id_article, new Date().getTime(), ip);

  // INDEX NOW PROTOCOL FOR BING
  fetch(`https://bing.com/indexnow?url=https://playxdefiant.it/posts/${uri_article}&key=2b74988ce52cfaf5ab0e7e1d10a8d8fc`);

  // GOOGLE INDEXING
  const jwtClient = new google.auth.JWT(
    keyGoogle.client_email,
    null,
    keyGoogle.private_key,
    ["https://www.googleapis.com/auth/indexing"],
    null
  );

  jwtClient.authorize(function (err, tokens) {
    if (err) {
      console.log(err);
      return;
    }
    let options = {
      url: "https://indexing.googleapis.com/v3/urlNotifications:publish",
      method: "POST",
      // Your options, which must include the Content-Type and auth headers
      headers: {
        "Content-Type": "application/json"
      },
      auth: { "bearer": tokens.access_token },
      // Define contents here. The structure of the content is described in the next step.
      json: {
        "url": `https://playxdefiant.it/posts/${uri_article}`,
        "type": "URL_UPDATED"
      }
    };
    request(options, function (error, response, body) {
      // Handle the response
      console.log(body);
    });
  });



  return NextResponse.json({ text: "L'articolo è stato approvato.", success: 1 }, { status: 200 });


}