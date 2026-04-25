import { useState } from "react";
import type { FormEvent } from "react";
import { FiAlertCircle, FiMail, FiMessageSquare, FiSend, FiUser, FiUsers } from "react-icons/fi";
import { ClipLoader } from "react-spinners";
import { useAuth } from "../context/AuthContext";
import { useAppContext } from "../context/AppContext";
import type { FormPayload } from "../types";

const initialState: FormPayload = {
  name: "",
  email: "",
  message: "",
  role: "Patient",
};

function Form() {
  const { user } = useAuth();
  const { submitSupportForm, submitting } = useAppContext();
  const [formData, setFormData] = useState<FormPayload>({
    ...initialState,
    name: user?.name ?? "",
    email: user?.email ?? "",
  });

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      return;
    }

    await submitSupportForm(formData);
    setFormData((current) => ({ ...initialState, name: current.name, email: current.email }));
  };

  return (
    <section className="glass-card hover-lift rounded-[28px] p-5 sm:rounded-[32px] sm:p-8">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-300/80 sm:text-sm sm:tracking-[0.3em]">
          Healthcare Support Form
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/15 bg-emerald-400/10 px-3 py-2 text-[11px] font-semibold text-emerald-100 sm:px-4 sm:text-xs">
            <FiUser />
            Personalized details
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-sky-300/15 bg-sky-400/10 px-3 py-2 text-[11px] font-semibold text-sky-100 sm:px-4 sm:text-xs">
            <FiMessageSquare />
            AI-ready summary
          </span>
        </div>
        <h2 className="mt-3 text-2xl font-extrabold text-white sm:text-4xl">
          Share your concern and get quick guidance
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:leading-7">
          Submit a patient request or volunteer support note. We will save it securely and generate a basic AI-powered suggestion for the issue you describe.
        </p>
      </div>

      <form className="grid gap-5 md:grid-cols-2" onSubmit={onSubmit}>
        <label className="block text-left">
          <span className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-200">
            <FiUser className="text-emerald-300" />
            Name
          </span>
          <input
            className="field"
            value={formData.name}
            onChange={(event) => setFormData({ ...formData, name: event.target.value })}
            placeholder="Enter your full name"
            required
          />
        </label>

        <label className="block text-left">
          <span className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-200">
            <FiMail className="text-emerald-300" />
            Email
          </span>
          <input
            className="field"
            type="email"
            value={formData.email}
            onChange={(event) => setFormData({ ...formData, email: event.target.value })}
            placeholder="Enter your email"
            required
          />
        </label>

        <label className="block text-left">
          <span className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-200">
            <FiUsers className="text-emerald-300" />
            Role
          </span>
          <select
            className="field"
            value={formData.role}
            onChange={(event) =>
              setFormData({ ...formData, role: event.target.value as FormPayload["role"] })
            }
          >
            <option value="Patient">Patient</option>
            <option value="Volunteer">Volunteer</option>
          </select>
        </label>

        <div className="rounded-[28px] border border-emerald-300/12 bg-emerald-300/8 p-5 text-left">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-300/10 text-emerald-300">
              <FiAlertCircle className="text-lg" />
            </div>
            <p className="text-sm font-semibold text-emerald-300">What happens next?</p>
          </div>
          <p className="mt-2 text-sm leading-6 text-slate-200">
            Your message is stored in MongoDB, then forwarded to Gemini for a short, practical wellness suggestion.
          </p>
        </div>

        <label className="block text-left md:col-span-2">
          <span className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-200">
            <FiMessageSquare className="text-emerald-300" />
            Problem / Message
          </span>
          <textarea
            className="field min-h-36 resize-y"
            value={formData.message}
            onChange={(event) => setFormData({ ...formData, message: event.target.value })}
            placeholder="Describe symptoms, concerns, or the kind of support you need..."
            required
          />
        </label>

        <div className="md:col-span-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm leading-6 text-slate-300">
            Keep urgent or emergency conditions out of chat and contact a licensed medical professional immediately.
          </p>
          <button type="submit" className="btn-primary w-full gap-2 sm:w-auto sm:min-w-44" disabled={submitting}>
            {submitting ? (
              <>
                <ClipLoader color="#020617" size={18} />
                Submitting...
              </>
            ) : (
              <>
                <FiSend className="text-base" />
                Submit Request
              </>
            )}
          </button>
        </div>
      </form>
    </section>
  );
}

export default Form;
