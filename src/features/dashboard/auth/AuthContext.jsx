import {
  createContext,
  useEffect,
  useState,
} from "react";

import dashboardAxios from "../../../api/dashboardAxios";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("sairna_admin_token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await dashboardAxios.get("/auth/me");
        const admin = response.data.user ?? response.data;

        if (admin.role !== "ADMIN") {
          throw new Error("غير مصرح بالدخول");
        }

        setUser(admin);
      } catch {
        localStorage.removeItem("sairna_admin_token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    const response = await dashboardAxios.post("/auth/login", {
      email,
      password,
    });

    const data = response.data;

    if (
      !data.accessToken ||
      data.portal !== "dashboard" ||
      data.user?.role !== "ADMIN"
    ) {
      throw new Error("هذا الحساب غير مخوّل بالدخول إلى لوحة التحكم");
    }

    localStorage.setItem("sairna_admin_token", data.accessToken);
    setUser(data.user);

    return data.user;
  };

  const logout = () => {
    localStorage.removeItem("sairna_admin_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}