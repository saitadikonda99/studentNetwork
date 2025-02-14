// stores/authStore.js
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';


const useAuthStore = create(
  persist(
    (set) => ({
      email: '', // Store the user's email
      otp: '', // Store the OTP (optional)
      setEmail: (email: string) => set({ email }), // Action to set the email
      setOtp: (otp: string) => set({ otp }), // Action to set the OTP
      clearEmail: () => set({ email: '' }), // Action to clear the email
    }),
    {
      name: 'auth-storage', // Unique name for localStorage
      storage: createJSONStorage(() => localStorage), // Use localStorage
    }
  )
);

export default useAuthStore;