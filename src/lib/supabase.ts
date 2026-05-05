import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://kfibrsiarcyjqrsbsvqu.supabase.co"
const supabaseKey = "sb_publishable_s8jLVCkvZ7glc4oGx9DWvw_YAOm_qOV"

export const supabase = createClient(supabaseUrl, supabaseKey)

export const uploadImage = async (file: File) => {
  console.log("Uploading to bucket: products");
  const fileName = `${Date.now()}-${file.name}`

  const { data, error } = await supabase.storage
    .from('products')
    .upload(fileName, file)

  if (error) throw error

  const { data: publicUrl } = supabase.storage
    .from('products')
    .getPublicUrl(fileName)

  return publicUrl.publicUrl
}
