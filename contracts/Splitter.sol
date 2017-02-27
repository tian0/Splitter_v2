pragma solidity ^0.4.8;//^ = 0.4.8 compiler or newer

contract Splitter {

    address public owner;
    address public Alice;
    address public Bob; 
    address public Carol;
    bool private doSplit;
    mapping (address => uint) balances;
    
    //anything that changes state, log an event:
    event LogSplit(bool doSplit, address sender, uint value, uint sendA, uint sendB);
    event LogKill(address sender, address owner); 

    
    //constructor runs once upon deployment. constructor has same name as contract
    function Splitter(address _accountA, address _accountB, address _accountC) {
        //fail early if accounts for split are same address, avoid unnecessary SLOAD and SSTORE costs
        if (_accountA == _accountB) throw;
        if (_accountB == _accountC) throw;
        if (_accountC == _accountA) throw; 
        if (_accountA == address(0) || _accountB == address(0) || _accountC == address(0)) 
            throw; //addresses can't be null 0x0
        owner = msg.sender;
        Alice = _accountA;
        Bob   = _accountB;
        Carol = _accountC;
    }
    
    function getSplitterBalance() public returns (uint splitterBalance) {
        return this.balance;
    }

    function getBalance(address addr) returns(uint) {
        return balances[addr];
    }

    function split() payable {
        doSplit = false;
        if (msg.value == 0) 
            throw; //fail if nothing to split
        if (msg.sender == Alice) //{
            uint sendtoBob = msg.value/2; //division trunctates
            uint sendtoCarol = msg.value - sendtoBob; //no rounding loss, accumulating remainders in contract are trapped unless admin function to drain them
            doSplit = true; //re-entry protection?
        // } else
            // throw; //nice version of contract rebounds funds that aren't Alice's to split
            // evil version keep them, then owner can kill contract and recover these funds
        if (!Bob.send(sendtoBob) || !Carol.send(sendtoCarol)) 
            throw; //send is functionality of address type, checking that transaction went thru aka unchecked.send vulnerability check
        LogSplit(doSplit, msg.sender, msg.value, sendtoBob, sendtoCarol);
    }
    
    function killMe() {
        if (msg.sender == owner) {
            LogKill(msg.sender, owner);
            selfdestruct(owner);
        } else
            throw; //Xavier to autoabacus: punish with throw the non-owner who dared calling this function
            LogKill(msg.sender, owner); 
    }

    //fallback function
    function () payable {}
}