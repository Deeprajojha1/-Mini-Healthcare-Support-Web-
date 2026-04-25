import { createContext, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import toast from "react-hot-toast";
import api from "../lib/api";
import type { ContactPayload, ContactRecord, FormPayload, FormRecord } from "../types";

interface AppContextValue {
  advice: string;
  lastSubmission: FormRecord | null;
  lastContact: ContactRecord | null;
  submitting: boolean;
  contactSubmitting: boolean;
  requestAdvice: (message: string, role: FormPayload["role"]) => Promise<string>;
  submitSupportForm: (payload: FormPayload) => Promise<void>;
  submitContactForm: (payload: ContactPayload) => Promise<void>;
  clearAdvice: () => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [advice, setAdvice] = useState("");
  const [lastSubmission, setLastSubmission] = useState<FormRecord | null>(null);
  const [lastContact, setLastContact] = useState<ContactRecord | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [contactSubmitting, setContactSubmitting] = useState(false);

  const requestAdvice = async (message: string, role: FormPayload["role"]) => {
    const { data } = await api.post<{ advice: string }>("/ai/advice", { message, role });
    setAdvice(data.advice);
    return data.advice;
  };

  const submitSupportForm = async (payload: FormPayload) => {
    setSubmitting(true);

    try {
      const [formResponse, adviceText] = await Promise.all([
        api.post<{ form: FormRecord }>("/form/submit", payload),
        requestAdvice(payload.message, payload.role),
      ]);

      setLastSubmission(formResponse.data.form);
      setAdvice(adviceText);
      toast.success("Your healthcare request has been submitted.");
    } catch (error: unknown) {
      const message =
        typeof error === "object" &&
        error !== null &&
        "response" in error &&
        typeof (error as { response?: { data?: { message?: string } } }).response?.data?.message ===
          "string"
          ? (error as { response?: { data?: { message?: string } } }).response?.data?.message
          : "Something went wrong while submitting.";
      toast.error(message ?? "Something went wrong while submitting.");
      throw error;
    } finally {
      setSubmitting(false);
    }
  };

  const clearAdvice = () => setAdvice("");

  const submitContactForm = async (payload: ContactPayload) => {
    setContactSubmitting(true);

    try {
      const { data } = await api.post<{ contact: ContactRecord }>("/contact/submit", payload);
      setLastContact(data.contact);
      toast.success("Your contact request has been sent.");
    } catch (error: unknown) {
      const message =
        typeof error === "object" &&
        error !== null &&
        "response" in error &&
        typeof (error as { response?: { data?: { message?: string } } }).response?.data?.message ===
          "string"
          ? (error as { response?: { data?: { message?: string } } }).response?.data?.message
          : "Something went wrong while sending the contact request.";
      toast.error(message ?? "Something went wrong while sending the contact request.");
      throw error;
    } finally {
      setContactSubmitting(false);
    }
  };

  const value = useMemo(
    () => ({
      advice,
      lastSubmission,
      lastContact,
      submitting,
      contactSubmitting,
      requestAdvice,
      submitSupportForm,
      submitContactForm,
      clearAdvice,
    }),
    [advice, lastSubmission, lastContact, submitting, contactSubmitting],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }

  return context;
}
