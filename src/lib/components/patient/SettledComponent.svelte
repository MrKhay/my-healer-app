<script lang="ts">
	import { ToastType } from '$lib/models/enum/toast-type-enum';
	import type { AppointmentType } from '$lib/models/types/appointment.types';
	import { appointmentStore } from '$lib/stores/appointmentStore';
	import { patientStore } from '$lib/stores/patientStore';
	import { showToast } from '$lib/utility/utilities';
	import { onMount } from 'svelte';
	import LoadingCard from '../LoadingCard.svelte';
	import AttendanceBody from './AppointmentBody.svelte';
	import AttendanceLoadingTile from './AppointmentLoadingTile.svelte';
	import ErrorCard from './ErrorCard.svelte';
	import AppointmentTile from './AppointmentTile.svelte';
	import type { DoctorType } from '$lib/models/types/doctor.type';
	import { doctorListStore, type doctorStore } from '$lib/stores/doctorStore';
	import { AppointmentStatus } from '$lib/models/enum/appointment_status';

	var isLoading = false;
	var errMsg: string;
	$: filteredAppointment = $appointmentStore?.filter((a) => a.status === AppointmentStatus.Settled);

	async function loadAppointments() {
		if ($appointmentStore) {
			return;
		}
		// When data is avaliable dont call fetch
		isLoading = true;
		const responce = await fetch('/patient/home/appointment/', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const data = await responce.json();

		if (responce.ok) {
			const appointments: AppointmentType[] = data.responce.appointments;
			appointmentStore.set(appointments);
		} else {
			showToast(data.message, ToastType.ERROR);
			errMsg = data.message;
		}
		isLoading = false;
	}

	async function loadDoctors() {
		if ($doctorListStore) {
			return;
		}
		// When data is avaliable dont call fetch
		// isLoading = true;
		const responce = await fetch('/patient/home/doctor/', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const data = await responce.json();

		if (responce.ok) {
			const doctors: DoctorType[] = data.responce.doctors;
			doctorListStore.set(doctors);
		} else {
			showToast(data.message, ToastType.ERROR);
			errMsg = data.message;
		}
		// isLoading = false;
	}

	onMount(() => {
		loadAppointments();
		loadDoctors();
	});
</script>

<body>
	<div class=" size-full overflow-auto">
		<!-- Responsive Container (recommended) -->
		<div class="">
			{#if isLoading}
				<AttendanceBody>
					<svelte:fragment slot="body">
						{#each Array(10) as _}
							<AttendanceLoadingTile />
						{/each}
					</svelte:fragment>
				</AttendanceBody>
			{:else if errMsg && !isLoading}
				<ErrorCard
					error={errMsg}
					code={404}
					transparent={true}
					handleClick={() => loadAppointments()}
				/>
			{:else}
				<!-- EMPTY  -->
				<AttendanceBody>
					<svelte:fragment slot="body">
						<!-- DATA -->
						{#each (filteredAppointment ?? []).slice(0, 10) as appointment}
							<AppointmentTile {appointment} />
						{/each}
					</svelte:fragment>
				</AttendanceBody>
			{/if}
		</div>
	</div></body
>
