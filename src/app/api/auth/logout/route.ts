export async function POST(request: Request) {
  const body = await request.json();

  // change the url with your logout endpoint
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // 'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${body.accessToken}`,
    },
  })
    .then(async res => await res.json())
    .catch(err => {
      throw new Error('Internal server',err);
    });

  return Response.json({
    success: res.ok,
    status: res.status,
  });
}
