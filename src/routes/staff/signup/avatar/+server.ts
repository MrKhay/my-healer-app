import type { RequestHandler } from './$types';
import * as staffRepo from '$lib/repositories/staff.Repository';
import * as utility from '$lib/utility/utilities';
import { json, redirect } from '@sveltejs/kit';

export const PUT: RequestHandler = async ({ request, cookies }) => {
	const formData = await request.formData();

	console.log('908766');
	// Handle the file upload if needed
	const file = formData.get('avatar') as File;

	await utility.refereshAuthTokenIfNecessary(cookies);
	const access_token = cookies.get('access_token');

	if (!access_token) {
		throw redirect(303, '/');
	}

	const responce = await staffRepo.updateProfielPic(access_token, file);

	return json({ responce });
};
