import { uploadToS3 } from "@/lib/s3Client";

export async function POST(request: Request) {
  try {
    const result = await uploadToS3(request);

    return Response.json(result);
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 422 });
  }
}
