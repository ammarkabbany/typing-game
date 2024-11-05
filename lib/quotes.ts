import { BACKUP_QUOTES, WORDS } from './constants';

/**
 * Fetches a random quote from the Quotable API
 * Falls back to backup quotes if the API fails
 */

type Word = {
  word: string;
}

export async function getRandomQuote(): Promise<{ text: string; author: string }> {
  // try {
  //   const response = await fetch('https://api.quotable.io/random?minLength=100&maxLength=200');
  //   if (!response.ok) throw new Error('Failed to fetch quote');
  //   const data = await response.json();
  //   return { text: data.content, author: data.author };
  // } catch (error) {
  //   console.warn('Failed to fetch quote, using backup:', error);
  // { "word": "the" },
    const randomWords = Array.from({ length: 25 }, () => 
      (Object.values(WORDS) as Word[])[Math.floor(Math.random() * Object.values(WORDS).length)].word
    ).join(' ');
    return { text: randomWords, author: '' };
}

/**
 * Fetches multiple quotes for caching purposes
 */
export async function getQuoteBatch(count: number = 5): Promise<{ text: string; author: string }[]> {
  try {
    const response = await fetch(`https://api.quotable.io/quotes/random?limit=${count}&minLength=100&maxLength=200`);
    if (!response.ok) throw new Error('Failed to fetch quotes');
    const data = await response.json();
    return data.map((quote: any) => ({
      text: quote.content,
      author: quote.author
    }));
  } catch (error) {
    console.warn('Failed to fetch quotes batch, using backup:', error);
    return BACKUP_QUOTES.slice(0, count);
  }
}