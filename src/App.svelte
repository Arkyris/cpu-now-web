<script>
	import Header from "./Header.svelte";
	import Form from "./Form.svelte";
</script>

<main>
	<div id="header_div">
		<Header links={[{title:"Form", url: "#form_link"}, {title:"About", url:"#about_link"}]} />
	</div>
	<div id="logo_div" class="section">
		<img src="img/cpunowneon.png" alt="cpu now logo" />
	</div>
	<a id="form_link">
		<div class="section">
			<Form />
		</div>
	</a>
	<a id="about_link">
		<div class="section">
			<h1>About</h1>
		</div>
	</a>
	<div class="section">
		<h1>Why Rent</h1>
	</div>
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
		width: 100%;
		height: 9vh;
	}

	#logo_div {
		position: relative;
		max-width: 100vw;
		max-height: 89.5vh;
		box-shadow: 0 0 0 #000;
	}
	img {
		max-width: 100%;
		max-height: 100%;
	}
	.section {
		width: 95vw;
		height: 85vh;
		margin-top: 12vh;
		margin-bottom: 2vh;
		border-radius: 30px;
		box-shadow: 0 0 5px #fff, 0 0 8px #fff, 0 0 5px #f0f, 0 0 10px #f0f,
			0 0 15px #f0f, 0 0 30px #f0f, inset 0 0 3px #fff, inset 0 0 5px #fff,
			inset 0 0 10px #f0f, inset 0 0 15px #f0f;
	}

	h1 {
		font-family: "neoncity";
	}
	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
