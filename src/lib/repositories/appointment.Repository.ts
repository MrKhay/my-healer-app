import * as strings from '$lib/constants/strings';
import { error } from 'console';

// create new account
/// update account avatar
export async function getAppointment(access_token: string) {
	// make api call
	const responce = await fetch(`${strings.baseUrl}/appointment/`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + access_token
		}
	});

	const body = await responce.json();
	const data = body;

	if (responce.ok) {
		return data;
	} else {
		throw error(responce?.status, body.error);
	}
}

export async function createAppointment(
	doctor_id: string,
	description: string,
	appointment_date: Date,
	access_token: string
) {
	// make api call
	const responce = await fetch(`${strings.baseUrl}/appointment/`, {
		method: 'POST',
		body: JSON.stringify({ doctor_id, description, appointment_date }),
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + access_token
		}
	});

	const body = await responce.json();
	const data = body;

	if (responce.ok) {
		return data;
	} else {
		throw error(responce?.status, body.error);
	}
}
