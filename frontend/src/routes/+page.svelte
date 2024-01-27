<script lang="ts">
	import { token } from '$lib/stores/token';
	import { onMount } from 'svelte';
	import Cookies from 'js-cookie';

	onMount(() => {
		const tokenBase64 = Cookies.get('token');
		if (tokenBase64) {
			const tokenJson = atob(tokenBase64);
			const tokenObj = JSON.parse(tokenJson);
			token.set(tokenObj);
		}
	});

	async function oauth() {
		const response = await fetch('http://localhost:8080/auth');
		const url = await response.text();
		window.location.href = url;
	}

	$: isLoggedIn = $token?.accessToken !== undefined;
</script>

{#if !isLoggedIn}
	<button on:click={oauth}>Login Spotified</button>
{/if}

<h1>{$token?.accessToken}</h1>
<h1>{$token?.refreshToken}</h1>
<h1>{$token?.tokenType}</h1>
<h1>{$token?.expiry}</h1>
