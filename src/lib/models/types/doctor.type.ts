import type { Gender } from '../enum/gender-enum';

export type DoctorType = {
	id: string;
	name: string;
	gender: Gender;
	photo_url: string | null;
	telephone: string;
	field: string;
	created_at: Date;
};
