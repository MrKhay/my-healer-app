import { redirect } from '@sveltejs/kit';

export function load({ cookies }) {
	const access_token = cookies.get('access_token');
	const user_type = cookies.get('user_type');

	if (access_token && user_type) {
		if (user_type == 'patient') {
			throw redirect(307, '/');
		}
		if (user_type == 'doctor') {
			throw redirect(307, '/doctor/signup');
		}
		if (user_type == 'staff') {
			throw redirect(307, '/staff/signup');
		}
	}
}
