export function createFormData(files: File | File[]) {
  const newFiles = Array.isArray(files)
    ? files.filter((file) => !!file)
    : Array.from([files]).filter((file) => !!file);

  if (!newFiles) return null;
  if (newFiles.length === 0) return null;

  const formData = new FormData();
  newFiles.forEach((file) => {
    formData.append(file.name, file);
  });

  return formData;
}

export function checkFileType(fileName = '') {
  if (!fileName) return null;

  var ext = fileName.split('.').pop()?.toLowerCase();

  if (!ext) return null;

  var imageTypes = ['jpg', 'jpeg', 'png', 'gif'];
  if (imageTypes.indexOf(ext) !== -1) {
    return 'image';
  }

  if (ext === 'pdf') {
    return 'document';
  }

  return 'unknown';
}

export function getFileType(fileName = '') {
  if (!fileName) return null;
  var ext = fileName.split('.').pop()?.toLowerCase();
  if (!ext) return null;
  return ext;
}
