/* oxlint-disable react/only-export-components */
import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

// Storage keys
const AUTH_STORAGE_KEY = 'rph_auth_user';
const USERS_STORAGE_KEY = 'rph_registered_users';

// Generate local SVG initials avatar without external dependencies or portrait copyright risks
export const generateSvgAvatar = (name = 'User', bg = '#0284c7') => {
  const initials = (name || 'U')
    .split(' ')
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100"><circle cx="50" cy="50" r="50" fill="${bg}"/><text x="50" y="55" font-family="system-ui, sans-serif" font-size="38" font-weight="bold" fill="#ffffff" text-anchor="middle" dominant-baseline="middle">${initials}</text></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

// Default mock accounts
const DEFAULT_ACCOUNTS = [
  {
    id: 'user_owner_1',
    name: 'Anil Chaudhary',
    email: 'owner@test.com',
    password: 'password123',
    phone: '9817486280',
    role: 'owner',
    avatar: generateSvgAvatar('Anil Chaudhary', '#0f766e'),
  },
  {
    id: 'user_buyer_2',
    name: 'Ram Kumar Tharu',
    email: 'buyer@test.com',
    password: 'password123',
    phone: '9801234567',
    role: 'buyer',
    avatar: generateSvgAvatar('Ram Kumar Tharu', '#0284c7'),
  },
];

// Helper to get registered users from localStorage
const getStoredUsers = () => {
  try {
    const stored = localStorage.getItem(USERS_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Ensure default accounts exist even if storage already has records
        const existingEmails = new Set(parsed.map((u) => u.email.toLowerCase()));
        const missingAccounts = DEFAULT_ACCOUNTS.filter(
          (acc) => !existingEmails.has(acc.email.toLowerCase())
        );
        if (missingAccounts.length > 0) {
          const merged = [...parsed, ...missingAccounts];
          localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(merged));
          return merged;
        }
        return parsed;
      }
    }
  } catch (error) {
    console.error('Failed to read users from localStorage:', error);
  }

  // Initialize with default accounts
  try {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(DEFAULT_ACCOUNTS));
  } catch (error) {
    console.error('Failed to initialize users in localStorage:', error);
  }
  return DEFAULT_ACCOUNTS;
};

// Create Auth Context
export const AuthContext = createContext(null);

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check localStorage on mount for persistent session
  useEffect(() => {
    try {
      // Ensure mock users storage is initialized
      getStoredUsers();

      const storedUser = localStorage.getItem(AUTH_STORAGE_KEY);
      if (storedUser) {
        // oxlint-disable-next-line react/set-state-in-effect
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Failed to restore user session:', error);
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } finally {
      setLoading(false);
    }
  }, []);

  // Login with email and password (simulated 500ms API call)
  const login = useCallback(async (email, password) => {
    setLoading(true);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          if (!email || !password) {
            throw new Error('Please enter both email and password');
          }

          const users = getStoredUsers();
          const normalizedEmail = email.trim().toLowerCase();
          const matchedUser = users.find(
            (u) => u.email.toLowerCase() === normalizedEmail && u.password === password
          );

          if (!matchedUser) {
            throw new Error('Invalid email or password');
          }

          // Strip password from session user data
          const { password: _, ...sessionUser } = matchedUser;

          localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(sessionUser));
          setUser(sessionUser);
          resolve(sessionUser);
        } catch (err) {
          reject(err);
        } finally {
          setLoading(false);
        }
      }, 500);
    });
  }, []);

  // Register new user (simulated 500ms API call)
  const register = useCallback(async (userData) => {
    setLoading(true);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          if (!userData?.email || !userData?.password) {
            throw new Error('Email and password are required');
          }

          const users = getStoredUsers();
          const normalizedEmail = userData.email.trim().toLowerCase();

          const existingUser = users.find(
            (u) => u.email.toLowerCase() === normalizedEmail
          );

          if (existingUser) {
            throw new Error('An account with this email already exists');
          }

          const newUser = {
            id: `user_${Date.now()}`,
            name: userData.name?.trim() || 'New User',
            email: normalizedEmail,
            password: userData.password,
            phone: userData.phone?.trim() || '',
            role: userData.role === 'owner' ? 'owner' : 'buyer',
            avatar:
              userData.avatar?.trim() ||
              generateSvgAvatar(userData.name || 'User', '#0284c7'),
          };

          const updatedUsers = [...users, newUser];
          localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));

          // Strip password from stored session
          const { password: _, ...sessionUser } = newUser;
          localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(sessionUser));
          setUser(sessionUser);
          resolve(sessionUser);
        } catch (err) {
          reject(err);
        } finally {
          setLoading(false);
        }
      }, 500);
    });
  }, []);

  // Logout current user (simulated 500ms API call)
  const logout = useCallback(async () => {
    setLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        try {
          localStorage.removeItem(AUTH_STORAGE_KEY);
          setUser(null);
        } finally {
          setLoading(false);
          resolve();
        }
      }, 500);
    });
  }, []);

  // Update profile for authenticated user (simulated 500ms API call)
  const updateProfile = useCallback(async (updatedData) => {
    setLoading(true);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          if (!user) {
            throw new Error('No user is currently authenticated');
          }

          const updatedSession = {
            ...user,
            ...updatedData,
            id: user.id, // ID cannot be overwritten
          };
          delete updatedSession.password;

          if (updatedData.email) {
            updatedSession.email = updatedData.email.trim().toLowerCase();
          }

          // Update active session in localStorage
          localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(updatedSession));

          // Also synchronize changes in registered users list
          try {
            const users = getStoredUsers();
            const updatedUsers = users.map((u) => {
              if (u.id === user.id) {
                return {
                  ...u,
                  ...updatedData,
                  id: u.id,
                  email: updatedSession.email,
                  password: updatedData.password || u.password,
                };
              }
              return u;
            });
            localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
          } catch (e) {
            console.error('Failed to sync updated user in storage:', e);
          }

          setUser(updatedSession);
          resolve(updatedSession);
        } catch (err) {
          reject(err);
        } finally {
          setLoading(false);
        }
      }, 500);
    });
  }, [user]);

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: Boolean(user),
      login,
      register,
      logout,
      updateProfile,
    }),
    [user, loading, login, register, logout, updateProfile]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom Hook to consume Auth Context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default useAuth;
