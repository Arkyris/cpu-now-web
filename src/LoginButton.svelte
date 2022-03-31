<script>
    import { Anchor } from 'ual-anchor';
    import { Wax } from '@eosdacio/ual-wax';
    import { UALJs } from 'ual-plainjs-renderer';
    import { loggedInUser, setUser } from './stores/current_user';
    import { rpcStore } from './stores/JsonRpc';
    import { JsonRpc } from 'eosjs';
    import { onMount } from "svelte";

    let myAppRoot;
    let ual;
    let balanceUpdateInterval;
    let balanceTag;
    onMount(() => {
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
        balanceTag = document.getElementById('p-transfer')
        launchUAL();
        addLogoutButtonListener();
        balanceUpdateInterval = setInterval(updateBalance, 1000);

    });

    //const myCallback = (arrayOfUsers) => {};
    const userCallback = async (users) => {
        setUser(users[0]);
        console.info("User Information:");
        console.info("Account Name:", await loggedInUser.getAccountName());
        console.info("Chain Id:", await loggedInUser.getChainId());
    };

    const myChain = {
        chainId:
            "1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4",
        rpcEndpoints: [
            {
                protocol: "https://",
                host: "wax.greymass.com",
                port: "35777",
            },
        ],
    };
    const myAppName = "CPU Now";

    const anchor = new Anchor([myChain], { appName: myAppName });
    const wax = new Wax([myChain], { appName: myAppName });



    function launchUAL() {
        ual.init();
    }

    const addLogoutButtonListener = () => {
        const logoutButton = document.getElementById("btn-logout");

        logoutButton.addEventListener("click", async () => {
            clearInterval(balanceUpdateInterval);
            balanceTag.innerHTML = 'Account Liquid Balance:'

            /*const transferDiv = document.getElementById("div-transfer");
            transferDiv.style.display = "none";*/

            ual.logoutUser();
        });
    };

const updateBalance = async () => {
  try {
    const rpc = new JsonRpc('https://wax.greymass.com');
    const accountName = await loggedInUser.getAccountName();
    const data = await rpc.get_account(accountName);

    const { core_liquid_balance: balance } = data
    balanceTag.innerHTML = `Account Liquid Balance: ${balance}`

  } catch (e) {
    console.error(e)
    balanceTag.innerHTML = 'Account Liquid Balance:'
  }
}
</script>

<main>
    <div id="login" />
    <p id="p-transfer">Account Liquid Balance:</p>
    <button id="btn-logout">Logout</button>
</main>
