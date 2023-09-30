let accessToken = "";

export async function getAccessToken() {
  if (accessToken) {
    console.log("use cached access token");
    return accessToken;
  }
  console.log("request new access token");
  try {
    const accessTokenResponse = await fetch(
      "https://oauth2.googleapis.com/token",
      {
        method: "POST",
        body: new URLSearchParams({
          client_id: process.env.GOOGLE_CLIENT_ID,
          client_secret: process.env.GOOGLE_CLIENT_SECRET,
          grant_type: "refresh_token",
          refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
        }),
      }
    );
    const tokenObject = await accessTokenResponse.json();
    if (!accessTokenResponse.ok) throw tokenObject;
    accessToken = tokenObject.access_token;
    return accessToken;
  } catch (error) {
    throw error;
  }
}
