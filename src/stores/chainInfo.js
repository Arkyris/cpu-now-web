import { readable } from "svelte/store";

export const myChain = {
    chainId:
        //"f16b1833c747c43682f4386fca9cbb327929334a762755ebec17f6f23c9b8a12", //testnet
        "1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4",
    rpcEndpoints: [
        {
            protocol: "https",
            host: //"testnet.waxsweden.org", 
            "wax.greymass.com",
            port: "443",
        },
    ],
};