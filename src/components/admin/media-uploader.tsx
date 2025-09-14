'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Upload, X, Check, AlertCircle } from 'lucide-react'
import { toast } from 'sonner'

interface MediaUploaderProps {
  onUpload: (url: string, path: string) => void
  onRemove?: (path: string) => void
  maxFiles?: number
  acceptedTypes?: string[]
  maxSize?: number
}

interface UploadFile {
  file: File
  progress: number
  status: 'uploading' | 'success' | 'error'
  url?: string
  path?: string
  error?: string
}

export function MediaUploader({
  onUpload,
  onRemove,
  maxFiles = 10,
  acceptedTypes = ['image/*', 'video/mp4'],
  maxSize = 8 * 1024 * 1024, // 8MB
}: MediaUploaderProps) {
  const [files, setFiles] = useState<UploadFile[]>([])
  const [isUploading, setIsUploading] = useState(false)

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (files.length + acceptedFiles.length > maxFiles) {
      toast.error(`Maximum ${maxFiles} files allowed`)
      return
    }

    const newFiles: UploadFile[] = acceptedFiles.map(file => ({
      file,
      progress: 0,
      status: 'uploading' as const,
    }))

    setFiles(prev => [...prev, ...newFiles])
    setIsUploading(true)

    for (let i = 0; i < newFiles.length; i++) {
      const file = newFiles[i]
      try {
        // Upload file to Vercel Blob
        const formData = new FormData()
        formData.append('file', file.file)
        formData.append('prefix', 'products')

        const response = await fetch('/api/admin/upload-blob', {
          method: 'POST',
          body: formData,
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || 'Upload failed')
        }

        const { url, pathname, filename } = await response.json()

        // Update file status
        setFiles(prev =>
          prev.map(f =>
            f.file === file.file
              ? { ...f, status: 'success', progress: 100, url, path: pathname }
              : f
          )
        )

        onUpload(url, pathname)
        toast.success(`${file.file.name} uploaded successfully`)
      } catch (error) {
        setFiles(prev =>
          prev.map(f =>
            f.file === file.file
              ? {
                  ...f,
                  status: 'error',
                  error: error instanceof Error ? error.message : 'Upload failed',
                }
              : f
          )
        )
        toast.error(`Failed to upload ${file.file.name}`)
      }
    }

    setIsUploading(false)
  }, [files.length, maxFiles, onUpload])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedTypes.reduce((acc, type) => {
      acc[type] = []
      return acc
    }, {} as Record<string, string[]>),
    maxSize,
    multiple: true,
  })

  const removeFile = (index: number) => {
    const file = files[index]
    if (file.path && onRemove) {
      onRemove(file.path)
    }
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-6">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragActive
                ? 'border-primary bg-primary/5'
                : 'border-muted-foreground/25 hover:border-primary/50'
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-lg font-medium mb-2">
              {isDragActive ? 'Drop files here' : 'Drag & drop files here'}
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              or click to select files
            </p>
            <p className="text-xs text-muted-foreground">
              Max {maxFiles} files, up to {Math.round(maxSize / 1024 / 1024)}MB each
            </p>
          </div>
        </CardContent>
      </Card>

      {files.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium">Uploaded Files</h4>
          {files.map((file, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      {file.status === 'uploading' && (
                        <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                      )}
                      {file.status === 'success' && (
                        <Check className="w-8 h-8 text-green-500" />
                      )}
                      {file.status === 'error' && (
                        <AlertCircle className="w-8 h-8 text-red-500" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {file.file.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {Math.round(file.file.size / 1024)}KB
                      </p>
                      {file.status === 'uploading' && (
                        <Progress value={file.progress} className="mt-2" />
                      )}
                      {file.status === 'error' && file.error && (
                        <p className="text-xs text-red-500 mt-1">{file.error}</p>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(index)}
                    disabled={file.status === 'uploading'}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
