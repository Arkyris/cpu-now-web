<script>
    import { onMount } from "svelte";
    import { producers } from "./stores/chainInfo";
    import {acctName, loggedInUser, votes, voteCounter } from "./stores/current_user";
    import { buildTX } from "./stores/transaction";


    let voteModule;

    onMount(() => {
        voteModule = document.getElementById("vote_div");
    });

    function closeVote() {
        voteModule.style.display = "none";
    }

    async function onSubmit(e) {
        const formData = new FormData(e.target);

        const data = {action: "vote", votes:[]};
        for (let field of formData) {
            const [key, value] = field;
            data.votes.push(key);
        }
        console.log(data);
        let builtActions = await buildTX($acctName, data);

        loggedInUser.signTransaction(builtActions, {
            blocksBehind: 3,
            expireSeconds: 30,
            broadcast: true,
        });
        $voteCounter = data.votes.length;
        $votes = data.votes;
    }

    function updateVoteCounter() {
        if (this.checked === true) {
            $voteCounter++;
        } else {
            $voteCounter--;
        }
        if ($voteCounter > 30) {
            this.checked = false;
            $voteCounter = 30;
        }
    }
</script>

<div id="vote_module">
    <button id="close_module" on:click={closeVote}>X</button>
    <h1>Vote</h1>
    <p>{$voteCounter}/30</p>
    <div id="vote_module_div">
        <form on:submit|preventDefault={onSubmit}>
            <div id="inner_form_div">
                {#each $producers as producer}
                    <label class="form-control">
                        <input
                            on:click={updateVoteCounter}
                            class="checkbox"
                            type="checkbox"
                            id={producer}
                            name={producer}
                        />
                        {producer}
                    </label>
                {/each}
            </div>
            <div id="lower_form_div">
                <button id="submit_button" type="submit">Send Votes</button>
            </div>
        </form>
    </div>
</div>

<style>
    #vote_module {
        z-index: 500;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        width: 85vw;
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
        right: 10.5%;
        background-color: #000;
        box-shadow: 0 0 0.5vh #fff, 0 0 1vh #fff, 0 0 1vh red, 0 0 1.5vh red,
            0 0 2vh red, inset 0 0 0.5vh #fff, inset 0 0 1vh #fff,
            inset 0 0 1vh red, inset 0 0 1.5vh red;
    }

    #inner_form_div {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        align-items: center;
    }

    #vote_module_div {
        overflow-y: scroll;
        overflow-x: hidden;
    }

    .form-control {
        display: flex;
        align-items: center;
        padding: 0.5vh;
        border-radius: 1vh;
        box-shadow: 0 0 0.2vh #fff, 0 0 0.5vh #fff, 0 0 0.5vh #f0f,
            0 0 0.7vh #f0f;
        margin: 1vh;
    }

    #vote_counter {
        position: fixed;
        z-index: 101;
        bottom: 11.5%;
        right: 22%;
    }

    button {
        border-style: none;
    }

    label {
        color: rgb(110, 254, 254);
        text-shadow: 0 0 1vh #fff;
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

    p {
        font-size: 1.5vw;
        color: rgb(205, 251, 255);
        text-shadow: 0 0 1vh #fff;
        margin-top: 0;
    }

    input {
        z-index: 50;
        background-color: #000;
        color: #fff;
        text-align: center;
        border-color: #fff;
        border-width: 1px;
    }

    #submit_button {
        margin: 1vh;
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

    input[type="checkbox"] {
        /* Add if not using autoprefixer */
        -webkit-appearance: none;
        appearance: none;
        /* For iOS < 15 to remove gradient background */
        /* Not removed via appearance */
        margin-right: 7px;
        font: inherit;
        color: currentColor;
        width: 1.15em;
        height: 1.15em;
        box-shadow: 0 0 0.5vh #fff, 0 0 0.7vh #fff, 0 0 0.7vh #8080ff,
            0 0 0.9vh #8080ff, 0 0 1.1vh #8080ff;
        border-radius: 0.5vh;
        display: grid;
        place-content: center;
    }

    input[type="checkbox"]::before {
        content: "";
        width: 0.65em;
        height: 0.65em;
        transform: scale(0);
        transition: 120ms transform ease-in-out;
        box-shadow: inset 1em 1em var(--form-control-color);
        transform-origin: bottom left;
        clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
        background-color: #f0f;
    }

    input[type="checkbox"]:checked::before {
        transform: scale(1);
    }

    input[type="checkbox"]:focus {
        outline: max(2px, 0.15em) solid currentColor;
        outline-offset: max(2px, 0.15em);
    }
</style>
