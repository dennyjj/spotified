# Spotified

[![Version](https://img.shields.io/badge/version-0.2.0-green.svg)](https://github.com/yourusername/spotified)
[![Next.js](https://img.shields.io/badge/Next.js-14.1.0-000000?logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Material UI](https://img.shields.io/badge/Material_UI-5.15-0081CB?logo=material-ui&logoColor=white)](https://mui.com/)

A web application that allows users to view their Spotify listening statistics, including top artists and tracks over different time periods.

Live demo: [Spotified](https://spotified-blue.vercel.app/)

## Features

- **Spotify Authentication**: Secure login with Spotify OAuth
- **User Profile**: View your Spotify profile details
- **Top Artists**: See your most listened artists over different time ranges
  - Last 4 weeks
  - Last 6 months
  - All time (lifetime)
- **Top Tracks**: View your most played tracks over different time ranges
  - Last 4 weeks
  - Last 6 months
  - All time (lifetime)
- **Responsive Design**: Works on desktop and mobile devices

## Technology Stack

- **Frontend**: React.js, Next.js 14, Material UI
- **Authentication**: NextAuth.js v5 (Beta)
- **API Integration**: Spotify Web API
- **Styling**: Material UI, Emotion
- **Type Safety**: TypeScript
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Spotify Developer Account

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/yourusername/spotified.git
   cd spotified
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory with the following variables:

   ```
   # Base URL
   BASE_URL=http://localhost:3000

   # NextAuth Secret
   AUTH_SECRET=your_random_string_here

   # Spotify App
   SPOTIFY_CLIENT_ID=your_spotify_client_id
   SPOTIFY_CLIENT_SECRET=your_spotify_client_secret

   # Spotify API
   SPOTIFY_API_ME_URL=https://api.spotify.com/v1/me
   SPOTIFY_API_TOKEN_URL=https://accounts.spotify.com/api/token
   SPOTIFY_API_TOP_ITEMS_URL=https://api.spotify.com/v1/me/top
   ```

4. Register a Spotify app at [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/) and add `http://localhost:3000/api/auth/callback/spotify` to the Redirect URIs

### Running the Application

- Development mode:

  ```bash
  npm run dev
  ```

- Production build:
  ```bash
  npm run build
  npm run start
  ```

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/                # API routes
│   ├── artists/            # Top artists pages
│   ├── lib/                # Data fetching and types
│   ├── login/              # Login page
│   ├── profile/            # User profile page
│   ├── tracks/             # Top tracks pages
│   └── ui/                 # UI components
├── auth.config.ts          # NextAuth configuration
├── auth.ts                 # NextAuth setup
├── auth.util.ts            # Token refresh utility
└── middleware.ts           # Next.js middleware for auth
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License

## Acknowledgements

- [Spotify Web API](https://developer.spotify.com/documentation/web-api/)
- [Next.js](https://nextjs.org/)
- [Material UI](https://mui.com/)
- [NextAuth.js](https://next-auth.js.org/)
