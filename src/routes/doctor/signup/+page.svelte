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

	let name: string = '';
	let telephone: string = '';
	let gender: string = '';
	let field: string = '';
	let password: string = '';
	let rePassword: string = '';
	let passwordError: string;
	let rePasswordError: string | null;
	let imageFile: File;
	let fileinput: any;
	let buffer: any;

	async function signUp() {
		try {
			const responce = await fetch('/doctor/signup', {
				method: 'POST',
				body: JSON.stringify({ name, telephone, password, field, gender }),
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

	async function updateProfilePic() {
		try {
			// Create FormData object
			const formData = new FormData();

			// Append the file to FormData

			formData.append('avatar', imageFile);

			const responce = await fetch('/doctor/signup/avatar/', {
				method: 'PUT',
				body: formData
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

		if (!buffer) {
			showToast('Please choose a profile picture', ToastType.ERROR);
			return;
		}

		if (!name) {
			showToast('Please enter name', ToastType.ERROR);
			return;
		}
		if (!telephone) {
			showToast('Please enter your phone number', ToastType.ERROR);
			return;
		}
		if (!field) {
			showToast('Please enter your state', ToastType.ERROR);
			return;
		}
		if (!gender) {
			showToast('Please your gender', ToastType.ERROR);
			return;
		}
		if (password != rePassword) {
			rePasswordError = 'Password does not match';
			return;
		} else {
			rePasswordError = null;
		}
		isLoading = true;
		var response = await signUp();
		if (response == false) {
			isLoading = false;
			return;
		}
		response = await updateProfilePic();
		if (response == false) {
			isLoading = false;
			return;
		}
		isLoading = false;

		showToast(strings.accountCreated, ToastType.SUCCESS);
	}

	function goBack() {
		if (browser) window.history.back();
	}

	function onFileSelected(e: any) {
		imageFile = e.target.files[0];

		// Check if file size is less than or equal to 350KB
		const maxSizeInKB = 350;
		const maxSizeInBytes = maxSizeInKB * 1024;

		if (imageFile.size > maxSizeInBytes) {
			showToast('Image size exceeds 350KB\nPlease select a smaller image.', ToastType.ERROR);
			return;
		}
		let reader = new FileReader();
		reader.readAsDataURL(imageFile);
		reader.onload = (e) => {
			if (e.target) {
				buffer = e.target.result;
			}
		};
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

			<a href="/signup" class="h3 font-semibold">{strings.creatAccount}</a>
		</AppBar>

		<div class=" h-lvh w-full flex flex-col justify-center items-center">
			<div
				class="w-10/12 lg:w-6/12 md:w-8/12 card flex flex-col px-10 py-9 items-start align-middle"
			>
				<div class=" self-center flex flex-col justify-center align-middle items-center pb-5">
					{#if buffer}
						<img class="avatar h-20 w-20 rounded-full" src={buffer} alt="avatar" />
					{:else}
						<Icon icon="iconamoon:profile-circle-light" width="5em" />
					{/if}
					<button
						transition:slide
						class="btn btn-sm"
						on:click={() => {
							fileinput.click();
						}}
					>
						Choose Profile Picture
					</button>
					<input
						style="display:none"
						type="file"
						accept=".jpg, .jpeg, .png"
						on:change={onFileSelected}
						bind:this={fileinput}
					/>
				</div>
				<div class=" w-full">
					<div class=" space-y-5">
						<!-- company name -->
						<label class="label mt-2">
							<span>{strings.fullName}</span>
							<input
								class="input rounded-md"
								type="text"
								disabled={isLoading}
								bind:value={name}
								name="name"
								required
								placeholder="Castle and castle consulting"
							/>
						</label>

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

						<!-- gender -->
						<label class="w-full">
							<span>{strings.gender}</span>
							<select
								class="form-select block text-black w-full mt-1 rounded-md shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-50"
								bind:value={gender}
								disabled={isLoading}
								name="gender"
							>
								<option value="" disabled>Select gender</option>
								<option value="M">Male</option>
								<option value="F">Female</option>
							</select>
						</label>

						<!-- field -->
						<label class="w-full">
							<span>{strings.field}</span>
							<select
								class="form-select block text-black w-full mt-1 rounded-md shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-50"
								bind:value={field}
								disabled={isLoading}
								name="field"
							>
								<option value="" disabled>Select field</option>
								{#each strings.fields as field}
									<option value={field}>{field}</option>
								{/each}
							</select>
						</label>

						<div class=" flex flex-row gap-5">
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
								{#if passwordError}
									<p class=" text-sm input-error rounded-md px-2 py-1">
										{passwordError}
									</p>
								{/if}
							</label>

							<!-- reenter password -->
							<label class="label w-full">
								<span>{strings.confirmPassword}</span>
								<input
									class="input rounded-md {rePasswordError ? 'input-error' : null}"
									bind:value={rePassword}
									type="password"
									name="re-password"
									disabled={isLoading}
									required
									placeholder={strings.confirmPassword}
								/>

								{#if rePasswordError}
									<p class=" text-sm input-error rounded-md px-2 py-1 mt-1">
										{rePasswordError}
									</p>
								{/if}
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
								{strings.creatAccount}
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
