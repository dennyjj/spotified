<script lang="ts">
	import { token } from '$lib/stores/token';
	import { onMount } from 'svelte';
	import Cookies from 'js-cookie';
	import { writable, type Writable } from 'svelte/store';

	export const spotifyData: Writable<any | null> = writable(null);
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
						const data = await getSpotifyMe();
						spotifyData.set(data);
					} catch (error) {
						console.error('Failed to fetch data from Spotify', error);
					}
				}

				isLoading.set(false);
			}
		};

		init();
	});

	async function oauth() {
		const response = await fetch('http://localhost:8080/auth');
		const url = await response.text();
		window.location.href = url;
	}

	async function getSpotifyMe() {
		const response = await fetch('https://api.spotify.com/v1/me', {
			headers: {
				Authorization: `Bearer ${$token?.accessToken}`
			}
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		return data;
	}

	$: isLoggedIn = $token?.accessToken !== undefined;
</script>

{#if $isLoading}
	<p>Loading...</p>
{:else if !isLoggedIn}
	<button on:click={oauth}>Login Spotified</button>
{:else if $spotifyData}
	<h1>Welcome, {$spotifyData.display_name}</h1>
	<div><a href={$spotifyData.external_urls.spotify}>{$spotifyData.external_urls.spotify}</a></div>
	<img src={$spotifyData.images[1].url} alt="User Profile" />
	<h3>Followers: {$spotifyData.followers.total}</h3>
	<h2>{JSON.stringify($spotifyData)}</h2>
{/if}
