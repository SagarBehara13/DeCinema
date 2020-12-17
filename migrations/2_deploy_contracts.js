
const Token = artifacts.require("Token");
const BnbSwap = artifacts.require("BnbSwap");

module.exports = async function (deployer) {
  // Deploy Token
  await deployer.deploy(Token, '10000000', '100000');
  const token = await Token.deployed()

  // Deploy EthSwap
  await deployer.deploy(BnbSwap, token.address);
  const bnbSwap = await BnbSwap.deployed()

<<<<<<< HEAD
  // Transfer all tokens to EthSwap (1 million)
  await token.transfer(bnbSwap.address, '1000000000000000000000000')
};
=======
  // Transfer all tokens to EthSwap
  await token.transfer(bnbSwap.address, '10000')
};
>>>>>>> 3cda7bd90833953967259a35c335b087f934398c
