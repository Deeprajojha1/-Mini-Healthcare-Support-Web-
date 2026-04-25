import { PulseLoader } from "react-spinners";

interface PageLoaderProps {
  label?: string;
}

function PageLoader({ label = "Loading your healthcare workspace..." }: PageLoaderProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
      <div className="glass-card rounded-[28px] px-8 py-7">
        <PulseLoader color="#6ee7b7" size={12} margin={6} />
        <p className="mt-4 text-sm font-medium text-slate-200">{label}</p>
      </div>
    </div>
  );
}

export default PageLoader;
