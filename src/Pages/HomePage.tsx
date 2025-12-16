import { useNavigate } from "react-router-dom"
import { Button } from "../components/ui/button"
import Layout from "./layout"

export const Homepage = () => {
  const navigate = useNavigate()

  return (
    <>
   
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">
        Welcome to Spend Money App
      </h1>
      <p className="text-lg text-gray-700 mb-8 text-center">
        Explore the world's top billionaires and choose one to spend!
      </p>
      <Button onClick={() => navigate("/billionaires")}>
        Start
      </Button>
    </div>
    
    </>
  )
}
