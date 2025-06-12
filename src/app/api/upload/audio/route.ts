import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const files = formData.getAll('audio') as File[]
    const memoficheId = formData.get('memoficheId') as string

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: 'No audio files provided' },
        { status: 400 }
      )
    }

    if (!memoficheId) {
      return NextResponse.json(
        { error: 'Memofiche ID is required' },
        { status: 400 }
      )
    }

    const uploadedFiles = []

    for (const file of files) {
      // Validation du type de fichier
      if (!file.type.startsWith('audio/')) {
        return NextResponse.json(
          { error: `File ${file.name} is not an audio file` },
          { status: 400 }
        )
      }

      // Validation de la taille (max 50MB)
      if (file.size > 50 * 1024 * 1024) {
        return NextResponse.json(
          { error: `File ${file.name} is too large (max 50MB)` },
          { status: 400 }
        )
      }

      // Génération d'un nom de fichier unique
      const fileExtension = file.name.split('.').pop()
      const fileName = `${memoficheId}/${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExtension}`

      // Conversion du fichier en ArrayBuffer
      const arrayBuffer = await file.arrayBuffer()
      const buffer = new Uint8Array(arrayBuffer)

      // Upload vers Supabase Storage
      const { data, error } = await supabase.storage
        .from('audio-files')
        .upload(fileName, buffer, {
          contentType: file.type,
          upsert: false
        })

      if (error) {
        console.error('Supabase storage error:', error)
        return NextResponse.json(
          { error: `Failed to upload ${file.name}`, details: error.message },
          { status: 500 }
        )
      }

      // Obtenir l'URL publique
      const { data: urlData } = supabase.storage
        .from('audio-files')
        .getPublicUrl(fileName)

      uploadedFiles.push({
        name: file.name,
        size: file.size,
        type: file.type,
        url: urlData.publicUrl,
        path: fileName
      })
    }

    return NextResponse.json({
      success: true,
      files: uploadedFiles,
      message: `${uploadedFiles.length} fichier(s) audio uploadé(s) avec succès`
    })

  } catch (error) {
    console.error('Audio upload error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to upload audio files',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const filePath = searchParams.get('path')

    if (!filePath) {
      return NextResponse.json(
        { error: 'File path is required' },
        { status: 400 }
      )
    }

    const { error } = await supabase.storage
      .from('audio-files')
      .remove([filePath])

    if (error) {
      console.error('Supabase storage error:', error)
      return NextResponse.json(
        { error: 'Failed to delete audio file', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Fichier audio supprimé avec succès'
    })

  } catch (error) {
    console.error('Audio delete error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to delete audio file',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
