import { readable } from 'svelte/store';

import { Api, JsonRpc, RpcError } from "eosjs";

export const rpcStore = readable(new JsonRpc('https://wax.greymass.com'));
