import { Link } from "react-router-dom";
import { useState } from "react";
import { FiLogOut, FiMail } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import ContactForm from "./ContactForm";

function Navbar() {
  const { user, logout } = useAuth();
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/35 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <Link to="/dashboard" className="flex items-center gap-3 self-start min-w-0">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-400/15 text-base font-extrabold text-emerald-300 sm:h-11 sm:w-11 sm:text-lg">
              HC
            </div>
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold tracking-[0.22em] text-emerald-300/80 uppercase sm:text-sm sm:tracking-[0.25em]">
                Mini Healthcare
              </p>
              <p className="truncate text-[11px] text-slate-300 sm:text-xs">Support portal for patients and volunteers</p>
            </div>
          </Link>

          <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between lg:w-auto lg:justify-end">
            <div className="text-left sm:block sm:text-right">
              <p className="text-sm font-semibold text-white">{user?.name}</p>
              <p className="truncate text-xs text-slate-300 sm:max-w-52">{user?.email}</p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:flex">
              <button
                type="button"
                onClick={() => setIsContactOpen(true)}
                className="btn-secondary gap-2 px-4 py-2.5"
              >
                <FiMail className="text-base" />
                Contact
              </button>
              <button type="button" onClick={logout} className="btn-secondary gap-2 px-4 py-2.5">
                <FiLogOut className="text-base" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {isContactOpen ? <ContactForm isModal onClose={() => setIsContactOpen(false)} /> : null}
    </>
  );
}

export default Navbar;
