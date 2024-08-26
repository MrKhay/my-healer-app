import type { StaffType } from '$lib/models/types/staff.type';
import { writable } from 'svelte/store';

export const staffStore = writable<StaffType | null>(null);
