import { ABI_NAME_SYMBOL } from "../constants";
import Web3 from "web3";

let web3 = new Web3(Web3.givenProvider);

export default async function getNameAndSymbol(address: string) {
	let contract = new web3.eth.Contract(ABI_NAME_SYMBOL as any, address);
	let name: string | undefined, symbol: string | undefined;
	try {
		name = await contract.methods.name().call();
		symbol = await contract.methods.symbol().call();
	} catch (e: any) {
		// Error occurred during contract name/symbol retrieval
		console.error(e)
	}
	return [name, symbol];
}
