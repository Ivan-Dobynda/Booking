import React from "react";

import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import BlogPost from "@/components/Cards/BlogPost";
import Pagination from "@/components/Pagination/Pagination";

const Blog = () => {
  return (
    <main>
      <Breadcrumb title="Latest Blog Post" pages={["Home", "Blog"]} />
      <section className="sm:pt-16 md:pt-20 lg:pt-24 pb-12 sm:pb-16 md:pb-24 lg:pb-32 sm:bg-gray-50">
        <div className="base-container">
          <div className="mb-6 md:mb-8 lg:mb-10">
            <BlogPost type="full-width" />
          </div>

          <ul className="mx-auto max-w-md md:max-w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
            <li>
              <BlogPost />
            </li>
            <li>
              <BlogPost />
            </li>
            <li>
              <BlogPost />
            </li>
            <li>
              <BlogPost />
            </li>
            <li>
              <BlogPost />
            </li>
            <li>
              <BlogPost />
            </li>
          </ul>
          <Pagination />
        </div>
      </section>
    </main>
  );
};

export default Blog;
