<script>
    import { Anchor } from 'ual-anchor'
    import { UALJs } from 'ual-plainjs-renderer'

    const myCallback = arrayOfUsers => {

    };

    const myChain = {
        chainId: '1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4',
        rpcEndpoints: [{
            protocol: 'https://',
            host: 'wax.greymass.com',
            port: '35777',
        }]
    };

    const myAppName = 'CPU Now';

    const anchor = new Anchor([myChain], { appName: myAppName });

    const myAppRoot = {
        containerElement: document.getElementById('login_button')
    };

    const ual = new UALJs(myCallback, [myChain], myAppName, [anchor], myAppRoot);

    function launchUAL() {
        ual.init();
    }
</script>

<button id='login_button' onclick={launchUAL}>Log In</button>