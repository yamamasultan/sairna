import { Mail, Lock, Eye, EyeOff, ArrowLeft, Sparkles, Loader2 } from 'lucide-react';

export default function LoginForm({
  email,
  password,
  rememberMe,
  showPassword,
  isLoading,
  fieldErrors,
  setRememberMe,
  handleEmailChange,
  handlePasswordChange,
  togglePasswordVisibility,
  handleSubmit,
  showAlert,
}) {
  return (
    <div className="lg:col-span-6 p-6 sm:p-10 md:p-12 flex flex-col justify-center order-2 lg:order-1 bg-[var(--surface)] text-[var(--text)]">
      {/* شارة أهلاً برجعتك */}
      <div className="inline-flex items-center gap-2 bg-[var(--soft-teal)] text-[var(--primary)] px-4 py-1.5 rounded-full text-xs font-bold w-fit mb-5">
        <Sparkles className="w-3.5 h-3.5" />
        <span>أهلاً برجعتك</span>
      </div>

      {/* العنوان الرئيسي */}
      <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--text)] mb-2">
        منوّر، <span className="text-[var(--primary)]">اشتقنالك!</span>
      </h1>
      <p className="text-sm sm:text-base text-[var(--muted)] mb-8">
        ادخل على حسابك، وكمّل حجز رحلتك براحة.
      </p>

      {/* النموذج */}
      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        {/* البريد الإلكتروني */}
        <div>
          <label className="block text-sm font-bold text-[var(--text)] mb-2">
            البريد الإلكتروني
          </label>
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
                fieldErrors.email
                  ? 'border-red-400 focus:ring-red-200'
                  : 'border-[var(--border)] focus:border-[var(--primary)] focus:ring-[var(--primary)]/20'
              }`}
            />
          </div>
          {fieldErrors.email && (
            <p className="mt-1.5 text-xs font-semibold text-red-500">{fieldErrors.email}</p>
          )}
        </div>

        {/* كلمة المرور */}
        <div>
          <label className="block text-sm font-bold text-[var(--text)] mb-2">
            كلمة المرور
          </label>
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
                fieldErrors.password
                  ? 'border-red-400 focus:ring-red-200'
                  : 'border-[var(--border)] focus:border-[var(--primary)] focus:ring-[var(--primary)]/20'
              }`}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              aria-label={showPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
              className="absolute inset-y-0 left-0 pl-4 flex items-center text-[var(--muted)] hover:text-[var(--text)] transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {fieldErrors.password && (
            <p className="mt-1.5 text-xs font-semibold text-red-500">
              {fieldErrors.password}
            </p>
          )}
        </div>

        {/* تذكرني ونسيت كلمة المرور */}
        <div className="flex items-center justify-between pt-1">
          <label className="inline-flex items-center gap-2.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded border-[var(--border)] text-[var(--primary)] focus:ring-[var(--primary)]"
            />
            <span className="text-sm text-[var(--muted)] font-medium">تذكرني</span>
          </label>

          <a
            href="#forgot"
            onClick={(e) => {
              e.preventDefault();
              showAlert('error', 'يرجى التواصل مع إدارة النظام لإعادة تعيين كلمة المرور.');
            }}
            className="text-sm font-bold text-[var(--primary)] hover:underline"
          >
            نسيت كلمة المرور؟
          </a>
        </div>

        {/* زر تسجيل الدخول */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-4 px-6 rounded-[16px] bg-[var(--primary)] hover:bg-[var(--primary-deep)] active:scale-[0.99] text-white font-bold text-base shadow-[0_10px_25px_rgba(10,169,155,0.3)] transition-all flex items-center justify-center gap-2.5 disabled:opacity-70"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>جاري تسجيل الدخول...</span>
            </>
          ) : (
            <>
              <span>تسجيل الدخول</span>
              <ArrowLeft className="w-5 h-5" />
            </>
          )}
        </button>
      </form>

      {/* رابط إنشاء حساب جديد */}
      <div className="mt-7 text-center">
        <p className="text-sm text-[var(--muted)]">
          لسا ما عندك حساب؟{' '}
          <a href="/register" className="font-bold text-[var(--primary)] hover:underline">
            أنشئ حساب جديد
          </a>
        </p>
      </div>
    </div>
  );
}