import * as strings from '$lib/constants/strings';
import { error, redirect, type Cookies } from '@sveltejs/kit';
// create new account
export async function signUp(name: string, telephone: string, password: string, gender: string) {
	// trirm values
	name = name.trim();
	telephone = telephone.trim();
	password = password.trim();
	gender = gender.trim();

	// make api call
	const responce = await fetch(`${strings.baseUrl}/staff/signup/`, {
		method: 'POST',
		body: JSON.stringify({ name, telephone, password, gender }),
		headers: {
			'Content-Type': 'application/json'
		}
	});

	const body = await responce.json();
	const data = body;
	if (responce.ok) {
		return data;
	} else {
		const errMsg = body.error == 'Duplicate entry' ? 'account already exits' : body.error;
		throw error(responce?.status, errMsg);
	}
}
export async function signIn(telephone: string, password: string) {
	// trirm values
	telephone = telephone.trim();
	password = password.trim();

	// make api call
	const responce = await fetch(`${strings.baseUrl}/staff/signin/`, {
		method: 'POST',
		body: JSON.stringify({ telephone, password }),
		headers: {
			'Content-Type': 'application/json'
		}
	});

	const body = await responce.json();
	const data = body;
	if (responce.ok) {
		return data;
	} else {
		const errMsg = body.error == 'Duplicate entry' ? 'account already exits' : body.error;
		throw error(responce?.status, errMsg);
	}
}

/// update account avatar
export async function updateProfielPic(access_token: string, avatar: File) {
	// Create FormData object

	console.log('iooo 90');
	const formData = new FormData();
	formData.append('avatar', avatar);

	// make api call
	const responce = await fetch(`${strings.baseUrl}/staff/avatar`, {
		method: 'PUT',
		body: formData,
		headers: {
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

/// referesh auth
export async function refereshAuthToken(referesh_token: string, cookies: Cookies) {
	const responce = await fetch(`${strings.baseUrl}/staff/token/`, {
		method: 'PUT',
		body: JSON.stringify({ referesh_token }),
		headers: {
			'Content-Type': 'application/json'
		}
	});

	const body = await responce.json();
	const data = body;
	if (responce.ok) {
		return data;
	} else {
		if (body.error == 'Referesh token expired' || body.error == 'Invalid access token') {
			cookies.delete('access_token', { path: '/' });
			cookies.delete('refresh_token', { path: '/' });
			cookies.delete('expiration', { path: '/' });
			redirect(303, '/');
		}
		throw error(responce?.status, body.error);
	}
}
