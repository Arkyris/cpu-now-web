import { writable } from 'svelte/store';

import { User } from 'universal-authenticator-library';

export let loggedInUser = writable(new User);

export function setUser(newUser) {
    loggedInUser = newUser;
}

export const acctName = writable("");
export const balance = writable("");
export const balanceUpdateInterval = writable();