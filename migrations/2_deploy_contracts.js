
const Token = artifacts.require("Token");
const BnbSwap = artifacts.require("BnbSwap");

module.exports = async function (deployer) {
  // Deploy Token
  await deployer.deploy(Token, '10000000', '100000');
  const token = await Token.deployed()

  // Deploy EthSwap
  await deployer.deploy(BnbSwap, token.address);
  const bnbSwap = await BnbSwap.deployed()

  // Transfer all tokens to EthSwap
  await token.transfer(bnbSwap.address, '10000')
};
