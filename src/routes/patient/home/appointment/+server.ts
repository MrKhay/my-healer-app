import { getAppointment, createAppointment } from '$lib/repositories/appointment.Repository';
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
	const responce = await getAppointment(access_token);

	console.log('Appointments: ', responce);

	return json({ responce });
};

export const POST: RequestHandler = async ({ cookies, request }) => {
	await refereshAuthTokenIfNecessary(cookies);

	const { doctor_id, description, appointment_date } = await request.json();

	console.log('Appointmentssss: ');
	const access_token = cookies.get('access_token');

	if (!access_token) {
		throw redirect(300, '/');
	}
	const responce = await createAppointment(doctor_id, description, appointment_date, access_token);

	console.log('Appointment: ', responce);

	return json({ responce });
};
