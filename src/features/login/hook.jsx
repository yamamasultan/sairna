import { useState } from 'react';
import { loginRequest } from './api';

export const useLogin = (onLoginSuccess) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({ email: '', password: '' });
  const [alert, setAlert] = useState(null);

  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 5000);
  };

  const handleEmailChange = (value) => {
    setEmail(value);
    if (fieldErrors.email) setFieldErrors((prev) => ({ ...prev, email: '' }));
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
    if (fieldErrors.password) setFieldErrors((prev) => ({ ...prev, password: '' }));
  };

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const fillTestCredentials = () => {
    setEmail('admin@gmail.com');
    setPassword('1111111111111111');
    setFieldErrors({ email: '', password: '' });
  };

  const validateForm = () => {
    const errors = { email: '', password: '' };
    let isValid = true;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      errors.email = 'يرجى إدخال البريد الإلكتروني';
      isValid = false;
    } else if (!emailRegex.test(email)) {
      errors.email = 'صيغة البريد الإلكتروني غير صحيحة';
      isValid = false;
    }

    if (!password) {
      errors.password = 'يرجى إدخال كلمة المرور';
      isValid = false;
    } else if (password.length < 6) {
      errors.password = 'كلمة المرور يجب أن تتكون من 6 أحرف على الأقل';
      isValid = false;
    }

    setFieldErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert(null);

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const data = await loginRequest({ email: email.trim(), password });

      const token =
        data?.token ||
        data?.access_token ||
        data?.data?.token ||
        data?.data?.access_token;

      if (token) {
        localStorage.setItem('sairna_token', token);
        if (!rememberMe) {
          sessionStorage.setItem('sairna_token', token);
        }
      }

      if (data?.user || data?.data?.user) {
        localStorage.setItem(
          'sairna_user',
          JSON.stringify(data.user || data.data.user)
        );
      }

      showAlert('success', 'تم تسجيل الدخول بنجاح! جاري تحويلك...');

      setTimeout(() => {
        if (typeof onLoginSuccess === 'function') {
          onLoginSuccess(data);
        } else {
          window.location.href = '/dashboard';
        }
      }, 1000);
    } catch (error) {
      showAlert(
        'error',
        error.message === 'Failed to fetch'
          ? 'تعذر الاتصال بالخادم، يرجى التحقق من الإنترنت.'
          : error.message
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {
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
    fillTestCredentials,
    handleSubmit,
    showAlert,
  };
};