// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17; // Using 0.8.17 for Viction compatibility

/**
 * @title VeriDoc
 * @dev A smart contract for decentralized document notarization and access control on Viction.
 * Documents are stored off-chain (e.g., IPFS), and only their cryptographic hashes (CIDs)
 * are stored on-chain to provide immutable proof of existence and manage access permissions.
 */
contract VeriDoc {

    // Struct to represent a notarized document's on-chain metadata
    struct Document {
        address owner;       // The address of the user who notarized the document
        uint256 timestamp;   // The block timestamp when the document was notarized
        string title;        // A user-provided title for the document
        bool exists;         // Flag to check if the document hash has been notarized
    }

    // Mapping from document hash (bytes32) to its Document struct
    // The document hash is typically the IPFS CID converted to bytes32 (e.g., using multihash or similar encoding)
    mapping(bytes32 => Document) public documents;

    // Nested mapping to track access permissions:
    // documentHash => userAddress => hasAccess (true/false)
    mapping(bytes32 => mapping(address => bool)) public grantedAccess;

    // Events to log important actions for off-chain indexing and UI updates
    event DocumentNotarized(bytes32 indexed documentHash, address indexed owner, uint256 timestamp, string title);
    event AccessGranted(bytes32 indexed documentHash, address indexed owner, address indexed grantee);
    event AccessRevoked(bytes32 indexed documentHash, address indexed owner, address indexed grantee);

    /**
     * @dev Notarizes a document by storing its cryptographic hash (CID) and metadata on-chain.
     * The actual document content is expected to be stored off-chain (e.g., IPFS).
     * @param _documentHash The cryptographic hash (CID) of the document.
     * @param _title A descriptive title for the document.
     */
    function notarizeDocument(bytes32 _documentHash, string memory _title) public {
        // Ensure the document hash has not been notarized before
        require(!documents[_documentHash].exists, "Document already notarized.");

        // Store the document details
        documents[_documentHash] = Document({
            owner: msg.sender,
            timestamp: block.timestamp,
            title: _title,
            exists: true
        });

        // Grant access to the owner by default
        grantedAccess[_documentHash][msg.sender] = true;

        // Emit an event to signal that a document has been notarized
        emit DocumentNotarized(_documentHash, msg.sender, block.timestamp, _title);
    }

    /**
     * @dev Retrieves the details of a notarized document.
     * @param _documentHash The cryptographic hash (CID) of the document.
     * @return owner The address of the document owner.
     * @return timestamp The notarization timestamp.
     * @return title The document title.
     */
    function getDocumentDetails(bytes32 _documentHash)
        public
        view
        returns (address owner, uint256 timestamp, string memory title)
    {
        require(documents[_documentHash].exists, "Document not found.");
        Document storage doc = documents[_documentHash];
        return (doc.owner, doc.timestamp, doc.title);
    }

    /**
     * @dev Grants read access to a specific document for another address.
     * Only the document owner can grant access.
     * @param _documentHash The hash of the document.
     * @param _grantee The address to grant access to.
     */
    function grantAccess(bytes32 _documentHash, address _grantee) public {
        require(documents[_documentHash].exists, "Document not found.");
        require(documents[_documentHash].owner == msg.sender, "Only the owner can grant access.");
        require(!grantedAccess[_documentHash][_grantee], "Access already granted.");

        grantedAccess[_documentHash][_grantee] = true;
        emit AccessGranted(_documentHash, msg.sender, _grantee);
    }

    /**
     * @dev Revokes read access to a specific document for another address.
     * Only the document owner can revoke access.
     * @param _documentHash The hash of the document.
     * @param _grantee The address to revoke access from.
     */
    function revokeAccess(bytes32 _documentHash, address _grantee) public {
        require(documents[_documentHash].exists, "Document not found.");
        require(documents[_documentHash].owner == msg.sender, "Only the owner can revoke access.");
        require(grantedAccess[_documentHash][_grantee], "Access not granted.");

        grantedAccess[_documentHash][_grantee] = false;
        emit AccessRevoked(_documentHash, msg.sender, _grantee);
    }

    /**
     * @dev Checks if a given user has access to a specific document.
     * @param _documentHash The hash of the document.
     * @param _user The address to check access for.
     * @return bool True if the user has access, false otherwise.
     */
    function hasAccess(bytes32 _documentHash, address _user) public view returns (bool) {
        require(documents[_documentHash].exists, "Document not found.");
        return grantedAccess[_documentHash][_user];
    }
}
