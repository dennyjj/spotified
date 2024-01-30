<script lang="ts">
	import '../app.css';
	import { env } from '$env/dynamic/public';
	import { PUBLIC_SPOTIFY_ME_URL } from '$env/static/public';
	import { token } from '$lib/stores/token';
	import { onMount } from 'svelte';
	import Cookies from 'js-cookie';
	import { writable, type Writable } from 'svelte/store';

	export const data: Writable<any | null> = writable(null);
	export const isLoading = writable(true);

	onMount(() => {
		const init = async () => {
			isLoading.set(true);

			const tokenBase64 = Cookies.get('token');
			if (tokenBase64) {
				const tokenJson = atob(tokenBase64);
				const tokenObj = JSON.parse(tokenJson);
				token.set(tokenObj);

				if (tokenObj.accessToken) {
					try {
						const spotifyData = await getSpotifyMe();
						data.set(spotifyData);
					} catch (error) {
						console.error('Failed to fetch data from Spotify', error);
					}
				}
			}
			isLoading.set(false);
		};

		init();
	});

	async function oauth(): Promise<void> {
		const response = await fetch(env.PUBLIC_AUTH_URL);
		const url = await response.text();
		window.location.href = url;
	}

	async function getSpotifyMe(): Promise<any> {
		const resp = await fetch(PUBLIC_SPOTIFY_ME_URL, {
			headers: {
				Authorization: `Bearer ${$token?.accessToken}`
			}
		});

		if (!resp.ok) {
			throw new Error(`HTTP error! status: ${resp.status}`);
		}

		return await resp.json();
	}

	$: isLoggedIn = $token?.accessToken !== undefined;
	$: isExpired = $token?.expiry !== undefined && $token.expiry < Date.now() / 1000;
</script>

{#if $isLoading}
	<p>Loading...</p>
{:else if !isLoggedIn || isExpired}
	<button on:click={oauth}>Login Spotified</button>
{:else if $data}
	<div class="text-xl sm:text-lg md:text-base lg:text-lg xl:text-2xl">
		Welcome, {$data.display_name}
	</div>
	<br />
	<div>
		<a class="underline" href={$data.external_urls.spotify}>{$data.external_urls.spotify}</a>
	</div>
	<img src={$data.images[1].url} alt="User Profile" />
	<br />
	<h3 class="font-bold">Followers: {$data.followers.total}</h3>
{/if}
