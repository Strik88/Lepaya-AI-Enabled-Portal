import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines multiple class names and Tailwind classes efficiently
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a date to a readable string
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

/**
 * Creates delay in async functions
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Creates a mock AI response for development purposes
 */
export async function mockAIResponse(prompt: string): Promise<string> {
  // Simulate API delay
  await delay(1500);
  
  // Sample responses based on different prompts
  if (prompt.includes('organization')) {
    return 'A global leader in financial services with operations in 35 countries, specializing in corporate banking, investment management, and retail banking solutions.';
  }
  
  if (prompt.includes('revenue')) {
    return 'The organization generates revenue through multiple channels: transaction fees, interest income from loans, management fees from investment portfolios, and subscription-based digital banking services.';
  }
  
  if (prompt.includes('challenges')) {
    return 'The organization faces several key challenges: digital transformation pressures, increasing regulatory requirements, rising competition from fintech disruptors, and the need to upskill thousands of employees on new technologies.';
  }
  
  if (prompt.includes('priorities')) {
    return 'Strategic priorities include accelerating digital transformation, expanding market share in emerging markets, improving operational efficiency, and building a more agile, future-ready workforce.';
  }
  
  // Default response
  return 'AI-generated content would appear here based on your query. This is just a placeholder during development.';
}

/**
 * Truncates text to a specified length with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
} 