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
    <div class="header-div">
        <LoginButton />
    </div>
</header>

<style>
    .header {
        position: relative;
        background: #0b644b;
        display: flex;
        width: 100%;
        height: 85px;
    }
    #p-transfer {
        position: absolute;
        flex-direction: row;
        color: aquamarine;
        right: 150px;
        top: 21px;
        margin: 0px;
    }
    .header-div {
        position: absolute;
        flex-direction: row;
        right: 18px;
        top: 15px;
        margin: 0px;
    }
</style>
