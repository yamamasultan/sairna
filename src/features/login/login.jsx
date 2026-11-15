import { useLogin } from './hook';
import LoginAlert from './components/loginAlert';
import LoginForm from './components/loginForm';
import LoginBanner from './components/loginBanner';

export default function Login({ onLoginSuccess }) {
  const {
    email,
    password,
    rememberMe,
    showPassword,
    isLoading,
    fieldErrors,
    alert,
    setRememberMe,
    handleEmailChange,
    handlePasswordChange,
    togglePasswordVisibility,
    handleSubmit,
    showAlert,
  } = useLogin(onLoginSuccess);

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[var(--bg)] text-[var(--text)] flex flex-col justify-between relative overflow-x-hidden transition-colors duration-300"
    >
      <LoginAlert alert={alert} />

      {/* البطاقة الرئيسية المقسمة */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-10">
        <div className="w-full max-w-[1120px] bg-[var(--surface)] rounded-[var(--radius)] shadow-[0_20px_50px_rgba(16,58,78,0.08)] border border-[var(--border)] overflow-hidden grid grid-cols-1 lg:grid-cols-12 transition-colors duration-300">
          <LoginForm
            email={email}
            password={password}
            rememberMe={rememberMe}
            showPassword={showPassword}
            isLoading={isLoading}
            fieldErrors={fieldErrors}
            setRememberMe={setRememberMe}
            handleEmailChange={handleEmailChange}
            handlePasswordChange={handlePasswordChange}
            togglePasswordVisibility={togglePasswordVisibility}
            handleSubmit={handleSubmit}
            showAlert={showAlert}
          />
          <LoginBanner />
        </div>
      </main>
    </div>
  );
}