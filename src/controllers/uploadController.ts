import { Request, Response, NextFunction } from "express";
import multer from "multer";
import s3 from "../config/awsConfig";
import { randomUUID } from "crypto";

const upload = multer();

export const uploadFile = [
  upload.single('file'), // 'file' should match the name attribute in your form
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!req.file) {
        res.status(400).json({ message: "No file provided" });
        return;
      }

      const file = req.file;
      const fileName = `${randomUUID()}-${file.originalname}`;
      const fileBuffer = file.buffer;

      const uploadParams = {
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: fileName,
        Body: fileBuffer,
        ContentType: file.mimetype || "application/octet-stream",
      };

      const uploadResponse = await s3.upload(uploadParams).promise();
      res.json({ message: "File uploaded successfully", url: uploadResponse.Location });
    } catch (error) {
      next(error);
    }
  }
];