import useTheme from "@/store/modules/useTheme";
import useActive from "@/store/modules/useActive";
export default function useStore() {
    return {
        useTheme: useTheme(),
        useActive: useActive(),
    };
}
