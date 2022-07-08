export async function buildTX(accountName, data, cost, loan) {
    let actionArray = [];
    let newAction;
    let actionObj;
    let recipient;
    let costString;
    let amountString;

    if (data.recipient === "") {
        data.recipient = accountName;
    }

    // Rent
    if (data.action === 'rent') {
        costString = await makeCostString(cost);

        //Send funds
        newAction = JSON.stringify({
            account: 'eosio.token',
            name: 'transfer',
            authorization: [{
                actor: accountName,
                permission: 'active',
            }],
            data: {
                from: accountName,
                to: 'cpunowcntrct',
                quantity: costString,
                memo: `rent ${data.recipient} ${data.stake} ${data.days * 2}`,
            },
        });
        actionObj = JSON.parse(newAction);
        actionArray.push(actionObj);
    }

    // Add rent
    if (data.action === "add-rent") {
        costString = await makeCostString(cost);

        //Send funds
        newAction = JSON.stringify({
            account: 'eosio.token',
            name: 'transfer',
            authorization: [{
                actor: accountName,
                permission: 'active',
            }],
            data: {
                from: accountName,
                to: 'cpunowcntrct',
                quantity: costString,
                memo: `add-rent ${data.recipient} ${data.stake} ${data.days * 2}`,
            },
        });
        actionObj = JSON.parse(newAction);
        actionArray.push(actionObj);
    }


    // Loan
    if (data.action === "add-loan") {
        amountString = await makeCostString(parseFloat(data.amount));
        if (loan === false) {
            //Open Loan
            newAction = JSON.stringify({
                account: 'cpunowcntrct',
                name: 'openloan',
                authorization: [{
                    actor: accountName,
                    permission: 'active',
                }],
                data: {
                    owner: accountName,
                },
            });
            actionObj = JSON.parse(newAction);
            actionArray.push(actionObj);

            //Send funds
            newAction = JSON.stringify({
                account: 'eosio.token',
                name: 'transfer',
                authorization: [{
                    actor: accountName,
                    permission: 'active',
                }],
                data: {
                    from: accountName,
                    to: 'cpunowcntrct',
                    quantity: amountString,
                    memo: `add-loan`,
                },
            });
            actionObj = JSON.parse(newAction);
            actionArray.push(actionObj);
        } else {
            //Send funds
            newAction = JSON.stringify({
                account: 'eosio.token',
                name: 'transfer',
                authorization: [{
                    actor: accountName,
                    permission: 'active',
                }],
                data: {
                    from: accountName,
                    to: 'cpunowcntrct',
                    quantity: amountString,
                    memo: `add-loan`,
                },
            });
            actionObj = JSON.parse(newAction);
            actionArray.push(actionObj);
        }
    }

    if (data.action === "remove-loan") {
        amountString = await makeCostString(parseFloat(data.amount));
        //Remove Loan
        newAction = JSON.stringify({
            account: 'cpunowcntrct',
            name: 'removeloan',
            authorization: [{
                actor: accountName,
                permission: 'active',
            }],
            data: {
                loaner: accountName,
                amount: amountString
            },
        });
        actionObj = JSON.parse(newAction);
        actionArray.push(actionObj);
    }

    if (data.action === "claim-refund") {
        //Send funds
        newAction = JSON.stringify({
            account: 'cpunowcntrct',
            name: 'claimrefund',
            authorization: [{
                actor: accountName,
                permission: 'active',
            }],
            data: {
                loaner: accountName,
            },
        });
        actionObj = JSON.parse(newAction);
        actionArray.push(actionObj);
    }
    //vote
    if(data.action === "vote") {
        newAction = JSON.stringify({
            account: 'cpunowcntrct',
            name: 'vote',
            authorization: [{
                actor: accountName,
                permission: 'active',
            }],
            data: {
                loaner: accountName,
                votes: data.votes,
            },
        });
        actionObj = JSON.parse(newAction);
        actionArray.push(actionObj);
    }
    //unstake
    if(data.action === "unstake"){
        amountString = await makeCostString(parseFloat(data.amount));
        newAction = JSON.stringify({
            account: 'eosio',
            name: 'undelegatebw',
            authorization: [{
                actor: accountName,
                permission: 'active',
            }],
            data: {
                from: accountName,
                receiver: accountName,
                unstake_net_quantity: '0.00000000 WAX',
                unstake_cpu_quantity: amountString,
            },
        });
        actionObj = JSON.parse(newAction);
        actionArray.push(actionObj);
    }

    return { actions: actionArray };
}

export function makeCostString(cost) {
    let fixedCost;
    let costString;

    fixedCost = cost.toFixed(8);
    costString = fixedCost.toString();
    costString += ' WAX';

    return costString;
}