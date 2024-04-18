import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div>
            <Link href="/">
              <img src="/logo.svg" alt="Logo" className="h-8" />
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <Link href="/product" className="text-gray-500 hover:text-gray-900">
              Product
            </Link>
            <Link href="/pricing" className="text-gray-500 hover:text-gray-900">
              Pricing
            </Link>
          </div>

          {/* Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/login">
              <Button variant="outline">Log In</Button>
            </Link>
            <Link href="/signup">
              <Button>Sign Up for Free</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button className="mobile-menu-button">
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="mobile-menu hidden md:hidden">
        <Link href="/product" className="block py-2 px-4 text-gray-500 hover:text-gray-900">
          Product
        </Link>
        <Link href="/pricing" className="block py-2 px-4 text-gray-500 hover:text-gray-900">
          Pricing
        </Link>
        <Link href="/login" className="block py-2 px-4">
          <Button variant="outline" className="w-full">
            Log In
          </Button>
        </Link>
        <Link href="/signup" className="block py-2 px-4">
          <Button className="w-full">Sign Up for Free</Button>
        </Link>
      </div>
    </nav>
  );
}
