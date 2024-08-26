import type { Gender } from '../enum/gender-enum';

export type PatientType = {
	id: string;
	name: string;
	gender: Gender;
	photo_url: string | null;
	telephone: string | null;
	password: string | null;
	state: string;
	dob: Date;
};
