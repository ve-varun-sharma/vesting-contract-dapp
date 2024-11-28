import { expect } from "chai";
import hardhat from "hardhat";

const { ethers } = hardhat;

describe("VestingContract", function () {
  it("Should deploy the contract", async function () {
    const VestingContract = await ethers.getContractFactory("VestingContract");
    const vestingContract = await VestingContract.deploy(
      beneficiary,
      cliffDuration,
      vestingDuration,
      totalTokens
    );
    await vestingContract.deployed();

    expect(vestingContract.address).to.be.not.equal(
      ethers.constants.AddressZero
    );
  });

  it("Should not allow claiming tokens before the cliff", async function () {
    // ... test scenario where a user tries to claim tokens before the cliff period
    await expect(vestingContract.claimTokens()).to.be.revertedWith(
      "Cliff period not over"
    );
  });

  it("Should allow claiming tokens after the cliff", async function () {
    // ... advance time to after the cliff period
    await ethers.provider.send("evm_increaseTime", [cliffDuration]);

    // ... test the correct amount of tokens is claimable and transferred to the beneficiary
    await vestingContract.claimTokens();
    // ... assert the beneficiary's balance and the contract's balance
  });

  // ... add more test cases for different scenarios, such as:
  // - Claiming tokens during the vesting period
  // - Claiming all tokens at the end of the vesting period
  // - Handling edge cases like zero tokens or zero duration
});
