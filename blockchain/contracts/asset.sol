pragma solidity >=0.6.0 <0.7.0;

contract Equip {
    struct Asset {
        uint id;
        uint price;
        uint rentalPriceByDay;
        string assetName;
        address payable ownerWalletAddress;
        string assetImage;
        string assetDescription;
        string ownerContact;
        bool available;
        string ownerShippingLocation;
    }
    
    struct AssetStatus {
        uint id;
        string rentedAt;
        string availableAt;
        address payable borrowerWalletAddress;
        string rentedBy;
    }
    
    event AssetCreated (
        uint id,
        uint price,
        uint rentalPriceByDay,
        string assetName,
        address ownerWalletAddress,
        string assetImage,
        string ownerName,
        string ownerContact,
        bool available,
        string ownerShippingLocation
    );
    
    event AssestStatusUpdated (
        uint id,
        string rentedAt,
        string availableAt,
        address borrowerWalletAddress,
        string rentedBy
    );
    
    uint public assetsCount = 0;
    mapping(uint => Asset) public assets;
    mapping(uint => AssetStatus) public assetStatus;
    
    function createAsset(uint _price, uint _rentalPriceByDay, string memory _assetName, string memory _assetImage,  string memory _assetDescription,  string memory _ownerContact,  string memory _ownerShippingLocation) public {   
        require(bytes(_assetName).length > 0, "Please add ssset name");
        require(bytes(_ownerShippingLocation).length > 0, "Please provide shipping location");
        require(_price >= 0, "Please provide assest price, This may be required if product is damaged, lost etc");
        
        assetsCount++;
        assets[assetsCount] = Asset(assetsCount, _price, _rentalPriceByDay, _assetName, msg.sender, _assetImage, _assetDescription, _ownerContact, true, _ownerShippingLocation);
        
        emit AssetCreated(assetsCount, _price, _rentalPriceByDay, _assetName, msg.sender, _assetImage, _assetDescription, _ownerContact, true, _ownerShippingLocation);
    }
    
    // handled the default values in the web3 section
    function updateAsset(uint _price, uint _rentalPriceByDay, string memory _assetName, string memory _assetImage,  string memory _assetDescription,  string memory _ownerContact,  string memory _ownerShippingLocation) public {
        
    }
    
    
}