// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Reentrancy {
    mapping(address => uint256) public balances;

    // Mimic the donate function of the original contract
    function donate(address _to) external payable {
        balances[_to] += msg.value;
    }

    // Mimic the withdraw function of the original contract
    function withdraw(uint256 _amount) external {
        require(balances[msg.sender] >= _amount, "Insufficient balance");

        (bool success, ) = msg.sender.call{value: _amount}("");
        require(success, "Transfer failed");

        balances[msg.sender] -= _amount;
    }

    // Allow the contract to receive Ether
    receive() external payable {}
}
