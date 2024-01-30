// import { writable, type Writable } from 'svelte/store';
import { writable, type PersistentStore } from '@macfja/svelte-persistent-store';

interface Token {
	accessToken?: string;
	refreshToken?: string;
	tokenType?: string;
	expiry?: number;
}

export const token: PersistentStore<Token | null> = writable('token', null);
