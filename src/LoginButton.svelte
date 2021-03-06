<script>
    import { Anchor } from "@arkyris/ual-anchor";
    import { Wax } from "@arkyris/ual-wax";
    import { UALJs } from "@arkyris/ual-plainjs-renderer";
    import {
        loggedInUser,
        setUser,
        acctName,
        loan,
        loanAmount,
        loanNewAmount,
        loanRefund,
        votes,
        voteCounter,
    } from "./stores/current_user";
    import { onMount } from "svelte";
    import { User } from "universal-authenticator-library";
    import { myChain } from "./stores/chainInfo";
    import { JsonRpc } from "eosjs";

    let myAppRoot;
    let ual;
    let toggleButtonInterval;
    let ual_button;

    onMount(() => {
        mounted();
        addLogoutButtonListener();
        toggleButtonInterval = setInterval(toggleButton, 1000);
    });

    async function mounted() {
        const userCallback = async (users) => {
            setUser(users[0]);
            console.info("User Information:");
            console.info("Account Name:", await loggedInUser.getAccountName());
            console.info("Chain Id:", await loggedInUser.getChainId());
            $acctName = await loggedInUser.getAccountName();
            get_loan();
        };
        const myAppName = "CPU Now";

        const anchor = new Anchor([myChain], { appName: myAppName });
        const wax = new Wax([myChain], { appName: myAppName });

        myAppRoot = {
            containerElement: document.getElementById("login"),
        };

        ual = new UALJs(
            userCallback,
            [myChain],
            myAppName,
            [wax, anchor],
            myAppRoot
        );
        loadbutton();
    }

    async function loadbutton() {
        console.log("Loading...");
        const session = await ual.init();
        ual_button = document.getElementById("ual-button");
        ual_button.innerText = "Wax Login";
        ual_button.style.backgroundColor = "#000";
        ual_button.style.color = "#fff";
        ual_button.style.borderRadius = "2.5vh";
        ual_button.style.width = "100%";
        ual_button.style.height = "100%";
        ual_button.style.animationName = "inherit";
        ual_button.style.animationDuration = "4s";
        ual_button.style.animationIterationCount = "infinite";
        ual_button.style.textShadow =
            "0 0 1px #FFA600, 0 0 3px #FFA600, 0 0 5px #FFA600, 0 0 10px #FFA600";
        ual_button.style.fontFamily = "neoncity";
        ual_button.style.fontSize = "1.5vw";
        ual_button.style.borderStyle = "solid";
        ual_button.style.border = "5vw";
        ual_button.style.borderColor = "#fff";
        ual_button.style.lineHeight = "1vh";
        ual_button.style.minHeight = "0";
        ual_button.style.minWidth = "0";
    }
    const addLogoutButtonListener = () => {
        const logoutButton = document.getElementById("logout_button");

        logoutButton.addEventListener("click", async () => {
            $acctName = "";
            ual.logoutUser(loggedInUser);
            setUser(new User());
            $loan = false;
        });
    };

    function toggleButton() {
        if ($acctName != "") {
            login.style.display = "none";
            logout_button.style.display = "inline-block";
        } else {
            login.style.display = "inline-block";
            logout_button.style.display = "none";
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
                $votes = data.rows[0].votes;
                $voteCounter = $votes.length;
            }
        } catch (e) {
            console.error(e);
        }
    }
</script>

<div class="button">
    <div id="login" />
    <button id="logout_button">Logout</button>
    <div id={ual_button} class="ualbutton" />
</div>

<style>
    .button {
        display: flex;
    }

    #logout_button {
        background-color: #000;
        border-color: #fff;
        color: white;
        font-family: "neoncity";
        font-size: 1.5vw;
        letter-spacing: 0.1vw;
        text-align: center;
        border-radius: 2.5vh;
        width: 8vw;
        height: 5vh;
        display: none;
        box-shadow: 0 0 1vh #fff, 0 0 2vh #fff, 0 0 2vh red, 0 0 4vh red,
            0 0 5vh red, inset 0 0 1vh #fff, inset 0 0 2vh #fff,
            inset 0 0 2vh red, inset 0 0 4vh red;
    }
    #login {
        border-radius: 2.5vh;
        animation-name: loginAnimation;
        width: 8vw;
        height: 5vh;
    }

    @keyframes loginAnimation {
        from {
            box-shadow: inset 0 0 6px #fff, 0 0 6px #fff,
                /*Pink and Blue In*/ inset 0.25rem 0rem 10px 2px #f0f,
                inset -0.25rem 0rem 10px 4px #0ff,
                /*Pink and Blue Out*/ -0.25rem 0rem 10px 2px #f0f,
                0.25rem 0rem 10px 6px #0ff;
        }
        5% {
            box-shadow: inset 0 0 6px #fff, 0 0 6px #fff,
                /*Pink and Blue In*/ inset 0.2rem 0.05rem 10px 2px #f0f,
                inset -0.2rem -0.05rem 10px 4px #0ff,
                /*Pink and Blue Out*/ -0.2rem -0.05rem 10px 2px #f0f,
                0.2rem 0.05rem 10px 6px #0ff;
        }
        10% {
            box-shadow: inset 0 0 6px #fff, 0 0 6px #fff,
                /*Pink and Blue In*/ inset 0.15rem 0.1rem 10px 2px #f0f,
                inset -0.15rem -0.1rem 10px 4px #0ff,
                /*Pink and Blue Out*/ -0.15rem -0.1rem 10px 2px #f0f,
                0.15rem 0.1rem 10px 6px #0ff;
        }
        15% {
            box-shadow: inset 0 0 6px #fff, 0 0 6px #fff,
                /*Pink and Blue In*/ inset 0.1rem 0.15rem 10px 2px #f0f,
                inset -0.1rem -0.15rem 10px 4px #0ff,
                /*Pink and Blue Out*/ -0.1rem -0.15rem 10px 2px #f0f,
                0.1rem 0.15rem 10px 6px #0ff;
        }
        20% {
            box-shadow: inset 0 0 6px #fff, 0 0 6px #fff,
                /*Pink and Blue In*/ inset 0.05rem 0.2rem 10px 2px #f0f,
                inset -0.05rem -0.2rem 10px 4px #0ff,
                /*Pink and Blue Out*/ -0.05rem -0.2rem 10px 2px #f0f,
                0.05rem 0.2rem 10px 6px #0ff;
        }
        25% {
            box-shadow: inset 0 0 6px #fff, 0 0 6px #fff,
                /*Pink and Blue In*/ inset 0rem 0.25rem 10px 2px #f0f,
                inset 0rem -0.25rem 10px 4px #0ff,
                /*Pink and Blue Out*/ 0rem -0.25rem 10px 2px #f0f,
                0rem 0.25rem 10px 6px #0ff;
        }
        30% {
            box-shadow: inset 0 0 6px #fff, 0 0 6px #fff,
                /*Pink and Blue In*/ inset -0.05rem 0.2rem 10px 2px #f0f,
                inset 0.05rem -0.2rem 10px 4px #0ff,
                /*Pink and Blue Out*/ 0.05rem -0.2rem 10px 2px #f0f,
                -0.05rem 0.2rem 10px 6px #0ff;
        }
        35% {
            box-shadow: inset 0 0 6px #fff, 0 0 6px #fff,
                /*Pink and Blue In*/ inset -0.1rem 0.15rem 10px 2px #f0f,
                inset 0.1rem -0.15rem 10px 4px #0ff,
                /*Pink and Blue Out*/ 0.1rem -0.15rem 10px 2px #f0f,
                -0.1rem 0.15rem 10px 6px #0ff;
        }
        40% {
            box-shadow: inset 0 0 6px #fff, 0 0 6px #fff,
                /*Pink and Blue In*/ inset -0.15rem 0.1rem 10px 2px #f0f,
                inset 0.15rem -0.1rem 10px 4px #0ff,
                /*Pink and Blue Out*/ 0.15rem -0.1rem 10px 2px #f0f,
                -0.15rem 0.1rem 10px 6px #0ff;
        }
        45% {
            box-shadow: inset 0 0 6px #fff, 0 0 6px #fff,
                /*Pink and Blue In*/ inset -0.2rem 0.05rem 10px 2px #f0f,
                inset 0.2rem -0.05rem 10px 4px #0ff,
                /*Pink and Blue Out*/ 0.2rem -0.05rem 10px 2px #f0f,
                -0.2rem 0.05rem 10px 6px #0ff;
        }
        50% {
            box-shadow: inset 0 0 6px #fff, 0 0 6px #fff,
                /*Pink and Blue In*/ inset -0.25rem 0rem 10px 2px #f0f,
                inset 0.25rem 0rem 10px 4px #0ff,
                /*Pink and Blue Out*/ 0.25rem 0rem 10px 2px #f0f,
                -0.25rem 0rem 10px 6px #0ff;
        }
        55% {
            box-shadow: inset 0 0 6px #fff, 0 0 6px #fff,
                /*Pink and Blue In*/ inset -0.2rem -0.05rem 10px 2px #f0f,
                inset 0.2rem 0.05rem 10px 4px #0ff,
                /*Pink and Blue Out*/ 0.2rem 0.05rem 10px 2px #f0f,
                -0.2rem -0.05rem 10px 6px #0ff;
        }
        60% {
            box-shadow: inset 0 0 6px #fff, 0 0 6px #fff,
                /*Pink and Blue In*/ inset -0.15rem -0.1rem 10px 2px #f0f,
                inset 0.15rem 0.1rem 10px 4px #0ff,
                /*Pink and Blue Out*/ 0.15rem 0.1rem 10px 2px #f0f,
                -0.15rem -0.1rem 10px 6px #0ff;
        }
        65% {
            box-shadow: inset 0 0 6px #fff, 0 0 6px #fff,
                /*Pink and Blue In*/ inset -0.1rem -0.15rem 10px 2px #f0f,
                inset 0.1rem 0.15rem 10px 4px #0ff,
                /*Pink and Blue Out*/ 0.1rem 0.15rem 10px 2px #f0f,
                -0.1rem -0.15rem 10px 6px #0ff;
        }
        70% {
            box-shadow: inset 0 0 6px #fff, 0 0 6px #fff,
                /*Pink and Blue In*/ inset -0.05rem -0.2rem 10px 2px #f0f,
                inset 0.05rem 0.2rem 10px 4px #0ff,
                /*Pink and Blue Out*/ 0.05rem 0.2rem 10px 2px #f0f,
                -0.05rem -0.2rem 10px 6px #0ff;
        }
        75% {
            box-shadow: inset 0 0 6px #fff, 0 0 6px #fff,
                /*Pink and Blue In*/ inset 0rem -0.25rem 10px 2px #f0f,
                inset 0rem 0.25rem 10px 4px #0ff,
                /*Pink and Blue Out*/ 0rem 0.25rem 10px 2px #f0f,
                0rem -0.25rem 10px 6px #0ff;
        }
        80% {
            box-shadow: inset 0 0 6px #fff, 0 0 6px #fff,
                /*Pink and Blue In*/ inset 0.05rem -0.2rem 10px 2px #f0f,
                inset -0.05rem 0.2rem 10px 4px #0ff,
                /*Pink and Blue Out*/ -0.05rem 0.2rem 10px 2px #f0f,
                0.05rem -0.2rem 10px 6px #0ff;
        }
        85% {
            box-shadow: inset 0 0 6px #fff, 0 0 6px #fff,
                /*Pink and Blue In*/ inset 0.1rem -0.15rem 10px 2px #f0f,
                inset -0.1rem 0.15rem 10px 4px #0ff,
                /*Pink and Blue Out*/ -0.1rem 0.15rem 10px 2px #f0f,
                0.1rem -0.15rem 10px 6px #0ff;
        }
        90% {
            box-shadow: inset 0 0 6px #fff, 0 0 6px #fff,
                /*Pink and Blue In*/ inset 0.15rem -0.1rem 10px 2px #f0f,
                inset -0.15rem 0.1rem 10px 4px #0ff,
                /*Pink and Blue Out*/ -0.15rem 0.1rem 10px 2px #f0f,
                0.15rem -0.1rem 10px 6px #0ff;
        }
        95% {
            box-shadow: inset 0 0 6px #fff, 0 0 6px #fff,
                /*Pink and Blue In*/ inset 0.2rem -0.05rem 10px 2px #f0f,
                inset -0.2rem 0.05rem 10px 4px #0ff,
                /*Pink and Blue Out*/ -0.2rem 0.05rem 10px 2px #f0f,
                0.2rem -0.05rem 10px 6px #0ff;
        }
        to {
            box-shadow: inset 0 0 6px #fff, 0 0 6px #fff,
                /*Pink and Blue In*/ inset 0.25rem 0rem 10px 2px #f0f,
                inset -0.25rem 0rem 10px 4px #0ff,
                /*Pink and Blue Out*/ -0.25rem 0rem 10px 2px #f0f,
                0.25rem 0rem 10px 6px #0ff;
        }
    }
</style>
