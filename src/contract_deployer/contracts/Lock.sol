// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20FlashMint.sol";

contract Favour is ERC20, ERC20Burnable, ERC20Permit, ERC20FlashMint {
    constructor() ERC20("Favour", "FVR") ERC20Permit("Favour") {
        _mint(msg.sender, 10000 * 10 ** decimals());
    }
}
