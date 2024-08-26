<script lang="ts">
	import '../app.postcss';
	import { page } from '$app/stores';
</script>

<body>
	<div class="h-full flex flex-col items-center justify-center outline">
		<div class=" w-5/6 flex flex-col">
			<span class=" text-lg font-thin text-error-500 mb-5">{$page.status} ERROR</span>
			<span class="  text-6xl font-bold">Oop... {$page.error?.message}</span>
			<a href="/" class=" btn btn-sm variant-soft-primary self-end mt-3">Go home </a>
		</div>
	</div>
</body>
