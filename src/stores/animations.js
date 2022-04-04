import { writable } from "svelte/store";

export let pHI = writable(1);
export let pVI = writable(0);

export function loginAnimation(){
    if(pHI > -1){
        pHI -= .2;
    }
    if(pVI < .5){
        pVI += .1
    }
    console.log(pVI);
}