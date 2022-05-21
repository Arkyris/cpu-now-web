<script>
    import { onMount } from "svelte";
    import { rents, otherRents, getRentStats, otherRent, rent, loan, loanAmount, loanNewAmount, loanRefund } from "./stores/current_user";

    let statsModule;
    let thisRents;
    //let otherRent = [];
    let otherRentUpdateInterval;

    onMount(() => {
        statsModule = document.getElementById("stats_div");
        otherRentUpdateInterval = setInterval(updateRent, 250);

    });

    function closeStats() {
        $rent = [];
        $otherRent = [];
        statsModule.style.display = "none";
    }

    async function onSubmit(e) {
        const formData = new FormData(e.target);

        const data = {};
        for (let field of formData) {
            const [key, value] = field;
            data[key] = value;
        }
        console.log(data);
        thisRents = [];
        $otherRent = await getRentStats(data.recipient);
    }
    function updateRent() {
        $otherRents = $otherRent;
    }
</script>

<div id="stats_module">
    <button id="close_module" on:click={closeStats}>X</button>
    <div id="logged_in_div" bind:this={$rents}>
        <h1>Your Account</h1>
        {#if $loan === true}
            <p>Loan: {$loanAmount}<br>New Loan: {$loanNewAmount}<br>Loan Refund: {$loanRefund}</p>
        {/if}
        {#if $rents.length > 0}
            {#each $rents as item}
                <p>
                    {item.rows[0].amount_staked}: expiring on {new Date(
                        item.rows[0].expiry * 1000
                    ).toLocaleString()}
                </p>
            {/each}
        {:else}
            <p>Not Currently Renting</p>
        {/if}
    </div>
    <div id="divider_div"><p id="div_p"></p></div>
    <div id="recipient_div">
        <h1>Find Account</h1>
        <form on:submit|preventDefault={onSubmit}>
            <input
                type="text"
                id="recipient"
                name="recipient"
                placeholder="Recipient"
                value=""
            />
            <button id="submit_button" type="submit">Find</button>
            {#if $otherRents.length > 0}
                {#each $otherRents as item}
                    <p>
                        {item.rows[0].amount_staked}: expiring on {new Date(
                            item.rows[0].expiry * 1000
                        ).toLocaleString()}
                    </p>
                {/each}
            {:else}
                <p>Not Currently Renting</p>
            {/if}
           
        </form>
    </div>
</div>

<style>
    #stats_module {
        z-index: 500;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        width: 50vw;
        min-height: 78vh;
        max-height: 78vh;
        margin-top: 12vh;
        margin-bottom: 2vh;
        border-radius: 3vh;
        background-color: #000;
        box-shadow: 0 0 5px #fff, 0 0 8px #fff, 0 0 5px #8080ff,
            0 0 10px #8080ff, 0 0 15px #8080ff, 0 0 30px #8080ff,
            inset 0 0 3px #fff, inset 0 0 5px #fff, inset 0 0 10px #8080ff,
            inset 0 0 15px #8080ff;
        overflow: scroll;
    }

    #close_module {
        position: fixed;
        top: 14%;
        width: 2.5vw;
        height: 2.5vw;
        border-color: #fff;
        color: white;
        font-family: "neoncity";
        font-size: 1.5vw;
        text-align: center;
        border-radius: 1vh;
        border-width: 1px;
        right: 26.5%;
        background-color: #000;
        box-shadow: 0 0 0.5vh #fff, 0 0 1vh #fff, 0 0 1vh red, 0 0 1.5vh red,
            0 0 2vh red, inset 0 0 0.5vh #fff, inset 0 0 1vh #fff,
            inset 0 0 1vh red, inset 0 0 1.5vh red;
    }

    button {
        border-style: none;
    }

    h1 {
        font-family: "neoncity";
        color: #fff;
        font-size: 5vh;
        font-weight: 1;
        padding: 1.5vh;
        margin: 0;
        letter-spacing: 0.6vw;
        text-shadow: 0 0 0.5vh #fff, 0 0 1vh #fff, 0 0 1vh #0ff, 0 0 1.5vh #0ff,
            0 0 2vh #0ff, 0 0 3vh #0ff, 0 0 4vh #0ff, 0 0 5vh #0ff;
    }

    h2 {
        font-family: "neoncity";
        color: #fff;
        font-size: 4vh;
        font-weight: 1;
        color: rgb(205, 251, 255);
        text-shadow: 0 0 1vh #fff;
        margin: 0;
        letter-spacing: 0.6vw;
        text-shadow: 0 0 0.5vh #fff, 0 0 1vh #fff, 0 0 1vh #f0f, 0 0 1.5vh #f0f,
            0 0 2vh #f0f, 0 0 3vh #f0f, 0 0 4vh #f0f, 0 0 5vh #f0f;
    }

    p {
        font-size: 1.5vw;
        color: rgb(205, 251, 255);
        text-shadow: 0 0 1vh #fff;
        margin-top: 0;
    }

    #divider_div {
        position: relative;
        width: 95%;
        height: 1%;
        margin-top: 20px;
        margin-bottom: 20px;
        border-radius: 1vh;
        background-color: #000;
        box-shadow: 0 0 5px #fff, 0 0 8px #fff, 0 0 5px #f0f,
            0 0 10px #f0f, 0 0 15px #f0f, 0 0 30px #f0f,
            inset 0 0 3px #fff, inset 0 0 5px #fff, inset 0 0 10px #f0f,
            inset 0 0 15px #f0f;
    }

    #div_p{
        height: 1px;
        padding: .5%;
        margin: 0;
    }

    input {
        z-index: 50;
        background-color: #000;
        color: #fff;
        text-align: center;
        border-color: #fff;
        border-width: 1px;
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

    input[type="text"]:focus {
        box-shadow: 0 0 1vh #fff, 0 0 2vh #fff, 0 0 2vh #f0f, 0 0 3vh #f0f,
            0 0 4vh #f0f;
    }

    #submit_button {
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
    #submit_button:hover {
        border-color: #fff;
        box-shadow: 0 0 3px #fff, 0 0 6px #fff, 0 0 5px #f0f, 0 0 10px #f0f,
            0 0 15px #f0f, inset 0 0 2px #fff, inset 0 0 4px #fff,
            inset 0 0 3px #f0f, inset 0 0 6px #f0f;
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
        -webkit-text-fill-color: rgb(205, 251, 255);
        text-shadow: 0 0 1vh #fff;
        font-size: 2vh;
        transition: background-color 5000s ease-in-out 0s;
    }
</style>
