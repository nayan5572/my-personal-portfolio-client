"use client";

import Link from "next/link";
import {
  FaTwitter,
  FaFacebookSquare,
  FaDribbble,
  FaGithub,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative bg-gray-200 pt-8 pb-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap text-left lg:text-left">
          <div className="w-full lg:w-6/12 px-4">
            <h4 className="text-3xl font-semibold text-gray-700">
              Lets keep in touch!
            </h4>
            <h5 className="text-lg mt-0 mb-2 text-gray-600">
              Find us on any of these platforms, we respond in 1-2 business
              days.
            </h5>
            <div className="mt-6 flex space-x-2">
              <button className="bg-white text-blue-400 shadow-lg p-3 rounded-full">
                <FaTwitter size={20} />
              </button>
              <button className="bg-white text-blue-600 shadow-lg p-3 rounded-full">
                <FaFacebookSquare size={20} />
              </button>
              <button className="bg-white text-pink-400 shadow-lg p-3 rounded-full">
                <FaDribbble size={20} />
              </button>
              <button className="bg-white text-gray-800 shadow-lg p-3 rounded-full">
                <FaGithub size={20} />
              </button>
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4 mt-6 lg:mt-0">
            <div className="flex flex-wrap">
              <div className="w-full sm:w-6/12 px-4">
                <span className="block uppercase text-gray-500 text-sm font-semibold mb-2">
                  Useful Links
                </span>
                <ul>
                  <li>
                    <Link
                      className="text-gray-600 hover:text-gray-800 block pb-2 text-sm"
                      href="/about"
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-gray-600 hover:text-gray-800 block pb-2 text-sm"
                      href="/blog"
                    >
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-gray-600 hover:text-gray-800 block pb-2 text-sm"
                      href="https://github.com"
                    >
                      Github
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-gray-600 hover:text-gray-800 block pb-2 text-sm"
                      href="/free-products"
                    >
                      Free Products
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="w-full sm:w-6/12 px-4">
                <span className="block uppercase text-gray-500 text-sm font-semibold mb-2">
                  Other Resources
                </span>
                <ul>
                  <li>
                    <Link
                      className="text-gray-600 hover:text-gray-800 block pb-2 text-sm"
                      href="/license"
                    >
                      MIT License
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-gray-600 hover:text-gray-800 block pb-2 text-sm"
                      href="/terms"
                    >
                      Terms & Conditions
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-gray-600 hover:text-gray-800 block pb-2 text-sm"
                      href="/privacy"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-gray-600 hover:text-gray-800 block pb-2 text-sm"
                      href="/contact"
                    >
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-300" />
        <div className="flex flex-wrap items-center justify-center md:justify-between">
          <div className="w-full md:w-4/12 px-4 text-center">
            <p className="text-sm text-gray-500 font-semibold py-1">
              &copy; {new Date().getFullYear()} Notus JS by{" "}
              <Link
                href="https://www.creative-tim.com"
                className="text-gray-500 hover:text-gray-800"
              >
                Nayan Halder
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
