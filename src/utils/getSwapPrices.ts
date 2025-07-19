import Web3 from "web3";

let web3 = new Web3(Web3.givenProvider);

export default async function getSwapPrices() {
	if (!web3.currentProvider) {
		console.log("Couldn't detect provider.");
	} else {
		const PANCASWAP_ROUTER_ADDRESS =
			"0x10ED43C718714eb63d5aA57B78B54704E256024E";
		const PANCASWAP_FACTORY_ADDRESS =
			"0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73";

		const BLOCKS_TO_CHECK = 1;

		const checkBlocksForPancakeSwapTransactions = async () => {
			// Get the latest block number
			const latestBlockNumber = await web3.eth.getBlockNumber();
			// Loop over the last BLOCKS_TO_CHECK blocks
			for (
				let i = latestBlockNumber;
				i > latestBlockNumber - BLOCKS_TO_CHECK;
				i--
			) {
				// console.log(i);
				// const block = await web3.eth.getBlock(i, true); // Retrieve the block with transactions included

				const response = await fetch(
					"https://bsc-dataseed.binance.org",
					{
						method: "POST",
						headers: { "Content-type": "application/json" },
						body: JSON.stringify({
							id: "1",
							jsonrpc: "2.0",
							method: "eth_getBlockByNumber",
							params: ["0x" + i.toString(16), true],
						}),
					}
				);

				const blockJSON = await response.json();
				const block = blockJSON.result;

				// console.log(block);
				// return;
				const transactions = block.transactions;
				// console.log("transactions", transactions);
				// Loop over each transaction in the block
				for (const transaction of transactions) {
					if (
						transaction.to ===
						PANCASWAP_ROUTER_ADDRESS.toLowerCase()
					) {
						// Transaction is to PancakeSwap router, do something with it
						 
						// Transaction processing (sensitive data not logged)

						// Get the transaction receipt to access the logs
						const receipt = await web3.eth.getTransactionReceipt(
							transaction.hash
						);
						const logs = receipt.logs;

						// Loop over the logs to check for PairCreated events
						for (const log of logs) {
							if (
								log.address ===
								PANCASWAP_FACTORY_ADDRESS.toLowerCase()
							) {
								web3.eth.abi.decodeLog(
									[
										{
											type: "address",
											name: "token0",
										},
										{
											type: "address",
											name: "token1",
										},
										{
											type: "address",
											name: "pair",
										},
										{
											type: "uint256",
											name: "",
										},
									],
									log.data,
									log.topics.slice(1)
								);

								// PairCreated event processed (details not logged for security)
							}
						}
					}
				}
			}
		}

		await checkBlocksForPancakeSwapTransactions();
	}
}
