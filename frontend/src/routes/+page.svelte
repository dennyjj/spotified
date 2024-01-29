<script lang="ts">
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

				isLoading.set(false);
			}
		};

		init();
	});

	async function oauth(): Promise<void> {
		const response = await fetch('http://localhost:8080/auth');
		const url = await response.text();
		window.location.href = url;
	}

	async function getSpotifyMe(): Promise<any> {
		const resp = await fetch('https://api.spotify.com/v1/me', {
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
</script>

{#if $isLoading}
	<p>Loading...</p>
{:else if !isLoggedIn}
	<button on:click={oauth}>Login Spotified</button>
{:else if $data}
	<h1>Welcome, {$data.display_name}</h1>
	<div><a href={$data.external_urls.spotify}>{$data.external_urls.spotify}</a></div>
	<img src={$data.images[1].url} alt="User Profile" />
	<h3>Followers: {$data.followers.total}</h3>
	<h2>{JSON.stringify($data)}</h2>
{/if}
