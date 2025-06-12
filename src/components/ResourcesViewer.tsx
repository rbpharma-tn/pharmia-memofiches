'use client'

import { useState } from 'react'
import { ExternalLink, Play, Volume2, Upload, FileText, Download, Eye } from 'lucide-react'

interface Resource {
  id: string
  title: string
  type: 'image' | 'video' | 'audio' | 'document'
  url: string
  description?: string
  section?: string
}

interface ResourcesViewerProps {
  memofiche: any
}

export default function ResourcesViewer({ memofiche }: ResourcesViewerProps) {
  const [selectedType, setSelectedType] = useState<string>('all')

  // Extraction des ressources depuis la mémofiche
  const extractResources = (): Resource[] => {
    const resources: Resource[] = []

    // Image principale
    if (memofiche.image_url) {
      resources.push({
        id: 'main_image',
        title: 'Image principale',
        type: 'image',
        url: memofiche.image_url,
        description: 'Image principale de la mémofiche',
        section: 'Principal'
      })
    }

    // Vidéo principale
    if (memofiche.youtube_url) {
      resources.push({
        id: 'main_video',
        title: 'Vidéo principale',
        type: 'video',
        url: memofiche.youtube_url,
        description: 'Vidéo explicative principale',
        section: 'Principal'
      })
    }

    // Audio principal
    if (memofiche.audio_url) {
      resources.push({
        id: 'main_audio',
        title: 'Audio principal',
        type: 'audio',
        url: memofiche.audio_url,
        description: 'Fichier audio principal (podcast)',
        section: 'Principal'
      })
    }

    // Ressources des sections
    if (memofiche.content?.memo) {
      memofiche.content.memo.forEach((section: any, index: number) => {
        if (section.image_url) {
          resources.push({
            id: `section_${section.id}_image`,
            title: `Image - ${section.title}`,
            type: 'image',
            url: section.image_url,
            description: `Image pour la section "${section.title}"`,
            section: section.title
          })
        }

        if (section.youtube_url) {
          resources.push({
            id: `section_${section.id}_video`,
            title: `Vidéo - ${section.title}`,
            type: 'video',
            url: section.youtube_url,
            description: `Vidéo pour la section "${section.title}"`,
            section: section.title
          })
        }

        if (section.audio_url) {
          resources.push({
            id: `section_${section.id}_audio`,
            title: `Audio - ${section.title}`,
            type: 'audio',
            url: section.audio_url,
            description: `Audio pour la section "${section.title}"`,
            section: section.title
          })
        }
      })
    }

    // Kahoot
    if (memofiche.kahoot_url) {
      resources.push({
        id: 'kahoot',
        title: 'Quiz Kahoot',
        type: 'document',
        url: memofiche.kahoot_url,
        description: 'Quiz interactif Kahoot',
        section: 'Quiz'
      })
    }

    return resources
  }

  const resources = extractResources()
  const filteredResources = selectedType === 'all' 
    ? resources 
    : resources.filter(r => r.type === selectedType)

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'image': return <Upload className="h-5 w-5" />
      case 'video': return <Play className="h-5 w-5" />
      case 'audio': return <Volume2 className="h-5 w-5" />
      case 'document': return <FileText className="h-5 w-5" />
      default: return <ExternalLink className="h-5 w-5" />
    }
  }

  const getResourceColor = (type: string) => {
    switch (type) {
      case 'image': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'video': return 'bg-red-100 text-red-800 border-red-200'
      case 'audio': return 'bg-green-100 text-green-800 border-green-200'
      case 'document': return 'bg-purple-100 text-purple-800 border-purple-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getResourceTypeLabel = (type: string) => {
    switch (type) {
      case 'image': return 'Image'
      case 'video': return 'Vidéo'
      case 'audio': return 'Audio'
      case 'document': return 'Document'
      default: return 'Ressource'
    }
  }

  const resourceTypes = [
    { id: 'all', label: 'Toutes les ressources', count: resources.length },
    { id: 'image', label: 'Images', count: resources.filter(r => r.type === 'image').length },
    { id: 'video', label: 'Vidéos', count: resources.filter(r => r.type === 'video').length },
    { id: 'audio', label: 'Audio', count: resources.filter(r => r.type === 'audio').length },
    { id: 'document', label: 'Documents', count: resources.filter(r => r.type === 'document').length }
  ]

  const openResource = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const getResourcePreview = (resource: Resource) => {
    if (resource.type === 'video' && resource.url.includes('youtube')) {
      // Extraire l'ID YouTube pour la miniature
      const videoId = resource.url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)?.[1]
      if (videoId) {
        return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`
      }
    }
    return null
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* En-tête */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <ExternalLink className="w-6 h-6 text-gray-700 mr-2" />
          <h2 className="text-2xl font-bold text-gray-900">Ressources</h2>
        </div>
        <p className="text-gray-600">
          Accédez à toutes les ressources multimédia de cette mémofiche
        </p>
      </div>

      {/* Filtres */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {resourceTypes.map(type => (
          <button
            key={type.id}
            onClick={() => setSelectedType(type.id)}
            className={`flex items-center px-4 py-2 rounded-lg border transition-all ${
              selectedType === type.id
                ? 'bg-gray-800 text-white border-gray-800'
                : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
            }`}
          >
            <span>{type.label}</span>
            {type.count > 0 && (
              <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                selectedType === type.id
                  ? 'bg-white text-gray-800'
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {type.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Liste des ressources */}
      {filteredResources.length > 0 ? (
        <div className="grid gap-4">
          {filteredResources.map((resource) => (
            <div
              key={resource.id}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  {/* Miniature pour les vidéos YouTube */}
                  {resource.type === 'video' && getResourcePreview(resource) ? (
                    <div className="w-20 h-15 rounded-lg overflow-hidden border border-gray-200 flex-shrink-0">
                      <img
                        src={getResourcePreview(resource)!}
                        alt={resource.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className={`p-3 rounded-lg border ${getResourceColor(resource.type)} flex-shrink-0`}>
                      {getResourceIcon(resource.type)}
                    </div>
                  )}

                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {resource.title}
                      </h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getResourceColor(resource.type)}`}>
                        {getResourceTypeLabel(resource.type)}
                      </span>
                    </div>

                    {resource.description && (
                      <p className="text-gray-600 mb-2">{resource.description}</p>
                    )}

                    {resource.section && (
                      <div className="text-sm text-gray-500">
                        Section : <span className="font-medium">{resource.section}</span>
                      </div>
                    )}

                    {/* URL tronquée pour information */}
                    <div className="text-xs text-gray-400 mt-1 font-mono">
                      {resource.url.length > 60 ? resource.url.substring(0, 60) + '...' : resource.url}
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2 ml-4">
                  <button
                    onClick={() => openResource(resource.url)}
                    className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Ouvrir
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <ExternalLink className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {selectedType === 'all' ? 'Aucune ressource disponible' : `Aucune ressource de type "${getResourceTypeLabel(selectedType)}"`}
          </h3>
          <p className="text-gray-600">
            {selectedType === 'all' 
              ? 'Cette mémofiche ne contient pas encore de ressources multimédia.'
              : 'Essayez de sélectionner un autre type de ressource.'
            }
          </p>
        </div>
      )}

      {/* Statistiques */}
      {resources.length > 0 && (
        <div className="mt-8 bg-gray-50 rounded-lg p-4">
          <div className="text-center text-sm text-gray-600">
            <span className="font-medium">{filteredResources.length}</span> ressource(s) affichée(s) sur{' '}
            <span className="font-medium">{resources.length}</span> au total
          </div>
        </div>
      )}
    </div>
  )
}
