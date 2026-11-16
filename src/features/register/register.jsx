import { useRegister } from './hook';
import RegisterAlert from './components/registerAlert';
import RegisterForm from './components/registerForm';
import RegisterBanner from './components/registerBanner';

export default function Register({ onRegisterSuccess }) {
  const {
    name,
    email,
    password,
    showPassword,
    acceptTerms,
    isLoading,
    fieldErrors,
    alert,
    setAcceptTerms,
    handleNameChange,
    handleEmailChange,
    handlePasswordChange,
    togglePasswordVisibility,
    handleSubmit,
    showAlert,
  } = useRegister(onRegisterSuccess);

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[var(--bg)] text-[var(--text)] flex flex-col justify-between relative overflow-x-hidden transition-colors duration-300"
    >
      <RegisterAlert alert={alert} />

      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-10">
        <div className="w-full max-w-[1120px] bg-[var(--surface)] rounded-[var(--radius)] shadow-[0_20px_50px_rgba(16,58,78,0.08)] border border-[var(--border)] overflow-hidden grid grid-cols-1 lg:grid-cols-12 transition-colors duration-300">
          <RegisterForm
            name={name}
            email={email}
            password={password}
            showPassword={showPassword}
            acceptTerms={acceptTerms}
            isLoading={isLoading}
            fieldErrors={fieldErrors}
            setAcceptTerms={setAcceptTerms}
            handleNameChange={handleNameChange}
            handleEmailChange={handleEmailChange}
            handlePasswordChange={handlePasswordChange}
            togglePasswordVisibility={togglePasswordVisibility}
            handleSubmit={handleSubmit}
            showAlert={showAlert}
          />
          <RegisterBanner />
        </div>
      </main>
    </div>
  );
}