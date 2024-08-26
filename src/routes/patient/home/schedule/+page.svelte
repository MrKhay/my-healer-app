<script lang="ts">
	import { AppBar, Tab, TabGroup } from '@skeletonlabs/skeleton';
	import type { PageData } from '../schedule/$types';
	import SettledComponent from '$lib/components/patient/SettledComponent.svelte';
	import UnSettledComponent from '$lib/components/patient/UnSettledComponent.svelte';
	import Icon from '@iconify/svelte';
	import * as strings from '$lib/constants/strings';
	import { browser } from '$app/environment';
	export let data: PageData;
	let tabSet = 0;
	function goBack() {
		if (browser) window.history.back();
	}
</script>

<body>
	<AppBar>
		<svelte:fragment slot="lead">
			<button class=" btn btn-sm" on:click={goBack}>
				<Icon icon="ic:round-arrow-back" width="1.8em" />
			</button>
		</svelte:fragment>
		<a href="/signup" class="h3 font-semibold"
			><div class=" flex flex-row gap-1">
				<span>Schedule </span>

				<Icon icon="maki:doctor" width="1.2em" height="1.2em" />
			</div>
		</a>
	</AppBar>
	<div class=" pt-5">
		<TabGroup>
			<Tab bind:group={tabSet} name="tab1" value={0}>
				<span>Settled</span>
			</Tab>
			<Tab bind:group={tabSet} name="tab2" value={1}>Unsettled</Tab>
			<!-- Tab Panels --->
			<svelte:fragment slot="panel">
				<div class=" p-3">
					{#if tabSet === 0}
						<SettledComponent />
					{:else if tabSet === 1}
						<UnSettledComponent />
					{/if}
				</div>
			</svelte:fragment>
		</TabGroup>
	</div>
</body>
