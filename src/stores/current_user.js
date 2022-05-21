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
    const scopes = ["waxcpunow111", "waxcpunow112", "waxcpunow113", "waxcpunow114", "waxcpunow115", "waxcpunow121", "waxcpunow122", "waxcpunow123", "waxcpunow124", "waxcpunow125", "waxcpunow131", "waxcpunow132", "waxcpunow133", "waxcpunow134", "waxcpunow135", "waxcpunow141", "waxcpunow142", "waxcpunow143", "waxcpunow144", "waxcpunow145", "waxcpunow151", "waxcpunow152", "waxcpunow153", "waxcpunow154", "waxcpunow155", "waxcpunow211", "waxcpunow212", "waxcpunow213", "waxcpunow214", "waxcpunow215", "waxcpunow221", "waxcpunow222", "waxcpunow223", "waxcpunow224", "waxcpunow225", "waxcpunow231"];
    let thisRents = [];
    let it = 0;
    scopes.forEach(async (element) => {
        try {
            const rpc = new JsonRpc(
                `${myChain.rpcEndpoints[it].protocol}://${myChain.rpcEndpoints[it].host}:${myChain.rpcEndpoints[it].port}`
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
            it++;
            if(it >= myChain.rpcEndpoints.length) {
                it = 0;
            }
            console.log(it);
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
//export const accountBalance = writable("no account");
//export const accountBalanceUpdateInterval = writable();
export const loan = writable(false);
export const loanAmount = writable("no loan");
export const loanNewAmount = writable("no new loan");
export const loanRefund = writable("no refund");
