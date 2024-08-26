import { redirect } from '@sveltejs/kit';

import * as patientRepo from '$lib/repositories/patient.Repository';

import * as utiliy from '$lib/utility/utilities.js';

export const load = async ({ cookies }) => {
	// referesh auth token if necessary
	await utiliy.refereshAuthTokenIfNecessary(cookies);

	const access_token = cookies.get('access_token');

	// when access token is not found
	if (!access_token) {
		throw redirect(301, '/');
	}

	return { patient: patientRepo.getPatient(access_token) };
};
