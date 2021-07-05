import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const navLinks = [
  {
    name: "Services",
    pathname: "/#services",
    isCta: false,
  },
  {
    name: "Why us",
    pathname: "/#whyus",
    isCta: false,
  },
  {
    name: "Portfolio",
    pathname: "/portfolio",
    isCta: false,
  },
  {
    name: "Blog",
    pathname: "/blog",
    isCta: false,
  },
];

const NavBar = () => {
  const router = useRouter();
  return (
    <>
      <nav>
        <Link href="/" passHref>
          Blazity
        </Link>
        <bars />
        <navMenu>
          <Link href="/#services" passHref activeStyle>
            services
          </Link>
          <Link href="/#whyUs" passHref activeStyle>
            why us
          </Link>
          <Link href="/portfolio" passHref activeStyle>
            Portfolio
          </Link>
          <Link href="/blog" passHref activeStyle>
            Blog
          </Link>
        </navMenu>
      </nav>
    </>
  );
};

export default NavBar;
