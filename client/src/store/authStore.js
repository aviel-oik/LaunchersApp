import { create } from "zustand";
import { useNavigate } from "react-router-dom";

export const useAuthStore = create((set) => ({
    user: null,
    token: null,
    
    login: (user, token) => set({ user, token }),
    logout: () => {
        set({ user: null, token: null });
        localStorage.removeItem("token");
        const navigate = useNavigate();
        navigate("/");
    },
    initAuthStore: async () => {
        const token = localStorage.getItem("token");
        if (token) {
            const res = await fetch("http://localhost:3300/api/auth/getUser", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            const user = await res.json();
            set({ user, token });
        }
    }

}));
