import { S3Client } from "@aws-sdk/client-s3";

const bucketRegion = process.env.BUCKET_REGION;
const bucketAccessKey = process.env.BUCKET_ACCESS_KEY;
const bucketSecretAccessKey = process.env.BUCKET_SECRET_ACCESS_KEY;

if (!bucketAccessKey || !bucketSecretAccessKey) {
    throw new Error("Missing AWS credentials");
}

export const aws =
    globalThis.aws ||
    new S3Client({
        region: bucketRegion,
        credentials: {
            accessKeyId: bucketAccessKey,
            secretAccessKey: bucketSecretAccessKey,
        },
    });

if (process.env.NODE_ENV !== "production") globalThis.aws = aws;
