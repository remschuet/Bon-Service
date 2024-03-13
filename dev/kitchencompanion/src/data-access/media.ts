import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";

import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { aws } from "@/db/aws-db";

import "dotenv/config";

const bucketName = process.env.BUCKET_NAME;

/**
 * Uploads an image to Amazon S3.
 * @param image - The image to upload as a Buffer.
 * @param key - The key to use for the uploaded image in S3.
 * @returns A Promise that resolves to the result of the upload operation.
 */
export async function uploadImageToS3(image: Buffer, key: string) {
  const params = {
    Bucket: bucketName,
    Key: key,
    Body: image,
    ContentType: "image/jpeg",
  };
  const command = new PutObjectCommand(params);
  return aws.send(command);
}

/**
 * Deletes an image from an S3 bucket.
 * @param key - The key of the image to be deleted.
 * @returns A promise that resolves when the image is successfully deleted.
 */
export async function deleteImageFromS3(key: string) {
  const params = {
    Bucket: bucketName,
    Key: key,
  };

  const command = new DeleteObjectCommand(params);
  return aws.send(command);
}

/**
 * Retrieves the signed URL of an image from an S3 bucket.
 * @param key - The key of the image in the S3 bucket.
 * @returns A Promise that resolves to the signed URL of the image.
 */
export async function getImageFromS3(key: string) {
  return await getSignedUrl(
    aws,
    new GetObjectCommand({
      Bucket: bucketName,
      Key: key,
    })
  );
}
