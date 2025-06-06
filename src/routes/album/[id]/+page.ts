import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
	const { id } = params;

	const albumResponse = await fetch(`http://localhost:8080/api/albums/${id}/tracks`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			"Accept": "application/json"
		},
	});
	if (!albumResponse.ok) {
		throw new Error('Failed to fetch album data');
	}
	const tracks = await albumResponse.json();

	return {
		tracks: tracks,
	};
}