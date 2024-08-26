import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

export const PUT: RequestHandler = async ({ cookies }) => {
	// clear cookies
	cookies.delete('access_token', { path: '/' });
	cookies.delete('refresh_token', { path: '/' });
	cookies.delete('expiration', { path: '/' });
	cookies.delete('user_type', { path: '/' });

	const loggedout = 'Logged out';
	return json({ loggedout });
};
