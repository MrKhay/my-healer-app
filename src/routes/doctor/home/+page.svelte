<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import Icon from '@iconify/svelte';
	import { browser } from '$app/environment';

	export let data: PageData;

	function goBack() {
		if (browser) window.history.back();
	}

	let index = 0;
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
					<span>Medical Record </span>

					<Icon icon="maki:doctor" width="1.2em" height="1.2em" />
				</div>
			</a>
		</AppBar>

		<div class=" h-full flex flex-row gap-4 p-5">
			<div class=" h-full w-1/4 card flex flex-col items-center p-5 gap-3">
				<div
					class="avatar h-20 w-20 rounded-full variant-filled-tertiary flex flex-row items-center justify-center"
				>
					<Icon icon="maki:doctor" class=" self-center" width="2em" height="2em" />
				</div>
				<p class=" text-lg">Dr. David Ken</p>
				<p class=" text-lg">Surgeon</p>
			</div>
			<div class=" h-full w-2/3 card flex flex-col">
				<div class=" flex flex-row justify-around">
					<button
						class=" text-md font-bold w-full cursor-pointer {index == 0
							? ' variant-ghost-tertiary'
							: 'variant-ghost'} text-center p-5"
						on:click={() => {
							index = 0;
						}}
					>
						Medical History
					</button>
					<button
						class=" text-md font-bold w-full cursor-pointer {index == 1
							? ' variant-ghost-tertiary'
							: 'variant-ghost'} text-center p-5"
						on:click={() => {
							index = 1;
						}}
					>
						Lab result
					</button>
					<button
						class=" text-md font-bold w-full cursor-pointer {index == 2
							? ' variant-ghost-tertiary'
							: 'variant-ghost'} text-center p-5"
						on:click={() => {
							index = 2;
						}}
					>
						Medications
					</button>
				</div>

				{#if index == 0}
					<div class=" flex flex-col m-5 items-center gap-4">
						<!-- patient name -->
						<label class="label w-full">
							<span>Patient name</span>
							<input class="input rounded-md" type="text" name="text" placeholder="" required />
						</label>
						<!-- Date -->
						<label class="label w-full">
							<span>Date</span>
							<input class="input rounded-md" type="date" name="text" placeholder="" required />
						</label>

						<textarea
							class="input rounded-md h-20 mt-4"
							name="name"
							placeholder="Short description of what you want"
							required
						></textarea>

						<div class=" flex flex-row w-full gap-8 mt-5">
							<label class="label w-full">
								<input
									class="input rounded-md"
									type="text"
									name="text"
									placeholder="Reason for request"
									required
								/>
							</label>

							<div class="  rounded-full p-3 cursor-pointer items-center outline">
								<Icon icon="ic:sharp-send" class=" self-center" width="1.2em" height="1.2em" />
							</div>
						</div>
					</div>
				{:else}
					<div class=" flex flex-row items-center justify-center w-full h-full">
						<p class=" text-4xl">Coming soon..</p>
					</div>
				{/if}
			</div>
			<div class=" card w-1/6 h-full flex flex-col justify-start items-center p-5 gap-3">
				<div
					class=" flex flex-row items-center justify-center rounded-full p-3 h-16 w-16 cursor-pointer outline outline-tertiary-500"
				>
					<Icon
						icon="pixelarticons:message"
						class=" text-tertiary-500"
						width="1.5em"
						height="1.5em"
					/>
				</div>
				<p class=" text-lg text-tertiary-500">Message</p>
			</div>
		</div>
	</div>
</body>
