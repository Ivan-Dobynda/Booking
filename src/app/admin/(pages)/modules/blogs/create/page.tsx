import React from "react";

import { getBlogCategoriesAction } from "@/app/admin/_actions/blogActions";

import H1 from "@admin/_components/Typo/H1";
import BlogForm from "@admin/_components/Blogs/BlogForm";

const CreateCandidate = async () => {
  const blogCategories = await getBlogCategoriesAction();

  return (
    <div>
      <header className="mb-8">
        <H1>Create Blog</H1>
      </header>

      <div className="p-5 2xl:p-6 rounded-2xl bg-white">
        <BlogForm categories={blogCategories} />
      </div>
    </div>
  );
};

export default CreateCandidate;
