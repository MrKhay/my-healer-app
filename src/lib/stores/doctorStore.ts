import type { DoctorType } from '$lib/models/types/doctor.type';
import { writable } from 'svelte/store';

export const doctorStore = writable<DoctorType | null>();
export const doctorListStore = writable<Array<DoctorType> | null>();
