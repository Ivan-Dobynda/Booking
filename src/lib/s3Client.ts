import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";

const allowedDirectories = ["images/users"];

// S3 Client
const s3Client = new S3Client({
  endpoint: process.env.DO_SPACES_ENDPOINT || "",
  forcePathStyle: false,
  region: process.env.DO_SPACES_REGION || "",
  credentials: {
    accessKeyId: process.env.DO_SPACES_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.DO_SPACES_SECRET_ACCESS_KEY || "",
  },
});

export const uploadToS3 = async (req: Request) => {
  const form = await req.formData();
  const file = form.get("file");
  const path = form.get("path") as string;

  if (!file) throw new Error("Invalid file provided.");

  const isFile = file instanceof File;

  if (!isFile) throw new Error("Invalid file provided.");

  const filePath = getFilePath(file.name, path);
  const buffer = await file.arrayBuffer();

  const data = await s3Client.send(
    new PutObjectCommand({
      Bucket: process.env.DO_SPACES_BUCKET_NAME || "",
      Key: filePath,
      Body: Buffer.from(buffer),
      ACL: "public-read",
    })
  );

  return {
    url: filePath,
  };
};

export const getFilePath = (filename: string, path: string) => {
  const fileExtension = getFileExtension(filename);
  const directoryPath = getDirectoryPath(path);

  return `${
    process.env.NEXT_PUBLIC_DO_SPACES_ASSET_PATH_NAME
  }/uploads/${directoryPath}/${uuidv4()}.${fileExtension}`;
};

export const getFileExtension = (filename: string) => {
  return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
};

export const getDirectoryPath = (path: string) => {
  const dirPath = `images/${path}`;
  if (!allowedDirectories.includes(dirPath))
    throw new Error("The requested path is not allowed.");

  return dirPath;
};
