import { useState } from 'react'
import { storage, db } from '@/lib/supabase'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Camera, Upload } from 'lucide-react'

interface ProfileImageUploadProps {
  currentAvatarUrl?: string
  onUploadComplete?: (url: string) => void
}

export default function ProfileImageUpload({ 
  currentAvatarUrl, 
  onUploadComplete 
}: ProfileImageUploadProps) {
  const { user } = useAuth()
  const [uploading, setUploading] = useState(false)

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      if (!user) {
        throw new Error('User not authenticated')
      }

      const file = event.target.files[0]

      // Validate file type
      if (!file.type.startsWith('image/')) {
        throw new Error('Please select an image file.')
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        throw new Error('File size must be less than 5MB.')
      }

      // Upload to Supabase Storage
      const avatarUrl = await storage.uploadAvatar(user.id, file)

      // Update user profile with new avatar URL
      await db.profiles.update(user.id, { avatar_url: avatarUrl })

      onUploadComplete?.(avatarUrl)
    } catch (error) {
      console.error('Error uploading avatar:', error)
      alert(error instanceof Error ? error.message : 'Error uploading image')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="relative">
      {currentAvatarUrl ? (
        <img
          src={currentAvatarUrl}
          alt="Avatar"
          className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover"
        />
      ) : (
        <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center text-white text-2xl md:text-4xl font-bold">
          {user?.email?.charAt(0).toUpperCase()}
        </div>
      )}
      
      <label htmlFor="avatar-upload" className="absolute -bottom-2 -right-2 cursor-pointer">
        <Button
          size="sm"
          className="w-8 h-8 rounded-full p-0"
          disabled={uploading}
          asChild
        >
          <span>
            {uploading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
            ) : (
              <Camera className="h-4 w-4" />
            )}
          </span>
        </Button>
      </label>
      
      <input
        id="avatar-upload"
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        disabled={uploading}
        className="hidden"
      />
    </div>
  )
}