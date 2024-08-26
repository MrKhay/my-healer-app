import type { AppointmentStatus } from '../enum/appointment_status';
import type { DoctorType } from './doctor.type';

export type AppointmentType = {
	id: number;
	doctor: DoctorType;
	patient_id: string;
	description?: string;
	appointment_date: Date;
	status: AppointmentStatus;
	created_at: Date;
};
