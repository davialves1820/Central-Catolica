import { LocalBlobStorage } from "./local-blob.service";
import type { IBlobStorage } from "@/lib/shared/types/blob-storage";
import { put, del, head } from "@vercel/blob";
import { createLogger } from "@/lib/server/utils/logger";

const log = createLogger("BlobStorage");

export class VercelBlobStorage implements IBlobStorage {
  private readonly token: string;
  private readonly pathPrefix: string;

  constructor(token: string, pathPrefix: string = "") {
    if (!token) {
      throw new Error(
        "BLOB_READ_WRITE_TOKEN is required for Vercel Blob storage",
      );
    }
    this.token = token;
    this.pathPrefix = pathPrefix;
  }

  async upload(
    file: Buffer | File,
    path: string,
    contentType: string,
  ): Promise<string> {
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

export const blobStorage: IBlobStorage = isProd
  ? new VercelBlobStorage(process.env.BLOB_READ_WRITE_TOKEN || "")
  : new LocalBlobStorage();
