import Web3 from 'web3';

/**
 * Validates if a string is a valid Ethereum address
 * @param address - The address string to validate
 * @returns boolean indicating if the address is valid
 */
export const isValidEthereumAddress = (address: string): boolean => {
  if (!address || typeof address !== 'string') {
    return false;
  }

  // Remove any whitespace
  const cleanAddress = address.trim();

  // Check if it's a valid Ethereum address format
  if (!Web3.utils.isAddress(cleanAddress)) {
    return false;
  }

  // Additional validation: ensure it's not the zero address
  if (cleanAddress.toLowerCase() === '0x0000000000000000000000000000000000000000') {
    return false;
  }

  return true;
};

/**
 * Sanitizes and validates a contract address input
 * @param input - The raw input string
 * @returns object with validation result and cleaned address
 */
export const validateContractAddress = (input: string): {
  isValid: boolean;
  address: string | null;
  error: string | null;
} => {
  if (!input || typeof input !== 'string') {
    return {
      isValid: false,
      address: null,
      error: 'Address is required'
    };
  }

  const cleanInput = input.trim();

  if (!cleanInput) {
    return {
      isValid: false,
      address: null,
      error: 'Address cannot be empty'
    };
  }

  // Check length constraints
  if (cleanInput.length > 100) {
    return {
      isValid: false,
      address: null,
      error: 'Address is too long'
    };
  }

  // Validate format
  if (!isValidEthereumAddress(cleanInput)) {
    return {
      isValid: false,
      address: null,
      error: 'Invalid Ethereum address format'
    };
  }

  return {
    isValid: true,
    address: cleanInput,
    error: null
  };
};

/**
 * Sanitizes a string to prevent XSS attacks
 * @param input - The raw input string
 * @returns sanitized string
 */
export const sanitizeString = (input: string): string => {
  if (!input || typeof input !== 'string') {
    return '';
  }

  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocols
    .replace(/on\w+=/gi, '') // Remove event handlers
    .substring(0, 1000); // Limit length
};

/**
 * Rate limiting utility for API calls
 */
export class RateLimiter {
  private requests: number[] = [];
  private maxRequests: number;
  private timeWindow: number;

  constructor(maxRequests: number = 10, timeWindowMs: number = 60000) {
    this.maxRequests = maxRequests;
    this.timeWindow = timeWindowMs;
  }

  canMakeRequest(): boolean {
    const now = Date.now();
    
    // Remove old requests outside the time window
    this.requests = this.requests.filter(time => now - time < this.timeWindow);
    
    // Check if we're under the limit
    if (this.requests.length < this.maxRequests) {
      this.requests.push(now);
      return true;
    }
    
    return false;
  }

  getTimeUntilNextRequest(): number {
    if (this.requests.length === 0) return 0;
    
    const oldestRequest = Math.min(...this.requests);
    const timeElapsed = Date.now() - oldestRequest;
    return Math.max(0, this.timeWindow - timeElapsed);
  }
}

// Create a singleton rate limiter for contract validation
export const contractValidationLimiter = new RateLimiter(30, 60000); // 30 requests per minute