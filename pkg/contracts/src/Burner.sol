// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract Burner {

    function burnERC20Token(address token, uint256 amount) public {
        // Burn tokens
    }

    function burnERC20Tokens(address[] calldata tokens, uint256[] calldata amounts) public {
        // Burn tokens
        for (uint256 i = 0; i < tokens.length; i++) {
            // Burn tokens
            burnERC20Token(tokens[i], amounts[i]);
        }
    }

}