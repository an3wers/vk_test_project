const url = "https://catfact.ninja/fact";

interface IFactResponse {
  fact: string
  length: number
} 

export const getFact = async (): Promise<IFactResponse> => {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) {
    throw new Error("Request failed");
  }
  return res.json();
};
