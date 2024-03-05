interface SpotifyTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
}

export default async function refreshAccessToken(refreshToken: string) {
  console.log(`refreshing token...`);
  try {
    const url = process.env.SPOTIFY_API_TOKEN_URL!;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(
          process.env.SPOTIFY_CLIENT_ID +
            ':' +
            process.env.SPOTIFY_CLIENT_SECRET
        ).toString('base64')}`,
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      }),
    });

    const refreshedToken: SpotifyTokenResponse = await response.json();
    const {access_token, expires_in, refresh_token} = refreshedToken;

    console.log(
      `fetched refreshedToken, expires in ${getTokenExpiresAt(
        refreshedToken.expires_in
      )}`
    );
    return {
      accessToken: access_token,
      expiresAt: getTokenExpiresAt(expires_in),
      refreshToken: refreshedToken.refresh_token,
    };
  } catch (e) {
    console.log(e);
    return {
      error: 'RefreshAccessTokenError' as const,
    };
  }
}

function getTokenExpiresAt(expiresIn: number): number {
  return getCurrentUnixTimestampInSeconds() + expiresIn;
}

function getCurrentUnixTimestampInSeconds(): number {
  return Math.floor(Date.now() / 1000);
}
