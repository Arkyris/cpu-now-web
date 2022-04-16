export async function buildTX(accountName, accountFunds, data, cost) {
    let actionArray = [];
    let newAction;
    let actionObj;
    let recipient;
    let costString;
    let amountString;

    // Rent
    if (data.action === 'rent') {
        costString = await makeCostString(cost);
        // Check for open account
        if (accountFunds === 'no account') {
            newAction = JSON.stringify({
                account: 'testingtest2',
                name: 'openaccount',
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
            // Send funds
            newAction = JSON.stringify({
                account: 'eosio.token',
                name: 'transfer',
                authorization: [{
                    actor: accountName,
                    permission: 'active',
                }],
                data: {
                    from: accountName,
                    to: 'testingtest2',
                    quantity: costString,
                    memo: '1',
                },
            });
            actionObj = JSON.parse(newAction);
            actionArray.push(actionObj);
        }
        //Send funds if none available
        if (parseFloat(accountFunds) < cost) {
            costString = await makeCostString(cost - parseFloat(accountFunds));
            newAction = JSON.stringify({
                account: 'eosio.token',
                name: 'transfer',
                authorization: [{
                    actor: accountName,
                    permission: 'active',
                }],
                data: {
                    from: accountName,
                    to: 'testingtest2',
                    quantity: costString,
                    memo: '1',
                },
            });
            actionObj = JSON.parse(newAction);
            actionArray.push(actionObj);
        }


        // Send rent action
        if (data.recipient === "") {
            recipient = accountName;
        } else {
            recipient = data.recipient;
        };
        newAction = JSON.stringify({
            account: 'testingtest2',
            name: 'rent',
            authorization: [{
                actor: accountName,
                permission: 'active',
            }],
            data: {
                payer: accountName,
                recipient: recipient,
                days: parseFloat(data.days) * 2,
                amount_to_stake: parseInt(data.stake),
            },
        });
        actionObj = JSON.parse(newAction);
        actionArray.push(actionObj);
    }

    // Add rent
    if (data.action === "add-rent") {
        costString = await makeCostString(cost);
        if (accountFunds === 'no account') {
            newAction = JSON.stringify({
                account: 'testingtest2',
                name: 'openaccount',
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
        }
        // Send funds if none available
        if (parseFloat(accountFunds) < cost) {
            costString = await makeCostString(cost - parseFloat(accountFunds));
            newAction = JSON.stringify({
                account: 'eosio.token',
                name: 'transfer',
                authorization: [{
                    actor: accountName,
                    permission: 'active',
                }],
                data: {
                    from: accountName,
                    to: 'testingtest2',
                    quantity: costString,
                    memo: '1',
                },
            });
            actionObj = JSON.parse(newAction);
            actionArray.push(actionObj);
        }
        // Send add rent action
        if (data.recipient === "") {
            recipient = accountName;
        } else {
            recipient = data.recipient;
        };

        newAction = JSON.stringify({
            account: 'testingtest2',
            name: 'addrent',
            authorization: [{
                actor: accountName,
                permission: 'active',
            }],
            data: {
                payer: accountName,
                recipient: recipient,
                days: parseFloat(data.days) * 2,
                amount_to_stake: parseInt(data.stake),
            },
        });
        actionObj = JSON.parse(newAction);
        actionArray.push(actionObj);
    }

    if (data.action === "open-account") {
        newAction = JSON.stringify({
            account: 'testingtest2',
            name: 'openaccount',
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
    }
    // Add blance
    if (data.action === "add-funds") {
        amountString = await makeCostString(parseFloat(data.amount));
        if (accountFunds === 'no account') {
            newAction = JSON.stringify({
                account: 'testingtest2',
                name: 'openaccount',
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
        }
        // Send Funds
        newAction = JSON.stringify({
            account: 'eosio.token',
            name: 'transfer',
            authorization: [{
                actor: accountName,
                permission: 'active',
            }],
            data: {
                from: accountName,
                to: 'testingtest2',
                quantity: amountString,
                memo: '1',
            },
        });
        actionObj = JSON.parse(newAction);
        actionArray.push(actionObj);
    }

    if (data.action === "close-account") {
        amountString = await makeCostString(parseFloat(data.amount));
        if (accountFunds != 'no account') {
            newAction = JSON.stringify({
                account: 'testingtest2',
                name: 'closeaccount',
                authorization: [{
                    actor: accountName,
                    permission: 'active',
                }],
                data: {
                    account: accountName,
                },
            });
            actionObj = JSON.parse(newAction);
            actionArray.push(actionObj);
        } else {
            console.log("No Account Found");
        }
    }

    // Loan
    if (data.action === "loan") {

    }

    // Add loan
    if (data.action === "add-loan") {

    }

    if (data.action === "test") {
        newAction = JSON.stringify({
            account: 'testingtest2',
            name: 'noop',
            authorization: [{
                actor: accountName,
                permission: 'active',
            }],
            data: {
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