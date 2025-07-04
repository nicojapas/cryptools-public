import { ABI_NAME_SYMBOL } from "../constants";
import Web3 from "web3";

let web3 = new Web3(Web3.givenProvider);

export default async function getNameAndSymbol(address) {
	let contract = new web3.eth.Contract(ABI_NAME_SYMBOL, address);
	let name, symbol;
	try {
		name = await contract.methods.name().call();
		symbol = await contract.methods.symbol().call();
	} catch (e) {
		console.log(e.message);
	}
	return [name, symbol];
}
