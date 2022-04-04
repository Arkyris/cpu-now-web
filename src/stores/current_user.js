import { writable } from 'svelte/store';
import { User } from 'universal-authenticator-library';

export let loggedInUser = writable(new User);

export function setUser(newUser) {
    loggedInUser = newUser;
}

export const acctName = writable("");
export const walletBalance = writable("");
export const walletBalanceUpdateInterval = writable();
export const accountBalance = writable("no account");
export const accountBalanceUpdateInterval = writable();