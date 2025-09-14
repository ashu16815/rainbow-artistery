import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const s3Client = new S3Client({
  region: process.env.S3_REGION || 'auto',
  endpoint: process.env.S3_ENDPOINT,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
  },
})

const BUCKET_NAME = process.env.S3_BUCKET || 'rainbow-artistery'

export interface UploadUrlParams {
  filename: string
  contentType: string
  folder?: string
}

export async function getSignedUploadUrl({ 
  filename, 
  contentType, 
  folder = 'uploads' 
}: UploadUrlParams) {
  const key = `${folder}/${Date.now()}-${filename}`
  
  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    ContentType: contentType,
  })

  const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 })
  
  return {
    signedUrl,
    key,
    publicUrl: `${process.env.S3_ENDPOINT}/${BUCKET_NAME}/${key}`,
  }
}

export async function deleteFile(key: string) {
  const command = new DeleteObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
  })

  await s3Client.send(command)
}

// For development, we'll use local storage
export async function getSignedUploadUrlDev({ 
  filename, 
  contentType, 
  folder = 'uploads' 
}: UploadUrlParams) {
  const key = `${folder}/${Date.now()}-${filename}`
  const publicUrl = `/uploads/${key}`
  
  return {
    signedUrl: `/api/upload-dev?key=${encodeURIComponent(key)}&contentType=${encodeURIComponent(contentType)}`,
    key,
    publicUrl,
  }
}

export async function deleteFileDev(key: string) {
  // In development, we'll just return success
  // In a real implementation, you'd delete the file from the filesystem
  return true
}
