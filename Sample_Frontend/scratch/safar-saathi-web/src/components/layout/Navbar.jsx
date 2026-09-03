import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { LogOut, Menu, X, User as UserIcon } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Packages", path: "/packages" },
    { name: "Hotels & Stays", path: "/hotels" },
  ];

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: isScrolled ? "12px 48px" : "18px 48px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "rgba(15, 23, 42, 0.78)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
        boxShadow: isScrolled ? "0 12px 40px rgba(0, 0, 0, 0.4)" : "0 4px 20px rgba(0, 0, 0, 0.25)",
        transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {/* Brand Logo */}
      <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
        <div
          style={{
            color: "#ffffff",
            fontSize: "26px",
            fontWeight: "900",
            letterSpacing: "-1.5px",
            display: "flex",
            alignItems: "center",
          }}
        >
          Safar<span style={{ color: "#38bdf8" }}>Saathi</span>
        </div>
      </Link>

      {/* Desktop Navigation Links & User Controls */}
      <div className="hidden md:flex" style={{ alignItems: "center", gap: "35px" }}>
        <div style={{ display: "flex", gap: "28px", alignItems: "center" }}>
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;

            return (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  color: isActive ? "#38bdf8" : "#ffffff",
                  textDecoration: "none",
                  fontSize: "13px",
                  fontWeight: "700",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  transition: "all 0.3s ease",
                  opacity: isActive ? 1 : 0.85,
                  borderBottom: isActive ? "2px solid #38bdf8" : "2px solid transparent",
                  paddingBottom: "4px"
                }}
              >
                {link.name}
              </Link>
            );
          })}

          {user && (
            <Link
              to={(user.userRole || "").toUpperCase() === "CUSTOMER" ? "/customer" : "/vendor"}
              style={{
                color: location.pathname.startsWith("/customer") || location.pathname.startsWith("/vendor") ? "#38bdf8" : "#ffffff",
                textDecoration: "none",
                fontSize: "13px",
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: "1px",
                transition: "all 0.3s ease",
                opacity: location.pathname.startsWith("/customer") || location.pathname.startsWith("/vendor") ? 1 : 0.85,
                borderBottom: location.pathname.startsWith("/customer") || location.pathname.startsWith("/vendor") ? "2px solid #38bdf8" : "2px solid transparent",
                paddingBottom: "4px"
              }}
            >
              {(user.userRole || "").toUpperCase() === "CUSTOMER" ? "My Trips" : "Dashboard"}
            </Link>
          )}
        </div>

        {!user ? (
          <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
            <Link
              to="/login"
              style={{
                color: "#ffffff",
                textDecoration: "none",
                fontSize: "13px",
                fontWeight: "800",
                textTransform: "uppercase",
                letterSpacing: "1px",
                opacity: 0.9,
                transition: "opacity 0.2s ease"
              }}
            >
              Login
            </Link>
            <Link
              to="/register"
              style={{
                background: "linear-gradient(to right, #008cff, #005eff)",
                color: "white",
                padding: "9px 22px",
                borderRadius: "30px",
                fontWeight: "800",
                textDecoration: "none",
                fontSize: "12px",
                textTransform: "uppercase",
                letterSpacing: "1px",
                boxShadow: "0 4px 15px rgba(0, 140, 255, 0.4)",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
              onMouseOut={(e) => (e.currentTarget.style.transform = "translateY(0)")}
            >
              Create Account
            </Link>
          </div>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                background: "rgba(255, 255, 255, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                padding: "6px 14px",
                borderRadius: "20px",
                display: "flex",
                alignItems: "center",
                gap: "10px"
              }}
            >
              <UserIcon size={16} className="text-sky-400" />
              <div style={{ textAlign: "left" }}>
                <div
                  style={{
                    color: "#94a3b8",
                    fontSize: "9px",
                    fontWeight: "900",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px"
                  }}
                >
                  {user.userRole}
                </div>
                <div
                  style={{
                    color: "#ffffff",
                    fontSize: "13px",
                    fontWeight: "800",
                    lineHeight: "1.2"
                  }}
                >
                  {user.name}
                </div>
              </div>
            </div>

            <button
              onClick={logout}
              className="bg-red-500/15 hover:bg-red-500 text-red-400 hover:text-white p-2.5 rounded-xl transition-all duration-300 border border-red-500/20"
              title="Logout"
            >
              <LogOut size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Mobile Hamburger Button */}
      <button
        className="md:hidden"
        style={{
          background: "transparent",
          border: "none",
          color: "#ffffff",
          cursor: "pointer",
        }}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
      </button>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden"
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: "rgba(15, 23, 42, 0.98)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            gap: "18px",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              style={{
                color: location.pathname === link.path ? "#38bdf8" : "#ffffff",
                textDecoration: "none",
                fontSize: "16px",
                fontWeight: "700",
              }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}

          {user && (
            <Link
              to={(user.userRole || "").toUpperCase() === "CUSTOMER" ? "/customer" : "/vendor"}
              style={{
                color: "#38bdf8",
                textDecoration: "none",
                fontSize: "16px",
                fontWeight: "700",
              }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {(user.userRole || "").toUpperCase() === "CUSTOMER" ? "My Trips" : "Dashboard"}
            </Link>
          )}

          {!user ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "10px" }}>
              <Link
                to="/login"
                style={{
                  color: "#ffffff",
                  textDecoration: "none",
                  fontSize: "16px",
                  fontWeight: "700",
                }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                style={{
                  background: "linear-gradient(to right, #008cff, #005eff)",
                  color: "white",
                  padding: "12px",
                  borderRadius: "12px",
                  textAlign: "center",
                  fontWeight: "800",
                  textDecoration: "none",
                  fontSize: "15px",
                }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Create Account
              </Link>
            </div>
          ) : (
            <button
              onClick={() => {
                logout();
                setIsMobileMenuOpen(false);
              }}
              style={{
                background: "#FF3B30",
                color: "white",
                padding: "12px",
                borderRadius: "12px",
                border: "none",
                fontWeight: "700",
                fontSize: "15px",
                marginTop: "10px",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
