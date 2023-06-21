export default async function apiFetch(route, method, apiKey, body) {
    const url = `http://localhost:2999/${route}`;
    try {
      const response = await fetch(url, {
        method,
        headers: {
          Authorization: apiKey ? `apikey ${apiKey}` : undefined,
          "Content-Type": "application/json",
        },
        body: body ? JSON.stringify(body) : undefined,
      });

      if (response.ok) {
        return await response.json();
      } else {
        throw new Error(`Request failed with status ${response.status}`);
      }
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }
