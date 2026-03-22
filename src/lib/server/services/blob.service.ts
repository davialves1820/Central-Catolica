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
  // Try standard name first, then look for any key that contains BLOB_READ_WRITE_TOKEN,
  // then look for any key that starts with vercel_blob_rw_
  const envKeys = Object.keys(process.env);
  const standardToken = process.env.BLOB_READ_WRITE_TOKEN;
  const legacyToken = process.env.VERCEL_BLOB_READ_WRITE_TOKEN;
  const dynamicKey = envKeys.find(
    (k) => k.includes("BLOB_READ_WRITE_TOKEN") || k.startsWith("vercel_blob_rw_"),
  );
  const token = standardToken || legacyToken || (dynamicKey ? process.env[dynamicKey] : undefined);

  if (isProd) {
    if (token) {
      log.info(`Using Vercel Blob Storage (found in variable: ${dynamicKey || "BLOB_READ_WRITE_TOKEN"})`);
      return new VercelBlobStorage(token);
    } else {
      log.error(
        "CRITICAL: Vercel Blob token is missing in production. Checked: BLOB_READ_WRITE_TOKEN and pattern matching keys.",
      );
      return new LocalBlobStorage();
    }
  }

  log.info("Using Local Blob Storage");
  return new LocalBlobStorage();
})();
