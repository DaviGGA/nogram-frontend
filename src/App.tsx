
import './App.css'
import { Toaster } from './components/ui/toaster'
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import  {routes, RouteElement } from "@/routes/routes";
import Layout from './components/layout';
import { AuthUserProvider } from "./context/authUserProvider";

function App() {
  return (
    <> 
      <Toaster/>
          <Router>
            <AuthUserProvider>
              <Layout>
                <Routes>
                    {
                      routes.map((route: RouteElement, idx: number) =>
                          <Route
                            key={idx}
                            path={route.path}
                            element={route.element}
                          />
                        )
                    }
                </Routes>
              </Layout>
            </AuthUserProvider>
          </Router>
    </>
  )
}

export default App
