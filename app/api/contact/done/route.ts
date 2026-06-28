export async function GET() {
  return new Response(`<!DOCTYPE html><html><body>ok</body></html>`, {
    status: 200,
    headers: { "Content-Type": "text/html" },
  });
}
