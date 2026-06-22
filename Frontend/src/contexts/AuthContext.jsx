import { createContext, useContext } from 'react';

// Placeholder arsitektur otentikasi
// Didesain agar mudah diintegrasikan dengan JWT/Node.js kelak
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Sementara user statis null (belum login)
  const user = null;

  const login = async (credentials) => {
    console.log("Login stub dipanggil dengan:", credentials);
    // TODO: implementasi ke backend API Node.js
  };

  const logout = () => {
    console.log("Logout stub dipanggil");
    // TODO: bersihkan sesi/token
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
