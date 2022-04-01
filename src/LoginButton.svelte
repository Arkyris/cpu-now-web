<script>
    import { Anchor } from "ual-anchor";
    import { Wax } from "@eosdacio/ual-wax";
    import { UALJs } from "ual-plainjs-renderer";
    import { loggedInUser, setUser, acctName, balance, balanceUpdateInterval } from "./stores/current_user";
    import { onMount } from "svelte";

    let myAppRoot;
    let ual;
    let toggleButtonInterval;
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
        ual_button.style.backgroundColor = "#EBAB21";
        ual_button.style.color = "#000000";
        ual_button.style.borderRadius = "5px";
        ual_button.style.width = "100px";
        ual_button.style.height = "50px";
    }

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

    const addLogoutButtonListener = () => {
        const logoutButton = document.getElementById("logout_button");

        logoutButton.addEventListener("click", async () => {
            $acctName = "";
            ual.logoutUser();

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
    };
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
    #login{
        margin: 0px;
    }
</style>
