import * as fs from 'fs';

export async function checkOrCreateDirectory(directoryPath: string): Promise<void> {
  return new Promise((resolver, reject) => {
    try {
      if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath, { recursive: true });
        fs.chmodSync(directoryPath, 0o777);
      }
      resolver();
    } catch (error) {
      reject(error);
    }
  });
}
