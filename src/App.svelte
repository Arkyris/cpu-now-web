<script>
	import Header from "./Header.svelte";
	import Form from "./Form.svelte";
</script>

<main>
	<div id="header_div">
	<Header />
	</div>
	<div id="logo_div">
		<img src="img/cpunowneon.png" alt="cpu now logo" />
	</div>
	<Form />
</main>

<style>
	main {
		text-align: center;
		background-color: #000;
		z-index: -1;
	}

	#header_div{
		position: fixed;
		z-index: 999;
		width: 100%;
		height: 85px;
	}

	#logo_div{
		position: relative;
		max-width: 100%;
		max-height: 100%;
		top: 100px;
	}
	img{
		z-index: 30;
		width: auto;
		height: 950px;
		margin-bottom: 40px;
	}


	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
