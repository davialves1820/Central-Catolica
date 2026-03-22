import { LocalBlobStorage } from "./local-blob.service";
import type { IBlobStorage } from "@/lib/shared/types/blob-storage";
import { put, del, head } from "@vercel/blob";
import { createLogger } from "@/lib/server/utils/logger";

const log = createLogger("BlobStorage");

export class VercelBlobStorage implements IBlobStorage {
  private readonly token: string;
  private readonly pathPrefix: string;

  constructor(token: string, pathPrefix: string = "") {
    this.token = token;
    this.pathPrefix = pathPrefix;
  }

  private ensureToken() {
    if (!this.token) {
      throw new Error(
        "BLOB_READ_WRITE_TOKEN is required for Vercel Blob storage operations",
      );
    }
  }

  async upload(
    file: Buffer | File,
    path: string,
    contentType: string,
  ): Promise<string> {
    this.ensureToken();
    const buffer =
      file instanceof File ? Buffer.from(await file.arrayBuffer()) : file;

    const blob = await put(this.pathPrefix + path, buffer, {
      access: "public",
      contentType,
      token: this.token,
    });

    return blob.url;
  }

  async delete(urlOrPath: string): Promise<boolean> {
    try {
      this.ensureToken();
      if (!urlOrPath.includes(".blob.vercel-storage.com")) {
        return false;
      }

      if (this.pathPrefix && !urlOrPath.includes(`/${this.pathPrefix}`)) {
        return false;
      }

      await del(urlOrPath, { token: this.token });
      return true;
    } catch (error) {
      log.error("Error deleting blob", error, { url: urlOrPath });
      return false;
    }
  }

  async exists(urlOrPath: string): Promise<boolean> {
    try {
      this.ensureToken();
      const result = await head(urlOrPath, { token: this.token });
      return !!result;
    } catch {
      return false;
    }
  }
}

const isProd =
  process.env.NODE_ENV === "production" ||
  process.env.VERCEL_ENV === "production";

// In production, we MUST have a BLOB_READ_WRITE_TOKEN.
// If missing, we should probably still allow the app to boot but the services will fail with a clear message.
export const blobStorage: IBlobStorage = (() => {
  if (isProd) {
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      log.info("Using Vercel Blob Storage");
      return new VercelBlobStorage(process.env.BLOB_READ_WRITE_TOKEN);
    } else {
      log.warn(
        "BLOB_READ_WRITE_TOKEN is missing in production. Uploads will fail.",
      );
      // We still return LocalBlobStorage as a fallback to prevent the app from crashing on start,
      // but LocalBlobStorage will fail during actual upload on Vercel's read-only filesystem.
      return new LocalBlobStorage();
    }
  }

  log.info("Using Local Blob Storage");
  return new LocalBlobStorage();
})();
