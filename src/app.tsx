import { Toaster } from "react-hot-toast";
import { GrispiProvider } from "./contexts/grispi-context";
import { StoreProvider } from "./contexts/store-context";
import { OrdersScreen } from "./screens/orders-screen";

const App = () => {
  return (
    <StoreProvider>
      <GrispiProvider>
        <OrdersScreen />
      </GrispiProvider>
      <Toaster position="bottom-center" />
    </StoreProvider>
  );
};

export default App;
