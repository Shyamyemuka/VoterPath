"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { useAuth } from "@/contexts/AuthContext";

export default function Home() {
  const router = useRouter();
  const { isAuthenticated, logOut } = useAuth();
  const [scrollY, setScrollY] = useState(0);
  const [currentTime, setCurrentTime] = useState("11:11 PM");

  const handleStartChat = () => {
    if (isAuthenticated) {
      router.push("/chat");
    } else {
      router.push("/auth/signin");
    }
  };

  const handleLogOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // Update time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12;
      setCurrentTime(`${hours}:${minutes} ${ampm}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Reveal animation observer
  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    );

    document
      .querySelectorAll(".reveal")
      .forEach((el) => revealObserver.observe(el));
    return () => revealObserver.disconnect();
  }, []);

  // Navbar scroll effect
  useEffect(() => {
    const nav = document.getElementById("main-nav");
    const handleNavScroll = () => {
      if (!nav) return;
      if (window.scrollY > 50) {
        nav.classList.add(
          "py-4",
          "bg-[#050505]/80",
          "backdrop-blur-md",
          "border-b",
          "border-white/5",
        );
        nav.classList.remove("py-8", "bg-transparent");
      } else {
        nav.classList.remove(
          "py-4",
          "bg-[#050505]/80",
          "backdrop-blur-md",
          "border-b",
          "border-white/5",
        );
        nav.classList.add("py-8", "bg-transparent");
      }
    };
    window.addEventListener("scroll", handleNavScroll);
    return () => window.removeEventListener("scroll", handleNavScroll);
  }, []);

  // Hero parallax effect
  useEffect(() => {
    const handleHeroParallax = () => {
      const heroWrapper = document.getElementById("hero-content-wrapper");
      if (!heroWrapper) return;
      const scrolled = window.scrollY;
      if (scrolled < 1000) {
        heroWrapper.style.transform = `translateY(${scrolled * 0.4}px)`;
        heroWrapper.style.opacity = `${Math.max(0, 1 - scrolled / 600)}`;
      }
    };
    window.addEventListener("scroll", handleHeroParallax);
    return () => window.removeEventListener("scroll", handleHeroParallax);
  }, []);

  // Parallax cards effect
  useEffect(() => {
    const handleCardParallax = () => {
      const scrolled = window.scrollY;
      document.querySelectorAll(".parallax-card-up").forEach((el: Element) => {
        (el as HTMLElement).style.setProperty(
          "--scroll-offset-up",
          `${scrolled * -0.05}px`,
        );
      });
      document
        .querySelectorAll(".parallax-card-down")
        .forEach((el: Element) => {
          (el as HTMLElement).style.setProperty(
            "--scroll-offset-down",
            `${scrolled * 0.05}px`,
          );
        });
    };
    window.addEventListener("scroll", handleCardParallax);
    return () => window.removeEventListener("scroll", handleCardParallax);
  }, []);

  return (
    <main className="min-h-screen bg-[#050505] selection:bg-[#FF4500] selection:text-white">
      {/* Global Noise Overlay */}
      <div
        className="fixed inset-0 z-50 pointer-events-none opacity-5 mix-blend-overlay"
        style={{
          backgroundImage:
            'url("https://grainy-gradients.vercel.app/noise.svg")',
          backgroundRepeat: "repeat",
        }}></div>

      {/* Navigation */}
      <nav
        id="main-nav"
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-500 py-8">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <a
            href="/"
            className="text-2xl font-bold tracking-tighter font-serif">
            VoterPath.
          </a>

          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#about"
              className="text-sm text-gray-400 hover:text-white transition-colors duration-300">
              About
            </a>
            <a
              href="#features"
              className="text-sm text-gray-400 hover:text-white transition-colors duration-300">
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-sm text-gray-400 hover:text-white transition-colors duration-300">
              How It Works
            </a>
          </div>

          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <button
                  onClick={handleStartChat}
                  aria-label="Talk to us and start chat"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-medium bg-white text-black hover:scale-105 hover:bg-gray-100 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:ring-offset-2 focus:ring-offset-[#050505]">
                  Chat
                </button>
                <button
                  onClick={handleLogOut}
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-medium text-white border border-white/30 hover:border-white hover:bg-white/5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white">
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/signin"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-medium text-white border border-white/30 hover:border-white hover:bg-white/5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white">
                  Sign In
                </Link>
                <button
                  onClick={handleStartChat}
                  aria-label="Talk to us and start chat"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-medium bg-white text-black hover:scale-105 hover:bg-gray-100 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:ring-offset-2 focus:ring-offset-[#050505]">
                  Talk to us
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-20 bg-[#050505]">
        {/* Background Atmosphere */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          <div className="absolute top-0 left-0 w-full h-full opacity-40 mix-blend-screen">
            <div className="w-full h-full bg-gradient-to-b from-[#FF4500]/10 via-transparent to-transparent"></div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050505] z-10"></div>
        </div>

        {/* Floating Red Hands - Left */}
        <div className="absolute -left-[10%] top-[-10%] md:left-[-5%] md:top-[-15%] w-[50vw] md:w-[40vw] max-w-[800px] z-10 pointer-events-none mix-blend-hard-light opacity-80 animate-float-left">
          <img
            src="https://framerusercontent.com/images/KNhiA5A2ykNYqNkj04Hk6BVg5A.png?width=1540&height=1320"
            alt=""
            aria-hidden="true"
            className="w-full h-auto object-contain drop-shadow-lg"
          />
        </div>

        {/* Floating Red Hands - Right */}
        <div className="absolute -right-[10%] bottom-[-10%] md:right-[-5%] md:bottom-[-5%] w-[45vw] md:w-[35vw] max-w-[700px] z-10 pointer-events-none mix-blend-hard-light opacity-80 animate-float-right">
          <img
            src="https://framerusercontent.com/images/X89VFCABCEjjZ4oLGa3PjbOmsA.png?width=1542&height=1002"
            alt=""
            aria-hidden="true"
            className="w-full h-auto object-contain drop-shadow-lg"
          />
        </div>

        {/* Hero Content */}
        <div
          id="hero-content-wrapper"
          className="container mx-auto px-6 relative z-20 text-center flex flex-col items-center justify-center h-full max-w-4xl mx-auto">
          <div className="reveal">
            <h1
              className="text-5xl md:text-7xl font-medium leading-[1.1] tracking-tight mb-6 text-[#ffe0e0] font-serif"
              style={{ textShadow: "0 0 12px rgba(255,255,255,0.71)" }}>
              VoterPath. <br />
              <span className="italic font-light text-[#ffe0e0]">
                Your AI Election Guide.
              </span>
            </h1>
          </div>

          <div className="reveal" style={{ transitionDelay: "200ms" }}>
            <p
              className="text-base md:text-lg text-[#ffe0e0]/90 max-w-lg mx-auto mb-16 font-light tracking-wide leading-relaxed"
              style={{ textShadow: "0 0 12px rgba(255,255,255,0.71)" }}>
              We turn the unseen into the unforgettable. Understand India&apos;s
              democratic process with AI-powered guidance.
            </p>
          </div>

          <div
            className="reveal flex flex-col items-center gap-6"
            style={{ transitionDelay: "400ms" }}>
            <div className="relative group cursor-pointer">
              <div className="absolute inset-0 bg-[#FF4500]/20 blur-xl rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
              <button
                onClick={handleStartChat}
                aria-label="Talk to us and start chat"
                className="relative border border-white/20 bg-white/5 backdrop-blur-sm px-6 py-2 rounded-full flex items-center gap-3 text-xs md:text-sm text-white/80 uppercase tracking-widest hover:bg-white/10 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white">
                <span>Talk to us</span>
              </button>
            </div>

            <div className="flex items-center gap-4 text-[10px] md:text-xs text-white/40 uppercase tracking-widest mt-8 font-mono">
              <span>{currentTime}</span>
              <span className="w-px h-3 bg-white/20"></span>
              <span>Global</span>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="about" className="py-32 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center reveal">
            <h2 className="text-3xl md:text-5xl lg:text-6xl leading-tight text-white/90 mb-12 font-serif">
              Empowering voters through AI-driven knowledge.
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-light">
              Clear information is clarity. We provide accessible guidance so
              your voting voice resonates with confidence.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="mt-32 grid grid-cols-2 md:grid-cols-3 gap-8 items-center justify-items-center max-w-2xl mx-auto">
            <div className="reveal text-center">
              <div className="text-4xl font-bold text-[#FF9933] mb-2">7</div>
              <div className="text-sm text-gray-400 uppercase tracking-widest">
                Election Steps
              </div>
            </div>
            <div
              className="reveal text-center"
              style={{ transitionDelay: "100ms" }}>
              <div className="text-4xl font-bold text-[#4ade80] mb-2">5</div>
              <div className="text-sm text-gray-400 uppercase tracking-widest">
                Languages
              </div>
            </div>
            <div
              className="reveal text-center"
              style={{ transitionDelay: "200ms" }}>
              <div className="text-4xl font-bold text-[#FF4500] mb-2">∞</div>
              <div className="text-sm text-gray-400 uppercase tracking-widest">
                Questions
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Polling Booth Search Section */}
      <section className="py-20 relative bg-[#050505]">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-xl mx-auto text-center reveal">
            <h3 className="text-2xl md:text-4xl text-white/90 mb-6 font-serif">
              Locate Nearby Polling Booths
            </h3>
            <p className="text-gray-400 mb-8 font-light">
              Enter your PIN code to find polling booths in your area.
            </p>
            <div className="flex flex-col gap-4">
              <label htmlFor="pincode-input" className="sr-only">
                Enter PIN Code
              </label>
              <input
                id="pincode-input"
                type="text"
                placeholder="Enter PIN Code"
                aria-label="Enter PIN Code"
                className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-[#FF9933] focus:ring-1 focus:ring-[#FF9933] transition-colors text-center text-lg tracking-widest"
                maxLength={6}
              />
              <div className="flex flex-col sm:flex-row gap-4 mt-2">
                <button
                  onClick={() => {
                    const pin = (
                      document.getElementById(
                        "pincode-input",
                      ) as HTMLInputElement
                    )?.value;
                    if (pin && pin.length >= 5) {
                      window.open(
                        `https://www.google.com/maps/search/polling+booths+near+${pin}`,
                        "_blank",
                        "noopener,noreferrer",
                      );
                    } else {
                      alert("Please enter a valid PIN code");
                    }
                  }}
                  aria-label="Search based on PIN code"
                  className="flex-1 py-4 bg-[#FF9933]/10 hover:bg-[#FF9933]/20 border border-[#FF9933]/50 text-[#FF9933] rounded-xl transition-all duration-300 font-medium focus:outline-none focus:ring-2 focus:ring-[#FF9933]">
                  Search based on PIN code
                </button>
                <button
                  onClick={() => {
                    window.open(
                      "https://electoralsearch.eci.gov.in/",
                      "_blank",
                      "noopener,noreferrer",
                    );
                  }}
                  aria-label="Identify polling booths on ECI"
                  className="flex-1 py-4 bg-white/5 hover:bg-white/10 border border-white/20 text-white rounded-xl transition-all duration-300 font-medium focus:outline-none focus:ring-2 focus:ring-white">
                  Identify polling booths on ECI
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cards Section */}
      <section id="features" className="py-40 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="reveal mb-32">
            <h2 className="text-5xl md:text-7xl text-center font-serif">
              Your <br />
              <span className="italic">voting companion</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Card 1 - Orange/Red */}
            <div className="parallax-card-down reveal">
              <div className="bg-[#FF4500] rounded-3xl p-8 md:p-12 aspect-[4/5] flex flex-col justify-between shadow-2xl hover:shadow-[0_20px_50px_rgba(255,69,0,0.3)] transition-all duration-500 group cursor-pointer">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 rounded-full bg-black/10 flex items-center justify-center group-hover:rotate-45 transition-transform duration-500">
                    <span className="text-black text-2xl">🗳️</span>
                  </div>
                  <span className="text-black font-medium text-sm border border-black/20 px-3 py-1 rounded-full">
                    01
                  </span>
                </div>

                <div>
                  <h3 className="text-4xl md:text-5xl text-black mb-4 leading-none tracking-tight font-serif">
                    Learn <br />
                    Elections
                  </h3>
                  <p className="text-black/70 text-lg leading-snug">
                    Master the 7-step election process. From voter registration
                    to VVPAT verification.
                  </p>
                </div>

                <div className="w-full h-px bg-black/10 mt-8"></div>
              </div>
            </div>

            {/* Card 2 - Dark */}
            <div
              className="parallax-card-up reveal md:mt-24"
              style={{ transitionDelay: "150ms" }}>
              <div className="bg-[#111] border border-white/10 rounded-3xl p-8 md:p-12 aspect-[4/5] flex flex-col justify-between shadow-2xl group cursor-pointer hover:border-[#FF4500]/50 transition-all duration-500">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <span className="text-white text-2xl">🤖</span>
                  </div>
                  <span className="text-white/50 font-medium text-sm border border-white/10 px-3 py-1 rounded-full">
                    02
                  </span>
                </div>

                <div>
                  <h3 className="text-4xl md:text-5xl text-white mb-4 leading-none tracking-tight font-serif">
                    AI <br />
                    Assistance
                  </h3>
                  <p className="text-gray-400 text-lg leading-snug">
                    Ask our Gemini-powered assistant anything about voting,
                    booths, rights, and more.
                  </p>
                </div>

                <div className="w-full h-px bg-white/10 mt-8"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Background Pattern */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, #333 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}></div>
      </section>

      {/* CTA Section */}
      <section id="how-it-works" className="py-32 relative">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="reveal text-center mb-12">
            <h2 className="text-4xl md:text-6xl font-serif mb-6">
              Ready to explore?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Start a conversation with our AI assistant and get answers to all
              your questions about India&apos;s electoral process.
            </p>
            <button
              onClick={handleStartChat}
              aria-label="Talk to us Now"
              className="px-8 py-4 bg-[#FF9933] hover:bg-[#FF7700] text-[#050505] font-semibold rounded-full transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:ring-offset-2 focus:ring-offset-[#050505]">
              Talk to us Now →
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5 bg-[#050505] relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
            <div className="w-full md:w-auto">
              <h2 className="text-[10vw] leading-[0.8] tracking-tighter text-white/10 font-bold select-none pointer-events-none">
                VOTERPATH.
              </h2>
            </div>

            <div className="flex flex-col gap-8 text-right">
              <div className="flex flex-col items-end gap-4 text-gray-400">
                <a
                  href="https://github.com/Shyamyemuka"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="flex items-center gap-3 hover:text-white transition-colors group">
                  <FaGithub
                    className="w-5 h-5 group-hover:scale-110 transition-transform"
                    aria-hidden="true"
                  />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/shyamyemuka"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="flex items-center gap-3 hover:text-white transition-colors group">
                  <FaLinkedin
                    className="w-5 h-5 group-hover:scale-110 transition-transform"
                    aria-hidden="true"
                  />
                  <span>LinkedIn</span>
                </a>
                <a
                  href="https://www.instagram.com/el_berlin304"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram Profile"
                  className="flex items-center gap-3 hover:text-white transition-colors group">
                  <FaInstagram
                    className="w-5 h-5 group-hover:scale-110 transition-transform"
                    aria-hidden="true"
                  />
                  <span>Instagram</span>
                </a>
              </div>
              <p className="text-sm text-gray-600">
                © 2026 VoterPath. Empowering democracy.
              </p>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .reveal.active {
          opacity: 1;
          transform: translateY(0);
        }

        @keyframes float-left {
          0%,
          100% {
            transform: translateY(0) rotate(0);
          }
          50% {
            transform: translateY(-20px) rotate(2deg);
          }
        }

        @keyframes float-right {
          0%,
          100% {
            transform: translateY(0) rotate(0);
          }
          50% {
            transform: translateY(20px) rotate(-2deg);
          }
        }

        .animate-float-left {
          animation: float-left 12s ease-in-out infinite;
        }

        .animate-float-right {
          animation: float-right 14s ease-in-out infinite;
        }

        .parallax-card-up {
          transform: translateY(var(--scroll-offset-up, 0px));
        }

        .parallax-card-down {
          transform: translateY(var(--scroll-offset-down, 0px));
        }
      `}</style>
    </main>
  );
}
