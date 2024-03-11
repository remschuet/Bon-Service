import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { aws } from "@/db/aws_db";

import "dotenv/config";

const bucketName = process.env.BUCKET_NAME;

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

export async function deleteImageFromS3(key: string) {
  const params = {
    Bucket: bucketName,
    Key: key,
  };

  const command = new DeleteObjectCommand(params);
  return aws.send(command);
}

// // GET FUNCTIONS:

export async function getImageFromS3(key: string) {
  return await getSignedUrl(
    aws,
    new GetObjectCommand({
      Bucket: bucketName,
      Key: key,
    })
  );
}
