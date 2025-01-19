"use client";
import React, { useEffect, useState } from "react";
import {
    motion,
    AnimatePresence,
    useScroll,
    useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { NavigationMenu, NavigationMenuList, NavigationMenuLink } from "@radix-ui/react-navigation-menu";
import { useToggleStore } from "@/store/useToggleStore";
import { Logo } from "../logo";

export const FloatingNav = ({
    navItems,
    className,
}: {
    navItems: {
        name: string;
        link: string;
        icon?: JSX.Element;
    }[];
    className?: string;
}) => {
    const { scrollY } = useScroll();

    const { isOpen, setIsOpen } = useToggleStore();
    const [visible, setVisible] = useState(false);
    const [navbar, setNavbar] = useState(false);

    const showThreshold = 100;

    const handleToggle = () => {
        setIsOpen(!isOpen); // Toggle the state in the store
    };

    const handleClick = async () => {
        setNavbar(false);
    };

    useMotionValueEvent(scrollY, "change", (current) => {
        if (current > showThreshold) {
            setVisible(true);
        } else if (current <= 0) {
            setVisible(false);
        }
    });

    return (
        <AnimatePresence mode="wait">
            <motion.div
                initial={{
                    opacity: 1,
                    y: -100,
                }}
                animate={{
                    y: visible ? 0 : -100,
                    opacity: visible ? 1 : 0,
                }}
                transition={{
                    duration: 0.2,
                }}
                className={cn(
                    "flex lg:max-w-fit max-w-[85%] fixed top-10 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-full dark:bg-black bg-white/95 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] pr-2 pl-8 py-2 items-center justify-between space-x-4 gap-8",
                    className
                )}
            >
                <Link
                    href="/"
                    onClick={handleClick}
                    className="flex flex-row items-center justify-start gap-2"
                >
                    <Logo />
                </Link>

                <div className="flex lg:hidden items-center gap-1 px-8">
                    <button
                        className="rounded-mdp-2 text-primary outline-none focus:border focus:border-primary"
                        aria-label="Hamburger Menu"
                        onClick={handleToggle}
                    >
                        {isOpen ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        )}
                    </button>
                </div>

                <NavigationMenu className="hidden lg:flex items-center">
                    <NavigationMenuList className="flex items-center space-y-4 px-8 md:flex-row md:space-x-6 md:space-y-0">
                        {navItems.map((link) => (
                            <li key={link.link}>
                                <NavigationMenuLink
                                    className="whitespace-nowrap text-base font-semibold text-slate-500 transition-colors duration-300 hover:scale-[1.10] hover:text-black"
                                    href={link.link}
                                    onClick={handleClick}
                                >
                                    {link.name}
                                </NavigationMenuLink>
                            </li>
                        ))}
                        <Link href="/contactus">
                            <button className="border text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full">
                                <span>Contact Us</span>
                                <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px" />
                            </button>
                        </Link>
                    </NavigationMenuList>
                </NavigationMenu>
            </motion.div>
        </AnimatePresence>
    );
};
