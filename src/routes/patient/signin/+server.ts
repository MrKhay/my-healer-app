import type { RequestHandler } from './$types';
import * as patientRepo from '$lib/repositories/patient.Repository';
import { json } from '@sveltejs/kit';
import type { TokenType } from '$lib/models/types/token.type';

export const POST: RequestHandler = async ({ request, cookies }) => {
	const { password, telephone } = await request.json();

	const responce = await patientRepo.signIn(telephone, password);

	const _token: TokenType = responce.token;
	const expiration = new Date(_token.expiration);

	cookies.set('access_token', _token.access_token, { path: '/' });
	cookies.set('refresh_token', _token.referesh_token, { path: '/' });
	cookies.set('user_type', _token.user_type, { path: '/' });
	cookies.set('expiration', expiration.toUTCString(), { path: '/' });

	return json({ responce });
};
