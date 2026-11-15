const WEBSITE_BASE_URL = 'https://sairna.abdulrahman-hares.com/api/v1/website';

export const registerRequest = async (userData) => {
  const response = await fetch(`${WEBSITE_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data?.message || 'فشل إنشاء الحساب، يرجى التأكد من صحة المدخلات.'
    );
  }

  return data;
};