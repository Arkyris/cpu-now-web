<script>
    import { Anchor } from "ual-anchor";
    import { Wax } from "@eosdacio/ual-wax";
    import { UALJs } from "ual-plainjs-renderer";
    import { loggedInUser, setUser, acctName } from "./stores/current_user";
    import { onMount } from "svelte";
    import { User } from "universal-authenticator-library";
    import { myChain } from "./stores/chainInfo";
    import { pHI, pVI, loginAnimation } from "./stores/animations";

    let myAppRoot;
    let ual;
    let toggleButtonInterval;
    let loginAnimationInterval;

    onMount(() => {
        mounted();
        addLogoutButtonListener();
        toggleButtonInterval = setInterval(toggleButton, 1000);
        //loginAnimationInterval = setInterval(loginAnimation, 100);
    });

    async function mounted() {
        const userCallback = async (users) => {
            setUser(users[0]);
            console.info("User Information:");
            console.info("Account Name:", await loggedInUser.getAccountName());
            console.info("Chain Id:", await loggedInUser.getChainId());
            $acctName = await loggedInUser.getAccountName();
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
        const ual_button = document.getElementById("ual-button");
        ual_button.innerText = "Wax Login";
        ual_button.style.backgroundColor = "#2d3148";
        ual_button.style.color = "#000000";
        ual_button.style.borderRadius = "25px";
        ual_button.style.width = "100px";
        ual_button.style.height = "50px";
        ual_button.style.animationName = "inherit";
        ual_button.style.animationDuration = "2s";
        ual_button.style.animationIterationCount = "infinite";
        //ual_button.style.boxShadow = `inset 0 0 4px #fff, inset ${$pHI}rem ${$pVI}rem 5px #f0f`;
    } //, inset -10px 0 5px #0ff, inset 10px 0 10px #f0f, inset -10px 0 10px #0ff, 0 0 4px #fff, -10px 0 10px #f0f, 10px 0 10px #0ff

    const addLogoutButtonListener = () => {
        const logoutButton = document.getElementById("logout_button");

        logoutButton.addEventListener("click", async () => {
            $acctName = "";
            ual.logoutUser(loggedInUser);
            setUser(new User());
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
</script>

<div class="button">
    <div id="login" />
    <button id="logout_button">Logout</button>
</div>

<style>
    .button {
        display: flex;
    }

    #logout_button {
        background-color: #456663;
        border-color: #000000;
        color: aquamarine;
        text-align: center;
        border-radius: 5px;
        width: 100px;
        height: 50px;
        display: none;
        margin: 0px;
    }
    #login {
        background-color: #2d3148;
        margin: 0px;
        border-radius: 25px;
        animation-name: loginAnimation;
    }


    @keyframes loginAnimation {
        from {
            box-shadow: inset 1rem 0.0rem 5px #f0f,
            inset -1.0rem 0.0rem 5px #0ff;
        }
        5%{
            box-shadow: inset 0.8rem 0.1rem 5px #f0f,
            inset -0.8rem -0.1rem 5px #0ff;
        }
        10%{
            box-shadow: inset 0.6rem 0.2rem 5px #f0f,
            inset -0.6rem -0.2rem 5px #0ff;
        }
        15%{
            box-shadow: inset 0.4rem 0.3rem 5px #f0f,
            inset -0.4rem -0.3rem 5px #0ff;
        }
        20%{
            box-shadow: inset 0.2rem 0.4rem 5px #f0f,
            inset -0.2rem -0.4rem 5px #0ff;
        }
        25%{
            box-shadow: inset 0.0rem 0.5rem 5px #f0f,
            inset -0.0rem -0.5rem 5px #0ff;
        }
        30%{
            box-shadow: inset -0.2rem 0.4rem 5px #f0f,
            inset 0.2rem -0.4rem 5px #0ff;
        }
        35%{
            box-shadow: inset -0.4rem 0.3rem 5px #f0f,
            inset 0.4rem -0.3rem 5px #0ff;
        }
        40%{
            box-shadow: inset -0.6rem 0.2rem 5px #f0f,
            inset 0.6rem -0.2rem 5px #0ff;
        }
        45%{
            box-shadow: inset -0.8rem 0.1rem 5px #f0f,
            inset 0.8rem -0.1rem 5px #0ff;
        }
        50% {
            box-shadow: inset -1.0rem 0.0rem 5px #f0f,
            inset 1.0rem 0.0rem 5px #0ff;
        }
        55%{
            box-shadow: inset -0.8rem -0.1rem 5px #f0f,
            inset 0.8rem 0.1rem 5px #0ff;
        }
        60%{
            box-shadow: inset -0.6rem -0.2rem 5px #f0f,
            inset 0.6rem 0.2rem 5px #0ff;
        }
        65%{
            box-shadow: inset -0.4rem -0.3rem 5px #f0f,
            inset 0.4rem 0.3rem 5px #0ff;
        }
        70%{
            box-shadow: inset -0.2rem -0.4rem 5px #f0f,
            inset 0.2rem 0.4rem 5px #0ff;
        }
        75%{
            box-shadow: inset -0.0rem -0.5rem 5px #f0f,
            inset 0.0rem 0.5rem 5px #0ff;
        }
        80%{
            box-shadow: inset 0.2rem -0.4rem 5px #f0f,
            inset -0.2rem 0.4rem 5px #0ff;
        }
        85%{
            box-shadow: inset 0.4rem -0.3rem 5px #f0f,
            inset -0.4rem 0.3rem 5px #0ff;
        }
        90%{
            box-shadow: inset 0.6rem -0.2rem 5px #f0f,
            inset -0.6rem 0.2rem 5px #0ff;
        }
        95%{
            box-shadow: inset 0.8rem -0.1rem 5px #f0f,
            inset -0.8rem 0.1rem 5px #0ff;
        }
        to{
            box-shadow: inset 1.0rem 0.0rem 5px #f0f,
            inset -1.0rem 0.0rem 5px #0ff;
        }
    }
</style>
