import BillionairesPage from "./Pages/Billionaires";
import {Route, Routes} from "react-router-dom"
import SpendPage from "./Pages/SpendPage";
import { Homepage } from "./Pages/HomePage";
import Layout from "./Pages/layout";
import SpendBillionaire from "./Pages/SpendBillionaire";
import PurchasedItemsPage from "./Pages/PurchasedItems";
import SelectBillionaire from "./Pages/SelectBillionaire";
import { BillionaireProvider } from "./contexts/BillionaireContext";

const App = ()=>{
  return(
    <BillionaireProvider>
      <Routes>
        <Route path="/" element={<Layout><Homepage/></Layout>} />
        <Route path="/billionaires" element={<Layout><BillionairesPage/></Layout>} />
        <Route path="/spend/money" element={<SpendPage/>}/>
        <Route path="/spend/billionaire" element={<Layout><SpendBillionaire/></Layout>}/>
        <Route path="/purchased-items" element={<PurchasedItemsPage/>}/>
        <Route path="/select-billionaire" element={<SelectBillionaire/>}/>
      </Routes>
    </BillionaireProvider>
  )
}

export default App;