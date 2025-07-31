export default async function getData(request: Request) {
  try {
    const response = await fetch(request);
    const data = await response.json();
    return { status: response.status, data };
  } catch (error) {
    console.log(error);
    return { status: 0, data: "Server Not Reachable" };
  }
}
