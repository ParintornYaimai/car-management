import { create } from "zustand";

const useAuthStore = create((set) => ({
    token: localStorage.getItem('accessToken'),
    user:null,

    login: (token, user) => {
        localStorage.setItem("accessToken", token);

        set({
            token,
            user,
        });
    },

    logout:()=>{
        localStorage.removeItem("accessToken");

        set({
            token: null,
            user: null
        })
    }

}));

export default useAuthStore;