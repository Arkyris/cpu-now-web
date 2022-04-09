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
	<div class="section">
		<Form />
	</div>
	<div class="section"></div>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		text-align: center;
		background-color: #000;
		z-index: -1;
	}

	#header_div {
		position: fixed;
		z-index: 999;
		margin-bottom: 1vh;
		width: 100%;
		height: 9vh;
	}

	#logo_div {
		position: relative;
		max-width: 100vw;
		max-height: 89.5vh;
		top: 100px;
	}
	img {
		max-width: 100vw;
		max-height: 89.5vh;
	}
	.section{
		width: 95vw;
		height: 85vh;
		margin-top: 15vh;
		margin-bottom: 2vh;
		border-radius: 30px;
		box-shadow:0 0 5px #fff, 0 0 8px #fff, 0 0 5px #f0f, 0 0 10px #f0f, 0 0 15px #f0f, 0 0 30px #f0f,
         inset 0 0 3px #fff, inset 0 0 5px #fff, inset 0 0 10px #f0f, inset 0 0 15px #f0f;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
