<script lang="ts">
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';

	export let error: string;
	export let code: Number;
	export let transparent: boolean = true;
	export let isCompact: boolean = false;
	export let handleClick: () => void;

	let animationContainer: HTMLElement;
</script>

<body>
	<div class="h-3/4 flex flex-col justify-center items-center m-3">
		<div class=" {transparent ? '' : 'card'} flex flex-col items-center px-10 py-5">
			{#if !isCompact}
				<div bind:this={animationContainer} class=" h-52 w-full pb-10"></div>
			{/if}

			<span class=" text-lg font-thin">Oops, Something went wrong.</span>
			<span class=" text-md mt-2 text-error-500 text-center font-light">{error}</span>
			<button
				class=" btn {isCompact ? ' btn-sm' : 'btn-md'} variant-filled-error my-7 gap-3"
				on:click={() => handleClick()}
			>
				<Icon icon="icon-park-outline:undo" width="1.2em" height="1.2em" />
				Try again</button
			>
		</div>
	</div>
</body>
