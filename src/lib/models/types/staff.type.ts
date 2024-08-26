import type { Gender } from '../enum/gender-enum';

export type StaffType = {
	id: string;
	name: string;
	gender: Gender;
	photo_url: string | null;
	telephone: string;
	password: string;
	created_at: Date;
};
