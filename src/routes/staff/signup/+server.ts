import * as staffRepo from '$lib/repositories/staff.Repository';
import { json, type RequestHandler } from '@sveltejs/kit';
import type { TokenType } from '$lib/models/types/token.type';

export const POST: RequestHandler = async ({ request, cookies }) => {
	const { name, password, telephone, gender } = await request.json();

	const responce = await staffRepo.signUp(name, telephone, password, gender);

	const _token: TokenType = responce.token;
	const expiration = new Date(_token.expiration);

	cookies.set('access_token', _token.access_token, { path: '/' });
	cookies.set('refresh_token', _token.referesh_token, { path: '/' });
	cookies.set('user_type', _token.user_type, { path: '/' });
	cookies.set('expiration', expiration.toUTCString(), { path: '/' });

	return json({ responce });
};
