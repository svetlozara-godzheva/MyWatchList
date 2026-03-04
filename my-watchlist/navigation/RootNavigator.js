import AppStack from "./AppStack";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
export default function RootNavigator() {
    return (
        <BottomSheetModalProvider>

            <AppStack />
        </BottomSheetModalProvider>
    );
}