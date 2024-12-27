
import './App.css'
import { Toaster } from './components/ui/toaster'
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import  {routes, RouteElement } from "@/routes/routes";

function App() {
  
  return (
    <>
      <Toaster/>
      <Router>
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
      </Router>
    </>
  )
}

export default App
