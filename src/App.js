import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import store from "./redux/store";
import client from "./apolloClient";

//import dei components
import Navbar from "./components/Navbar";
import SubBar from "./components/SubBar";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import LoginPage from "./pages/LoginPage";
import CartPage from "./pages/CartPage";
import ReservedArea from "./pages/ReservedArea";
import CheckoutPage from "./pages/CheckoutPage";
import PrivateRoute from "./components/PrivateRoute";
import RegistrationPage from "./pages/RegistrationPage";
import ResetLinkPage from "./pages/ResetLinkPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

function App() {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Router>
          <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/product/:id" element={<ProductDetailsPage />} />
              <Route path="/cart" element={<CartPage />} />

              <Route path="/CheckoutPage"  element={
                   <PrivateRoute>
                        <CheckoutPage/>
                    </PrivateRoute>
                    }/>
              <Route path="/loginPage" element={<LoginPage />} />
              <Route path="/RegistrationPage" element={<RegistrationPage />} />
              <Route path="/ResetLinkPage" element={<ResetLinkPage />} />
              <Route path="/ResetPasswordPage" element={<ResetPasswordPage />} />
              <Route path="/ReservedArea" element={
                   <PrivateRoute>
                        <ReservedArea />
                   </PrivateRoute>
                    }/>
            </Routes>
            <SubBar />
        </Router>
      </Provider>
    </ApolloProvider>
  );
}

export default App;
