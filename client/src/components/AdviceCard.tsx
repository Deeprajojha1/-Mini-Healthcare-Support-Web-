import { FiActivity, FiAlertTriangle, FiZap } from "react-icons/fi";

interface AdviceCardProps {
  advice: string;
}

function AdviceCard({ advice }: AdviceCardProps) {
  return (
    <section className="glass-card hover-lift rounded-[28px] p-6 text-left">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400/15 text-emerald-300">
          <FiZap className="text-lg" />
        </div>
        <div>
          <p className="text-sm font-semibold text-emerald-300">Gemini Suggestion</p>
          <p className="text-xs text-slate-400">Basic wellness guidance based on the submitted issue</p>
        </div>
      </div>
      <div className="mb-4 flex flex-wrap gap-3">
        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/15 bg-emerald-400/10 px-3 py-1.5 text-xs font-semibold text-emerald-100">
          <FiActivity />
          Quick AI summary
        </span>
        <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/15 bg-amber-300/10 px-3 py-1.5 text-xs font-semibold text-amber-100">
          <FiAlertTriangle />
          Not a diagnosis
        </span>
      </div>
      <p className="text-sm leading-7 text-slate-100">{advice}</p>
      <p className="mt-4 text-xs leading-6 text-amber-200/80">
        This is general guidance only and should not replace professional medical diagnosis or emergency care.
      </p>
    </section>
  );
}

export default AdviceCard;
