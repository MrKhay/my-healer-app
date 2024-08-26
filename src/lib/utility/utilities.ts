import toast from 'svelte-french-toast';
import { ToastType } from '$lib/models/enum/toast-type-enum';
import * as patientRepo from '$lib/repositories/patient.Repository';
import { redirect, type Cookies } from '@sveltejs/kit';
import type { TokenType } from '$lib/models/types/token.type';

export function formatMonth(date: Date): string {
	const options: Intl.DateTimeFormatOptions = {
		day: 'numeric',
		month: 'short',
		year: 'numeric'
	};
	const formattedDate = date.toLocaleDateString('en-US', options);
	return formattedDate;
}

export function formatDate(date: Date | null | undefined): string | null {
	if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
		return null;
	}

	const now = new Date();
	const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
	const diffInHours = Math.floor(diffInMinutes / 60);

	if (diffInMinutes < 5) {
		return 'just now';
	} else if (diffInMinutes < 10) {
		return '5 mins ago';
	} else if (diffInMinutes < 60) {
		return `${diffInMinutes} mins ago`;
	} else if (diffInHours === 1) {
		return '1 hour ago';
	} else if (diffInHours < 5) {
		return `${diffInHours} hours ago`;
	} else if (isYesterday(date)) {
		return 'Yesterday';
	} else if (isLastWeek(date)) {
		const options: Intl.DateTimeFormatOptions = { weekday: 'long' };
		return date.toLocaleDateString('en-US', options);
	} else if (now.getFullYear() === date.getFullYear()) {
		const options: Intl.DateTimeFormatOptions = {
			day: 'numeric',
			month: 'short'
		};
		const formattedDate = date.toLocaleDateString('en-US', options);
		return addDateSuffix(formattedDate, date.getDate());
	} else {
		const options: Intl.DateTimeFormatOptions = {
			day: 'numeric',
			month: 'short',
			year: 'numeric'
		};
		const formattedDate = date.toLocaleDateString('en-US', options);
		return formattedDate;
	}
}

function addDateSuffix(formattedDate: string, day: number): string {
	if (day >= 11 && day <= 13) {
		return formattedDate + 'th';
	}
	switch (day % 10) {
		case 1:
			return formattedDate + 'st';
		case 2:
			return formattedDate + 'nd';
		case 3:
			return formattedDate + 'rd';
		default:
			return formattedDate + 'th';
	}
}

function isYesterday(date: Date): boolean {
	const now = new Date();
	const yesterday = new Date(now);
	yesterday.setDate(now.getDate() - 1);
	return (
		date.getDate() === yesterday.getDate() &&
		date.getMonth() === yesterday.getMonth() &&
		date.getFullYear() === yesterday.getFullYear()
	);
}

function isLastWeek(date: Date): boolean {
	const now = new Date();
	const lastWeek = new Date(now);
	lastWeek.setDate(now.getDate() - 7);
	return date >= lastWeek;
}

export function formatTime(time: Date): string {
	if (!(time instanceof Date) || isNaN(time.getTime())) {
		return 'Invalid Time';
	}

	const hours = time.getHours();
	const minutes = time.getMinutes();
	const ampm = hours >= 12 ? 'pm' : 'am';
	const formattedHours = hours % 12 || 12; // Convert to 12-hour format

	const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

	return `${formattedHours}:${formattedMinutes}${ampm}`;
}

export async function refereshAuthTokenIfNecessary(
	cookies: Cookies
): Promise<{ access_token: string } | null> {
	const access_token = cookies.get('access_token');
	const expiration = cookies.get('expiration');
	const referesh_token = cookies.get('refresh_token');
	const user_type = cookies.get('user_type');

	if (!access_token || !expiration || !referesh_token) {
		throw redirect(301, '/');
	}

	const now = new Date();
	const expiration_date = new Date(expiration);

	// when token is expired
	if (now > expiration_date) {
		// referesh auth token

		let responce;
		if (user_type == 'patient') {
			responce = await patientRepo.refereshAuthToken(referesh_token, cookies);
		}

		if (!responce) {
			return null;
		}

		const _token: TokenType = responce.token;
		const expiration = new Date(_token.expiration);

		// update cookie
		cookies.set('access_token', _token.access_token, { path: '/' });
		cookies.set('refresh_token', _token.referesh_token, { path: '/' });
		cookies.set('expiration', expiration.toUTCString(), { path: '/' });

		return { access_token: _token.access_token };
	}

	return { access_token };
}

export //   show toast
function showToast(msg: string, type: ToastType) {
	switch (type) {
		case ToastType.ERROR:
			toast.error(msg);
			break;

		default:
			toast.success(msg);
			break;
	}
}

export function formatDateTime(date: Date | null | undefined): string | null {
	if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
		return null;
	}

	const options: Intl.DateTimeFormatOptions = {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		hour12: true
	};

	return date.toLocaleDateString('en-US', options) + ' ';
}
