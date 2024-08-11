export async function generateFileFromUrl(url?: string | null) {
  if (!url) return url;

  const response = await fetch(url);
  const name = url.split("/").pop() || "";
  const data = await response.blob();

  const metadata = {
    type: data.type,
  };

  return new File([data], name, metadata);
}
