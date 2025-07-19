import ABI_ERC20 from './abi/ERC20.json';
import ABI_NAME_SYMBOL from './abi/NameSymbol.json';
import ABI_SAFU_TEST from "./abi/SafuTest.json";
import PS_ROUTER_ABI from "./abi/IPancakeRouter02.json";

export {ABI_ERC20};
export {ABI_NAME_SYMBOL};
export {ABI_SAFU_TEST};
export {PS_ROUTER_ABI};

// API configuration from environment variables
export function getApiUrl(): string {
  return import.meta.env.VITE_AWS_INVOKE_URL;
}

export function getApiConfig(): { url: string; apiKey: string } {
  return {
    url: import.meta.env.VITE_AWS_INVOKE_URL,
    apiKey: import.meta.env.VITE_AWS_API_KEY
  };
}

export const APP_BAR_HEIGHT = 96;
export const WBNB_ADDRESS = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c";
export const DOGE_ADDRESS = "0xba2ae424d960c26247dd6c32edc70b295c744c43";
export const MY_CONTRACT = "0x2a829010bc334ea21c4Da2c41Da99eabcB3e69B7";
export const PS_FACTORY_ADDRESS = "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73";
export const PS_ROUTER_ADDRESS = "0x10ED43C718714eb63d5aA57B78B54704E256024E";
export const POOCOIN_URL = "https://poocoin.app/tokens/";
export const POOCOIN_ICON = "https://poocoin.app/images/logo/poocoin512.png";
export const BSCSCAN_TOKEN_URL = "https://bscscan.com/token/";
export const BSCSCAN_ADDRESS_URL = "https://bscscan.com/address/";
export const BSCSCAN_ICON = "https://bscscan.com/images/favicon.ico";
