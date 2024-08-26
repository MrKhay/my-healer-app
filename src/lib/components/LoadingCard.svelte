<script lang="ts">
	import ProgressRadial from './ProgressRadial.svelte';
</script>

<body>
	<div
		class=" flex flex-col w-full h-full justify-center align-middle p-20 items-center self-center"
	>
		<div class="card align-middle p-20">
			<p>Loading appointments...</p>

			<ProgressRadial />
		</div>
	</div>
</body>
