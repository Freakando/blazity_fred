import NavSection from "../components/Navigation.style";

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

const Navigation = () => {
  //   const router = useRouter();

  return (
    <>
      <NavSection>
        <div>
          <div>
            <div className="container">
              <div></div>
              <button></button>
            </div>
          </div>
        </div>
      </NavSection>
    </>
  );
};

export default Navigation;
