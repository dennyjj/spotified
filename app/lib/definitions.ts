export interface UserProfile {
  display_name: string;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  type: string;
  uri: string;
  followers: Followers;
  email: string;
}

export interface TopArtistItems {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string | null;
  total: number;
  items: {
    external_urls: ExternalUrls;
    followers: Followers;
    genres: string[];
    href: string;
    id: string;
    images: Image[];
    name: string;
    popularity: number;
    type: string;
    uri: string;
  }[];
}

interface ExternalUrls {
  spotify: string;
}

interface Image {
  url: string;
  height: number;
  width: number;
}

interface Followers {
  href: string | null;
  total: number;
}
