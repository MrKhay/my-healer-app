import type { AppointmentType } from '$lib/models/types/appointment.types';
import { writable } from 'svelte/store';

export const appointmentStore = writable<AppointmentType[] | null>(null);
