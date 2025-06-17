import { useState, useEffect } from "react";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Code2, FileCode, Github, Linkedin, Mail, Presentation, ChevronLeft, ChevronRight, Shield, Clock, Users, BarChart3, CheckCircle, Zap, TrendingUp, Calendar, Phone, DownloadIcon, AlertCircle, ChevronDown } from "lucide-react";
import { Progress } from "./components/ui/progress";
import { Switch } from "./components/ui/switch";
import { Alert, AlertDescription, AlertTitle } from "./components/ui/alert";
import { Badge } from "./components/ui/badge";
import { CodeExecutionSlide } from "./components/CodeExecutionSlide";
import InstallationSlide from "./components/InstallationSlide";
import Papa from "papaparse";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./components/ui/dialog";

// Définir le chemin de base dynamique pour les assets (au tout début du fichier)
const base = import.meta.env.BASE_URL;

function App() {
  const [activeTab, setActiveTab] = useState("presentation");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [brandVerification, setBrandVerification] = useState(false);
  const [brandAnalysis, setBrandAnalysis] = useState(false);
  const [multiprocessing, setMultiprocessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<any>(null);
  const [isPromptExpanded, setIsPromptExpanded] = useState(false);
  const [avgScore, setAvgScore] = useState<string | null>(null);

  const slides = [
    // Slide 1 - Page de titre
    {
      title: "Système de Vérification de Marques",
      description: "Solution IA pour l'optimisation du portefeuille de marques Carrefour",
      content: (
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center">
              <Shield className="w-10 h-10 text-white" />
            </div>
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-gray-900">
              Système de Vérification de Marques
            </h1>
            <p className="text-xl text-gray-600">
              Solution IA pour l'optimisation du portefeuille de marques Carrefour
            </p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8">
            <div className="text-center">
              <div className="text-2xl font-semibold text-blue-600 mb-2">{avgScore ? `${avgScore}%` : '...'}</div>
              <p className="text-gray-600">Précision</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold text-blue-600 mb-2">285</div>
              <p className="text-gray-600">Marques vérifiées</p>
            </div>
          </div>
        </div>
      ),
      background: "bg-white"
    },

    // Slide 2 - Notre Solution
    {
      title: "Notre Solution",
      description: "Architecture technique et fonctionnalités",
      content: (
        <div className="space-y-8">
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Vérification Automatisée</h3>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Analyse multi-critères</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Détection des doublons</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Validation des droits</span>
                </li>
              </ul>
            </div>

            <Card className="bg-white shadow-lg border-green-200">
              <CardHeader>
                <CardTitle className="text-green-700 text-center">
                  <BarChart3 className="w-12 h-12 mx-auto mb-4 text-green-600" />
                  Brand Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm mb-2">
                  🔧 EN DÉVELOPPEMENT
                </div>
                <p className="text-gray-900">Analyse des relations et synergies</p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg border-purple-200">
              <CardHeader>
                <CardTitle className="text-purple-700 text-center">
                  <Zap className="w-12 h-12 mx-auto mb-4 text-purple-600" />
                  Multiprocessing
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm mb-2">
                  🔧 EN DÉVELOPPEMENT
                </div>
                <p className="text-gray-900">Optimisation grands volumes</p>
              </CardContent>
            </Card>
          </div>
        </div>
      ),
      background: "bg-gradient-to-br from-green-50 to-emerald-100"
    },

    // Slide 3 - Module Brand Verification
    {
      title: "Module Brand Verification",
      description: "Fonctionnalités et architecture technique",
      content: (
        <div className="space-y-8">
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Fonctionnalités Principales</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Analyse Sémantique</p>
                      <p className="text-sm text-gray-600">Évaluation de la similarité phonétique et visuelle des marques</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Détection des Doublons</p>
                      <p className="text-sm text-gray-600">Identification des marques similaires via analyse de similarité cosinus</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Analyse de Conformité</p>
                      <p className="text-sm text-gray-600">Vérification des critères d'enregistrement INPI (distinctivité, disponibilité)</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="w-full">
                      <button 
                        onClick={() => setIsPromptExpanded(!isPromptExpanded)}
                        className="w-full text-left"
                      >
                        <p className="font-medium text-gray-900 flex items-center justify-between">
                          Prompt Engineering Avancé
                          <ChevronDown className={`w-4 h-4 transition-transform ${isPromptExpanded ? 'rotate-180' : ''}`} />
                        </p>
                      </button>
                      {isPromptExpanded && (
                        <div className="text-sm text-gray-600 space-y-1 mt-2">
                          <p>• Analyse contextuelle multi-dimensionnelle :</p>
                          <div className="ml-4 space-y-1">
                            <p>- Catégorie de produit et sous-catégorie</p>
                            <p>- Unité d'affaires et contexte métier</p>
                            <p>- Historique des relations et changements récents</p>
                          </div>
                          <p>• Vérification structurée de la propriété :</p>
                          <div className="ml-4 space-y-1">
                            <p>- Propriété directe et indirecte</p>
                            <p>- Chaîne de propriété complète</p>
                            <p>- Droits de distribution et licences</p>
                          </div>
                          <p>• Sources de confiance :</p>
                          <div className="ml-4 space-y-1">
                            <p>- Sites officiels des entreprises</p>
                            <p>- Registres de marques (INPI, EUIPO)</p>
                            <p>- Rapports annuels et communiqués</p>
                          </div>
                          <p>• Système de scoring :</p>
                          <div className="ml-4 space-y-1">
                            <p>- Évaluation de la qualité des sources</p>
                            <p>- Vérification de la récence des informations</p>
                            <p>- Validation de la chaîne de propriété</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Architecture Technique</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Zap className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Traitement Parallèle</p>
                      <p className="text-sm text-gray-600">Multiprocessing pour l'analyse simultanée de multiples marques</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Zap className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">API de Vérification</p>
                      <p className="text-sm text-gray-600">Endpoints pour l'analyse de marques et la récupération des résultats</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Zap className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Stockage Optimisé</p>
                      <p className="text-sm text-gray-600">Base de données pour l'historique des vérifications et les résultats</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ),
      background: "bg-gradient-to-br from-blue-50 to-cyan-100"
    },

    // Slide 3.5 - Guide d'Installation
    {
      title: "Guide d'Installation",
      description: "Installation et configuration de la solution",
      content: (
        <InstallationSlide
          steps={[
            {
              step: "Prérequis",
              description: "Python 3.8+, Docker (recommandé pour Perplexica), Ollama (pour les modèles locaux)",
              screenshots: []
            },
            {
              step: "Installation de Docker",
              description: "Télécharger et installer Docker Desktop depuis docker.com",
              screenshots: [
                {
                  image: "installation/docker_download.png",
                  caption: "Page de téléchargement de Docker Desktop"
                },
                {
                  image: "installation/docker_verify.png",
                  caption: "Docker Desktop en cours d'exécution"
                }
              ]
            },
            {
              step: "Configuration de Perplexica",
              description: "Installation et configuration de Perplexica pour l'analyse sémantique",
              screenshots: [
                {
                  image: "installation/perplexica_clone.png",
                  caption: "Clonage du dépôt Perplexica"
                },
                {
                  image: "installation/perplexica_config.png",
                  caption: "Configuration du fichier config.toml"
                },
                {
                  image: "installation/perplexica_verify.png",
                  caption: "Interface de Perplexica"
                }
              ]
            },
            {
              step: "Installation du Projet",
              description: "Clonage du projet et installation des dépendances",
              screenshots: [
                {
                  image: "installation/project_setup.png",
                  caption: "Clonage du dépôt et installation des dépendances"
                }
              ]
            },
            {
              step: "Lancement de la Vérification",
              description: "Exécution du script de vérification des marques",
              screenshots: [
                {
                  image: "installation/brand_verification.png",
                  caption: "Lancement de la vérification standard"
                }
              ]
            }
          ]}
        />
      ),
      background: "bg-gradient-to-br from-blue-50 to-indigo-100"
    },

    // Slide 4 - Analyse des Coûts
    {
      title: "Analyse des Coûts",
      description: "Optimisation des ressources",
      content: (
        <div className="space-y-8">
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Coûts par Vérification</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <AlertCircle className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Coût API GPT-4</p>
                      <p className="text-sm text-gray-600">0,028€ par marque vérifiée</p>
                      <p className="text-xs text-gray-500">Basé sur ~1000 tokens à 0.03$/1K tokens</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <AlertCircle className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Coût Infrastructure</p>
                      <p className="text-sm text-gray-600">0,02€ par marque</p>
                      <p className="text-xs text-gray-500">Serveurs et stockage des résultats</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Économies Réalisées</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Coût Manuel</p>
                      <p className="text-sm text-gray-600">30-45€ par marque</p>
                      <p className="text-xs text-gray-500">Basé sur 1h de travail à 30-45€/h</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Économie Totale</p>
                      <p className="text-sm text-gray-600">29,95-44,95€ par marque</p>
                      <p className="text-xs text-gray-500">Réduction de 99,9% des coûts</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Exemple de ROI Mensuel</h3>
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-semibold text-blue-600 mb-2">285</div>
                <p className="text-gray-600">Marques vérifiées</p>
                <p className="text-xs text-gray-500">Volume mensuel moyen</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-semibold text-green-600 mb-2">8.535€</div>
                <p className="text-gray-600">Économies mensuelles</p>
                <p className="text-xs text-gray-500">(29,95€ × 285 marques)</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-semibold text-purple-600 mb-2">13,67€</div>
                <p className="text-gray-600">Coût mensuel système</p>
                <p className="text-xs text-gray-500">(0,048€ × 285 marques)</p>
              </div>
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">ROI Annuel : 102.420€ d'économies pour 164€ de coûts</p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Prévisions par Palier de Volume</h3>
            <div className="grid grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-xl font-semibold text-blue-600">500</div>
                <p className="text-sm text-gray-600">marques/mois</p>
                <p className="text-xs text-gray-500">(6.000/an)</p>
                <p className="text-sm font-medium text-gray-900 mt-2">24€/mois</p>
                <p className="text-xs text-gray-500">(288€/an)</p>
              </div>
              <div>
                <div className="text-xl font-semibold text-blue-600">1.000</div>
                <p className="text-sm text-gray-600">marques/mois</p>
                <p className="text-xs text-gray-500">(12.000/an)</p>
                <p className="text-sm font-medium text-gray-900 mt-2">48€/mois</p>
                <p className="text-xs text-gray-500">(576€/an)</p>
              </div>
              <div>
                <div className="text-xl font-semibold text-blue-600">5.000</div>
                <p className="text-sm text-gray-600">marques/mois</p>
                <p className="text-xs text-gray-500">(60.000/an)</p>
                <p className="text-sm font-medium text-gray-900 mt-2">240€/mois</p>
                <p className="text-xs text-gray-500">(2.880€/an)</p>
              </div>
              <div>
                <div className="text-xl font-semibold text-blue-600">10.000</div>
                <p className="text-sm text-gray-600">marques/mois</p>
                <p className="text-xs text-gray-500">(120.000/an)</p>
                <p className="text-sm font-medium text-gray-900 mt-2">480€/mois</p>
                <p className="text-xs text-gray-500">(5.760€/an)</p>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Coûts des APIs Intégrables</h3>
            <div className="grid grid-cols-3 gap-6">
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900">GPT-3.5 Turbo</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 0,002$ par 1K tokens</li>
                  <li>• ~1000 tokens par requête</li>
                  <li>• Coût par requête : ~0,002$</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900">Claude Instant</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 0,001$ par 1K tokens</li>
                  <li>• ~1000 tokens par requête</li>
                  <li>• Coût par requête : ~0,001$</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900">Mistral AI</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Modèle open source</li>
                  <li>• Coût par requête : 0$</li>
                  <li>• Coût infrastructure uniquement</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">Ces APIs peuvent être intégrées directement dans le modèle existant</p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Solution Actuelle</h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900">Perplexica</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Version gratuite utilisée</li>
                  <li>• Intégration API possible</li>
                  <li>• Flexible et évolutive</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900">Avantages</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Coût maîtrisé</li>
                  <li>• Possibilité d'hybridation</li>
                  <li>• Adaptable aux besoins</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Coûts Perplexity</h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900">Version Gratuite</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 5 requêtes gratuites par jour</li>
                  <li>• Limité en production</li>
                  <li>• Idéal pour tests</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900">Version Pro (Sonar)</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Input Tokens : 3$ par million</li>
                  <li>• Output Tokens : 15$ par million</li>
                  <li>• Prix par 1000 requêtes :</li>
                  <li>  - Metric : 14$</li>
                  <li>  - High : 10$</li>
                  <li>  - Medium : 6$</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">Notre solution actuelle permet d'éviter ces coûts élevés par requête</p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Comparaison des Coûts Mensuels</h3>
            <div className="grid grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-xl font-semibold text-blue-600">285</div>
                <p className="text-sm text-gray-600">marques/mois</p>
                <div className="mt-2 space-y-1">
                  <p className="text-sm font-medium text-gray-900">Notre Solution</p>
                  <p className="text-xs text-gray-600">13,67€</p>
                  <p className="text-sm font-medium text-gray-900 mt-2">Perplexity</p>
                  <p className="text-xs text-gray-600">399€</p>
                  <p className="text-xs text-green-600">Économie : 385,33€</p>
                </div>
              </div>
              <div>
                <div className="text-xl font-semibold text-blue-600">500</div>
                <p className="text-sm text-gray-600">marques/mois</p>
                <div className="mt-2 space-y-1">
                  <p className="text-sm font-medium text-gray-900">Notre Solution</p>
                  <p className="text-xs text-gray-600">24€</p>
                  <p className="text-sm font-medium text-gray-900 mt-2">Perplexity</p>
                  <p className="text-xs text-gray-600">700€</p>
                  <p className="text-xs text-green-600">Économie : 676€</p>
                </div>
              </div>
              <div>
                <div className="text-xl font-semibold text-blue-600">1.000</div>
                <p className="text-sm text-gray-600">marques/mois</p>
                <div className="mt-2 space-y-1">
                  <p className="text-sm font-medium text-gray-900">Notre Solution</p>
                  <p className="text-xs text-gray-600">48€</p>
                  <p className="text-sm font-medium text-gray-900 mt-2">Perplexity</p>
                  <p className="text-xs text-gray-600">1.400€</p>
                  <p className="text-xs text-green-600">Économie : 1.352€</p>
                </div>
              </div>
              <div>
                <div className="text-xl font-semibold text-blue-600">5.000</div>
                <p className="text-sm text-gray-600">marques/mois</p>
                <div className="mt-2 space-y-1">
                  <p className="text-sm font-medium text-gray-900">Notre Solution</p>
                  <p className="text-xs text-gray-600">240€</p>
                  <p className="text-sm font-medium text-gray-900 mt-2">Perplexity</p>
                  <p className="text-xs text-gray-600">7.000€</p>
                  <p className="text-xs text-green-600">Économie : 6.760€</p>
                </div>
              </div>
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">Calcul basé sur le tarif Medium de Perplexity (6$ pour 1000 requêtes)</p>
            </div>
          </div>
        </div>
      ),
      background: "bg-gradient-to-br from-purple-50 to-indigo-100"
    },

    // Slide 5 - Roadmap Produit
    {
      title: "Roadmap Produit : Améliorations Futures",
      description: "Vision d'évolution et axes stratégiques",
      content: (
        <RoadmapWithDiagrams />
      ),
      background: "bg-gradient-to-br from-blue-50 to-cyan-100"
    },

    // Slide Installation (nouvelle slide)
    {
      title: "Guide d'Installation",
      description: "Installation et configuration de la solution",
      content: (
        <InstallationSlide
          screenshots={[
            {
              step: "Installation de Docker",
              description: "Installer Docker Desktop sur votre machine. Docker est nécessaire pour exécuter Perplexity et d'autres services requis.",
              image: "installation/docker_install.png"
            },
            {
              step: "Configuration de Perplexity",
              description: "Installer et configurer Perplexity pour l'analyse sémantique des marques.",
              image: "installation/perplexity_setup.png"
            },
            {
              step: "Installation des dépendances Python",
              description: "Installer les dépendances Python requises via pip install -r requirements.txt",
              image: "installation/python_deps.png"
            },
            {
              step: "Configuration de l'environnement",
              description: "Configurer les variables d'environnement et les clés API nécessaires.",
              image: "installation/env_setup.png"
            }
          ]}
        />
      ),
      background: "bg-gradient-to-br from-blue-50 to-indigo-100"
    }
  ];

  const handlePreviousSlide = () => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : slides.length - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev < slides.length - 1 ? prev + 1 : 0));
  };

  const executeCode = async (type: string) => {
    setProgress(0);
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 100));
      setProgress(i);
    }
    setResults({
      type,
      insights: [
        {
          title: "Marques Vérifiées",
          value: "285/285",
          status: "success"
        },
        {
          title: "Score Moyen de Confiance",
          value: "88.4%",
          status: "success"
        },
        {
          title: "Marques à Vérifier Manuellement",
          value: "57",
          status: "warning"
        }
      ]
    });
  };

  useEffect(() => {
    fetch(base + "brand_verification_results-1.csv")
      .then((res) => res.text())
      .then((text) => {
        const parsed = Papa.parse(text, { header: true });
        const data = parsed.data.filter((row: any) => row["Brand Name"]);
        const total = data.length;
        const avg = (
          data.reduce((acc, row) => acc + (parseFloat(row["Score_Confiance"]) || 0), 0) / total
        ).toFixed(1);
        setAvgScore(avg);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-2">
            <Code2 className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Carrefour Brand Verification System</h1>
          </div>
          <div className="flex space-x-4">
            <Button variant="outline" size="icon" asChild>
              <a href="https://github.com/valleg12/Carrefour-Project" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="outline" size="icon" asChild>
              <a href="https://www.linkedin.com/in/victorien-alleg-2b2b2b2b2/" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="outline" size="icon" asChild>
              <a href="mailto:victorien.alleg@example.com">
                <Mail className="h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="presentation" className="flex items-center space-x-2">
              <Presentation className="h-4 w-4" />
              <span>Présentation</span>
            </TabsTrigger>
            <TabsTrigger value="code" className="flex items-center space-x-2">
              <FileCode className="h-4 w-4" />
              <span>Code</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="presentation" className="space-y-4">
            <div className="relative">
              <div className={slides[currentSlide].background}>
                <Card className="bg-transparent border-none shadow-none">
                  <CardHeader>
                    <CardTitle className="text-4xl font-bold text-center mb-4">{slides[currentSlide].title}</CardTitle>
                    <CardDescription className="text-xl text-center">{slides[currentSlide].description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {slides[currentSlide].content}
                  </CardContent>
                </Card>
              </div>
              
              <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handlePreviousSlide}
                  className="bg-white/80 hover:bg-white"
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleNextSlide}
                  className="bg-white/80 hover:bg-white"
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </div>
              
              <div className="flex justify-center mt-4 space-x-2">
                {slides.map((_, index) => (
                  <Button
                    key={index}
                    variant={index === currentSlide ? "default" : "outline"}
                    size="icon"
                    className="w-2 h-2 p-0"
                    onClick={() => setCurrentSlide(index)}
                  />
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="code" className="space-y-4">
            <CsvResultsViewer />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function CsvResultsViewer() {
  const [data, setData] = useState<any[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalContent, setModalContent] = useState<string | null>(null);

  useEffect(() => {
    fetch(base + "brand_verification_results-1.csv")
      .then((res) => res.text())
      .then((text) => {
        const parsed = Papa.parse(text, { header: true });
        setData(parsed.data.filter((row: any) => row["Brand Name"]));
        setColumns(parsed.meta.fields || []);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center py-12">Chargement des résultats...</div>;
  }

  // Résumé
  const total = data.length;
  const success = data.filter((row) => row["Statut_Vérification"] === "Succès").length;
  const toCheck = data.filter((row) => row["À_Vérifier"] === "True").length;
  const avgScore = (
    data.reduce((acc, row) => acc + (parseFloat(row["Score_Confiance"]) || 0), 0) / total
  ).toFixed(1);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/80 rounded-lg p-6 shadow text-center">
          <div className="text-2xl font-bold">{total}</div>
          <div className="text-gray-600">Marques analysées</div>
        </div>
        <div className="bg-green-100 rounded-lg p-6 shadow text-center">
          <div className="text-2xl font-bold">{success}</div>
          <div className="text-gray-600">Vérifications réussies</div>
        </div>
        <div className="bg-yellow-100 rounded-lg p-6 shadow text-center">
          <div className="text-2xl font-bold">{toCheck}</div>
          <div className="text-gray-600">À vérifier manuellement</div>
        </div>
        <div className="bg-blue-100 rounded-lg p-6 shadow text-center">
          <div className="text-2xl font-bold">{avgScore}%</div>
          <div className="text-gray-600">Score de confiance moyen</div>
        </div>
      </div>
      <Dialog open={!!modalContent} onOpenChange={() => setModalContent(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Contenu complet</DialogTitle>
          </DialogHeader>
          <div className="whitespace-pre-wrap break-words text-sm text-gray-900">
            {modalContent}
          </div>
        </DialogContent>
      </Dialog>
      <div className="overflow-x-auto rounded-lg shadow border bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              {columns.map((col) => (
                <th key={col} className="px-3 py-2 text-left font-semibold text-gray-700 whitespace-nowrap">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                {columns.map((col) => {
                  const value = row[col];
                  const isLong = value && value.length > 40;
                  return (
                    <td key={col} className="px-3 py-2 whitespace-nowrap max-w-xs truncate cursor-pointer hover:bg-blue-50" title={value}
                      onClick={() => isLong && setModalContent(value)}
                      style={isLong ? { color: '#2563eb', textDecoration: 'underline dotted' } : {}}>
                      {value}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function RoadmapWithDiagrams() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <div className="space-y-8">
      <div className="max-w-3xl mx-auto">
        <h3 className="text-2xl font-bold mb-4 text-center text-gray-900">Prochaines évolutions majeures</h3>
        <ul className="space-y-6">
          <li className="flex items-start gap-4">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mt-1">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">Brand Analysis (Analyse de Marques)</p>
              <p className="text-gray-700 text-sm">Module d'analyse avancée : relations entre marques, détection de sous-marques, synergies, identification des manques. Génération de rapports stratégiques pour la direction.</p>
            </div>
          </li>
          <li className="flex items-start gap-4">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mt-1">
              <Zap className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">Multiprocessing & Asynchrone</p>
              <p className="text-gray-700 text-sm">Optimisation de la performance pour traiter de très grands volumes en parallèle. Scalabilité et réduction du temps de traitement pour l'industrialisation.</p>
            </div>
          </li>
          <li className="flex items-start gap-4">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mt-1">
              <Shield className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">Automatisation complète (Make/N8n)</p>
              <div className="text-gray-700 text-sm">
                <ul className="list-disc list-inside space-y-1">
                  <li>Lancement hebdomadaire automatique du code sur un CSV (Notion, Sheets, etc.)</li>
                  <li>Génération d'un rapport et notification par mail à la fin de l'exécution</li>
                  <li>Envoi des insights uniquement en cas de changement détecté</li>
                  <li>Le code met à jour le même CSV de base à chaque exécution</li>
                  <li>Scénario orchestré via Make ou N8n (voir schémas ci-dessous)</li>
                </ul>
                <div className="mt-4 flex flex-col md:flex-row gap-6 justify-center items-center">
                  <div className="flex flex-col items-center">
                    <img src={base + "n8n_scenario.png"} alt="Schéma d'automatisation n8n" className="max-w-xs rounded shadow border cursor-pointer hover:scale-105 transition-transform" onClick={() => setOpen('n8n')} />
                    <span className="mt-2 text-xs text-gray-500">Scénario n8n</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <img src={base + "make_scenario.png"} alt="Schéma d'automatisation Make" className="max-w-xs rounded shadow border cursor-pointer hover:scale-105 transition-transform" onClick={() => setOpen('make')} />
                    <span className="mt-2 text-xs text-gray-500">Scénario Make</span>
                  </div>
                </div>
                <Dialog open={!!open} onOpenChange={() => setOpen(null)}>
                  <DialogContent className="max-w-[90vw] max-h-[90vh] flex flex-col items-center p-0">
                    <DialogHeader className="p-6 pb-2">
                      <DialogTitle>Schéma d'automatisation {open === 'n8n' ? 'n8n' : 'Make'}</DialogTitle>
                    </DialogHeader>
                    <div className="overflow-auto p-6 pt-2 w-full">
                      <img
                        src={open === 'n8n' ? base + 'n8n_scenario.png' : base + 'make_scenario.png'}
                        alt={`Schéma d'automatisation ${open === 'n8n' ? 'n8n' : 'Make'}`}
                        className="w-full h-auto rounded shadow-lg border-2 border-gray-200"
                        style={{ minWidth: '1200px' }}
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div className="flex justify-center mt-8">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full">
          <h4 className="text-lg font-semibold text-center mb-4 text-gray-900">Articulation des modules</h4>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mb-2">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <div className="font-semibold text-green-700">Brand Verification</div>
              <div className="text-xs text-gray-500 text-center">(Déjà opérationnel)</div>
            </div>
            <div className="h-1 w-8 bg-gray-300 md:w-16 md:h-1 md:my-0 my-2"></div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mb-2">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <div className="font-semibold text-blue-700">Brand Analysis</div>
              <div className="text-xs text-gray-500 text-center">(Futur module)</div>
            </div>
            <div className="h-1 w-8 bg-gray-300 md:w-16 md:h-1 md:my-0 my-2"></div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mb-2">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div className="font-semibold text-green-700">Multiprocessing</div>
              <div className="text-xs text-gray-500 text-center">(Optimisation future)</div>
            </div>
          </div>
          <div className="mt-4 text-center text-sm text-gray-700">
            La vérification de marques constitue la base ; l'analyse avancée et l'optimisation des performances sont les prochaines étapes.
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
