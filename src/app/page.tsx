'use client'

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// Lazy loading des composants lourds
const ThemeCarousel = dynamic(() => import('@/components/ThemeCarousel'), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse rounded-lg"></div>
});

const LearningPath = dynamic(() => import('@/components/LearningPath'), {
  loading: () => <div className="h-32 bg-gray-100 animate-pulse rounded-lg"></div>
});

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <h1 className="text-xl font-semibold text-gray-900">
                PharmIA
              </h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-900 font-medium">
                Accueil
              </Link>
              <Link href="/memofiches" className="text-gray-500 hover:text-gray-900 transition-colors">
                Mémofiches
              </Link>
              <Link href="/auth/signin" className="text-gray-500 hover:text-gray-900 transition-colors">
                Connexion
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            Mémofiches conseil à l'officine
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Micro-apprentissage adaptatif et personnalisé du personnel de la pharmacie à travers des cas comptoir 100% pratiques
          </p>
        </div>

        {/* Carrousel des Thèmes */}
        <ThemeCarousel />

        {/* Parcours d'Apprentissage */}
        <LearningPath />

        {/* Call to Action */}
        <div className="border border-gray-100 rounded-lg p-12 text-center">
          <h3 className="text-3xl font-semibold text-gray-900 mb-6">
            Prêt à commencer votre formation ?
          </h3>
          <p className="text-gray-600 mb-8 text-lg leading-relaxed max-w-xl mx-auto">
            Découvrez nos mémofiches interactives et commencez à approfondir vos connaissances dès maintenant.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/memofiches"
              className="inline-flex items-center justify-center space-x-2 bg-gray-900 hover:bg-gray-700 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200"
            >
              <span>Voir les mémofiches</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/auth/signup"
              className="inline-flex items-center justify-center space-x-2 border border-gray-200 text-gray-900 hover:bg-gray-50 font-medium py-3 px-8 rounded-lg transition-colors duration-200"
            >
              <span>Créer un compte</span>
            </Link>
          </div>


        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-500 text-sm">
            © 2025 Pharmia - Mémofiches Cas Comptoir à l'Officine
          </p>
        </div>
      </footer>
    </div>
  );
}
