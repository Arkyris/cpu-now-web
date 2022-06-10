import { readable } from "svelte/store";

export const myChain = {
    chainId:
        "1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4",
    rpcEndpoints: [
        {
            protocol: "https",
            host: "api.waxsweden.org",
            port: "443",
        },
        {
            protocol: "https",
            host: "wax.pink.gg",
            port: "443",
        },
        {
            protocol: "https",
            host: "wax.greymass.com",
            port: "443",
        },
        {
            protocol: "https",
            host: "wax.cryptolions.io",
            port: "443",
        },
    ],
};