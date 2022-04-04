<script>
    import { onMount } from 'svelte';
    import { loggedInUser, acctName } from './stores/current_user';
    import demoTransaction from './demoTransaction';

    onMount(() => {
        addTransactButtonEventListener();
    });

    const addTransactButtonEventListener = () => {
        const transactButton = document.getElementById("btn-transact");
        transactButton.addEventListener("click", async () => {
            // Update our demo transaction to use the logged in user
            //const userAccountName = await loggedInUser.getAccountName();
            demoTransaction.actions[0].authorization[0].actor = $acctName;

            loggedInUser.signTransaction(demoTransaction, { blocksBehind: 3, expireSeconds: 30, broadcast: true });
        });
    };
</script>

<main>
    <button id="btn-transact">Transact</button>
</main>
