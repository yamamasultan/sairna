
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// قراءة بيانات المستخدم المحفوظة
const getStoredUser = () => {
  try {
    const storedUser = localStorage.getItem('sairna_user');

    if (!storedUser) return null;

    const parsedUser = JSON.parse(storedUser);

    if (!parsedUser || typeof parsedUser !== 'object') {
      return null;
    }

    return parsedUser;
  } catch (error) {
    console.error('Error reading user:', error);
    return null;
  }
};

export const useProfile = () => {
  const navigate = useNavigate();

  // قراءة المستخدم عند فتح الصفحة
  const [user, setUser] = useState(() => getStoredUser());

  useEffect(() => {
    const updateUser = () => {
      setUser(getStoredUser());
    };

    // تحديث الحساب عند تحميل الصفحة
    updateUser();

    // الاستماع لتغييرات الحساب
    window.addEventListener('sairna_auth_change', updateUser);
    window.addEventListener('storage', updateUser);

    return () => {
      window.removeEventListener('sairna_auth_change', updateUser);
      window.removeEventListener('storage', updateUser);
    };
  }, []);

  // الانتقال لتسجيل الدخول
  const goToLogin = () => {
    navigate('/login');
  };

  // تسجيل الخروج
  const handleLogout = () => {
    localStorage.removeItem('sairna_token');
    localStorage.removeItem('sairna_user');

    sessionStorage.removeItem('sairna_token');

    setUser(null);

    window.dispatchEvent(
      new Event('sairna_auth_change')
    );

    navigate('/', {
      replace: true,
      state: {
        toastMessage: 'تم تسجيل الخروج من النموذج.'
      }
    });
  };

  // الانتقال للحجوزات
  const goToBookings = () => {
    navigate('/my-bookings');
  };

  return {
    user,
    isAuthenticated: !!user,
    handleLogout,
    goToBookings,
    goToLogin
  };
};
