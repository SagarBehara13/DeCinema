pragma solidity >=0.6.0 <0.7.0;

import "./Token.sol";

contract BnbSwap {
  string public name = "BnbSwap Instant Exchange";
  Token public token;
  uint public rate = 30;

  event TokensPurchased(
    address account,
    address token,
    uint amount,
    uint rate
  );

  event TokensSold(
    address account,
    address token,
    uint amount,
    uint rate
  );

  constructor(Token _token) public {
    token = _token;
  }

  function buyTokens() public payable {
    uint tokenAmount = msg.value * rate;

    // Require that BnbSwap has enough tokens
    require(token.balanceOf(address(this)) >= tokenAmount);
    token.transfer(msg.sender, tokenAmount);

    emit TokensPurchased(msg.sender, address(token), tokenAmount, rate);
  }

  function sellTokens(uint _amount) public {
    require(token.balanceOf(msg.sender) >= _amount);

    // Calculate the amount of Bnber to redeem
    uint BnberAmount = _amount / rate;

    // Require that BnbSwap has enough Bnber
    require(address(this).balance >= BnberAmount);

    // Perform sale
    token.transferFrom(msg.sender, address(this), _amount);
    msg.sender.transfer(BnberAmount);

    emit TokensSold(msg.sender, address(token), _amount, rate);
  }

}
