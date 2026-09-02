"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { ShoppingCartIcon } from "../common/SearchIcon";

import { Search, Heart, User, Menu, X } from "lucide-react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import { verifyToken } from "@/redux/slices/authSlice";

import { toggleSidebar } from "@/redux/slices/cartSlice";

import ScrollLock from "@/utils/ScrollLock";
import { SearchPanel } from "@/components/common/SearchPanel";

import logoImg from "@/assets/svg/NewLogo.svg";
import CartSidebar from "../cart/CartSidebar";

import LanguageToggle from "../ui/LanguageToggleButton";


export default function Navbar() {
  const pathname = usePathname();
  const dispatch = useDispatch();

  const { isSidebarOpen, cart } = useSelector(
    (state) => state.cart
  );

  const { user } = useSelector(
    (state) => state.auth
  );

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [showPanel, setShowPanel] = useState(false);

  const [showNavbar, setShowNavbar] = useState(true);

  const [lastScrollY, setLastScrollY] = useState(0);

  const [isScrolled, setIsScrolled] = useState(false);

  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);

  // const [token, setToken] = useState(null);

  const navLinks = [
    {
      name: "HOME",
      path: "/",
    },
    {
      name: "ABOUT",
      path: "/about",
    },
    {
      name: "SHOP",
      path: "/shop",
    },
    {
      name: "SCIENCE",
      path: "/research-lab",
    },
    {
      name: "SKIN ANALYSIS",
      path: "/skin-insights",
    },
    {
      name: "BUILD A BUNDLE",
      path: "/build-a-bundle",
    },
    {
      name: "BLOG",
      path: "/blogs",
    },
  ];

  const isProductPage =
    pathname.startsWith("/product");

  const isAuthPage =
    pathname === "/auth/login" ||
    pathname === "/auth/signup" ||
    pathname === "/login" ||
    pathname === "/user-dashboard" ||
    pathname === "/blogs" ||
    pathname === "/shop" ||
    pathname === "/cart" ||
    pathname === "/about" ||
    pathname === "/track-order" ||
    pathname === "/build-a-bundle" ||
    pathname === "/refund-policy" ||
    pathname === "/terms-and-conditions" ||
    pathname === "/shipping-policy" ||
    pathname === "/faq" ||
    pathname === "/contact-us" ||
    pathname === "/error500" ||
    pathname.startsWith("/blogs/") ||
    pathname.startsWith("/track-order/");

  // NAVBAR COLOR

  const showColoredNavbar =
    isScrolledPastHero ||
    isProductPage ||
    isAuthPage ||
    isScrolled;

  // CART COUNT

  const cartItemCount =
    cart?.products?.reduce(
      (total, item) =>
        total + (item?.quantity || 0),
      0
    ) || 0;

  // get token

  // useEffect(() => {
  //   const storedToken =
  //     localStorage.getItem("token");

  //   setToken(storedToken);
  // }, [user]);

  // verify token

// ================= VERIFY TOKEN =================

useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) return;

  const verify = async () => {
    try {
      await dispatch(verifyToken()).unwrap();
    } catch (error) {
      localStorage.removeItem("token");

      console.log("Invalid or expired session");
    }
  };

  verify();
}, [dispatch]);

  // scroll handler

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;

      window.requestAnimationFrame(() => {
        const currentScrollY =
          window.scrollY;

        // General scroll
        setIsScrolled(
          currentScrollY > 50
        );

        // Hero scroll
        const heroHeight =
          window.innerHeight * 0.8;

        setIsScrolledPastHero(
          currentScrollY >
          heroHeight
        );
        setShowNavbar(
          !(
            currentScrollY >
            lastScrollY &&
            currentScrollY > 80
          )
        );

        setLastScrollY(
          currentScrollY
        );

        ticking = false;
      });

      ticking = true;
    };

    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true }
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, [lastScrollY]);

  // RESET ON ROUTE CHANGE

  useEffect(() => {
    setIsScrolledPastHero(false);
    setLastScrollY(0);
    setShowNavbar(true);
    setShowPanel(false);
    setMobileMenuOpen(false);

    document.body.style.overflow =
      "auto";
  }, [pathname]);

  // BODY SCROLL LOCK

  useEffect(() => {
    if (isSidebarOpen || mobileMenuOpen) {
      document.body.style.overflow =
        "hidden";
    } else {
      document.body.style.overflow =
        "auto";
    }

    return () => {
      document.body.style.overflow =
        "auto";
    };
  }, [
    isSidebarOpen,
    mobileMenuOpen,
  ]);


  // SEARCH

  const handleSearchOpen = () => {
    setShowPanel(true);
    setMobileMenuOpen(false);

    document.body.style.overflow =
      "hidden";
  };

  const handleSearchClose = () => {
    setShowPanel(false);

    if (!isSidebarOpen) {
      document.body.style.overflow =
        "auto";
    }
  };

  // CART

  const handleCartToggle = (value) => {
    // Don't open sidebar on cart/checkout
    if (
      pathname === "/cart" ||
      pathname === "/checkout"
    ) {
      return;
    }

    setMobileMenuOpen(false);

    dispatch(
      toggleSidebar(value)
    );
  };

  // MOBILE MENU

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleNavigation = (path) => {
    closeMobileMenu();

    if (path === pathname) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  // account

  const accountRoute = user
    ? "/user-dashboard"
    : "/auth/login";


  return (
    <>

      <div
        className={`fixed top-2 xs:top-3 sm:top-4 lg:top-5 left-0 z-50 w-full px-2 xs:px-3 sm:px-4 md:px-5 lg:px-6
          transition-transform duration-500 `}>

        <div className="mx-auto w-full max-w-[1440px]">

          <header
            className={` flex min-h-[56px] xs:min-h-[58px] sm:min-h-[62px] md:min-h-[66px] lg:min-h-[70px] items-center
              justify-between rounded-[18px] xs:rounded-[20px] sm:rounded-full border px-3 xs:px-3.5 sm:px-5 md:px-6 xl:px-8
              py-2 sm:py-2.5 lg:py-3.5 transition-all duration-500
              ${showColoredNavbar
                ? "border-[#3A8B88] bg-[#3A8B88] text-white shadow-lg"
                : "border-white/30 bg-white/10 text-white shadow-[0_8px_32px_rgba(0,0,0,0.08)] backdrop-blur-md"
              }
            `}
          >

            <Link
              href="/"
              className="shrink-0 flex items-center"
              onClick={() =>
                handleNavigation("/")
              }
            >
              <Image
                src={logoImg}
                alt="NYTHNG"
                width={150}
                height={55}
                priority
                className=" h-auto w-[88px] xs:w-[96px] lg:w-[145px] "
              />
            </Link>

            {/* desktop navigation */}
            <nav className="hidden xl:flex items-center gap-4 2xl:gap-7 text-[14px] 2xl:text-sm font-semibold tracking-[1.2px]">
              {navLinks.map((link) => {
                const isActive =
                  pathname ===
                  link.path;

                return (
                  <Link
                    key={link.name}
                    href={link.path}
                    onClick={() =>
                      handleNavigation(
                        link.path
                      )
                    }
                    className={` relative whitespace-nowrap py-1
                      transition-all
                      duration-300

                      ${isActive
                        ? "text-white"
                        : "text-white/90 hover:text-white"
                      }

                      after:absolute
                      after:left-0
                      after:-bottom-1
                      after:h-[2px]
                      after:bg-white
                      after:transition-all
                      after:duration-300

                      ${isActive
                        ? "after:w-full"
                        : "after:w-0 hover:after:w-full"
                      }
                    `}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            <div
              className="
                flex
                shrink-0
                items-center
                gap-2
                xs:gap-2.5
                sm:gap-3.5
                md:gap-4
                lg:gap-5
                text-white
              "
            >
              {/* SEARCH */}

              <button
                type="button"
                aria-label="Search"
                onClick={
                  handleSearchOpen
                }
                className="
                  flex
                  h-8
                  w-8
                  xs:h-9
                  xs:w-9
                  sm:h-10
                  sm:w-10
                  items-center
                  justify-center
                  rounded-full
                  transition-all
                  duration-200
                  hover:bg-white/10
                  hover:text-white/80
                  active:scale-95
                "
              >
                <Search
                  className="
                    h-[17px]
                    w-[17px]
                    xs:h-[18px]
                    xs:w-[18px]
                    sm:h-5
                    sm:w-5
                  "
                />
              </button>

              {/* LANGUAGE */}
              <div className="hidden xl:flex items-center">
                <LanguageToggle />
              </div>

              {/* WISHLIST */}

              <button
                type="button"
                aria-label="Wishlist"
                className="
                  hidden
                  sm:flex
                  h-9
                  w-9
                  md:h-10
                  md:w-10
                  items-center
                  justify-center
                  rounded-full
                  transition-all
                  duration-200
                  hover:bg-white/10
                  hover:text-white/80
                  active:scale-95
                "
              >
                <Heart
                  className="
                    h-[18px]
                    w-[18px]
                    md:h-5
                    md:w-5
                  "
                />
              </button>

              {/* ACCOUNT */}

              <Link
                href={accountRoute}
                aria-label="Account"
                onClick={
                  closeMobileMenu
                }
                className="
                  flex
                  h-8
                  w-8
                  xs:h-9
                  xs:w-9
                  sm:h-10
                  sm:w-10
                  items-center
                  justify-center
                  rounded-full
                  transition-all
                  duration-200
                  hover:bg-white/10
                  hover:text-white/80
                  active:scale-95
                "
              >
                <User
                  className="
                    h-[17px]
                    w-[17px]
                    xs:h-[18px]
                    xs:w-[18px]
                    sm:h-5
                    sm:w-5
                  "
                />
              </Link>

              {/* CART */}

              <button
                type="button"
                aria-label="Shopping Cart"
                onClick={() =>
                  handleCartToggle(true)
                }
                className="
                  relative
                  flex
                  h-8
                  w-8
                  xs:h-9
                  xs:w-9
                  sm:h-10
                  sm:w-10
                  items-center
                  justify-center
                  rounded-full
                  transition-all
                  duration-200
                  hover:bg-white/10
                  active:scale-95
                "
              >
                {cartItemCount > 0 && (
                  <span
                    className="
                      absolute
                      -right-0.5
                      -top-0.5
                      flex
                      h-[17px]
                      min-w-[17px]
                      xs:h-[18px]
                      xs:min-w-[18px]
                      items-center
                      justify-center
                      rounded-full
                      bg-[#a52a2a]
                      px-1
                      text-[9px]
                      xs:text-[10px]
                      font-bold
                      text-white
                      shadow-sm
                    "
                  >
                    {cartItemCount > 99
                      ? "99+"
                      : cartItemCount}
                  </span>
                )}

                <ShoppingCartIcon
                  size={19}
                  className="
                    xs:hidden
                  "
                />

                <ShoppingCartIcon
                  size={21}
                  className="
                    hidden
                    xs:block
                  "
                />
              </button>

              {/* MOBILE MENU BUTTON */}

              <button
                  type="button"
                  aria-label={mobileMenuOpen ? "Close Menu" : "Open Menu"}
                  aria-expanded={mobileMenuOpen}
                  onClick={() => setMobileMenuOpen((prev) => !prev)}
                  className="
                    flex
                    h-8
                    w-8
                    xs:h-9
                    xs:w-9
                    items-center
                    justify-center
                    rounded-full
                    transition-all
                    duration-200
                    hover:bg-white/10
                    active:scale-95
                    xl:hidden
                  "
                >
                {mobileMenuOpen ? (
                  <X
                    className="
                      h-5
                      w-5
                      sm:h-[22px]
                      sm:w-[22px]
                    "
                  />
                ) : (
                  <Menu
                    className="
                      h-5
                      w-5
                      sm:h-[22px]
                      sm:w-[22px]
                    "
                  />
                )}
              </button>
            </div>
          </header>

          {/* ==================================================
              MOBILE MENU
          ================================================== */}

          <div
            className={`
              overflow-hidden
              transition-all
              duration-300
              cl:hidden

              ${mobileMenuOpen
                ? "mt-2 h-[calc(100vh-80px)] opacity-100"
                : "h-0 opacity-0"
              }
            `}
          >
            <div
              className={`
                h-full
                overflow-y-auto
                rounded-[22px]
                border
                border-white/20
                bg-[#3A8B88]
                px-4
                py-5
                shadow-2xl

                sm:px-6
                sm:py-6
              `}
            >
              <nav
                className="
                  flex
                  flex-col
                  gap-1
                "
              >
                {navLinks.map((link) => {
                  const isActive =
                    pathname ===
                    link.path;

                  return (
                    <Link
                      key={link.name}
                      href={link.path}
                      onClick={() =>
                        handleNavigation(
                          link.path
                        )
                      }
                      className={`
                        flex
                        min-h-[44px]
                        items-center
                        rounded-xl
                        px-3
                        text-xs
                        sm:text-sm
                        font-semibold
                        tracking-[1.5px]
                        transition-all
                        duration-200

                        ${isActive
                          ? "bg-white/15 text-white"
                          : "text-white/80 hover:bg-white/10 hover:text-white"
                        }
                      `}
                    >
                      <span className={`mr-2 h-1.5 w-1.5 rounded-full bg-white shrink-0 transition-opacity duration-200 ${isActive ? "opacity-100" : "opacity-0"}`} />

                      {link.name}
                    </Link>
                  );
                })}
              </nav>

              {/* MOBILE QUICK ACTIONS */}
              <div
                className=" mt-4 border-t border-white/15 pt-4 flex items-center justify-center"
              >
                <LanguageToggle />
              </div>

              <div
                className="
                  mt-4
                  grid
                  grid-cols-3
                  gap-2
                  border-t
                  border-white/15
                  pt-4
                  sm:gap-3
                "
              >
                {/* Search */}

                <button
                  type="button"
                  onClick={
                    handleSearchOpen
                  }
                  className="
                    flex
                    min-h-[50px]
                    flex-col
                    items-center
                    justify-center
                    gap-1
                    rounded-xl
                    bg-white/10
                    text-white
                    transition
                    hover:bg-white/15
                  "
                >
                  <Search
                    size={18}
                  />

                  <span className="text-[9px] sm:text-[10px]">
                    Search
                  </span>
                </button>

                {/* Account */}

                <Link
                  href={accountRoute}
                  onClick={
                    closeMobileMenu
                  }
                  className="
                    flex
                    min-h-[50px]
                    flex-col
                    items-center
                    justify-center
                    gap-1
                    rounded-xl
                    bg-white/10
                    text-white
                    transition
                    hover:bg-white/15
                  "
                >
                  <User
                    size={18}
                  />

                  <span className="text-[9px] sm:text-[10px]">
                    Account
                  </span>
                </Link>

                {/* Cart */}

                <button
                  type="button"
                  onClick={() =>
                    handleCartToggle(
                      true
                    )
                  }
                  className="
                    relative
                    flex
                    min-h-[50px]
                    flex-col
                    items-center
                    justify-center
                    gap-1
                    rounded-xl
                    bg-white/10
                    text-white
                    transition
                    hover:bg-white/15
                  "
                >
                  {cartItemCount > 0 && (
                    <span
                      className="
                        absolute
                        right-3
                        top-2
                        flex
                        h-4
                        min-w-4
                        items-center
                        justify-center
                        rounded-full
                        bg-[#a52a2a]
                        px-1
                        text-[8px]
                        font-bold
                      "
                    >
                      {cartItemCount >
                        99
                        ? "99+"
                        : cartItemCount}
                    </span>
                  )}

                  <ShoppingCartIcon
                    size={18}
                  />

                  <span className="text-[9px] sm:text-[10px]">
                    Cart
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ==================================================
          SEARCH PANEL
      ================================================== */}

      {showPanel && (
        <>
          <ScrollLock />

          <div
            className="
              fixed
              inset-0
              z-[60]
            "
          >
            <div
              className="
                absolute
                inset-0
                bg-black/50
                backdrop-blur-[2px]
              "
              onClick={
                handleSearchClose
              }
            />

            <div className="relative z-10">
              <SearchPanel
                onClose={
                  handleSearchClose
                }
              />
            </div>
          </div>
        </>
      )}

      {/* ==================================================
          MOBILE OVERLAY
      ================================================== */}

      {mobileMenuOpen && (
        <>
          <ScrollLock />

          <div
            className="
              fixed
              inset-0
              z-40
              bg-black/40
              backdrop-blur-[1px]
              xl:hidden
            "
            onClick={() =>
              setMobileMenuOpen(
                false
              )
            }
          />
        </>
      )}
    </>
  );
}