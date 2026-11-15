import { AlertCircle, CheckCircle2 } from 'lucide-react';

export default function LoginAlert({ alert }) {
  if (!alert) return null;

  return (
    <div
      className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl border transition-all duration-300 max-w-md w-[90%] ${
        alert.type === 'error'
          ? 'bg-red-50 border-red-200 text-red-800'
          : 'bg-emerald-50 border-emerald-200 text-emerald-800'
      }`}
    >
      {alert.type === 'error' ? (
        <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
      ) : (
        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
      )}
      <p className="text-sm font-semibold leading-relaxed">{alert.message}</p>
    </div>
  );
}