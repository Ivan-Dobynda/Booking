import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Image from "next/image";
import React from "react";

import Destination1Image from "@/assets/images/destination-1.jpeg";
import { FaCalendarAlt } from "react-icons/fa";
import { BiSolidFilePdf } from "react-icons/bi";
import Button from "@/components/Button/Button";
import H2 from "@/components/Typo/H2";
import BlogPost from "@/components/Cards/BlogPost";
import TextInput from "@/components/Form/TextInput";
import { CiSearch } from "react-icons/ci";
import Link from "next/link";
import { FaFacebookF, FaLinkedinIn, FaYoutube } from "react-icons/fa6";
import { AiFillInstagram } from "react-icons/ai";

const BlogDetails = () => {
  return (
    <main>
      {/* <Breadcrumb
        title="Explore New York's Hippest Borough"
        pages={["Home", "Blog", "Blog Details"]}
      /> */}

      <main className="pt-12 sm:pt-16 md:pt-20 lg:pt-24 pb-12 sm:pb-16 md:pb-24 lg:pb-32">
        <div className="base-container">
          <div className="flex flex-col lg:flex-row gap-7 lg:items-start">
            <div>
              <article className="blog-content">
                <header className="mb-3 lg:mb-5">
                  <div className="mb-4 lg:mb-5">
                    <Image
                      className="rounded-xl"
                      style={{ margin: 0 }}
                      src={Destination1Image}
                      alt="Revolutionizing the travel industry, one partnership at a time"
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <h5 className="py-1 px-2.5 sm:leading-5 text-sm sm:text-base text-brand-blue rounded-md bg-[rgba(0,51,102,0.10)]">
                      Travel
                    </h5>
                    <h5 className="text-brand-neutral-600 rounded-md flex items-center gap-2">
                      <span className="text-base sm:text-lg">
                        <FaCalendarAlt />
                      </span>
                      <span className="text-sm sm:text-base -mb-[2px]">
                        12/12/2023
                      </span>
                    </h5>
                  </div>
                </header>
                <div>
                  <h1>
                    Revolutionizing the travel industry, one partnership at a
                    time
                  </h1>
                  <p>
                    Thousands of migrants - of whom, many are children - suffer
                    from deadly heat conditions at the US-Mexico border. As the
                    effects of climate change worsen day by day, extreme weather
                    conditions are causing a high risk of dehydration and death
                    amongst migrants who try to enter the States through the
                    Sonoran Desert.
                  </p>
                  <p>
                    In order to calculate the deadliest areas in the U.S. -
                    Mexico Border, scientists and researchers used a biophysical
                    model of human dehydration. According to the report made by
                    this model, it was found that most of the deaths were caused
                    primarily by severe dehydration. After organizing the
                    dataset in the regions with the casualties, severe
                    dehydration that leads to death, water loss, organ failure,
                    disorientation and physiological challenges in animal
                    species were linked together for the report.
                  </p>
                  <h2>one partnership at a time</h2>
                  <p>
                    Thousands of migrants - of whom, many are children - suffer
                    from deadly heat conditions at the US-Mexico border. As the
                    effects of climate change worsen day by day, extreme weather
                    conditions are causing a high risk of dehydration and death
                    amongst migrants who try to enter the States through the
                    Sonoran Desert.
                  </p>
                  <p>
                    In order to calculate the deadliest areas in the U.S. -
                    Mexico Border, scientists and researchers used a biophysical
                    model of human dehydration. According to the report made by
                    this model, it was found that most of the deaths were caused
                    primarily by severe dehydration. After organizing the
                    dataset in the regions with the casualties, severe
                    dehydration that leads to death, water loss, organ failure,
                    disorientation and physiological challenges the report.
                  </p>

                  <Image src={Destination1Image} alt="Blog post" />
                  <p>
                    In order to calculate the deadliest areas in the U.S. -
                    Mexico Border, scientists and researchers used a biophysical
                    model of human dehydration. According to the report made by
                    this model, it was found that most of the deaths were caused
                    primarily by severe dehydration.
                  </p>
                </div>
              </article>
              <div className="mb-10 md:mb-16 lg:mb-20 xl:mb-28">
                <div className="flex bg-gray-100 rounded-2xl py-3 lg:py-4 px-4 lg:px-6 items-center gap-5 justify-between">
                  <div className="flex items-center gap-3 lg:gap-4 text-brand-neutral-700">
                    <div className="w-12 lg:w-14 h-12 lg:h-14 shrink-0 rounded-full bg-gray-200 flex items-center justify-center text-3xl lg:text-[34px]">
                      <BiSolidFilePdf />
                    </div>
                    <div className="text-base md:text-lg lg:text-xl font-semibold">
                      Travel guide for explorer.pdf
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <Button>Download PDF</Button>
                  </div>
                </div>

                <div className="mt-4 md:hidden">
                  <Button className="w-full">Download PDF</Button>
                </div>
              </div>
              <div>
                <div className="lg:flex items-end justify-between mb-10">
                  <div className="mb-5 lg:mb-0">
                    <div className="lg:max-w-xl xl:max-w-[600px]">
                      <H2 className="mb-3">Related Blog</H2>
                      <p className="text-base text-brand-neutral-600 ">
                        Stay informed and inspired through our news and blog.
                        Discover travel tips, destination insights, and
                        captivating stories that ignite your wanderlust.
                      </p>
                    </div>
                  </div>
                  <div>
                    <Button className="w-full sm:w-auto">View More</Button>
                  </div>
                </div>
                <div className="mx-auto max-w-md md:max-w-full grid grid-cols-1 md:grid-cols-2 gap-6">
                  <BlogPost />
                  <BlogPost />
                </div>
              </div>
            </div>
            <aside className="gap-5 md:gap-6 items-start grid sm:grid-cols-2 lg:block lg:w-[350px] xl:w-[370px] shrink-0">
              <div className="space-y-5 md:space-y-6">
                <div className="p-5 md:p-[26px] bg-gray-100 bg-opacity-60 rounded-2xl">
                  <header className="pb-3 mb-5 border-b border-gray-300">
                    <h4 className="text-lg leading-none text-brand-neutral-700 font-medium">
                      Search
                    </h4>
                  </header>
                  <form action="#" className="flex rounded-xl overflow-hidden">
                    <div className="flex-1">
                      <TextInput
                        placeholder="Search"
                        style={{ boxShadow: "none" }}
                      />
                    </div>
                    <button className="w-[52px] h-[52px] flex items-center justify-center text-white bg-brand-blue text-[26px] hover:bg-brand-blue-500 transition">
                      <CiSearch />
                    </button>
                  </form>
                </div>
                <div className="p-5 md:p-[26px] bg-gray-100 bg-opacity-60 rounded-2xl">
                  <header className="pb-3 mb-5 border-b border-gray-300">
                    <h4 className="text-lg leading-none text-brand-neutral-700 font-medium">
                      Recent Posts
                    </h4>
                  </header>
                  <ul className="space-y-4">
                    <li>
                      <Link
                        href="#"
                        className="flex items-center bg-white hover:bg-gray-50 transition shadow rounded-xl overflow-hidden shadow-gray-200/30"
                      >
                        <Image
                          src={Destination1Image}
                          className="w-28 h-20 object-cover object-center shrink-0"
                          alt="How To Get The Most Out of Senior Traveler"
                        />
                        <div className="px-3 py-2">
                          <h4 className="text-sm leading-[18px] font-medium text-brand-black mb-1">
                            How To Get The Most Out of Senior Traveler
                          </h4>
                          <div className="flex gap-1.5 text-xs">
                            <span className="text-brand-neutral-700">
                              Ronald Richards
                            </span>
                          </div>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#"
                        className="flex items-center bg-white hover:bg-gray-50 transition shadow rounded-xl overflow-hidden shadow-gray-200/30"
                      >
                        <Image
                          src={Destination1Image}
                          className="w-28 h-20 object-cover object-center shrink-0"
                          alt="How To Get The Most Out of Senior Traveler"
                        />
                        <div className="px-3 py-2">
                          <h4 className="text-sm leading-[18px] font-medium text-brand-black mb-1">
                            How To Get The Most Out of Senior Traveler
                          </h4>
                          <div className="flex gap-1.5 text-xs">
                            <span className="text-brand-neutral-700">
                              Ronald Richards
                            </span>
                          </div>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#"
                        className="flex items-center bg-white hover:bg-gray-50 transition shadow rounded-xl overflow-hidden shadow-gray-200/30"
                      >
                        <Image
                          src={Destination1Image}
                          className="w-28 h-20 object-cover object-center shrink-0"
                          alt="How To Get The Most Out of Senior Traveler"
                        />
                        <div className="px-3 py-2">
                          <h4 className="text-sm leading-[18px] font-medium text-brand-black mb-1">
                            How To Get The Most Out of Senior Traveler
                          </h4>
                          <div className="flex gap-1.5 text-xs">
                            <span className="text-brand-neutral-700">
                              Ronald Richards
                            </span>
                          </div>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#"
                        className="flex items-center bg-white hover:bg-gray-50 transition shadow rounded-xl overflow-hidden shadow-gray-200/30"
                      >
                        <Image
                          src={Destination1Image}
                          className="w-28 h-20 object-cover object-center shrink-0"
                          alt="How To Get The Most Out of Senior Traveler"
                        />
                        <div className="px-3 py-2">
                          <h4 className="text-sm leading-[18px] font-medium text-brand-black mb-1">
                            How To Get The Most Out of Senior Traveler
                          </h4>
                          <div className="flex gap-1.5 text-xs">
                            <span className="text-brand-neutral-700">
                              Ronald Richards
                            </span>
                          </div>
                        </div>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="space-y-5 md:space-y-6">
                <div className="p-5 md:p-[26px] bg-gray-100 bg-opacity-60 rounded-2xl">
                  <header className="pb-3 mb-5 border-b border-gray-300">
                    <h4 className="text-lg leading-none text-brand-neutral-700 font-medium">
                      Popular Tag
                    </h4>
                  </header>
                  <ul className="flex gap-3 flex-wrap">
                    <li className="rounded-md bg-gray-200/70 hover:bg-gray-200 transiiton py-2 px-4 text-sm text-brand-neutral-600">
                      <span>Tours</span>
                    </li>
                    <li className="rounded-md bg-brand-blue transiiton py-2 px-4 text-sm text-gray-200">
                      <span>Travel</span>
                    </li>
                    <li className="rounded-md bg-gray-200/70 hover:bg-gray-200 transiiton py-2 px-4 text-sm text-brand-neutral-600">
                      <span>Tour Guide</span>
                    </li>
                    <li className="rounded-md bg-gray-200/70 hover:bg-gray-200 transiiton py-2 px-4 text-sm text-brand-neutral-600">
                      <span>Business</span>
                    </li>
                    <li className="rounded-md bg-gray-200/70 hover:bg-gray-200 transiiton py-2 px-4 text-sm text-brand-neutral-600">
                      <span>Corporate</span>
                    </li>
                    <li className="rounded-md bg-gray-200/70 hover:bg-gray-200 transiiton py-2 px-4 text-sm text-brand-neutral-600">
                      <span>Hotel</span>
                    </li>
                    <li className="rounded-md bg-gray-200/70 hover:bg-gray-200 transiiton py-2 px-4 text-sm text-brand-neutral-600">
                      <span>Travel Agency</span>
                    </li>
                    <li className="rounded-md bg-gray-200/70 hover:bg-gray-200 transiiton py-2 px-4 text-sm text-brand-neutral-600">
                      <span>Car</span>
                    </li>
                    <li className="rounded-md bg-gray-200/70 hover:bg-gray-200 transiiton py-2 px-4 text-sm text-brand-neutral-600">
                      <span>Flight</span>
                    </li>
                  </ul>
                </div>
                <div className="p-5 md:p-[26px] bg-gray-100 bg-opacity-60 rounded-2xl">
                  <header className="pb-3 mb-5 border-b border-gray-300">
                    <h4 className="text-lg leading-none text-brand-neutral-700 font-medium">
                      Share Causes
                    </h4>
                  </header>

                  <ul className="flex gap-2.5">
                    <li>
                      <a
                        href="#"
                        className="text-xl leading-none w-10 h-10 rounded-full text-brand-blue-400 bg-white inline-flex items-center justify-center hover:bg-opacity-80 transition shadow shadow-gray-100"
                      >
                        <FaFacebookF />
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-2xl leading-none w-10 h-10 rounded-full text-brand-blue-400 bg-white inline-flex items-center justify-center hover:bg-opacity-80 transition shadow shadow-gray-100"
                      >
                        <AiFillInstagram />
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-xl leading-none w-10 h-10 rounded-full text-brand-blue-400 bg-white inline-flex items-center justify-center hover:bg-opacity-80 transition shadow shadow-gray-100"
                      >
                        <FaLinkedinIn />
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-2xl leading-none w-10 h-10 rounded-full text-brand-blue-400 bg-white inline-flex items-center justify-center hover:bg-opacity-80 transition shadow shadow-gray-100"
                      >
                        <FaYoutube />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </main>
  );
};

export default BlogDetails;
