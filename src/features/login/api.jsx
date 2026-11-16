const DASHBOARD_BASE_URL = 'https://sairna.abdulrahman-hares.com/api/docs/website';

export const loginRequest = async (credentials) => {
  const response = await fetch(`${DASHBOARD_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data?.message || 'فشل تسجيل الدخول، يرجى التحقق من البريد الإلكتروني وكلمة المرور.'
    );
  }

  return data;
};