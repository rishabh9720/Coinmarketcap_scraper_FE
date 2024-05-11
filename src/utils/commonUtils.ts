/**
 * Fetches market data from the API.
 * @returns A promise that resolves to the JSON data fetched from the API.
 */
export const fetchMarketData = async () => {
  const response = await fetch(import.meta.env.VITE_API_URL!);
  return response.json();
};

/**
 * Generates a text color based on the content.
 * @param text - The text content to determine the color for.
 * @returns The color value (either "red" or "green") default it will be black.
 */
export const generateTextColor = (text: string) => {
  if (!text) return "black";

  return text.includes("-") ? "red" : "green";
};
