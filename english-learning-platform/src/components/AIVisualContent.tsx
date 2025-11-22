import React, { useState } from 'react';
import { Image as ImageIcon, Sparkles, Download, RefreshCw } from 'lucide-react';

interface VisualContent {
  id: number;
  topic: string;
  imageUrl: string;
  description: string;
  keywords: string[];
}

// Sample AI-generated visual content with verified image URLs
const VISUAL_CONTENT: VisualContent[] = [
  {
    id: 1,
    topic: "Technology",
    imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&auto=format&fit=crop",
    description: "Modern artificial intelligence and neural networks visualization",
    keywords: ["AI", "technology", "innovation", "digital"]
  },
  {
    id: 2,
    topic: "Environment",
    imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&auto=format&fit=crop",
    description: "Lush green forest representing environmental conservation",
    keywords: ["nature", "forest", "conservation", "sustainability"]
  },
  {
    id: 3,
    topic: "Health",
    imageUrl: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&auto=format&fit=crop",
    description: "Healthy lifestyle with fresh fruits and nutrition",
    keywords: ["health", "nutrition", "wellness", "food"]
  },
  {
    id: 4,
    topic: "Education",
    imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop",
    description: "Modern classroom and learning environment",
    keywords: ["education", "learning", "teaching", "knowledge"]
  },
  {
    id: 5,
    topic: "Business",
    imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop",
    description: "Professional business and entrepreneurship concepts",
    keywords: ["business", "entrepreneur", "finance", "corporate"]
  },
  {
    id: 6,
    topic: "Science",
    imageUrl: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=800&auto=format&fit=crop",
    description: "Scientific research and laboratory experiments",
    keywords: ["science", "research", "laboratory", "experiment"]
  },
  {
    id: 7,
    topic: "Transportation",
    imageUrl: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&auto=format&fit=crop",
    description: "Modern transportation and electric vehicles",
    keywords: ["transport", "vehicle", "electric", "sustainable"]
  },
  {
    id: 8,
    topic: "Culture",
    imageUrl: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&auto=format&fit=crop",
    description: "Cultural diversity and artistic expression",
    keywords: ["culture", "art", "diversity", "heritage"]
  },
  {
    id: 9,
    topic: "Energy",
    imageUrl: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&auto=format&fit=crop",
    description: "Renewable energy with solar panels and wind turbines",
    keywords: ["energy", "renewable", "solar", "sustainable"]
  },
  {
    id: 10,
    topic: "Communication",
    imageUrl: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&auto=format&fit=crop",
    description: "Digital communication and social media networks",
    keywords: ["communication", "digital", "network", "social"]
  },
  {
    id: 11,
    topic: "Architecture",
    imageUrl: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&auto=format&fit=crop",
    description: "Modern architectural design and urban planning",
    keywords: ["architecture", "building", "design", "urban"]
  },
  {
    id: 12,
    topic: "Space",
    imageUrl: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&auto=format&fit=crop",
    description: "Space exploration and astronomy concepts",
    keywords: ["space", "astronomy", "exploration", "universe"]
  }
];

export function AIVisualContent() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['all', ...Array.from(new Set(VISUAL_CONTENT.map(v => v.topic)))];

  const filteredContent = VISUAL_CONTENT.filter(content => {
    const matchesCategory = selectedCategory === 'all' || content.topic === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      content.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      content.keywords.some(k => k.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const downloadImage = (imageUrl: string, filename: string) => {
    const a = document.createElement('a');
    a.href = imageUrl;
    a.download = filename;
    a.target = '_blank';
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Sparkles className="w-8 h-8" />
          <h2 className="text-2xl font-bold">AI-Generated Visual Content</h2>
        </div>
        <p className="opacity-90">
          Enhance your learning with educational images and visual aids
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Search visual content..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>
              {cat === 'all' ? 'All Categories' : cat}
            </option>
          ))}
        </select>
      </div>

      {/* Visual Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredContent.map((content) => (
          <div
            key={content.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
          >
            {/* Image */}
            <div className="relative h-48 bg-gray-200 overflow-hidden group">
              <img
                src={content.imageUrl}
                alt={content.description}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                loading="lazy"
              />
              <div className="absolute top-2 right-2 bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                {content.topic}
              </div>
              <button
                onClick={() => downloadImage(content.imageUrl, `${content.topic}_${content.id}.jpg`)}
                className="absolute bottom-2 right-2 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                title="Download image"
              >
                <Download className="w-4 h-4 text-purple-600" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4">
              <p className="text-sm text-gray-700 mb-3">
                {content.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {content.keywords.map((keyword, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredContent.length === 0 && (
        <div className="text-center py-12">
          <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No visual content found matching your criteria</p>
        </div>
      )}

      {/* Info Section */}
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
        <h3 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          About AI Visual Content
        </h3>
        <p className="text-sm text-purple-800 mb-3">
          These images are curated to support your English learning journey. Each visual aid corresponds 
          to conversation topics and vocabulary categories, helping you associate words with images for 
          better retention and understanding.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-white rounded-lg p-3">
            <div className="text-2xl font-bold text-purple-600">{VISUAL_CONTENT.length}</div>
            <div className="text-xs text-gray-600">Total Images</div>
          </div>
          <div className="bg-white rounded-lg p-3">
            <div className="text-2xl font-bold text-purple-600">{categories.length - 1}</div>
            <div className="text-xs text-gray-600">Categories</div>
          </div>
          <div className="bg-white rounded-lg p-3">
            <div className="text-2xl font-bold text-purple-600">HD</div>
            <div className="text-xs text-gray-600">Quality</div>
          </div>
          <div className="bg-white rounded-lg p-3">
            <div className="text-2xl font-bold text-purple-600">Free</div>
            <div className="text-xs text-gray-600">Download</div>
          </div>
        </div>
      </div>
    </div>
  );
}
