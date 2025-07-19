import { ABI_SAFU_TEST, MY_CONTRACT } from "../constants";
import getNameAndSymbol from "./getNameAndSymbol";
import Web3 from "web3";

let web3 = new Web3(Web3.givenProvider);

export default async function safuTest(target: string) {
	if (!web3.currentProvider) {
		console.log("Couldn't detect provider.");
	} else {
		let tokenStatus = false,
			safuness,
			msg,
			buyTax,
			sellTax;

		if (web3.utils.isAddress(target)) {
			target = web3.utils.toChecksumAddress(target);
		} else {
			return [{ msg: `"${target}" is not a valid address.` }];
		}

		const [name, symbol] = await getNameAndSymbol(target);

		const contract = new web3.eth.Contract(ABI_SAFU_TEST as any, MY_CONTRACT);
		const amount = web3.utils.toWei("0.1", "ether");

		try {
			const out = await contract.methods
				.buyAndSell(target)
				.call({ value: amount });
			const [buyIdeal, buyReal, sellIdeal, sellReal] = Object.values(out) as [any, any, any, any];

			buyTax = Math.round(100 - (Number(buyReal) * 100) / Number(buyIdeal));
			sellTax = Math.round(100 - (Number(sellReal) * 100) / Number(sellIdeal));
					Number.parseInt(
			web3.utils.fromWei(String(Number(amount) - Number(sellReal)), "gwei")
		);

			if (buyTax > 20 || sellTax > 20) {
				safuness = "UNSAFE";
				msg = "TAX TOO HIGH";
			} else {
				safuness = "?";
				tokenStatus = true;
			}

			buyTax = buyTax.toString() + "%";
			sellTax = sellTax.toString() + "%";
		} catch (e: any) {
			if (e.message?.includes("Internal JSON-RPC error.")) {
				const { message } = JSON.parse(
					e.message.split("Internal JSON-RPC error.")[1]
				);
				switch (message) {
					case "INSUFFICIENT_LIQUIDITY":
						safuness = "NOT SURE YET";
						msg = "NO LIQUIDITY";
						break;
					case "INSUFFICIENT_INPUT_AMOUNT":
						safuness = "UNSAFE";
						msg = "INSUFF INPUT";
						break;
					default:
						safuness = "UNSAFE";
						msg = "EXECUTION REVERTED";
				}
			}
		}

		return {
			tokenStatus,
			safuness,
			msg,
			name,
			symbol,
			buyTax,
			sellTax,
		};
	}
}
