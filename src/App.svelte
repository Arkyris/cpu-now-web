<script>
	import Header from "./Header.svelte";
	import Transact from "./TransactButton.svelte";
	import { acctName } from "./stores/current_user.js";

	let userUpdateInterval;
	let user = 'nobody';
	//userUpdateInterval = setInterval(setUser(), 1000);

	async function setUser() {
		 user = await loggedInUser.getAccountName();
	}

</script>

<main>
	<Header />
	<Transact />
	<p>Welcome {$acctName}</p>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
