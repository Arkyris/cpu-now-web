<script>
    import { onMount } from "svelte";
    import LoginButton from "./LoginButton.svelte";
    import { JsonRpc } from "eosjs";
    import {
        acctName,
        walletBalance,
        walletBalanceUpdateInterval,
    } from "./stores/current_user";
    import { myChain } from "./stores/chainInfo";

    export let links = [];

    onMount(() => {
        $walletBalanceUpdateInterval = setInterval(updateWalletBalance, 1000);
    });

    const updateWalletBalance = async () => {
        try {
            if ($acctName != "") {
                const rpc = new JsonRpc(
                    `${myChain.rpcEndpoints[0].protocol}://${myChain.rpcEndpoints[0].host}:${myChain.rpcEndpoints[0].port}`
                );
                //const accountName = await loggedInUser.getAccountName();
                const data = await rpc.get_account($acctName);

                //const { core_liquid_balance: $balance } = data;
                $walletBalance = data.core_liquid_balance;
            } else {
                $walletBalance = "";
            }
        } catch (e) {
            console.error(e);
        }
    };
</script>

<header class="header">
    {#each links as link}
    <a href={link.url}>{link.title}</a>
    {/each}
    <p id="p-transfer">Welcome {$acctName}:<br />{$walletBalance}</p>
    <div class="inner_header_div">
        <LoginButton />
    </div>
</header>

<style>
    .header {
        position: relative;
        background-color: #000000;
        display: flex;
        z-index: 999;
        width: 100%;
        height: 100%;
        border-radius: 0 0 20px 20px;
        box-shadow: 0 1px 5px #fff, 0 2px 10px 5px #0ff, 20px -10px 5px 10px #0ff, -20px -10px 5px 10px #0ff,
         inset 0 -10px 3px -7px #fff, inset 0 -10px 10px -7px #0ff, inset 0 -10px 15px -9px #0ff;
    }
    #p-transfer {
        position: absolute;
        flex-direction: row;
        color: aquamarine;
        right: 13vw;
        top: 1.5vh;
        margin: 0px;
    }
    .inner_header_div {
        background-color: #000;
        position: absolute;
        flex-direction: row;
        right: 1.5vw;
        top: 1.6vh;
    }
    a{
        position: relative;
        color: #fff;
        font-family: "neoncity";
        font-size: 2.5vw;
        margin-right: 1.5vw;
        padding: .75vw;
        height: 3vh;
        line-height: 3.5vh;
        text-align: center;
        border-style: solid;
        border-color: #fff;
        border-width: .1vh;
        border-radius: 2.5vh;
        top: 1.5vh;
        left: 1.5vh;
        text-shadow: 0 0 .5vh #fff, 0 0 1vh #fff, 0 0 1vh #0ff, 0 0 2vh #0ff, 0 0 4vh #0ff, 0 0 5vh #0ff;
        box-shadow: 0 0 .5vh #fff, 0 0 1vh #fff, 0 0 1vh #f0f, 0 0 2vh #f0f, 0 0 3vh #f0f, inset 0 0 .5vh #fff, inset 0 0 1vh #f0f, inset 0 0 2vh #f0f;

    }
</style>
