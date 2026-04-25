import { useState } from "react";
import type { FormEvent } from "react";
import { Link, Navigate } from "react-router-dom";
import { FiArrowRight, FiUserPlus } from "react-icons/fi";
import { ClipLoader } from "react-spinners";
import { useAuth } from "../context/AuthContext";
import PageLoader from "../components/PageLoader";

function Signup() {
  const { isAuthenticated, signup, loading, bootstrapping } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (bootstrapping) {
    return <PageLoader label="Preparing account setup..." />;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await signup(name, email, password);
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-6 sm:py-10">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-[28px] border border-white/10 bg-slate-950/45 sm:rounded-[36px] lg:grid-cols-[0.92fr_1.08fr]">
        <section className="flex items-center p-5 sm:p-10">
          <div className="mx-auto w-full max-w-md text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-300/80 sm:text-sm sm:tracking-[0.3em]">Create Account</p>
            <h1 className="mt-4 text-2xl font-extrabold text-white sm:text-3xl">Start your healthcare support space</h1>
            <p className="mt-3 text-sm leading-6 text-slate-300 sm:leading-7">
              Create an account to submit support requests, keep records organized, and receive a quick AI suggestion after each submission.
            </p>

            <form className="mt-8 space-y-5" onSubmit={onSubmit}>
              <label className="block text-left">
                <span className="mb-2 block text-sm font-medium text-slate-200">Full Name</span>
                <input
                  className="field"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Your full name"
                  required
                />
              </label>

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
                  placeholder="Create a strong password"
                  minLength={6}
                  required
                />
              </label>

              <button type="submit" className="btn-primary w-full gap-2" disabled={loading}>
                {loading ? (
                  <>
                    <ClipLoader color="#020617" size={18} />
                    Creating...
                  </>
                ) : (
                  <>
                    <FiUserPlus className="text-base" />
                    Create Account
                  </>
                )}
              </button>
            </form>

            <p className="mt-6 text-sm text-slate-300">
              Already have an account?{" "}
              <Link to="/login" className="inline-flex items-center gap-1 font-semibold text-emerald-300">
                Login
                <FiArrowRight className="text-sm" />
              </Link>
            </p>
          </div>
        </section>

        <section className="hidden bg-[radial-gradient(circle_at_bottom_right,rgba(110,231,183,0.25),transparent_25%),linear-gradient(180deg,#092418_0%,#05110d_100%)] p-10 lg:flex lg:flex-col lg:justify-between">
          <div className="rounded-[30px] border border-white/10 bg-white/5 p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-300/80">Included</p>
            <ul className="mt-5 space-y-4 text-sm leading-7 text-slate-200">
              <li>JWT-secured authentication</li>
              <li>Protected dashboard with responsive form workflow</li>
              <li>MongoDB storage for healthcare support messages</li>
              <li>Gemini-powered basic advice output</li>
            </ul>
          </div>
          <h2 className="max-w-md text-4xl font-extrabold leading-tight text-white">
            A compact MERN foundation that still feels ready for production.
          </h2>
        </section>
      </div>
    </div>
  );
}

export default Signup;
