
import { useState } from 'react';
import { registerRequest } from './api';

export const useRegister = (onRegisterSuccess) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [fieldErrors, setFieldErrors] = useState({
    name: '',
    email: '',
    password: '',
    terms: ''
  });

  const [alert, setAlert] = useState(null);

  // عرض الإشعارات
  const showAlert = (type, message) => {
    setAlert({ type, message });

    setTimeout(() => {
      setAlert(null);
    }, 5000);
  };

  // تغيير الاسم
  const handleNameChange = (val) => {
    setName(val);

    if (fieldErrors.name) {
      setFieldErrors((prev) => ({
        ...prev,
        name: ''
      }));
    }
  };

  // تغيير البريد الإلكتروني
  const handleEmailChange = (val) => {
    setEmail(val);

    if (fieldErrors.email) {
      setFieldErrors((prev) => ({
        ...prev,
        email: ''
      }));
    }
  };

  // تغيير كلمة المرور
  const handlePasswordChange = (val) => {
    setPassword(val);

    if (fieldErrors.password) {
      setFieldErrors((prev) => ({
        ...prev,
        password: ''
      }));
    }
  };

  // إظهار وإخفاء كلمة المرور
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // التحقق من صحة البيانات
  const validateForm = () => {
    const errors = {
      name: '',
      email: '',
      password: '',
      terms: ''
    };

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

  // إنشاء الحساب وربطه بالـ API
  const handleSubmit = async (e) => {
    e.preventDefault();

    setAlert(null);

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // إرسال بيانات التسجيل إلى الباك
      const data = await registerRequest({
        name: name.trim(),
        email: email.trim(),
        password: password
      });

      // استخراج التوكن حسب استجابة الباك الفعلية
      const token =
        data?.accessToken ||
        data?.data?.accessToken;

      if (!token) {
        throw new Error(
          'تم إرسال طلب التسجيل ولكن لم يتم استلام رمز المصادقة من الخادم.'
        );
      }

      // استخراج بيانات المستخدم
      const user =
        data?.user ||
        data?.data?.user;

      if (!user) {
        throw new Error(
          'لم يتم استلام بيانات المستخدم من الخادم.'
        );
      }

      // حفظ التوكن الحقيقي
      localStorage.setItem('sairna_token', token);

      // حفظ بيانات المستخدم الحقيقية
      localStorage.setItem(
        'sairna_user',
        JSON.stringify(user)
      );

      // التأكد من نجاح الحفظ دون طباعة التوكن
      console.log('Registration session saved:', {
        tokenSaved: !!localStorage.getItem('sairna_token'),
        userSaved: !!localStorage.getItem('sairna_user')
      });

      // تحديث حالة تسجيل الدخول في الموقع
      window.dispatchEvent(
        new Event('sairna_auth_change')
      );

      // إظهار إشعار النجاح
      showAlert(
        'success',
        'تم إنشاء الحساب بنجاح! جاري تحويلك...'
      );

      // الانتقال إلى صفحة البروفايل
      setTimeout(() => {
        if (typeof onRegisterSuccess === 'function') {
          onRegisterSuccess(data);
        } else {
          window.location.href = '/profile';
        }
      }, 1000);

    } catch (error) {
      console.error('Register Error:', error);

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
    showAlert
  };
};
