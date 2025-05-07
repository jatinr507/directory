import { supabase } from './supabase'

export const uploadProfileImage = async (file, userId) => {
  if (!file || !userId) throw new Error('Missing file or user ID.')

  const fileExt = file.name.split('.').pop() || 'jpg'
  const filePath = `avatars/${userId}.${fileExt}`

  console.log('Uploading:', file.name, '→', filePath)

  const { error: uploadError } = await supabase.storage
    .from('profile-photos')
    .upload(filePath, file, {
      cacheControl: '3600',
    })

  if (uploadError) throw uploadError

  const { data } = supabase.storage
    .from('profile-photos')
    .getPublicUrl(filePath)

  console.log('Public URL:', data.publicUrl)
  return data.publicUrl
}
