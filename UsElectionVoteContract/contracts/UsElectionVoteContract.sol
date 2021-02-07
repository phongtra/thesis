pragma solidity >=0.4.21;
import "@openzeppelin/contracts/ownership/Ownable.sol";

contract UsElectionVote is Ownable {
    mapping(string => address[]) candidateVotes;
    mapping(address => bool) alreadyVote;
    uint256 totalVotes;
    event Vote(address voter, string candidate);

    function vote(address _voter, string calldata _candidate) external {
        require(alreadyVote[_voter] == false, "the voter has already voted");
        require(
            keccak256(abi.encodePacked(_candidate)) ==
                keccak256(abi.encodePacked("Donald Trump")) ||
                keccak256(abi.encodePacked(_candidate)) ==
                keccak256(abi.encodePacked("Joe Biden")),
            "Invalid Candidate"
        );
        candidateVotes[_candidate].push(_voter);
        alreadyVote[_voter] = true;
        totalVotes++;
        emit Vote(_voter, _candidate);
    }

    function getVote(string calldata _candidate)
        external
        view
        returns (uint256)
    {
        return candidateVotes[_candidate].length;
    }

    function kill() public onlyOwner {
        selfdestruct(address(uint16(owner())));
    }
}
