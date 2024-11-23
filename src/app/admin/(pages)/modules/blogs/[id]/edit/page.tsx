import React from "react";
import {
  getBlogAction,
  getBlogCategoriesAction,
} from "@admin/_actions/blogActions";
import BlogForm from "@admin/_components/Blogs/BlogForm";
import H1 from "@admin/_components/Typo/H1";

const EditCandidate = async ({ params }: { params: { id: string } }) => {
  const blogDetail = await getBlogAction(params.id);
  const blogCategories = await getBlogCategoriesAction();

  return (
    <div>
      <header className="mb-8">
        <H1>Edit Blog</H1>
      </header>
      <div className="p-5 2xl:p-6 rounded-2xl bg-white">
        <BlogForm categories={blogCategories} blogDetail={blogDetail} />
      </div>
    </div>
  );
};

export default EditCandidate;
