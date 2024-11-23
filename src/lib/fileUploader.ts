export const fileUploader = async (file: File, path: string) => {
  validateFile(file);

  const { url } = await uploadFile(file, path);

  return {
    message: "File uploaded successfully.",
    file: url.replace(
      `${process.env.NEXT_PUBLIC_DO_SPACES_ASSET_PATH_NAME}/uploads/`,
      ""
    ) as string,
  };
};

const validateFile = (file: File) => {
  if (!file) {
    throw new Error("Please upload a file to continue.");
  }
};

const uploadFile = async (file: File, path: string) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("path", path);

  let response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload`, {
    method: "POST",
    body: formData,
  });

  const jsonData = await response.json();

  if (!response.ok) {
    throw new Error(jsonData.error);
  }

  return jsonData;
};

export const getAssetPath = (filename: string | null) => {
  // Google Image
  if (filename?.includes("https://lh3.googleusercontent.com")) return filename;

  return filename
    ? `${process.env.NEXT_PUBLIC_DO_SPACES_ASSET_URI}/uploads/${filename}`
    : `${process.env.NEXT_PUBLIC_DO_SPACES_ASSET_URI}/uploads/images/default-avatar.jpg`;
};
