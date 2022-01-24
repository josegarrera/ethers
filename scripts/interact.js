const {API_KEY, PRIVATE_KEY, CONTRACT_ADDRESS} = process.env;

const {ethers} = require('hardhat');
const contract = require('../artifacts/contracts/HelloWorld.sol/HelloWorld.json');

// node provider =>  Alchemy
const alchemyProvider = new ethers.providers.AlchemyProvider(
	(network = 'ropsten'),
	API_KEY
);

// signer => you
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);

// contract instance
const helloWorldContract = new ethers.Contract(
	CONTRACT_ADDRESS,
	contract.abi,
	signer
);

async function main() {
	const currentMessage = await helloWorldContract.message();
	console.log('the message is: ', currentMessage);

	console.log('updating message...');
	const tx = await helloWorldContract.update('I am kinda excited');
	await tx.wait();

	const newMessage = await helloWorldContract.message();
	console.log('the new message is: ', newMessage);
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
