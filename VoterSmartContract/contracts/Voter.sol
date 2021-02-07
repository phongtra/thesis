pragma solidity >=0.4.21;
import "@openzeppelin/contracts/ownership/Ownable.sol";

contract Voter is Ownable {
    mapping(string => address) voters;
    event RegisterVoter(address voter, string socialNumber);

    function _minting(address _voter) private {
        address payable voter = address(uint160(_voter));
        voter.transfer(msg.value);
    }

    function registerVoter(address _voter, string calldata _socialNumber)
        external
        payable
        onlyOwner
    {
        voters[_socialNumber] = _voter;
        _minting(_voter);
        emit RegisterVoter(_voter, _socialNumber);
    }

    function kill() public onlyOwner {
        selfdestruct(address(uint16(owner())));
    }
}
