export async function getUserInfo(accessToken: string) {
  try {
    const userInfoEndpoint = "https://www.googleapis.com/oauth2/v3/userinfo";
    const userInfoResponse = await fetch(`${userInfoEndpoint}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const userInfo = await userInfoResponse.json();
    if (!userInfoResponse.ok) throw userInfo;
    console.log(userInfo.name);
    return userInfo;
  } catch (error) {
    throw error;
  }
}
