<script>
    import { onMount } from "svelte";
    import {
        acctName,
        loggedInUser,
        loggedIn,
        rents,
        loan,
        loanAmount,
        loanNewAmount,
        loanRefund,
    } from "./stores/current_user";
    import {
        totalFunds,
        availableFunds,
        contractCost,
    } from "./stores/contractInfo";
    import { myChain } from "./stores/chainInfo";
    import { JsonRpc } from "eosjs";
    import { buildTX } from "./stores/transaction";
    import { getRentStats, rent } from "./stores/current_user";

    let daysValue = 3;
    let cost;
    let costUpdateInterval;
    let formUpdateInterval;
    let rentUpdateInterval;
    let actionVal;
    let amountVal;
    let statsModule;
    let thisRents = [];

    onMount(() => {
        //updateAccountBalance();
        //$accountBalanceUpdateInterval = setInterval(updateAccountBalance, 1000);
        costUpdateInterval = setInterval(updateCost, 250);
        formUpdateInterval = setInterval(updateForm, 250);
        rentUpdateInterval = setInterval(updateRent, 250);
        getContractCost();
        statsModule = document.getElementById("stats_div");
    });

    /*const updateAccountBalance = async () => {
        try {
            if ($acctName != "" && $loggedIn === false) {
                const rpc = new JsonRpc(
                    `${myChain.rpcEndpoints[0].protocol}://${myChain.rpcEndpoints[0].host}:${myChain.rpcEndpoints[0].port}`
                );
                const data = await rpc.get_table_rows({
                    json: true,
                    code: "cpunowcntrct",
                    scope: "cpunowcntrct",
                    table: "balances",
                    lower_bound: $acctName,
                    limit: 1,
                    reverse: false,
                    show_payer: false,
                });
                if (
                    data.rows.length > 0 &&
                    data.rows[0].account === $acctName
                ) {
                    $accountBalance = data.rows[0].balance;
                } else if ($acctName === "" && $loggedIn === true) {
                    $accountBalance = "no account";
                }
            }
        } catch (e) {
            console.error(e);
        }
    };*/

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

    async function onSubmit(e) {
        const formData = new FormData(e.target);

        const data = {};
        for (let field of formData) {
            const [key, value] = field;
            data[key] = value;
        }
        //console.log(data);
        let builtActions = await buildTX(
            $acctName,
            data,
            cost,
            $loan
        );

        loggedInUser.signTransaction(builtActions, {
            blocksBehind: 3,
            expireSeconds: 30,
            broadcast: true,
        });
        if(data.action === "rent" || data.action === "add-rent") {
            setTimeout(() => {
                updateTotalFunds();
                updateAvailableFunds();
            }, 20000);
        } else {
            setTimeout(() => {
                get_loan();
            }, 20000);
        }
    }

    async function get_loan() {
        try {
            const rpc = new JsonRpc(
                `${myChain.rpcEndpoints[0].protocol}://${myChain.rpcEndpoints[0].host}:${myChain.rpcEndpoints[0].port}`
            );
            const data = await rpc.get_table_rows({
                json: true,
                code: "cpunowcntrct",
                scope: "cpunowcntrct",
                table: "loaners",
                lower_bound: $acctName,
                limit: 1,
                reverse: false,
                show_payer: false,
            });
            if (data.rows.length > 0 && data.rows[0].loaner === $acctName) {
                $loan = true;
                $loanAmount = data.rows[0].amount;
                $loanNewAmount = data.rows[0].new_amount;
                $loanRefund = data.rows[0].refunding;
            }
        } catch (e) {
            console.error(e);
        }
    }

    async function getContractCost() {
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
            $contractCost = data.rows[0].rent_cost;
        } catch (e) {
            console.error(e);
        }
    }
    function updateCost() {
        cost = parseFloat($contractCost) * daysValue * (stake.value / 50);
        //console.log(stake.value/50);
    }
    function updateForm() {
        if (action.value === "rent" || action.value === "add-rent") {
            document.getElementById("recipient_div").style.display = "block";
            days_div.style.display = "block";
            stake_div.style.display = "block";
            amount_div.style.display = "none";
            loan_info.style.display = "none";
            actionVal = action.value;
            amountVal = amount.value;
        } else if (
            action.value === "add-loan" ||
            action.value === "remove-loan"
        ) {
            document.getElementById("recipient_div").style.display = "none";
            days_div.style.display = "none";
            stake_div.style.display = "none";
            amount_div.style.display = "block";
            loan_info.style.display = "block";
            actionVal = action.value;
            amountVal = amount.value;
        } else {
            document.getElementById("recipient_div").style.display = "none";
            days_div.style.display = "none";
            stake_div.style.display = "none";
            amount_div.style.display = "none";
            loan_info.style.display = "block";
            actionVal = action.value;
            amountVal = 0.0;
        }
    }
    async function openStats() {
        thisRents = [];
        statsModule.style.display = "block";
        $rent = await getRentStats($acctName);
    }
    function updateRent() {
        $rents = $rent;
    }
</script>

<div class="form-main-div">
    <div class="form-bg">
        <div class="form-div">
            <form on:submit|preventDefault={onSubmit}>
                <div class="input-div">
                    <label for="action">Action</label>
                    <select id="action" name="action">
                        <option value="rent">Rent</option>
                        <option value="add-rent">Add Rent</option>
                        <option value="add-loan">Loan</option>
                        <option value="remove-loan">Remove Loan</option>
                        <option value="claim-refund">Claim Refund</option>
                    </select>
                </div>
                <div id="recipient_div" class="input-div">
                    <label for="recipient">Recipient</label>
                    <input
                        type="text"
                        id="recipient"
                        name="recipient"
                        placeholder="Leave blank for self"
                        value=""
                    />
                </div>
                <div id="days_div" class="input-div">
                    <label for="days">Days {daysValue}</label>
                    <input
                        type="range"
                        id="days"
                        name="days"
                        min="0.5"
                        max="6"
                        bind:value={daysValue}
                        step="0.5"
                    />
                </div>
                <div id="stake_div" class="input-div">
                    <label for="stake">Amount to stake</label>
                    <input
                        type="number"
                        id="stake"
                        name="stake"
                        min="50"
                        value="50"
                        step="50"
                    />
                </div>
                <div id="loan_info">
                    <p>
                        Loan: {$loanAmount}<br />New Loan: {$loanNewAmount}<br />Loan
                        Refund: {$loanRefund}
                    </p>
                </div>
                <div id="amount_div" class="input-div">
                    <label for="amount">Amount</label>
                    <input type="float" id="amount" name="amount" value="0.0" />
                </div>
                <div class="button_div">
                    <button id="submit_button" type="submit"
                        >{actionVal === "rent" || actionVal === "add-rent"
                            ? `${cost.toFixed(8)} WAX`
                            : `${amountVal} WAX`}</button
                    >
                </div>
            </form>
        </div>
        <div class="button_div">
            <button id="get_stats" on:click={openStats}>Account Stats</button>
        </div>
    </div>
</div>

<style>
    .form-main-div {
        display: flex;
        justify-content: center;
        padding: 3.8vh;
    }
    .form-bg {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: auto;
        height: auto;
        border-radius: 3vh;
        padding: 4.5vh;
        box-shadow: 0 0 1px #fff, 0 0px 3px #fff, 0 0px 5px #fff,
            0 0px 10px #0ff, 0px 0px 15px #0ff, 0 0px 20px #0ff, 0 0px 25px #0ff,
            inset 0 0px 3px #fff, inset 0 0px 5px #fff, inset 0 0px 8px #fff,
            inset 0 0px 10px #0ff;
    }

    .form-div {
        position: relative;
        display: flex;
        justify-content: center;
        width: 100%;
        height: 100%;
    }

    form {
        display: flex;
        flex-direction: column;
        z-index: 0;
        width: 100%;
        height: 100%;
        padding-left: 2vw;
        padding-right: 2vw;
    }

    .input-div {
        z-index: 50;
        position: relative;
        margin-bottom: 4vh;
        /*padding: 1vh;*/
        /*border-style: solid;
        border-width: .1vh;
        border-color: #fff;
        border-radius: 2vh;*/
        width: auto;
        /*box-shadow: 0 0 5px #fff, 0 0 8px #fff, 0 0 5px #8080ff,
            0 0 10px #8080ff, 0 0 15px #8080ff, 0 0 20px #8080ff,
            inset 0 0 3px #fff, 0 0 6px #fff, 0 0 3px #8080ff, 0 0 6px #8080ff,
            0 0 9px #8080ff;*/
    }
    #amount_div {
        display: none;
    }

    #loan_info {
        display: none;
    }

    p {
        font-size: 2vh;
        color: rgb(205, 251, 255);
        text-shadow: 0 0 1vh #fff;
        margin-top: 0;
    }

    .button_div {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        margin-top: 2.5vh;
        width: auto;
    }

    button {
        margin-bottom: 2vh;
        padding: 1vh;
        background-color: #000;
        color: rgb(205, 251, 255);
        text-shadow: 0 0 1vh #fff;
        font-size: 2vh;
        border-radius: 1vh;
        border: #fff;
        border-style: solid;
        border-width: 1px;
    }
    button:hover {
        border-color: #fff;
        box-shadow: 0 0 3px #fff, 0 0 6px #fff, 0 0 5px #f0f, 0 0 10px #f0f,
            0 0 15px #f0f, inset 0 0 2px #fff, inset 0 0 4px #fff,
            inset 0 0 3px #f0f, inset 0 0 6px #f0f;
    }
    label {
        z-index: 50;
        font-family: "neoncity";
        font-size: 3vh;
        font-weight: 50;
        letter-spacing: 4px;
        margin-bottom: -0.2vh;
        color: white;
        text-shadow: 0 0 5px #fff, 0 0 2px #fff, 0 0 1px #fff, 0 0 20px #f0f,
            0 0 15px #f0f, 0 0 10px #f0f, 0 0 5px #f0f;
    }
    input {
        z-index: 50;
        background-color: #000;
        color: #fff;
        text-align: center;
        border-color: #fff;
        border-width: 1px;
    }
    select {
        background-color: #000;
        color: #fff;
        text-align: center;
    }
    input[type="range"] {
        height: 3vh;
        -webkit-appearance: none;
        margin: 0;
        width: 75%;
    }
    input[type="range"]:focus {
        outline: none;
    }
    input[type="range"]::-webkit-slider-runnable-track {
        height: 2vh;
        cursor: pointer;
        box-shadow: 0 0 10px #0ff, inset 0 0 5px #0ff;
        background: #000000;
        border-radius: 1vh;
        border: 1px solid #fff;
    }
    input[type="range"]::-webkit-slider-thumb {
        box-shadow: 0 0 10px #f0f, inset 0 0 5px #f0f;
        border: 1px solid #fff;
        height: 3vh;
        width: 3vh;
        border-radius: 3vh;
        background: #000;
        cursor: pointer;
        -webkit-appearance: none;
        margin-top: -0.6vh;
    }

    input[type="range"]::-moz-range-track {
        height: 2vh;
        cursor: pointer;
        box-shadow: 0 0 10px #0ff, inset 0 0 5px #0ff;
        background: #000000;
        border-radius: 1vh;
        border: 1px solid #fff;
    }

    input[type="range"]::-moz-range-thumb {
        box-shadow: 0 0 10px #f0f, inset 0 0 5px #f0f;
        border: 1px solid #fff;
        height: 3vh;
        width: 3vh;
        border-radius: 3vh;
        background: #000;
        cursor: pointer;
        -webkit-appearance: none;
        margin-top: -0.6vh;
    }

    input[type="number"] {
        -webkit-appearance: textfield;
        -moz-appearance: textfield;
        appearance: textfield;
        width: 40%;
        font-size: 2vh;
        color: rgb(205, 251, 255);
        text-shadow: 0 0 1vh #fff;
    }
    input[type="number"]::-webkit-inner-spin-button {
        background-color: #000;
    }
    input[type="number"]::-webkit-outer-spin-button {
        background-color: #000;
    }
    input[type="number"]:focus {
        box-shadow: 0 0 1vh #fff, 0 0 2vh #fff, 0 0 2vh #0ff, 0 0 3vh #0ff,
            0 0 4vh #0ff;
    }
    input[type="float"]:focus {
        box-shadow: 0 0 1vh #fff, 0 0 2vh #fff, 0 0 2vh #0ff, 0 0 3vh #0ff,
            0 0 4vh #0ff;
    }
    input[type="text"]:focus {
        box-shadow: 0 0 1vh #fff, 0 0 2vh #fff, 0 0 2vh #0ff, 0 0 3vh #0ff,
            0 0 4vh #0ff;
    }
    #action:focus {
        box-shadow: 0 0 1vh #fff, 0 0 2vh #fff, 0 0 2vh #0ff, 0 0 3vh #0ff,
            0 0 4vh #0ff;
    }
    input[type="text"] {
        font-size: 2vh;
        color: rgb(205, 251, 255);
        text-shadow: 0 0 1vh #fff;
        background-color: #000;
    }
    input[type="text"]::placeholder {
        color: rgba(185, 185, 185, 0.462);
        text-shadow: 0 0 0 #000;
    }
    select {
        width: auto;
        font-size: 2vh;
        color: rgb(205, 251, 255);
        text-shadow: 0 0 1vh #fff;
    }
    input[type="float"] {
        font-size: 2vh;
        color: rgb(205, 251, 255);
        text-shadow: 0 0 1vh #fff;
    }
    input:-internal-autofill-selected {
        background-color: #000;
        font-size: 2vh;
        color: rgb(205, 251, 255);
        text-shadow: 0 0 1vh #fff;
    }
    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus input:-webkit-autofill,
    textarea:-webkit-autofill,
    textarea:-webkit-autofill:hover textarea:-webkit-autofill:focus,
    select:-webkit-autofill,
    select:-webkit-autofill:hover,
    select:-webkit-autofill:focus {
        border: 1px solid #fff;
        -webkit-text-fill-color: #fff;
        font-size: 2vh;
        transition: background-color 5000s ease-in-out 0s;
    }
</style>
