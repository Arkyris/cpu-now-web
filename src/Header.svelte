<script>
    import { onMount } from "svelte";
    import LoginButton from "./LoginButton.svelte";
    import { JsonRpc } from "eosjs";
    import {
        acctName,
        walletBalance,
        walletBalanceUpdateInterval,
        loggedIn,
    } from "./stores/current_user";
    import {
        totalFunds,
        totalFundsUpdateInterval,
        availableFunds,
        availableFundsUpdateInterval,
    } from "./stores/contractInfo";
    import { myChain } from "./stores/chainInfo";

    export let links = [];
    let showMobileMenu = false;

    onMount(() => {
        updateAvailableFunds();
        updateTotalFunds();
        $walletBalanceUpdateInterval = setInterval(updateWalletBalance, 1000);
        $totalFundsUpdateInterval = setInterval(updateTotalFunds, 30000);
        $availableFundsUpdateInterval = setInterval(
            updateAvailableFunds,
            30000
        );

        // Attach media query listener on mount hook
        const mediaListener = window.matchMedia("(max-width: 767px)");
        mediaListener.addEventListener("change", function(event){
            mediaQueryHandler(event);
        });
    });

    const updateWalletBalance = async () => {
        try {
            if ($acctName != "" && $loggedIn === false) {
                const rpc = new JsonRpc(
                    `${myChain.rpcEndpoints[0].protocol}://${myChain.rpcEndpoints[0].host}:${myChain.rpcEndpoints[0].port}`
                );
                //const accountName = await loggedInUser.getAccountName();
                const data = await rpc.get_account($acctName);

                //const { core_liquid_balance: $balance } = data;
                $walletBalance = data.core_liquid_balance;
                $loggedIn = true;
            } else if ($acctName === "" && $loggedIn === true) {
                $walletBalance = "";
                $loggedIn = false;
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

    // Mobile menu click event handler
    const handleMobileIconClick = () => (showMobileMenu = !showMobileMenu);

    function closeMobileMenu() {
        if(showMobileMenu){
            showMobileMenu = !showMobileMenu
        };
    }

    // Media match query handler
    const mediaQueryHandler = (e) => {
        // Reset mobile state
        if (!e.matches) {
            showMobileMenu = false;
        }
    };
</script>

<header class="header">
    <nav>
        <div class="inner">
            <div
                on:click={handleMobileIconClick}
                class={`mobile-icon${showMobileMenu ? " active" : ""}`}
            >
                <div class="middle-line" />
            </div>
            <ul class={`navbar-list${showMobileMenu ? " mobile" : ""}`}>
                {#each links as link}
                    <a href={link.url}  on:click={closeMobileMenu}>{link.title}</a>
                {/each}
            </ul>
        </div>
    </nav>
    <div class="info_div">
        <p>Welcome {$acctName}:<br />{$walletBalance}</p>
        <div class="div" />
        <p>Total Funds:<br />{$totalFunds}</p>
        <div class="div" />
        <p>Available Funds:<br />{$availableFunds}.00000000 WAX</p>
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
        background-color: rgba(255, 255, 255, 0.253);
        box-shadow: 0 0 0.5vh 0.05vh #fff, 0 0 1vh 0.06vh #fff,
            0 0 1vh 0.07vh #fff, 0 0 1vh 0.08vh #f0f, 0 0 2vh 0.09vh #f0f,
            0 0 2vh 0.3vh #f0f, 0 0 2.5vh 0.4vh #f0f;
    }

    .info_div {
        display: flex;
        position: relative;
        width: 80vw;
        justify-content: center;
        align-items: center;
        height: 90%;
    }

    a {
        position: relative;
        color: #fff;
        font-family: "neoncity";
        font-size: 3.5vh;
        padding: 0.75vw;
        height: 3vh;
        line-height: 3.5vh;
        text-align: center;
        border-style: solid;
        border-color: #fff;
        border-width: 0.1vh;
        border-radius: 2.5vh;
        margin: 1vh;
        text-shadow: 0 0 0.5vh #fff, 0 0 1vh #fff, 0 0 1vh #f0f, 0 0 2vh #f0f,
            0 0 4vh #f0f, 0 0 5vh #f0f;
        box-shadow: 0 0 0.25vh #fff, 0 0 .5vh #fff, 0 0 .5vh #0ff,
            0 0 1vh #0ff, 0 0 1.5vh #0ff, inset 0 0 0.25vh #fff,
            inset 0 0 .5vh #0ff, inset 0 0 1vh #0ff;
    }

    .inner {
        max-width: 980px;
        padding-left: 20px;
        padding-right: 20px;
        margin: auto;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        height: 100%;
    }

    .mobile-icon {
        width: 4vh;
        height: 4vh;
        position: relative;
        cursor: pointer;
    }

    .mobile-icon:after,
    .mobile-icon:before,
    .middle-line {
        content: "";
        position: absolute;
        width: 100%;
        height: 2px;
        background-color: #fff;
        transition: all 0.4s;
        transform-origin: center;
    }

    .mobile-icon:before,
    .middle-line {
        top: 0;
    }

    .mobile-icon:after,
    .middle-line {
        bottom: 0;
        left: 2vh;
    }

    .mobile-icon:before {
        width: 66%;
    }

    .mobile-icon:after {
        width: 33%;
    }

    .middle-line {
        margin: auto;
    }

    .mobile-icon:hover:before,
    .mobile-icon:hover:after,
    .mobile-icon.active:before,
    .mobile-icon.active:after,
    .mobile-icon.active .middle-line {
        width: 100%;
    }

    .mobile-icon.active:before,
    .mobile-icon.active:after {
        top: 50%;
        transform: rotate(-45deg);
    }

    .mobile-icon.active .middle-line {
        transform: rotate(45deg);
    }

    .navbar-list {
        display: none;
        width: 100%;
        justify-content: space-between;
        margin: 0;
        padding: 0 40px;
    }

    .navbar-list.mobile {
        background-color: #000;
        position: fixed;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 2vw;
        margin: 0;
        top: 11vh;
        width: auto;
        height: auto;
        border-radius: 3vw;
        box-shadow: 0 0 0.5vh #fff, 0 0 1vh #fff, 0 0 1vh #8080ff, 0 0 1.5vh #8080ff, inset 0 0 .25vh #fff, inset 0 0 .5vh #fff, inset 0 0 .5vh #8080ff, inset 0 0 .75vh #8080ff;
    }

    @media only screen and (min-width: 767px) {
        .mobile-icon {
            display: none;
        }

        .navbar-list {
            display: flex;
            padding: 0;
        }

        .navbar-list a {
            display: inline-flex;
            left: 1.5vh;
            margin-right: 1.5vw;
            box-shadow: 0 0 0.5vh #fff, 0 0 1vh #fff, 0 0 1vh #8080ff,
            0 0 2vh #8080ff, 0 0 3vh #8080ff, inset 0 0 0.5vh #fff,
            inset 0 0 1vh #8080ff, inset 0 0 2vh #8080ff;
        }

        .info_div {
        display: flex;
        position: relative;
        width: 50vw;
        justify-content: center;
    }
    }
</style>
