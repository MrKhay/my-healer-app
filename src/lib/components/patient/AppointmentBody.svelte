<script lang="ts"></script>

<body>
	<div class="table-container h-full">
		<table class="table table-hover table-auto">
			<thead>
				<tr class=" variant-soft-surface">
					<th><span class=" text-sm font-semibold">ID</span></th>
					<th><span class=" text-sm font-semibold">Description</span></th>
					<th><span class=" text-sm font-semibold">Date</span></th>
					<th><span class=" text-sm font-semibold">Status</span></th>
					<th><span class=" text-sm font-semibold">Doctor</span></th>
				</tr>
			</thead>

			<tbody>
				<slot name="body" />
			</tbody>
		</table>
	</div>
</body>
