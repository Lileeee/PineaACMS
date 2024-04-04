import useTheme from "@/store/modules/useTheme";

export default function useStore() {
    return {
        useTheme: useTheme(),
    };
}
