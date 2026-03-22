import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/server/auth";
import { blobStorage } from "@/lib/server/services/blob.service";
import { createLogger } from "@/lib/server/utils/logger";

const log = createLogger("UploadAPI");

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const isCoordinator =
      session.user.pastorals && session.user.pastorals.length > 0;
    if (session.user.role !== "ADMIN" && !isCoordinator) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;
    const path = (formData.get("path") as string) || "uploads";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Generate a unique filename to prevent overwriting
    const timestamp = Date.now();
    const extension = file.name.split(".").pop();
    const uniqueFilename = `${path}/${timestamp}-${Math.random().toString(36).substring(2, 8)}.${extension}`;

    log.info(`Attempting upload to storage: ${blobStorage.constructor.name}`);
    const url = await blobStorage.upload(file, uniqueFilename, file.type);
    log.info(`File uploaded successfully: ${uniqueFilename}`);

    return NextResponse.json({ url });
  } catch (error: unknown) {
    const err = error as Error;
    log.error("Upload error detail:", {
      message: err.message,
      stack: err.stack,
    });
    return NextResponse.json(
      { error: `Internal server error: ${err.message}` },
      { status: 500 },
    );
  }
}
