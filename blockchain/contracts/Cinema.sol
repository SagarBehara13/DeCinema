pragma solidity >=0.6.0 <0.7.0;

contract FilmFactory {
    struct Film {
        uint id;
        string filmName;
        uint256 budget;
        string directorName;
        string poster;
        string script;
        string shortDescription;
        bool payedBack;
        uint rate;
        address payable directorWalletAddress;
    }

    struct FilmDetails {
        uint id;
        uint budgetToRaise;
        uint fundRaised;
        uint amountToRepay;
        uint castCount;
        string status;
        string category;
    }

    struct Cast {
        uint filmId;
        string image;
        string name;
    }

    struct Share {
        address payable shareHolderAddress;
        uint amount;
        uint interest;
        bool claimed;
        uint filmId;
    }

    event FilmCreated (
        uint id,
        string filmName,
        uint256 budget,
        string directorName,
        string poster,
        string script,
        string shortDescription,
        bool payedBack,
        uint interestAmount,
        address payable directorWalletAddress
    );

    event Contibution(
        uint filmId,
        uint amount
    );

    event Transfer(
        address walletAddress,
        uint amount
    );

    uint public filmsCount = 0;
    uint public artistCount = 0;
    uint public testInterest = 0;
    uint public totalContributions = 0;

    mapping (uint => Film) public films;
    mapping (uint => uint) filmShareHoldersCount;
    mapping (uint => FilmDetails) public filmsDetails;
    mapping (uint => mapping(uint => Cast)) public filmsCast;
    mapping (uint => mapping(uint => Share)) public filmShareHolders;

    function createFilm(string memory _filmName, uint _budget, string memory _directorName, string memory _poster, string memory _script, string memory _shortDescription, uint _interestRate, string memory _category) public {
        require(bytes(_filmName).length > 0, 'Please Add FilmName');
        require(_budget > 0, 'Please Add the amount to be raised');
        require(bytes(_poster).length > 0, 'Please add a poster to film');
        filmsCount++;
        films[filmsCount] = Film(
            filmsCount,
            _filmName,
            _budget,
            _directorName,
            _poster,
            _script,
            _shortDescription,
            false,
            _interestRate,
            msg.sender
        );
        filmsDetails[filmsCount] = FilmDetails(filmsCount, _budget, 0, 0, 0, 'Development', _category);
        emit FilmCreated(filmsCount, _filmName, _budget, _directorName, _poster, _script, _shortDescription, false, _interestRate, msg.sender);
    }

    function addCastToFilm(uint _filmId, string memory _name, string memory _image) public {
        FilmDetails memory _filmDetails = filmsDetails[_filmId];
        artistCount++;
        filmsCast[_filmId][artistCount] = Cast(_filmId, _image, _name);
        _filmDetails.castCount = _filmDetails.castCount + 1;
        filmsDetails[_filmId] = _filmDetails;
    }
}
