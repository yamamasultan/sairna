
import { useProfile } from './hook';

import ProfileHero from './components/profileHero';
import ProfileSidebar from './components/profileSidebar';
import ProfileDetails from './components/profileDetails';

import { UserRound } from 'lucide-react';

export default function ProfilePage() {
  const {
    user,
    isAuthenticated,
    handleLogout,
    goToBookings,
    goToLogin
  } = useProfile();

  // إذا لم يكن المستخدم مسجل الدخول
  if (!isAuthenticated) {
    return (
      <main
        dir="rtl"
        className="min-h-[500px] bg-[var(--bg)] px-4 py-16 sm:px-6 lg:py-24"
      >
        <div className="mx-auto flex min-h-[400px] max-w-7xl flex-col items-center justify-center rounded-[24px] border border-dashed border-[var(--border)] bg-[var(--surface)] px-5 py-12 text-center">

          <UserRound
            size={46}
            strokeWidth={1.8}
            className="mb-3 text-[var(--primary)]"
          />

          <h1 className="mb-7 text-2xl font-black text-[var(--dark)]">
            أهلاً فيك!
          </h1>

          <p className="mb-7 text-base text-[var(--muted)] sm:text-lg">
            سجّل دخول حتى تشوف معلومات حسابك.
          </p>

          <button
            type="button"
            onClick={goToLogin}
            className="rounded-[15px] bg-[var(--primary)] px-8 py-5 text-base font-extrabold text-white shadow-lg shadow-[var(--primary)]/20 transition-all duration-300 hover:-translate-y-1 hover:opacity-90"
          >
            تسجيل الدخول
          </button>

        </div>
      </main>
    );
  }

  // إذا كان المستخدم مسجل الدخول
  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[var(--bg)] pb-16 transition-colors duration-300"
    >
      <ProfileHero userName={user.name} />

      <section className="container pt-10">
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">

          {/* البطاقة الجانبية */}
          <div className="lg:col-span-4">
            <ProfileSidebar
              user={user}
              onLogout={handleLogout}
            />
          </div>

          {/* معلومات الحساب */}
          <div className="lg:col-span-8">
            <ProfileDetails
              user={user}
              onGoToBookings={goToBookings}
            />
          </div>

        </div>
      </section>
    </main>
  );
}
