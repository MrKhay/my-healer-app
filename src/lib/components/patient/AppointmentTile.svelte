<script lang="ts">
	import { goto } from '$app/navigation';
	import type { AppointmentType } from '$lib/models/types/appointment.types';
	import * as utility from '$lib/utility/utilities';
	export let appointment: AppointmentType;

	// function navigate() {
	//   goto(`attendance/${id}`);
	// }
</script>

<tr class="cursor-pointer" on:click={() => {}}>
	<td class=" table-cell"><p class=" font-medium my-2">{appointment.id}</p></td>
	<td class=" table-cell"><p class=" font-medium my-2">{appointment.description}</p></td>
	<td class=""><span>{utility.formatDateTime(new Date(appointment.appointment_date))}</span></td>
	<td class=""><span>{appointment.status}</span></td>
	<td class=""><span>{appointment.doctor.name}</span></td>
</tr>

<style>
	tr > td {
		vertical-align: middle;
	}
</style>
