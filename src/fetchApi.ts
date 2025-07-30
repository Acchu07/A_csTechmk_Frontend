export default async function getData(request: Request) {
  try {
    const response = await fetch(request);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    // console.log(json);
    return json;
  } catch (error) {
    if (error instanceof Error) {
      // console.error(error.message);
    }
  }
}
