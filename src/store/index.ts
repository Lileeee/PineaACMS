import useTheme from "@/store/modules/useTheme";
import useActive from "@/store/modules/useActive";
import useUser from "@/store/modules/useUser";
export default function useStore() {
    return {
        useTheme: useTheme(),
        useActive: useActive(),
        useUser: useUser(),
    };
}
