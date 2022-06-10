import { writable } from "svelte/store";

export const contractCost = writable();
export const totalFunds = writable("no account");
export const totalFundsUpdateInterval = writable();
export const availableFunds = writable("no account");
export const availableFundsUpdateInterval = writable();
export const availableClaimFunds = writable();
export const payoutAmount = writable();
export const nextPayoutTimeDisplay = writable();
export const payoutTotalAmount = writable();
export const payoutLastAmount = writable();