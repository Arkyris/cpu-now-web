import { writable } from 'svelte/store';

import { User } from 'universal-authenticator-library';
import { WaxUser} from '@eosdacio/ual-wax';

export let loggedInUser = writable(new User);
//export let loggedInWaxUser = writable(new WaxUser);

export function setUser(newUser) {
    loggedInUser = newUser;
}

