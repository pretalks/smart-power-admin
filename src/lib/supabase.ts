import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://kfibrsiarcyjqrsbsvqu.supabase.co"
const supabaseKey = "sb_publishable_s8jLVCkvZ7glc4oGx9DWvw_YAOm_qOV"

export const supabase = createClient(supabaseUrl, supabaseKey)

export const uploadImage = async (file: File) => {
  const fileName = `${Date.now()}-${file.name}`

  const { error } = await supabase.storage
    .from('images')
    .upload(fileName, file)

  if (error) throw error

  const { data } = supabase.storage
    .from('images')
    .getPublicUrl(fileName)

  return data.publicUrl
}
