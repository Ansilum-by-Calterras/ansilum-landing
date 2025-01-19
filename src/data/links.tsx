import { BriefcaseIcon, TagIcon, BuildingOfficeIcon, DocumentTextIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";

export const navItems = [
  {
    name: "Our Products",
    link: "/our-products",
    icon: <BriefcaseIcon className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "Pricing",
    link: "/pricing",
    icon: <TagIcon className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "Company",
    link: "/company",
    icon: <BuildingOfficeIcon className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "Blog",
    link: "/blog",
    icon: <DocumentTextIcon className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "Login",
    link: "/login",
    icon: <ArrowRightOnRectangleIcon className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
];
