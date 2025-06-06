<script lang="ts">
import type { PageProps } from './$types';
import * as Table from '$lib/components/ui/table';
import { Play, Pause } from '@lucide/svelte'
let { data }: PageProps = $props();

let current_track_id: string | null = $state(null)

function pauseTrack() {
	if (current_track_id) {
		const audioElement = document.querySelector('audio');
		if (audioElement) {
			audioElement.pause();
			current_track_id = null;
		}
	}
}

</script>

<Table.Root>
	<Table.Header>
		<Table.Row>
			<Table.Head>Play</Table.Head>
			<Table.Head>Track number</Table.Head>
			<Table.Head>Title</Table.Head>
			<Table.Head>Duration</Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{#each data.tracks.sort((a, b) => a.track_number - b.track_number) as track (track.id)}
			<Table.Row class={current_track_id === track.id ? 'text-green-500' : ''}>
				<Table.Cell>
					<button onclick={() => current_track_id = track.id}>
						{#if current_track_id === track.id}
							<Pause color="currentColor" onclick={pauseTrack}/>
						{:else}
						<Play color={current_track_id === track.id ? 'green' : 'currentColor'}/>
						{/if}
					</button>
				</Table.Cell>
				<Table.Cell>{track.track_number}</Table.Cell>
				<Table.Cell>{track.title}</Table.Cell>
				<Table.Cell>{track.duration}</Table.Cell>
			</Table.Row>
		{/each}
	</Table.Body>
</Table.Root>
{#if current_track_id}
	<audio controls autoplay src={`http://localhost:8080/api/track/${current_track_id}/play`} />
{/if}