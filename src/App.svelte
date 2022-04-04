<script>
	import Header from "./Header.svelte";
	import Form from "./Form.svelte";


</script>

<main>
	<Header />
	<Form />
</main>

<style>
	main {
		text-align: center;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
