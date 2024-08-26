<script lang="ts">
	import * as strings from '$lib/constants/strings';
	import { AppBar, getModalStore } from '@skeletonlabs/skeleton';
	import { ToastType } from '$lib/models/enum/toast-type-enum';
	import ProgressRadial from '$lib/components/ProgressRadial.svelte';
	import { browser } from '$app/environment';
	import Icon from '@iconify/svelte';
	import { goto } from '$app/navigation';
	import { showToast } from '$lib/utility/utilities';
	import { slide } from 'svelte/transition';

	// allow navigating back
	const modalStore = getModalStore();
	let isLoading = false;
	let telephone: string = '';
	let password: string = '';

	async function signIn() {
		try {
			const responce = await fetch('/doctor/signin', {
				method: 'POST',
				body: JSON.stringify({ telephone, password }),
				headers: {
					'Content-Type': 'application/json'
				}
			});
			const data = await responce.json(); // Parse response body as JSON
			if (responce.ok) {
				return true;
			} else {
				// Handle error response
				const error = data.message;
				showToast(error, ToastType.ERROR);
				return false;
			}
		} catch (error) {
			return false;
		}
	}

	async function handleSubmit(event: Event) {
		event.preventDefault();

		if (!telephone) {
			showToast('Please enter your phone number', ToastType.ERROR);
			return;
		}

		if (!password) {
			showToast('Please enter your password', ToastType.ERROR);
			return;
		}

		isLoading = true;
		var response = await signIn();
		if (response == false) {
			isLoading = false;
			return;
		}

		isLoading = false;

		showToast(strings.welcomeBack, ToastType.SUCCESS);
	}

	function goBack() {
		if (browser) window.history.back();
	}
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

			<a href="/signup" class="h3 font-semibold">{strings.login}</a>
		</AppBar>

		<div class=" h-lvh w-full flex flex-col justify-center items-center">
			<div
				class="w-10/12 lg:w-6/12 md:w-8/12 card flex flex-col px-10 py-9 items-start align-middle"
			>
				<div class=" w-full">
					<div class=" space-y-5">
						<!-- telephone -->
						<label class="label w-full">
							<span>{strings.phoneNumber}</span>
							<input
								class="input rounded-md"
								bind:value={telephone}
								type="tel"
								disabled={isLoading}
								name="telephone"
								placeholder="08xxxxxx"
								required
							/>
						</label>

						<div class=" flex flex-col gap-5">
							<!-- password -->
							<label class="label w-full">
								<span>{strings.password}</span>
								<input
									class="input rounded-md"
									bind:value={password}
									type="password"
									name="password"
									disabled={isLoading}
									required
									placeholder={strings.enterPassword}
								/>
							</label>
						</div>

						<!-- button -->

						<div class=" w-full flex flex-col justify-center">
							<button
								type="submit"
								class="btn btn-lg rounded-md my-5 variant-filled-primary gap-2"
								disabled={isLoading}
								on:click={handleSubmit}
							>
								<ProgressRadial
									condition={isLoading}
									meterColor="stroke-surface-500"
									trackColor="stroke-surface-500/30"
								/>
								{strings.login}
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
