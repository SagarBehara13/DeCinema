pragma solidity ^0.6.0;

import './Cinema.sol';

contract Token is FilmFactory {
    string  public name;
    string  public symbol;
    uint256 public totalSupply = 0;
    address private tokenOwner;
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;
    event Transfer(
      address indexed _from,
      address indexed _to,
      uint256 _value
    );
    event Approval(
      address indexed _owner,
      address indexed _spender,
      uint256 _value
    );
    constructor (uint256 _initialSupply) public {
        symbol = 'DCN';
        name = 'DeCinema Token';
        // tokenOwner = msg.sender;
        // balanceOf[tokenOwner] = _initialBalance;
        totalSupply = _initialSupply;
    }
    function approve(address _spender, uint256 _value) public returns (bool success) {
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }
    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(balanceOf[msg.sender] >= _value);
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        Transfer(msg.sender, _to, _value);
        return true;
    }
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        require(_value <= balanceOf[_from]);
        require(_value <= allowance[_from][msg.sender]);
        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;
        allowance[_from][msg.sender] -= _value;
        emit Transfer(_from, _to, _value);
        return true;
    }
    function contribute(uint _filmId, uint _amount) public payable {
        totalContributions = totalContributions + _amount;
        uint contributorId = filmShareHoldersCount[_filmId];
        contributorId++;
        filmShareHoldersCount[_filmId] = contributorId;
        Film memory _film = films[_filmId];
        FilmDetails memory _filmDetails = filmsDetails[_filmId];
        Share memory _share = filmShareHolders[_filmId][contributorId];
        uint x = _film.budget * _film.rate;
        uint interestAmount = x / _film.budget;
        _filmDetails.fundRaised = _filmDetails.fundRaised + _amount;
        _filmDetails.amountToRepay = _filmDetails.amountToRepay + _amount + interestAmount;
        filmsDetails[_filmId] = _filmDetails;
        if (_share.filmId == _filmId){
            filmShareHolders[_filmId][contributorId] = Share(msg.sender, _share.amount + _amount, _share.interest + interestAmount, false, _filmId);
        } else {
            filmShareHolders[_filmId][contributorId] = Share(msg.sender, _amount, interestAmount, false, _filmId);
        }
        transfer(_film.directorWalletAddress, _amount);
        emit Contibution(_filmId, _amount);
    }
    function endFilmAndRepay(uint _filmId) public payable {
        Film memory _film = films[_filmId];
        require(msg.sender == _film.directorWalletAddress);
        for(uint index = 1; index <= filmShareHoldersCount[_filmId]; index++) {
            transfer(
                filmShareHolders[_filmId][index].shareHolderAddress,
                filmShareHolders[_filmId][index].amount + filmShareHolders[_filmId][index].interest
            );
        }
    }
}

library SafeMath {
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
      assert(b <= a);
      return a - b;
    }
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
      uint256 c = a + b;
      assert(c >= a);
      return c;
    }
}
