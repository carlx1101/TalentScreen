import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function UsecaseSection() {  
  const [activeCategory, setActiveCategory] = useState("All");
  
  const categories = [
    { name: "All" },
    { name: "Featured" },
    { name: "Research" },
    { name: "Life" },
    { name: "Data Analysis" },
    { name: "Education" },
    { name: "Productivity" },
    { name: "WTF" },
  ]

  const useCases = [
    {
      icon: "⚡",
      title: "Interactive course on the momentum theorem",
      description:
        "Manus develops engaging video presentations for middle school educators, clearly explaining the momentum theorem through accessible and educational content.",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=300&h=200&fit=crop",
      bgColor: "bg-black",
      category: "Education",
    },
    {
      icon: "🗺️",
      title: "Campaign explanation maps",
      description:
        "Custom-designed visualization maps that bring historical events like the Battle of Lexington to life, enhancing student understanding through intuitive visual storytelling.",
      image: "https://images.unsplash.com/photo-1569235186275-626cb53b83ce?w=300&h=200&fit=crop",
      bgColor: "bg-yellow-100",
      category: "Featured",
    },
    {
      icon: "🏠",
      title: "Interactive transformer course",
      description:
        "Elegantly designed interactive webpages that demystify Transformer architecture through clear explanations and engaging visual elements.",
      image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=300&h=200&fit=crop",
      bgColor: "bg-gray-50",
      category: "Research",
    },
    {
      icon: "🌌",
      title: "Exploring the scale of the universe",
      description:
        "Immersive interactive course that guides students through cosmic scale measurements, offering perspective-changing visualizations of our universe.",
      image: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=300&h=200&fit=crop",
      bgColor: "bg-blue-900",
      category: "Education",
    },
    {
      icon: "📝",
      title: "Converting lecture recordings into notes",
      description:
        "Transform your classroom recordings into comprehensive, visually enhanced notes with detailed summaries and key concept highlights.",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=300&h=200&fit=crop",
      bgColor: "bg-white",
      category: "Productivity",
    },
    {
      icon: "📚",
      title: "Learning resource collection and organization",
      description:
        "Personalized collection of high-quality reinforcement learning materials, carefully curated and organized to meet your specific educational needs.",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop",
      bgColor: "bg-white",
      category: "Data Analysis",
    },
  ]

  // Filter use cases based on active category
  const filteredUseCases = activeCategory === "All" 
    ? useCases 
    : useCases.filter(useCase => useCase.category === activeCategory);

  return (
    <div className="min-h-screen bg-white">

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Explore use cases from our official collection.
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Learn how TalentScreen AI handles real-world interviews.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <Button
              key={category.name}
              variant={activeCategory === category.name ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(category.name)}
              className={activeCategory === category.name ? "bg-primary text-white hover:bg-primary/90" : ""}
            >   
              {category.name}
            </Button>
          ))}
        </div>

        {/* Use Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredUseCases.map((useCase, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow duration-200 rounded-xl border border-gray-200">
              <CardContent className="p-0">
                {/* Card Header */}
                <div className="p-6 pb-4">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white text-sm">
                      {useCase.icon}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{useCase.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{useCase.description}</p>
                </div>

                {/* Preview Image */}
                <div className={`${useCase.bgColor} p-4 mx-6 mb-6 rounded-lg`}>
                  <div className="bg-white rounded shadow-sm overflow-hidden">
                    <img
                      src={useCase.image || "https://via.placeholder.com/300x200"}
                      alt={useCase.title}
                      className="w-full h-32 object-cover"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}

