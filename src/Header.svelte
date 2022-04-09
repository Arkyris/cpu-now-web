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
        right: 150px;
        top: 21px;
        margin: 0px;
    }
    .inner_header_div {
        background-color: #000;
        position: absolute;
        flex-direction: row;
        right: 18px;
        top: 15px;
        margin: 0px;
    }
</style>
