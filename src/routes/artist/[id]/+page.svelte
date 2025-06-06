<script lang="ts">
	import type { PageProps } from './$types';
	import * as Card from '$lib/components/ui/card'
	import { Skeleton } from '$lib/components/ui/skeleton/index.js';

	let { data }: PageProps = $props();
</script>
<div class="flex flex-col h-screen">
	<div class="basis-1/5">
		<h1 class="text-3xl">{data.artist.name}</h1>
	</div>
	<h2 class="text-xl mb-2">Albums</h2>
	<div class="flex flex-wrap">
		{#each data.albums as album (album.id)}
			<Card.Root class="w-1/5 mr-4 mb-4">
				<Card.Header>
					<Skeleton class="w-full aspect-square"/>
					<Card.Description>{album.year}</Card.Description>
					<Card.Title class="pb-5">
						<a href={`/album/${album.id}`} class="hover:underline">
							{album.title}
						</a>
					</Card.Title>
				</Card.Header>
			</Card.Root>
		{/each}
		</div>
</div>