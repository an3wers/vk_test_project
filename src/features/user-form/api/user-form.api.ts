const url = "https://api.agify.io/";

interface IAgeResponse {
  count: number;
  name: string;
  age: number;
}

export const getAge = async (
  name: string,
  signal: AbortSignal
): Promise<IAgeResponse> => {
  const param = new URLSearchParams({ name }).toString();
  const res = await fetch(`${url}?${param}`, { signal });
  if (!res.ok) {
    throw new Error("Request failed");
  }

  return res.json();
};
