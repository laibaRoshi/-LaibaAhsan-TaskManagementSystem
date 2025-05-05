// setupTests.ts

// Import jest-dom to extend jest/Vitest with custom matchers for DOM nodes
import '@testing-library/jest-dom';
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';

// Extend Vitest's expect with jest-dom matchers
expect.extend(matchers);

// Cleanup the DOM after each test to avoid test interference
afterEach(() => {
  cleanup();
});
