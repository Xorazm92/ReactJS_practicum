
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-8">Our Products</h2>
        {/* Products will be added here */}
      </main>
      <Footer />
    </div>
  );
}
