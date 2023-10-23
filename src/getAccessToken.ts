let accessToken = "";

export async function getAccessToken() {
  if (accessToken) {
    console.log("use cached access token");
    return accessToken;
  }
  console.log("request new access token");
  try {
    const response = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        grant_type: "refresh_token",
        refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
      }),
    });
    const tokenObject = await response.json();
    if (!response.ok) throw tokenObject;
    accessToken = tokenObject.access_token;
    return tokenObject.access_token;
  } catch (error) {
    throw error;
  }
}
