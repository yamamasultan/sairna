import { User, Mail, Lock, Eye, EyeOff, ArrowLeft, Sparkles, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function RegisterForm({
  name,
  email,
  password,
  showPassword,
  acceptTerms,
  isLoading,
  fieldErrors,
  setAcceptTerms,
  handleNameChange,
  handleEmailChange,
  handlePasswordChange,
  togglePasswordVisibility,
  handleSubmit,
}) {
  return (
    <div className="lg:col-span-6 p-6 sm:p-10 md:p-12 flex flex-col justify-center order-2 lg:order-1 bg-[var(--surface)] text-[var(--text)]">
      <div className="inline-flex items-center gap-2 bg-[var(--soft-teal)] text-[var(--primary)] px-4 py-1.5 rounded-full text-xs font-bold w-fit mb-5">
        <Sparkles className="w-3.5 h-3.5" />
        <span>انضم لعيلة سيرنا</span>
      </div>

      <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--text)] mb-2">
        خليّنا نبدأ <span className="text-[var(--primary)]">المشوار سوا.</span>
      </h1>
      <p className="text-sm sm:text-base text-[var(--muted)] mb-8">
        حساب بسيط، ورحلاتك كلها بين إيديك.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div>
          <label className="block text-sm font-bold text-[var(--text)] mb-2">الاسم الكامل</label>
          <div className="relative">
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-[var(--muted)]">
              <User className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="اسمك الكامل"
              className={`w-full pr-12 pl-4 py-3.5 bg-[var(--surface-alt)] border rounded-[16px] text-sm text-[var(--text)] placeholder-[var(--muted)] focus:outline-none focus:ring-2 transition-all ${
                fieldErrors.name ? 'border-red-400 focus:ring-red-200' : 'border-[var(--border)] focus:border-[var(--primary)] focus:ring-[var(--primary)]/20'
              }`}
            />
          </div>
          {fieldErrors.name && <p className="mt-1 text-xs font-semibold text-red-500">{fieldErrors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-bold text-[var(--text)] mb-2">البريد الإلكتروني</label>
          <div className="relative">
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-[var(--muted)]">
              <Mail className="w-5 h-5" />
            </div>
            <input
              type="email"
              dir="ltr"
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
              placeholder="name@example.com"
              className={`w-full pr-12 pl-4 py-3.5 bg-[var(--surface-alt)] border rounded-[16px] text-sm text-[var(--text)] placeholder-[var(--muted)] text-left focus:outline-none focus:ring-2 transition-all ${
                fieldErrors.email ? 'border-red-400 focus:ring-red-200' : 'border-[var(--border)] focus:border-[var(--primary)] focus:ring-[var(--primary)]/20'
              }`}
            />
          </div>
          {fieldErrors.email && <p className="mt-1 text-xs font-semibold text-red-500">{fieldErrors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-bold text-[var(--text)] mb-2">كلمة المرور</label>
          <div className="relative">
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-[var(--muted)]">
              <Lock className="w-5 h-5" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => handlePasswordChange(e.target.value)}
              placeholder="6 أحرف على الأقل"
              className={`w-full pr-12 pl-12 py-3.5 bg-[var(--surface-alt)] border rounded-[16px] text-sm text-[var(--text)] placeholder-[var(--muted)] focus:outline-none focus:ring-2 transition-all ${
                fieldErrors.password ? 'border-red-400 focus:ring-red-200' : 'border-[var(--border)] focus:border-[var(--primary)] focus:ring-[var(--primary)]/20'
              }`}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 left-0 pl-4 flex items-center text-[var(--muted)] hover:text-[var(--text)] transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {fieldErrors.password && <p className="mt-1 text-xs font-semibold text-red-500">{fieldErrors.password}</p>}
        </div>

        <div className="pt-1">
          <label className="inline-flex items-center gap-2.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              className="w-4 h-4 rounded border-[var(--border)] text-[var(--primary)] focus:ring-[var(--primary)]"
            />
            <span className="text-sm text-[var(--muted)] font-medium">
              أوافق على استخدام بيانات تجريبية في هذا النموذج التعليمي
            </span>
          </label>
          {fieldErrors.terms && <p className="mt-1 text-xs font-semibold text-red-500">{fieldErrors.terms}</p>}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-4 px-6 rounded-[16px] bg-[var(--primary)] hover:bg-[var(--primary-deep)] active:scale-[0.99] text-white font-bold text-base shadow-[0_10px_25px_rgba(10,169,155,0.3)] transition-all flex items-center justify-center gap-2.5 disabled:opacity-70 mt-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>جاري إنشاء الحساب...</span>
            </>
          ) : (
            <>
              <span>إنشاء حساب</span>
              <ArrowLeft className="w-5 h-5" />
            </>
          )}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-[var(--muted)]">
        صاير عندك حساب من قبل؟{' '}
        <Link to="/login" className="font-bold text-[var(--primary)] hover:underline">
          سجّل دخولك
        </Link>
      </div>
    </div>
  );
}