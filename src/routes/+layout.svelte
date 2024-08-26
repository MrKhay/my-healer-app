<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar, initializeStores } from '@skeletonlabs/skeleton';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import { Toaster } from 'svelte-french-toast';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	// Initialize stores
	initializeStores();
</script>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<!-- <AppBar>
			<svelte:fragment slot="lead">
				<strong class="text-xl uppercase">My healer</strong>
			</svelte:fragment>
		</AppBar> -->
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
	<Toaster />
</AppShell>
