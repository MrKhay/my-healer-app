import type { PatientType } from '$lib/models/types/patient.type';
import { writable } from 'svelte/store';

export const patientStore = writable<PatientType | null>(null);
