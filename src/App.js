import { Routes, Route, HashRouter } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import CategoryDetail from "./pages/category_detail";
import { connect } from "react-redux";
import useApi from "./hooks/useApi";
import { SET_APP_DATA } from "./store/reducers/appDataReducer";
import { REMOVE_TOKEN } from "./store/reducers/authReuducer";
import { AbilityContext } from "./ability/can";
import ability from "./ability/ability";

function App(props) {
   // TODO burada apData bilgisini al

   console.log("APP COMPONENT PROPS", props);

   const api = useApi();

   //TODO BU değeri doldur
   const clientAbility = ability(null);

   //token var, appData yok ise appData bilgisini api'den al
   if (props.authState.token && !props.appDataState.appData) {
      api.get("user/appData")
         .then((response) => {
            console.log(">>APP DATA RES", response);
            const action = {
               type: SET_APP_DATA,
               payload: {
                  appData: response.data.data,
               },
            };
            props.dispatch(action);
         })
         .catch((err) => {
            console.error("ERROR", err);
            if (err.response.data.status === "error") {
               if (
                  err.response.data.exceptionType === "UserNotLoggedInException"
               ) {
                  // Local storage'den  token bilgisini sil
                  localStorage.removeItem("token");
                  const action = {
                     type: REMOVE_TOKEN,
                  };
                  props.dispatch(action);

                  const actionAppData = {
                     type: REMOVE_TOKEN,
                  };
                  props.dispatch(actionAppData);
                  window.location.href = "/#";
               }
            } else {
               //genel hata mesajı ver!!
               alert("Genel hata oluştu, Lütfen daha sonra tekrar deneyin");
            }
         });
   }

   return (
      <AbilityContext.Provider value={clientAbility}>
         <div className="container py-3">
            <Header />
            <HashRouter>
               <Routes>
                  <Route index element={<Home />} />
                  <Route path="login" element={<Login />} />
                  <Route path="register" element={<Register />} />
                  <Route path="category/:slug" element={<CategoryDetail />} />
               </Routes>
            </HashRouter>
            <Footer />
         </div>
      </AbilityContext.Provider>
   );
}

const mapProps = (state) => {
   return {
      ...state,
   };
};

export default connect(mapProps)(App);
