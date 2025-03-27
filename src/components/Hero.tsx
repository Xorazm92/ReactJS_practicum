
import Image from 'next/image';

const Hero = () => {
  return (
    <div className="bg-[#F5F5F5] py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2">
            <h1 className="text-5xl font-bold text-gray-800 mb-4">
              Let's Make a Better
              <span className="text-[#46A358]"> Planet</span>
            </h1>
            <p className="text-gray-600 mb-8">
              We are an online plant shop offering a wide range of cheap and trendy plants. 
              Use our plants to create an unique Urban Jungle.
            </p>
            <button className="bg-[#46A358] text-white px-8 py-3 rounded-lg">
              Shop Now
            </button>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0">
            <Image 
              src="/hero-plant.png" 
              alt="Hero Plant"
              width={500}
              height={500}
              className="rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
