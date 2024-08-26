<script lang="ts">
	import { onMount } from 'svelte';
	import type { LayoutData } from './$types';
	import type { PatientType } from '$lib/models/types/patient.type';
	import { patientStore } from '$lib/stores/patientStore';
	import { Avatar } from '@skeletonlabs/skeleton';
	import Icon from '@iconify/svelte';

	export let data: LayoutData;

	onMount(loadData);

	async function loadData() {
		let responce = await data.patient;
		const patient: PatientType = responce.patient;
		patientStore.set(patient);
	}
</script>

<body>
	<slot />
</body>
