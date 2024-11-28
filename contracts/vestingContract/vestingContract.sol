// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VestingContract {
    address public beneficiary;
    uint256 public cliffDuration;
    uint256 public vestingDuration;
    uint256 public totalTokens;
    uint256 public claimedTokens;

    constructor(
        address _beneficiary,
        uint256 _cliffDuration,
        uint256 _vestingDuration,
        uint256 _totalTokens
    ) {
        beneficiary = _beneficiary;
        cliffDuration = _cliffDuration;
        vestingDuration = _vestingDuration;
        totalTokens = _totalTokens;
    }

    function claimTokens() public {
        require(block.timestamp > cliffDuration, "Cliff period not over");

        uint256 claimableTokens = ((block.timestamp - cliffDuration) *
            totalTokens) / vestingDuration;
        claimableTokens = claimableTokens - claimedTokens;

        require(claimableTokens > 0, "No tokens claimable");

        claimedTokens += claimableTokens;
        payable(beneficiary).transfer(claimableTokens);
    }
}
