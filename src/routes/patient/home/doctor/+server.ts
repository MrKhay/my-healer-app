import { getDoctors } from '$lib/repositories/doctor.Repository';
import { refereshAuthTokenIfNecessary } from '$lib/utility/utilities';
import { json, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ cookies }) => {
	await refereshAuthTokenIfNecessary(cookies);

	console.log('Appointmentssss: ');
	const access_token = cookies.get('access_token');

	if (!access_token) {
		throw redirect(300, '/');
	}
	const responce = await getDoctors(access_token);

	console.log('Doctors: ', responce);

	return json({ responce });
};
