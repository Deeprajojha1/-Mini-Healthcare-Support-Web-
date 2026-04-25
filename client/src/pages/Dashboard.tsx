import Navbar from "../components/Navbar";
import AdviceCard from "../components/AdviceCard";
import {
  FiActivity,
  FiCheckCircle,
  FiClock,
  FiFileText,
  FiHeart,
  FiInbox,
  FiMail,
  FiShield,
  FiUsers,
} from "react-icons/fi";
import Form from "./Form";
import { useAppContext } from "../context/AppContext";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { user } = useAuth();
  const { advice, lastSubmission, lastContact } = useAppContext();

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 sm:gap-8 sm:px-6 sm:py-8 lg:py-10">
        <section className="relative overflow-hidden rounded-[28px] border border-white/10 bg-slate-950/45 px-4 py-6 sm:rounded-[36px] sm:px-8 sm:py-8 lg:px-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.22),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(110,231,183,0.12),transparent_25%)]" />
          <div className="relative grid gap-6 lg:grid-cols-[1.5fr_1fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300/80 sm:text-sm sm:tracking-[0.35em]">
                Care Dashboard
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/15 bg-emerald-400/10 px-3 py-2 text-[11px] font-semibold text-emerald-200 sm:px-4 sm:text-xs">
                  <FiShield />
                  Secure support flow
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-sky-300/15 bg-sky-400/10 px-3 py-2 text-[11px] font-semibold text-sky-100 sm:px-4 sm:text-xs">
                  <FiActivity />
                  AI-assisted suggestions
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/15 bg-amber-300/10 px-3 py-2 text-[11px] font-semibold text-amber-100 sm:px-4 sm:text-xs">
                  <FiUsers />
                  Patient + volunteer ready
                </span>
              </div>
              <h1 className="mt-4 max-w-3xl text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
                Hello, {user?.name}. Let&apos;s make support feel faster, calmer, and more human.
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base sm:leading-7">
                Use this space to submit a healthcare concern, coordinate volunteer help, and receive a basic AI-generated suggestion that can help you decide the next safe step.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <div className="glass-card hover-lift rounded-[28px] p-5">
                <div className="flex items-center justify-between">
                  <p className="text-xs uppercase tracking-[0.25em] text-emerald-300/80">Status</p>
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-400/15 text-emerald-300">
                    <FiCheckCircle className="text-lg" />
                  </div>
                </div>
                <p className="mt-3 text-2xl font-bold text-white">Authenticated</p>
                <p className="mt-2 text-sm text-slate-300">Protected dashboard access is active.</p>
              </div>
              <div className="glass-card hover-lift rounded-[28px] p-5">
                <div className="flex items-center justify-between">
                  <p className="text-xs uppercase tracking-[0.25em] text-emerald-300/80">Latest Role</p>
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-400/15 text-sky-200">
                    <FiUsers className="text-lg" />
                  </div>
                </div>
                <p className="mt-3 text-2xl font-bold text-white">{lastSubmission?.role ?? "Waiting"}</p>
                <p className="mt-2 text-sm text-slate-300">Updates after your most recent submission.</p>
              </div>
            </div>
          </div>
        </section>

        <div className="grid gap-8 xl:grid-cols-[1.25fr_0.75fr]">
          <div className="flex flex-col gap-6">
            <Form />
          </div>

          <div className="flex flex-col gap-6">
            <section className="glass-card hover-lift rounded-[24px] p-5 sm:rounded-[28px] sm:p-6">
              <div className="flex items-start justify-between gap-3">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300/80 sm:text-sm sm:tracking-[0.25em]">
                  Submission Snapshot
                </p>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-400/15 text-emerald-300 sm:h-11 sm:w-11">
                  <FiFileText className="text-lg" />
                </div>
              </div>
              {lastSubmission ? (
                <div className="mt-5 space-y-3 text-sm text-slate-200">
                  <p className="flex items-start gap-2 break-words"><FiHeart className="mt-0.5 shrink-0 text-emerald-300" /><span className="text-slate-400">Name:</span> <span className="min-w-0 break-all">{lastSubmission.name}</span></p>
                  <p className="flex items-start gap-2 break-words"><FiMail className="mt-0.5 shrink-0 text-emerald-300" /><span className="text-slate-400">Email:</span> <span className="min-w-0 break-all">{lastSubmission.email}</span></p>
                  <p className="flex items-start gap-2 break-words"><FiUsers className="mt-0.5 shrink-0 text-emerald-300" /><span className="text-slate-400">Role:</span> <span>{lastSubmission.role}</span></p>
                  <p className="flex items-start gap-2 break-words"><FiClock className="mt-0.5 shrink-0 text-emerald-300" /><span className="text-slate-400">Saved:</span> <span>{new Date(lastSubmission.createdAt).toLocaleString()}</span></p>
                </div>
              ) : (
                <p className="mt-5 text-sm leading-7 text-slate-300">
                  No requests submitted yet. Once you send one, the latest record details will appear here.
                </p>
              )}
            </section>

            <section className="glass-card hover-lift rounded-[24px] p-5 sm:rounded-[28px] sm:p-6">
              <div className="flex items-start justify-between gap-3">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300/80 sm:text-sm sm:tracking-[0.25em]">
                  Contact Snapshot
                </p>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-sky-400/15 text-sky-200 sm:h-11 sm:w-11">
                  <FiInbox className="text-lg" />
                </div>
              </div>
              {lastContact ? (
                <div className="mt-5 space-y-3 text-sm text-slate-200">
                  <p className="flex items-start gap-2 break-words"><FiFileText className="mt-0.5 shrink-0 text-sky-200" /><span className="text-slate-400">Subject:</span> <span className="min-w-0 break-all">{lastContact.subject}</span></p>
                  <p className="flex items-start gap-2 break-words"><FiMail className="mt-0.5 shrink-0 text-sky-200" /><span className="text-slate-400">Email:</span> <span className="min-w-0 break-all">{lastContact.email}</span></p>
                  <p className="flex items-start gap-2 break-words"><FiClock className="mt-0.5 shrink-0 text-sky-200" /><span className="text-slate-400">Saved:</span> <span>{new Date(lastContact.createdAt).toLocaleString()}</span></p>
                </div>
              ) : (
                <p className="mt-5 text-sm leading-7 text-slate-300">
                  No contact requests submitted yet. This section helps demonstrate the additional assessment feature clearly.
                </p>
              )}
            </section>

            {advice ? (
              <AdviceCard advice={advice} />
            ) : (
              <section className="glass-card hover-lift rounded-[24px] p-5 text-left sm:rounded-[28px] sm:p-6">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300/80 sm:text-sm sm:tracking-[0.25em]">
                    Gemini Response
                  </p>
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-violet-400/15 text-violet-200 sm:h-11 sm:w-11">
                    <FiActivity className="text-lg" />
                  </div>
                </div>
                <p className="mt-4 text-sm leading-7 text-slate-300">
                  Your AI-generated wellness suggestion will appear here right after form submission.
                </p>
              </section>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
