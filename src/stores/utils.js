import { myChain } from "./chainInfo";
import { JsonRpc } from "eosjs";

export async function fetchProducers(lowerBound, previousRes) {
    try {
        const rpc = new JsonRpc(
            `${myChain.rpcEndpoints[0].protocol}://${myChain.rpcEndpoints[0].host}:${myChain.rpcEndpoints[0].port}`
        );
        const data = await rpc.get_table_rows({
            json: true,
            code: "eosio",
            scope: "eosio",
            table: "producers",
            lower_bound: lowerBound,
            limit: 200,
            reverse: false,
            show_payer: false,
        });
        if (data.more === true) {
            previousRes = await innerMore(previousRes, data);
            previousRes.more = data.more;
            previousRes.next_key = data.next_key;
            await new Promise(r => setTimeout(r, (1000)));
            return await fetchProducers(previousRes.next_key, previousRes);
        }
        else if (data.more === false) {
            previousRes = await innerMore(previousRes, data);
            previousRes.more = data.more;
            previousRes.next_key = data.next_key;
            return filterProducers(data);
        }
    } catch (e) {
        console.error(e);
    }
}

function filterProducers(producersRows) {
    let producers = [];
    let it = 0;
    let newRows = [];
    while(it < producersRows.rows.length) {
      if(producersRows.rows[it].is_active === 1) {
        newRows.push(producersRows.rows[it]);
      }
      it++;
    }
    it = 0;
    while(it < newRows.length){
      producers.push(newRows[it].owner);
      it++;
    }
    producers.sort();
    return producers;
  }

  async function innerMore(previousRes, data) {
    let it = 0;
    while (it < data.rows.length) {
      previousRes.rows.push(data.rows[it]);
      it++;
    }
    return previousRes;
  }