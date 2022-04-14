<script>
    import { onMount } from "svelte";
    import LoginButton from "./LoginButton.svelte";
    import { JsonRpc } from "eosjs";
    import {
        acctName,
        walletBalance,
        walletBalanceUpdateInterval,
    } from "./stores/current_user";
    import {
        totalFunds,
        totalFundsUpdateInterval,
        availableFunds,
        availableFundsUpdateInterval,
    } from "./stores/contractInfo";
    import { myChain } from "./stores/chainInfo";

    export let links = [];

    onMount(() => {
        $walletBalanceUpdateInterval = setInterval(updateWalletBalance, 1000);
        $totalFundsUpdateInterval = setInterval(updateTotalFunds, 1000);
        $availableFundsUpdateInterval = setInterval(updateAvailableFunds, 1000);
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
    async function updateTotalFunds() {
        try {
            const rpc = new JsonRpc(
                `${myChain.rpcEndpoints[0].protocol}://${myChain.rpcEndpoints[0].host}:${myChain.rpcEndpoints[0].port}`
            );
            const data = await rpc.get_table_rows({
                json: true,
                code: "cpunowcntrct",
                scope: "cpunowcntrct",
                table: "contstate",
                limit: 1,
                reverse: false,
                show_payer: false,
            });
            $totalFunds = data.rows[0].total_funds;
        } catch (e) {
            console.error(e);
        }
    }
    async function updateAvailableFunds() {
        try {
            const rpc = new JsonRpc(
                `${myChain.rpcEndpoints[0].protocol}://${myChain.rpcEndpoints[0].host}:${myChain.rpcEndpoints[0].port}`
            );
            const data = await rpc.get_table_rows({
                json: true,
                code: "cpunowcntrct",
                scope: "cpunowcntrct",
                table: "contstate",
                limit: 1,
                reverse: false,
                show_payer: false,
            });
            $availableFunds =
                parseFloat(data.rows[0].available_funds) -
                parseFloat(data.rows[0].refunding);
        } catch (e) {
            console.error(e);
        }
    }
</script>

<header class="header">
    {#each links as link}
        <a href={link.url}>{link.title}</a>
    {/each}
    <div class="info_div">
        <p>Welcome {$acctName}:<br />{$walletBalance}</p>
        <div class="div" />
        <p>Total Funds:<br />{$totalFunds}</p>
        <div class="div" />
        <p>Available Funds:<br />{$availableFunds}</p>
    </div>
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
        box-shadow: 0 1px 5px #fff, 0 2px 10px 5px #0ff,
            20px -10px 5px 10px #0ff, -20px -10px 5px 10px #0ff,
            inset 0 -10px 3px -7px #fff, inset 0 -10px 10px -7px #0ff,
            inset 0 -10px 15px -9px #0ff;
    }
    p {
        flex-direction: row;
        font-size: 1.5vw;
        color: rgb(205, 251, 255);
        text-shadow: 0 0 1vh #fff;
        top: 1.5vh;
        margin: 1vh;
    }
    .inner_header_div {
        background-color: #000;
        position: absolute;
        flex-direction: row;
        right: 1.5vw;
        top: 1.6vh;
    }

    .div {
        width: 0.5px;
        height: 6vh;
        margin: 1vh;
        box-shadow: 0 0 0.5vh #fff, 0 0 1vh #fff, 0 0 1vh #f0f, 0 0 2vh #f0f,
            0 0 2vh #f0f, 0 0 2vh #f0f, 0 0 3vh #f0f;
    }

    .info_div {
        display: flex;
        position: relative;
        width: 54vw;
        justify-content: center;
    }
    a {
        position: relative;
        color: #fff;
        font-family: "neoncity";
        font-size: 2.5vw;
        margin-right: 1.5vw;
        padding: 0.75vw;
        height: 3vh;
        line-height: 3.5vh;
        text-align: center;
        border-style: solid;
        border-color: #fff;
        border-width: 0.1vh;
        border-radius: 2.5vh;
        top: 1.5vh;
        left: 1.5vh;
        text-shadow: 0 0 0.5vh #fff, 0 0 1vh #fff, 0 0 1vh #f0f, 0 0 2vh #f0f,
            0 0 4vh #f0f, 0 0 5vh #f0f;
        box-shadow: 0 0 0.5vh #fff, 0 0 1vh #fff, 0 0 1vh #8080ff,
            0 0 2vh #8080ff, 0 0 3vh #8080ff, inset 0 0 0.5vh #fff,
            inset 0 0 1vh #8080ff, inset 0 0 2vh #8080ff;
    }
</style>
