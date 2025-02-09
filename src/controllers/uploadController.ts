import { Request, Response, NextFunction } from "express";
import s3 from "../config/awsConfig";
import { randomUUID } from "crypto";

export const uploadFile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        if (!req.body || !req.headers["content-type"]?.startsWith("multipart/form-data")) {
            res.status(400).json({ message: "Invalid request. No file uploaded." });
            return;
        }

        const file = req.body.file; // This works if the frontend sends raw file data
        if (!file) {
            res.status(400).json({ message: "No file provided" });
            return;
        }

        const fileName = `${randomUUID()}-${file.name}`;
        const fileBuffer = Buffer.from(await file.arrayBuffer());

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
};
