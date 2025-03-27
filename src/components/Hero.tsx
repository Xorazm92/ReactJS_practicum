
import Image from 'next/image'

const Hero = () => {
  return (
    <div className="bg-[#F5F5F5] min-h-screen pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between">
          <div className="max-w-lg">
            <h4 className="text-primary mb-4">Welcome to GreenShop</h4>
            <h1 className="text-5xl font-bold mb-6">
              Let's Make a Better Planet
            </h1>
            <p className="text-gray-600 mb-8">
              We are an online plant shop offering a wide range of cheap and trendy plants.
              Use our plants to create an unique Urban Jungle. Order your favorite plants!
            </p>
            <button className="bg-primary text-white px-8 py-3 rounded-lg">
              SHOP NOW
            </button>
          </div>
          <div className="relative w-[600px] h-[400px]">
            <Image
              src="/hero-plant.png"
              alt="Hero Plant"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
