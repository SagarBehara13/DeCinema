pragma solidity >=0.6.0 <0.7.0;
// pragma experimental ABIEncoderV2;

contract Cinema {
    struct Film {
        uint id;
        string filmName;
        uint256 budget;
        string directorName;
        string poster;
        string script;
        string shortDescription;
        bool payedBack;
        uint interestAmount;
        address payable directorWalletAddress;
    }
    
    struct FilmDetails {
        uint id;
        uint budgetToRaise;
        uint fundRaised;
        uint castCount;
        string status;
        string category;
    }
    
    struct Cast {
        uint filmId;
        string image;
        string name;
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
    
    uint public filmsCount = 0;
    uint public artistCount = 0;
   
    mapping (uint => Film) public films;
    mapping (uint => FilmDetails) public filmsDetails;
    mapping (uint => mapping(uint => Cast)) public filmsCast;
    
    
    function createFilm(string memory _filmName, uint _budget, string memory _directorName, string memory _poster, string memory _script, string memory _shortDescription, uint _interestAmount, string memory _category) public { 
        require(bytes(_filmName).length > 0, 'Please Add FilmName');
        require(_budget > 0, 'Please Add the amount to be raised');
        require(bytes(_poster).length > 0, 'Please add a poster to film');
        
        
        filmsCount++;
        films[filmsCount] = Film(filmsCount, _filmName, _budget, _directorName, _poster, _script, _shortDescription, false, _interestAmount, msg.sender);
        filmsDetails[filmsCount] = FilmDetails(filmsCount, _budget, 0, 0, 'Development', _category);
        
        emit FilmCreated(filmsCount, _filmName, _budget, _directorName, _poster, _script, _shortDescription, false, _interestAmount, msg.sender);
    }
    
    function addCastToFilm(uint _filmId, string memory _name, string memory _image) public {
        FilmDetails memory _filmDetails = filmsDetails[_filmId];
        artistCount++;
        filmsCast[_filmId][artistCount] = Cast(_filmId, _image, _name);
        _filmDetails.castCount = _filmDetails.castCount + 1;
        filmsDetails[_filmId] = _filmDetails;
    }
    
    function getFilmCast(uint _filmId) public view returns (uint, string memory, string memory){
        Cast memory c = filmsCast[_filmId][1];
        return (c.filmId, c.image, c.name);
    }
  
}
