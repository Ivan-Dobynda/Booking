export interface IAdminUserPayload {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  role: string;
}
export interface IBlog {
  lang: string;
  title: string;
  slug: string;
  body: string;
  blogCategoryId?: string;
  metaTitle?: string;
  metaKeywords?: string;
  metaDescription?: string;
  featured?: boolean;
  isActive?: boolean;
  image?: string;
}

export interface IFaqsArgs {
  search?: string;
  currentPage?: string;
  faqLimit?: number;
}
