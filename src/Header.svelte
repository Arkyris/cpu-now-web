<script>
    import { onMount } from "svelte";
    import LoginButton from "./LoginButton.svelte";
    import { JsonRpc } from "eosjs";
    import { loggedInUser } from "./stores/current_user";
    import {
        acctName,
        balance,
        balanceUpdateInterval,
    } from "./stores/current_user";

    onMount(() => {
        $balanceUpdateInterval = setInterval(updateBalance, 1000);
    });

    const myChain = {
        chainId:
            "1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4",
        rpcEndpoints: [
            {
                protocol: "https",
                host: "wax.greymass.com",
                port: "443",
            },
        ],
    };

    const updateBalance = async () => {
        try {
            if ($acctName != "") {
                const rpc = new JsonRpc(
                    `${myChain.rpcEndpoints[0].protocol}://${myChain.rpcEndpoints[0].host}:${myChain.rpcEndpoints[0].port}`
                );
                const accountName = await loggedInUser.getAccountName();
                const data = await rpc.get_account(accountName);

                //const { core_liquid_balance: $balance } = data;
                $balance = data.core_liquid_balance;
            } else {
                $balance = "";
            }
        } catch (e) {
            console.error(e);
        }
    };
</script>

<header class="header">
    <p id="p-transfer">Welcome {$acctName}:<br />{$balance}</p>
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
