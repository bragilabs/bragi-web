import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
	const { id } = params;

	const artistResponse = await fetch(`http://localhost:8080/api/artists/${id}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			"Accept": "application/json"
		},
	});
	if (!artistResponse.ok) {
		throw new Error('Failed to fetch artist data');
	}
	const artistData = await artistResponse.json();
	const albumsResponse = await fetch(`http://localhost:8080/api/artists/${id}/albums`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			"Accept": "application/json"
		},
	});
	if (!albumsResponse.ok) {
		throw new Error('Failed to fetch albums data');
	}
	const albumsData = await albumsResponse.json();
	return {
		artist: artistData,
		albums: albumsData,
	};
};