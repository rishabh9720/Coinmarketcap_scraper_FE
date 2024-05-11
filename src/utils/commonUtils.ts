export const fetchMarketData = async () => {
  console.log("Hello");
  const response = await fetch(import.meta.env.VITE_API_URL!);
  return response.json();
};

export const generateTextColor = (text: string) => {
  if (!text) return "black";

  return text.includes("-") ? "red" : "green";
};
