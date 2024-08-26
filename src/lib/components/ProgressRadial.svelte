<script>
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	export let condition = false;
	export let width = 'w-5';
	export let meterColor = 'stroke-surface-500';
	export let trackColor = 'stroke-surface-500/30';
</script>

<ProgressRadial
	stroke={100}
	width={condition ? width : 'w-0'}
	meter={meterColor}
	track={trackColor}
	transition="fade"
	strokeLinecap="round"
	value={undefined}
/>
