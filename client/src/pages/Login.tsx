import { useState } from "react";
import type { FormEvent } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { FiArrowRight, FiLogIn } from "react-icons/fi";
import { ClipLoader } from "react-spinners";
import { useAuth } from "../context/AuthContext";
import PageLoader from "../components/PageLoader";

function Login() {
  const { isAuthenticated, login, loading, bootstrapping } = useAuth();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (bootstrapping) {
    return <PageLoader label="Preparing secure login..." />;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await login(email, password);
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-6 sm:py-10">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-[28px] border border-white/10 bg-slate-950/45 sm:rounded-[36px] lg:grid-cols-[1.1fr_0.9fr]">
        <section className="hidden bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.3),transparent_30%),linear-gradient(180deg,#0f2c21_0%,#081c15_100%)] p-10 lg:flex lg:flex-col lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300/80">Mini Healthcare</p>
            <h1 className="mt-6 text-5xl font-extrabold leading-tight text-white">
              Log in to manage healthcare support in one place.
            </h1>
          </div>
          <p className="max-w-md text-sm leading-7 text-slate-200">
            Keep requests organized, surface basic AI guidance, and give patients or volunteers a calmer support experience.
          </p>
        </section>

        <section className="flex items-center p-5 sm:p-10">
          <div className="mx-auto w-full max-w-md text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-300/80 sm:text-sm sm:tracking-[0.3em]">Welcome Back</p>
            <h2 className="mt-4 text-2xl font-extrabold text-white sm:text-3xl">Login to your account</h2>
            {location.state?.from ? (
              <p className="mt-3 text-sm leading-6 text-slate-300">Please login to continue to {location.state.from}.</p>
            ) : (
              <p className="mt-3 text-sm leading-6 text-slate-300">Enter your credentials to access the protected dashboard.</p>
            )}

            <form className="mt-8 space-y-5" onSubmit={onSubmit}>
              <label className="block text-left">
                <span className="mb-2 block text-sm font-medium text-slate-200">Email</span>
                <input
                  className="field"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  required
                />
              </label>

              <label className="block text-left">
                <span className="mb-2 block text-sm font-medium text-slate-200">Password</span>
                <input
                  className="field"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </label>

              <button type="submit" className="btn-primary w-full gap-2" disabled={loading}>
                {loading ? (
                  <>
                    <ClipLoader color="#020617" size={18} />
                    Logging in...
                  </>
                ) : (
                  <>
                    <FiLogIn className="text-base" />
                    Login
                  </>
                )}
              </button>
            </form>

            <p className="mt-6 text-sm text-slate-300">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="inline-flex items-center gap-1 font-semibold text-emerald-300">
                Create one
                <FiArrowRight className="text-sm" />
              </Link>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Login;
