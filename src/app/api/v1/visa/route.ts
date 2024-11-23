import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
  try {
    const url = new URL(req.url);
    const from = url.searchParams.get("from");
    const to = url.searchParams.get("to");
    if (!from) {
      return NextResponse.json(
        {
          status: 400,
          message: "error",
          result: '"from" parameter is required.',
        },
        {
          status: 400,
        }
      );
    }

    const params = to ? `${from}/${to}` : from;

    let endpoint = `https://rough-sun-2523.fly.dev/api/${params}`

    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          status: 500,
          message: "error",
          result: `Error from external API: ${response.statusText}`,
        },
        {
          status: 500,
        }
      );
    }

    const result = await response.json();
    return Response.json(result);
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
