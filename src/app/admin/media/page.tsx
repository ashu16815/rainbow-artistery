'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Upload, 
  Search, 
  Copy, 
  Trash2, 
  Download,
  Image as ImageIcon,
  Video
} from 'lucide-react'
import { toast } from 'sonner'
import { MediaUploader } from '@/components/admin/media-uploader'

interface MediaFile {
  name: string
  id: string
  updated_at: string
  created_at: string
  last_accessed_at: string
  metadata: {
    eTag: string
    size: number
    mimetype: string
    cacheControl: string
    lastModified: string
    contentLength: number
    httpStatusCode: number
  }
  publicUrl: string
}

export default function MediaPage() {
  const [files, setFiles] = useState<MediaFile[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [uploading, setUploading] = useState(false)

  const fetchFiles = async () => {
    try {
      const params = new URLSearchParams()
      if (search) params.append('search', search)
      
      const response = await fetch(`/api/admin/media?${params}`)
      if (!response.ok) throw new Error('Failed to fetch files')
      
      const data = await response.json()
      setFiles(data.files)
    } catch (error) {
      toast.error('Failed to fetch files')
      console.error('Fetch error:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchFiles()
  }, [search])

  const handleUpload = async (url: string, path: string) => {
    setUploading(true)
    try {
      // Upload is handled by MediaUploader component
      await fetchFiles() // Refresh the list
      toast.success('File uploaded successfully')
    } catch (error) {
      toast.error('Failed to upload file')
      console.error('Upload error:', error)
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (file: MediaFile) => {
    if (!confirm(`Are you sure you want to delete "${file.name}"?`)) return
    
    try {
      const response = await fetch(`/api/admin/media?key=${file.name}`, {
        method: 'DELETE',
      })
      
      if (!response.ok) throw new Error('Failed to delete file')
      
      await fetchFiles()
      toast.success('File deleted successfully')
    } catch (error) {
      toast.error('Failed to delete file')
      console.error('Delete error:', error)
    }
  }

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url)
    toast.success('URL copied to clipboard')
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const isImage = (mimetype: string) => mimetype.startsWith('image/')
  const isVideo = (mimetype: string) => mimetype.startsWith('video/')

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Media Library</h1>
      </div>

      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle>Upload Files</CardTitle>
        </CardHeader>
        <CardContent>
          <MediaUploader
            onUpload={handleUpload}
            maxFiles={10}
            acceptedTypes={['image/*', 'video/mp4']}
            maxSize={8 * 1024 * 1024} // 8MB
          />
        </CardContent>
      </Card>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex space-x-4">
            <div className="flex-1">
              <Input
                placeholder="Search files..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="max-w-sm"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Files Grid */}
      <Card>
        <CardHeader>
          <CardTitle>Files ({files.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Loading...</div>
          ) : files.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No files found
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {files.map((file) => (
                <Card key={file.id} className="overflow-hidden">
                  <div className="aspect-square relative bg-muted">
                    {isImage(file.metadata.mimetype) ? (
                      <img
                        src={file.publicUrl}
                        alt={file.name}
                        className="w-full h-full object-cover"
                      />
                    ) : isVideo(file.metadata.mimetype) ? (
                      <div className="w-full h-full flex items-center justify-center">
                        <Video className="w-12 h-12 text-muted-foreground" />
                      </div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon className="w-12 h-12 text-muted-foreground" />
                      </div>
                    )}
                    <div className="absolute top-2 right-2">
                      <Badge variant="secondary" className="text-xs">
                        {file.metadata.mimetype.split('/')[0]}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-3">
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm truncate" title={file.name}>
                        {file.name}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(file.metadata.size)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(file.created_at).toLocaleDateString()}
                      </p>
                      <div className="flex space-x-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copyUrl(file.publicUrl)}
                          className="flex-1"
                        >
                          <Copy className="w-3 h-3 mr-1" />
                          Copy URL
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(file)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
