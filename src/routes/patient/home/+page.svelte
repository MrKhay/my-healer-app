<script lang="ts">
	import { AppBar, Tab, TabGroup } from '@skeletonlabs/skeleton';
	import SettledComponent from '$lib/components/patient/SettledComponent.svelte';
	import UnSettledComponent from '$lib/components/patient/UnSettledComponent.svelte';
	import Icon from '@iconify/svelte';
	import * as strings from '$lib/constants/strings';
	import { goto } from '$app/navigation';
	import { appointmentStore } from '$lib/stores/appointmentStore';
	import type { AppointmentType } from '$lib/models/types/appointment.types';
	import { showToast } from '$lib/utility/utilities';
	import type { DoctorType } from '$lib/models/types/doctor.type';
	import { onMount } from 'svelte';
	import { doctorListStore } from '$lib/stores/doctorStore';
	import { ToastType } from '$lib/models/enum/toast-type-enum';
	import { patientStore } from '$lib/stores/patientStore';

	export let data: any;
	let isLoading: boolean;

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
		}
		// isLoading = false;
	}

	async function logout() {
		await fetch('/patient/logout', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		goto('/');
	}

	onMount(() => {
		loadAppointments();
		loadDoctors();
	});
</script>

<body>
	<!-- App bar -->
	<AppBar slotTrail="place-content-end">
		<svelte:fragment slot="headline"
			><p class=" text-1xl font-medium">
				Welcome back, {$patientStore?.name ?? ''}
			</p></svelte:fragment
		>
		<svelte:fragment slot="trail">
			<button on:click={logout} class=" btn-sm variant-soft-error rounded-md">Logout</button
			></svelte:fragment
		>
		<a href="/signup" class="h3 font-semibold"
			><div class=" flex flex-row gap-1">
				<span>{strings.appName + '  '} </span>

				<Icon icon="maki:doctor" width="1.2em" height="1.2em" />
			</div>
		</a>
	</AppBar>
	<div class="h-screen w-full flex items-center justify-center">
		<div class="w-full max-w-4xl p-5">
			<div class=" p-4 flex flex-row w-full justify-center">
				{#if isLoading}
					Loading data...
				{/if}
			</div>
			<div class="flex flex-wrap gap-4 justify-center card">
				<div
					class="h-64 cursor-pointer w-64 flex-shrink-0 flex flex-col gap-5 p-5 justify-center items-center"
				>
					<button
						class="variant-ghost-secondary hover:animate-spin rounded-full h-4/5 w-4/5 flex flex-row align-middle justify-center items-center"
						on:click={() => {
							goto('/patient/home/appointment/');
						}}
					>
						<Icon icon="maki:doctor" width="5.2em" height="5.2em" />
					</button>
					<p class=" h3">Find a doctor</p>
				</div>
				<div
					class="h-64 cursor-pointer w-64 flex-shrink-0 flex flex-col gap-5 p-5 justify-center items-center"
				>
					<button
						class="variant-ghost-secondary hover:animate-spin rounded-full h-4/5 w-4/5 flex flex-row align-middle justify-center items-center"
						on:click={() => {
							goto('/patient/home/schedule/');
						}}
					>
						<Icon icon="uil:schedule" width="5.2em" height="5.2em" />
					</button>
					<p class=" h3">Schedule</p>
				</div>
				<div
					class="h-64 cursor-pointer w-64 flex-shrink-0 flex flex-col gap-5 p-5 justify-center items-center"
				>
					<button
						class="variant-ghost-secondary rounded-full hover:animate-spin h-4/5 w-4/5 flex flex-row align-middle justify-center items-center"
						on:click={() => {
							showToast('Under construction 🚧🚧', ToastType.ERROR);
						}}
					>
						<Icon icon="fluent:payment-32-filled" width="5.2em" height="5.2em" />
					</button>
					<p class=" h3">Payment</p>
				</div>
				<div
					class="h-64 cursor-pointer w-64 flex-shrink-0 flex flex-col gap-5 p-5 justify-center items-center"
				>
					<button
						class="variant-ghost-secondary rounded-full hover:animate-spin h-4/5 w-4/5 flex flex-row align-middle justify-center items-center"
						on:click={() => {
							goto('/patient/home/record/');
						}}
					>
						<Icon icon="fa6-solid:truck-medical" width="5.2em" height="5.2em" />
					</button>
					<p class=" h3">Medical Record's</p>
				</div>
			</div>
		</div>
	</div>
</body>
