import { useNavigate } from "react-router";
import { Button } from "./components/ui/button";
import { useAuth } from "./hooks/useAuth";

function App() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-10">Welcome!</h1>
      {isAuthenticated ? (
        <>
          <Button onClick={() => navigate("/invoices")}>View dashboard</Button>
        </>
      ) : (
        <p>Login to see your dashboard</p>
      )}
    </div>
  );
}

export default App;
