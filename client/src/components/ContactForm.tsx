import { useState } from "react";
import type { FormEvent } from "react";
import { FiMail, FiMessageSquare, FiSend, FiTag, FiUser, FiX } from "react-icons/fi";
import { ClipLoader } from "react-spinners";
import { useAuth } from "../context/AuthContext";
import { useAppContext } from "../context/AppContext";
import type { ContactPayload } from "../types";

const initialContactState: ContactPayload = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

interface ContactFormProps {
  isModal?: boolean;
  onClose?: () => void;
}

function ContactForm({ isModal = false, onClose }: ContactFormProps) {
  const { user } = useAuth();
  const { submitContactForm, contactSubmitting, lastContact } = useAppContext();
  const [formData, setFormData] = useState<ContactPayload>({
    ...initialContactState,
    name: user?.name ?? "",
    email: user?.email ?? "",
  });

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await submitContactForm(formData);
    setFormData((current) => ({
      ...initialContactState,
      name: current.name,
      email: current.email,
    }));
    onClose?.();
  };

  const formBody = (
    <section className={`glass-card ${isModal ? "max-h-[calc(100vh-2rem)] overflow-y-auto rounded-[24px] p-4 sm:max-h-[calc(100vh-4rem)] sm:rounded-[28px] sm:p-7" : "rounded-[32px] p-6 sm:p-8"}`}>
      <div className="mb-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-300/80 sm:text-sm sm:tracking-[0.3em]">
              Contact Form
            </p>
            <h2 className="mt-3 text-2xl font-extrabold text-white sm:text-4xl">
              Reach the support team directly
            </h2>
          </div>
          {isModal ? (
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-200 transition hover:bg-white/10"
              aria-label="Close contact form"
            >
              <FiX className="text-lg" />
            </button>
          ) : null}
        </div>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:leading-7">
          This extra form helps your assessment clearly show a contact flow alongside the healthcare support and AI guidance features.
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
            placeholder="Enter your name"
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

        <label className="block text-left md:col-span-2">
          <span className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-200">
            <FiTag className="text-emerald-300" />
            Subject
          </span>
          <input
            className="field"
            value={formData.subject}
            onChange={(event) => setFormData({ ...formData, subject: event.target.value })}
            placeholder="Subject of your query"
            required
          />
        </label>

        <label className="block text-left md:col-span-2">
          <span className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-200">
            <FiMessageSquare className="text-emerald-300" />
            Message
          </span>
          <textarea
            className="field min-h-32 resize-y"
            value={formData.message}
            onChange={(event) => setFormData({ ...formData, message: event.target.value })}
            placeholder="Write your contact message here..."
            required
          />
        </label>

        <div className="md:col-span-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-slate-300">
            {lastContact ? (
              <span>Last contact saved at {new Date(lastContact.createdAt).toLocaleString()}</span>
            ) : (
              <span>Your message will be stored securely in MongoDB.</span>
            )}
          </div>
          <button type="submit" className="btn-primary w-full gap-2 sm:w-auto sm:min-w-44" disabled={contactSubmitting}>
            {contactSubmitting ? (
              <>
                <ClipLoader color="#020617" size={18} />
                Sending...
              </>
            ) : (
              <>
                <FiSend className="text-base" />
                Send Contact
              </>
            )}
          </button>
        </div>
      </form>
    </section>
  );

  if (!isModal) {
    return formBody;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/70 px-3 py-4 backdrop-blur-md sm:px-4 sm:py-8">
      <div className="w-full max-w-3xl">
        {formBody}
      </div>
    </div>
  );
}

export default ContactForm;
