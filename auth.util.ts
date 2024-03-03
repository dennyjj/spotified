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
    const url = 'https://accounts.spotify.com/api/token';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization:
          'Basic ' +
          Buffer.from(
            process.env.SPOTIFY_CLIENT_ID +
              ':' +
              process.env.SPOTIFY_CLIENT_SECRET
          ).toString('base64'),
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      }),
    });

    const refreshedToken: SpotifyTokenResponse = await response.json();

    console.log('fetched refreshedToken: ', refreshedToken);
    return {
      accessToken: refreshedToken.access_token,
      expiresAt: Math.floor(Date.now() / 1000) + refreshedToken.expires_in,
      refreshToken: refreshedToken.refresh_token ?? refreshToken,
    };
  } catch (e) {
    console.log(e);
    return {
      error: 'RefreshAccessTokenError' as const,
    };
  }
}
