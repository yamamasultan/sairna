
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, LockKeyhole, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../auth/useAuth";

function AdminLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email.trim(), password);
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.message ||
        "تعذر تسجيل الدخول، تأكدي من البيانات"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div dir="rtl" className="min-h-screen flex items-center justify-center bg-[var(--bg)] px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8 shadow-lg">
        <div className="mb-8 text-center">
          <h1 className="mb-3 text-3xl font-bold text-[var(--text)]">
            SAIRNA
          </h1>
          <h2 className="text-xl font-semibold text-[var(--text)]">
            تسجيل دخول المدير
          </h2>
          <p className="mt-2 text-sm text-[var(--muted)]">
            سجّلي الدخول للوصول إلى لوحة التحكم
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-[var(--text)]">
              البريد الإلكتروني
            </label>
            <div className="flex items-center gap-3 rounded-xl border border-[var(--border)] px-4">
              <Mail size={19} className="text-[var(--muted)]" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="w-full bg-transparent py-3 text-[var(--text)] outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[var(--text)]">
              كلمة المرور
            </label>
            <div className="flex items-center gap-3 rounded-xl border border-[var(--border)] px-4">
              <LockKeyhole size={19} className="text-[var(--muted)]" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="أدخلي كلمة المرور"
                className="w-full bg-transparent py-3 text-[var(--text)] outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-[var(--muted)]"
              >
                {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
              </button>
            </div>
          </div>

          {error && (
            <p className="rounded-lg bg-red-100 p-3 text-sm text-red-700">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-emerald-600 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-emerald-700 disabled:opacity-60"
          >
            {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
