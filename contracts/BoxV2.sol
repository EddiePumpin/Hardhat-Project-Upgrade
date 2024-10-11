// SPDX-Lincense-Identifier:MIT;

pragma solidity 0.8.20;

// This going to be an implementation or logic contract

contract BoxV2 {
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
    return 2;
  }

  function increment() public {
    value = value + 1;
    emit ValueChanged(value);
  }
}
