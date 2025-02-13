import { ReactNode } from "react";
import { TBlog } from "./blog";
import { TProject } from "./project";

export type TProductCartProps = {
    project: TProject;
    index: number;
}
export type TNavItemProps = {
    href: string;
    icon: React.ElementType;
    label: string;
}
export type TSingleProjectProps = {
    project: TProject;
}

export type TSingleBlogProps = {
    blog: TBlog;
    index: number;
}

export type TCommonLayoutProps = {
    children: ReactNode;
}
