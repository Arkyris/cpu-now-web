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
            cost,
        );

        //loggedInUser.signTransaction(builtActions, {
        //    blocksBehind: 3,
        //    expireSeconds: 30,
        //    broadcast: true,
        //});
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
                        <label for="action">Action:</label>
                        <select id="action" name="action">
                            <option value="rent">Rent</option>
                            <option value="add-rent">Add Rent</option>
                            <option value="add-balance">Add Funds</option>
                            <option value="withdraw-funds">Withdraw Funds</option>
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
    .form-main-div {
        position: relative;
        display: flex;
        justify-content: center;
        width: 100%;
        height: 400px;
    }
    .form-bg {
        position: relative;
        display: flex;
        justify-content: center;
        width: 450px;
        height: 380px;
        background-color: rgba(0, 0, 0, 0.122);
        border-radius: 30px;
        box-shadow: 0px -0px 5px 10px #0ff;
    }
    label {
        color: aquamarine;
    }
    .form-div {
        position: relative;
        width: auto;

    }
    .user-info {
        position: absolute;
        color: aquamarine;
        width: 50%;
    }
    .input-div {
        position: relative;
        padding: 10px;
        margin-top: 10px;
        border-style: solid;
        border-width: 2px;
        border-color: black;
        width: auto;
    }
    #amount_div {
        display: none;
    }

    #submit_button{
        margin: 10;
    }
</style>
