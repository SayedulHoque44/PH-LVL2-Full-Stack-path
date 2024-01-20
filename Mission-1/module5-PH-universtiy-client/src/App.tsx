import MainLayout from "./components/layout/MainLayout";
import ProtectedRoute from "./components/layout/protectedRoute";

function App() {
  return (
    <ProtectedRoute>
      <MainLayout />
    </ProtectedRoute>
  );
}

export default App;
