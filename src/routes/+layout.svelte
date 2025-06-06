<script lang="ts">
	import '../app.css';
	import * as Card from '$lib/components/ui/card'
	import { ModeWatcher, toggleMode } from 'mode-watcher';

	let { children } = $props();
</script>
<ModeWatcher />
<div class="flex h-screen">
	<Card.Root class="basis-1/5 rounded-none border-y-0">
		<Card.Header>
			<Card.Title>Bragi</Card.Title>
			<Card.Description>
				Like Spotify but much cooler
			</Card.Description>
		</Card.Header>
		<Card.Content>
			<h3 class="font-bold">Artists</h3>
			<ul>
				{#await fetch("http://localhost:8080/api/artists", {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						"Accept": "application/json"
					}
				})}
					<li>Loading...</li>
				{:then response}
					{#if response.ok}
						{#await response.json()}
							<li>Loading artists...</li>
						{:then artists}
							{#each artists as artist (artist.id)}
								<li class="p-2 bg-accent m-0.5">
									<a href="/artist/{artist.id}">
										{artist.name}
									</a>
								</li>
							{/each}
						{:catch error}
							<li>Error loading artists: {error.message}</li>
						{/await}
					{:else}
						<li>Error fetching artists</li>
					{/if}
				{:catch error}
					<li>Error: {error.message}</li>
				{/await}
			</ul>
		</Card.Content>
		<Card.Footer>
			<button onclick={toggleMode}>Switch Theme</button>
		</Card.Footer>
	</Card.Root>
<div class="basis-4/5 p-8">
	{@render children()}
	</div>
</div>