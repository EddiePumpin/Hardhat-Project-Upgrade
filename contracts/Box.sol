// SPDX-Lincense-Identifier:MIT;

pragma solidity 0.8.20;

// This going to be an implementation or logic contract

contract Box {
  uint256 internal value;

  event ValueChanged(uint256 newValue);

  function store(uint256 newValue) public {
    value = newValue;
    emit ValueChanged(newValue);
  }

  function retrieve() public view returns (uint256) {
    return value;
  }

  function version() public pure returns (uint256) {
    return 1;
  }
}
