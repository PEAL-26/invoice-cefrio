export async function blobToBase64(blob: Blob | null) {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    blob && reader.readAsDataURL(blob);
  });
}
