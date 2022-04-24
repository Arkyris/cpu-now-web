import { writable } from 'svelte/store';
import { User } from 'universal-authenticator-library';
import { myChain } from "./chainInfo";
import { JsonRpc } from "eosjs";

export let loggedInUser = writable(new User);

export function setUser(newUser) {
    loggedInUser = newUser;
}

export let rents = writable([]);
export let otherRents = writable([]);
export let rent = writable([]);
export let otherRent = writable([]);


export async function getRentStats(account) {
    const scopes = ["waxcpunow111", "waxcpunow112", "waxcpunow113", "waxcpunow114", "waxcpunow115", "waxcpunow121", "waxcpunow122"];
    let thisRents = [];
    scopes.forEach(async (element) => {
        try {
            const rpc = new JsonRpc(
                `${myChain.rpcEndpoints[0].protocol}://${myChain.rpcEndpoints[0].host}:${myChain.rpcEndpoints[0].port}`
            );
            const data = await rpc.get_table_rows({
                json: true,
                code: "cpunowcntrct",
                scope: element,
                table: "renters",
                lower_bound: account,
                limit: 1,
                reverse: false,
                show_payer: false,
            });
            if (data.rows.length > 0 && data.rows[0].recipient === account) {
                thisRents.push(data);
                //console.log(data);
            }
        } catch (e) {
            console.error(e);
        }
    })
    //console.log(thisRents);
    return thisRents;
};

export const loggedIn = writable(false);
export const acctName = writable("");
export const walletBalance = writable("");
export const walletBalanceUpdateInterval = writable();
export const accountBalance = writable("no account");
export const accountBalanceUpdateInterval = writable();

