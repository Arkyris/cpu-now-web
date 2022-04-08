<script>
    import { onMount } from "svelte";
    import {
        acctName,
        accountBalance,
        accountBalanceUpdateInterval,
        loggedInUser,
    } from "./stores/current_user";
    import { myChain } from "./stores/chainInfo";
    import { JsonRpc } from "eosjs";
    import { contractCost } from "./stores/contractInfo";
    import { buildTX } from "./stores/transaction";

    let daysValue = 3;
    let cost;
    let costUpdateInterval;
    let formUpdateInterval;
    let actionVal;
    let amountVal;

    onMount(() => {
        $accountBalanceUpdateInterval = setInterval(updateAccountBalance, 1000);
        costUpdateInterval = setInterval(updateCost, 1000);
        formUpdateInterval = setInterval(updateForm, 1000);
        //getContractCost();
    });

    const updateAccountBalance = async () => {
        try {
            if ($acctName != "") {
                const rpc = new JsonRpc(
                    `${myChain.rpcEndpoints[0].protocol}://${myChain.rpcEndpoints[0].host}:${myChain.rpcEndpoints[0].port}`
                );
                const data = await rpc.get_table_rows({
                    json: true,
                    code: "testingtest2",
                    scope: "testingtest2",
                    table: "balances",
                    lower_bound: $acctName,
                    limit: 1,
                    reverse: false,
                    show_payer: false,
                });
                if (data.rows[0].account === $acctName) {
                    $accountBalance = data.rows[0].balance;
                } else {
                    $accountBalance = "no account";
                }
            }
        } catch (e) {
            console.error(e);
        }
    };
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
            $accountBalance,
            data,
            cost
        );

        loggedInUser.signTransaction(builtActions, {
            blocksBehind: 3,
            expireSeconds: 30,
            broadcast: true,
        });
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
            recipient_div.style.display = "block";
            days_div.style.display = "block";
            stake_div.style.display = "block";
            amount_div.style.display = "none";
            actionVal = action.value;
            amountVal = amount.value;
        } else {
            recipient_div.style.display = "none";
            days_div.style.display = "none";
            stake_div.style.display = "none";
            amount_div.style.display = "block";
            actionVal = action.value;
            amountVal = amount.value;
        }
    }
</script>

<main>
    <div class="form-main-div">
        <div class="form-bg">
            <!--<div class="user-info">
                <p>Account Funds: {$accountBalance}</p>
            </div>-->
            <div class="form-div">
                <form on:submit|preventDefault={onSubmit}>
                    <div class="input-div">
                        <label for="action">Action</label>
                        <select id="action" name="action">
                            <option value="rent">Rent</option>
                            <option value="add-rent">Add Rent</option>
                            <option value="add-balance">Add Funds</option>
                            <option value="withdraw-funds"
                                >Withdraw Funds</option
                            >
                            <!--<option value="loan">Loan</option>
                            <option value="add-loan">Add Loan</option>-->
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
                    <div id="amount_div" class="input-div">
                        <label for="amount">Amount</label>
                        <input
                            type="float"
                            id="amount"
                            name="amount"
                            value="0.0"
                        />
                    </div>
                    <button id="submit_button" type="submit"
                        >{actionVal === "rent" || actionVal === "add-rent"
                            ? `${cost.toFixed(8)} WAX`
                            : `${amountVal} WAX`}</button
                    >
                </form>
            </div>
        </div>
    </div>
</main>

<style>
    @import url("https://fonts.googleapis.com/css2?family=Neonderthaw&display=swap");
    .form-main-div {
        background-color: #000;
        position: relative;
        display: flex;
        justify-content: center;
        width: 100%;
        height: auto;
        margin-top: 200px;
        bottom: 50px;
    }
    .form-bg {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 450px;
        height: 550px;
        background-color: black;
        border-radius: 30px;
        box-shadow: 0 0 1px #fff, 0 0px 3px #fff, 0 0px 5px #fff,
            0 0px 15px #0ff, 0px 0px 10px #0ff, 0px 0px 5px #0ff,
            0 0px 20px #0ff, 0 0px 25px #0ff, inset 0 0px 3px #fff,
            inset 0 0px 5px #fff, inset 0 0px 8px #fff, inset 0 0px 10px #0ff;
    }

    .form-div {
        position: relative;
        display: flex;
        justify-content: center;
        width: auto;
        height: auto;
    }
    .user-info {
        position: absolute;
        color: aquamarine;
        width: 50%;
    }
    .input-div {
        position: relative;
        padding: 10px;
        margin: 30px;
        border-style: solid;
        border-width: 1px;
        border-color: #fff;
        border-radius: 20px;
        width: auto;
        box-shadow: 0 0 5px #fff, 0 0 8px #fff, 0 0 5px #8080ff,
            0 0 10px #8080ff, 0 0 15px #8080ff, 0 0 20px #8080ff,
            inset 0 0 3px #fff, 0 0 6px #fff, 0 0 3px #8080ff, 0 0 6px #8080ff,
            0 0 9px #8080ff;
    }
    #amount_div {
        display: none;
    }

    #submit_button {
        margin: 10px;
    }
    label {
        font-family: "neoncity";
        font-size: 30px;
        font-weight: 50;
        letter-spacing: 4px;
        color: white;
        text-shadow: 0 0 5px #fff, 0 0 2px #fff, 0 0 1px #fff, 0 0 20px #f0f,
            0 0 15px #f0f, 0 0 10px #f0f, 0 0 5px #f0f;
    }
</style>
