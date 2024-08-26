<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton';
	import * as strings from '$lib/constants/strings';
	import type { PageData } from './$types';
	import { browser } from '$app/environment';
	import Icon from '@iconify/svelte';
	import { doctorListStore } from '$lib/stores/doctorStore';
	import { receive, send } from '$lib/animation/listTransition';
	import type { DoctorType } from '$lib/models/types/doctor.type';
	import { showToast } from '$lib/utility/utilities';
	import { appointmentStore } from '$lib/stores/appointmentStore';
	import { ToastType } from '$lib/models/enum/toast-type-enum';
	import type { AppointmentType } from '$lib/models/types/appointment.types';
	import ProgressRadial from '$lib/components/ProgressRadial.svelte';

	export let data: PageData;
	let isLoading: boolean = false;
	let field: string = '';
	let description: string = '';
	let doctor_id: string;
	let appointmentDateTime = '';
	let doctors = $doctorListStore;
	let appointments = $appointmentStore ?? [];
	$: appointment_date = new Date(appointmentDateTime);

	function goBack() {
		if (browser) window.history.back();
	}

	async function createAppointment() {
		if (!doctor_id) {
			showToast('No doctor booked', ToastType.ERROR);
			return;
		}
		if (!appointment_date) {
			showToast('No appointment date specified', ToastType.ERROR);
			return;
		}
		if (!doctor_id) {
			showToast('No description found', ToastType.ERROR);
			return;
		}
		// When data is avaliable dont call fetch
		isLoading = true;
		const responce = await fetch('/patient/home/appointment/', {
			body: JSON.stringify({ description, appointment_date, doctor_id }),
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const data = await responce.json();

		if (responce.ok) {
			const appointment: AppointmentType = data.responce.appointment;
			appointmentStore.set([...appointments, appointment]);
			showToast('Appointment created', ToastType.SUCCESS);
			goBack();
		} else {
			showToast(data.message, ToastType.ERROR);
		}
		isLoading = false;
	}

	$: filteredDoctors = doctors?.filter((i) => i.field.includes(field));

	console.log('Doctors ', filteredDoctors);
</script>

<body>
	<div class=" h-full w-full">
		<!-- App bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<button class=" btn btn-sm" on:click={goBack}>
					<Icon icon="ic:round-arrow-back" width="1.8em" />
				</button>
			</svelte:fragment>

			<a href="/signup" class="h3 font-semibold"
				><div class=" flex flex-row gap-1">
					<span>{strings.findADoctor} </span>

					<Icon icon="maki:doctor" width="1.2em" height="1.2em" />
				</div>
			</a>
		</AppBar>

		<div class=" p-4">
			<label class="w-full gap-2">
				<p class=" h2 pb-3">Select Doctor Field</p>
				<select
					class="form-select block text-black w-full mt-1 variant-soft-primary rounded-md"
					bind:value={field}
					name="field"
				>
					<option value="" disabled>Select field</option>
					{#each strings.fields as field}
						<option value={field}>{field}</option>
					{/each}
				</select>
			</label>

			<p class=" h2 pt-10">Avaliable Doctors</p>
			<div class=" ">
				<body>
					<!-- <div class=" mt-3 size-full overflow-auto">
						<div class="overflow-auto grid grid-cols-2 md:grid-cols-3 gap-6">
							{#each $doctorListStore ?? [] as { id, name, field, gender, photo_url } (id)}
							
							{/each}
						</div>
					</div> -->

					<div
						class="snap-x scroll-px-4 snap-mandatory scroll-smooth flex gap-4 overflow-x-auto px-4 py-10"
					>
						{#if (filteredDoctors?.length ?? 0) > 1}
							{#each filteredDoctors ?? [] as { id, name, field, gender, photo_url } (id)}
								<li class="list-none" in:receive={{ key: id }} out:send={{ key: id }}>
									<div
										class="p-4 gap-3 flex flex-col rounded-md w-auto transition duration-300 ease-in-out transform hover:shadow-lg {doctor_id ==
										id
											? 'bg-primary-500 text-white'
											: ''}"
									>
										<div
											class="card h-48 flex justify-center items-center overflow-hidden rounded-full shadow-md"
										>
											<img
												class="object-cover w-full h-full"
												src={photo_url}
												alt="{name}'s avatar"
											/>
										</div>
										<p class="px-2 text-lg font-medium mt-4">{name}</p>
										<p class="px-2 text-lg font-medium">
											<span class="font-normal">{field}</span>
										</p>
										<div class="flex flex-row items-end justify-end mt-4">
											<button
												class="self-end btn btn-sm variant-soft-primary rounded-md transition duration-300 ease-in-out transform hover:bg-primary-700"
												on:click={() => {
													doctor_id = id;
												}}
											>
												{doctor_id == id ? 'Booked' : 'Book'}
											</button>
										</div>
									</div>
								</li>
							{/each}
						{:else}
							<div class=" flex flex-row justify-center w-full">
								<p>No Doctor Found</p>
							</div>
						{/if}
					</div>
				</body>
			</div>
			<label class="label w-full">
				<p class="h2 py-8">Date</p>
				<input
					class="input rounded-md"
					bind:value={appointmentDateTime}
					type="date"
					name="appointmentDateTime"
					required
				/>
			</label>

			<label class="label w-full">
				<p class=" h2 py-8">Description</p>
				<textarea
					class="input rounded-md h-18"
					bind:value={description}
					name="name"
					placeholder="How do you feel?"
					required
				></textarea>
			</label>

			<div class=" flex flex-row justify-end py-10">
				<button class=" btn btn-md variant-filled rounded-md" on:click={createAppointment}
					><p>Book Appointment</p>

					<ProgressRadial
						condition={isLoading}
						meterColor="stroke-surface-500"
						trackColor="stroke-surface-500/30"
					/>
				</button>
			</div>
		</div>
	</div>
</body>
