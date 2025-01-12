import { NextFunction, Request, Response } from "express";
import path from "path";
import busboy from "busboy";
import fs from "fs-extra";

const __dirname = import.meta.dirname;

export default async function uploadFile(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const bb = busboy({ headers: req.headers });
    const uploadsDir = path.join(__dirname, "../uploads");

    if (!fs.existsSync(uploadsDir)) {
      await fs.mkdir(uploadsDir);
    }

    bb.on("file", (fieldname, file, info) => {
      try {
        const saveTo = path.join(uploadsDir, info.filename);
        const writeStream = fs.createWriteStream(saveTo);

        file.pipe(writeStream);

        writeStream.on("error", (err) => {
          res.status(500).json({
            message: "An error has occurred while processing the picture data",
            error: err.message,
          });
        });

        req.files = {
          fieldname,
          filename: info.filename,
          filepath: saveTo,
          mimetype: info.mimeType,
        };
      } catch (error) {
        const typedError = error as Error;

        res.status(500).json({
          message: "An error has occurred while processing the picture data",
          error: typedError.message,
        });
      }
    });

    bb.on("finish", () => {
      next();
    });

    bb.on("error", (err: Error) => {
      res.status(500).json({
        message: "An error has occurred while saving a picture",
        error: err.message,
      });
    });

    req.pipe(bb);
  } catch (error) {
    const typedError = error as Error;

    res
      .status(500)
      .json({
        message: "An error occurred durling upload",
        error: typedError.message,
      });
  }
}
