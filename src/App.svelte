<script>
	//import { GoogleAnalytics } from '@beyonk/svelte-google-analytics';
	import Header from "./Header.svelte";
	import Form from "./Form.svelte";
	import About from "./About.svelte";
	import HowTo from "./HowTo.svelte";
	import FAQ from "./FAQ.svelte";
	import Footer from "./Footer.svelte";
	import Stats from "./Stats.svelte";
	import { rent, otherRent } from "./stores/current_user";

	function clickOutside(node) {
		const handleClick = (event) => {
			if (
				node &&
				!node.contains(event.target) &&
				!event.defaultPrevented
			) {
				node.dispatchEvent(new CustomEvent("click_outside", node));
			}
		};

		document.addEventListener("click", handleClick, true);

		return {
			destroy() {
				document.removeEventListener("click", handleClick, true);
			},
		};
	}

	function handleClickOutside(event) {
		document.getElementById("stats_div").style.display = "none";
		$rent = [];
		$otherRent = [];
	}
</script>

<main>
	<!--<div>
		<GoogleAnalytics properties={[ '311302713' ]} />
	</div>-->
	<div id="header_div">
		<Header
			links={[
				{ title: "Form", url: "#form_link" },
				{ title: "About", url: "#about_link" },
				{ title: "How To", url: "#how_link" },
				{ title: "FAQ", url: "#faq_link" },
			]}
		/>
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
			<About />
		</div>
	</a>
	<a id="how_link">
		<div class="section">
			<HowTo />
		</div>
	</a>
	<a id="faq_link">
		<div id="faq_div" class="section">
			<FAQ />
		</div>
	</a>
	<div id="stats_div" use:clickOutside on:click_outside={handleClickOutside}>
		<Stats />
	</div>
	<div id="footer_div">
		<Footer />
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
		display: flex;
		justify-content: center;
		width: 97vw;
		height: 78vh;
		margin-top: 12vh;
		margin-bottom: 2vh;
		border-radius: 30px;
		box-shadow: 0 0 5px #fff, 0 0 8px #fff, 0 0 5px #f0f, 0 0 10px #f0f,
			0 0 15px #f0f, 0 0 30px #f0f, inset 0 0 3px #fff, inset 0 0 5px #fff,
			inset 0 0 10px #f0f, inset 0 0 15px #f0f;
	}

	#stats_div {
		position: fixed;
		display: none;
	}

	#footer_div {
		z-index: 999;
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 7vh;
		margin-top: 3vh;
	}

	#faq_div {
		margin-bottom: 10vh;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
