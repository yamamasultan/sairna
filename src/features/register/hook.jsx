import { useState } from 'react';
import { registerRequest } from './api';

export const useRegister = (onRegisterSuccess) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({ name: '', email: '', password: '', terms: '' });
  const [alert, setAlert] = useState(null);

  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 5000);
  };

  const handleNameChange = (val) => {
    setName(val);
    if (fieldErrors.name) setFieldErrors((p) => ({ ...p, name: '' }));
  };

  const handleEmailChange = (val) => {
    setEmail(val);
    if (fieldErrors.email) setFieldErrors((p) => ({ ...p, email: '' }));
  };

  const handlePasswordChange = (val) => {
    setPassword(val);
    if (fieldErrors.password) setFieldErrors((p) => ({ ...p, password: '' }));
  };

  const togglePasswordVisibility = () => setShowPassword((p) => !p);

  const validateForm = () => {
    const errors = { name: '', email: '', password: '', terms: '' };
    let isValid = true;

    if (!name.trim()) {
      errors.name = 'يرجى إدخال الاسم الكامل';
      isValid = false;
    }

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

    if (!acceptTerms) {
      errors.terms = 'يجب الموافقة على شروط الاستخدام للمتابعة';
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
      const data = await registerRequest({
        name: name.trim(),
        email: email.trim(),
        password: password,
      });

      const token = data?.token || data?.access_token || data?.data?.token;
      if (token) {
        localStorage.setItem('sairna_token', token);
      }

      showAlert('success', 'تم إنشاء الحساب بنجاح! جاري تحويلك...');

      setTimeout(() => {
        if (typeof onRegisterSuccess === 'function') {
          onRegisterSuccess(data);
        } else {
          window.location.href = '/booking';
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
  };
};