import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ListTodo, Zap, Shield } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b-2 border-black">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ListTodo className="h-8 w-8 text-black" />
              <h1 className="text-2xl font-bold text-black">TaskFlow</h1>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/login">
                <button className="px-6 py-2 text-black font-semibold hover:bg-gray-100 rounded-lg transition">
                  Login
                </button>
              </Link>
              <Link href="/signup">
                <button className="px-6 py-2 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition">
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-black mb-6">
            Manage Your Tasks
            <br />
            <span className="inline-block mt-2">The Smart Way</span>
          </h2>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Stay organized, boost productivity, and never miss a deadline with our intuitive task management system.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/register">
              <button className="px-8 py-4 bg-black text-white text-lg font-semibold rounded-lg hover:bg-gray-800 transition shadow-lg">
                Get Started Free
              </button>
            </Link>
            <Link href="/login">
              <button className="px-8 py-4 border-2 border-black text-black text-lg font-semibold rounded-lg hover:bg-gray-100 transition">
                Login
              </button>
            </Link>
          </div>
        </div>

        {/* Feature Preview */}
        
      </section>

      {/* Features Section */}
    
    </div>
  );
}