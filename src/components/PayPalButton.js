import React from "react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useMutation } from "@apollo/client";
import { CREATE_ORDER } from "../queries/queries";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";

const PayPalButton = ({ userData }) => {
  const { items: cartItems, totalPrice } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [createOrder] = useMutation(CREATE_ORDER);



  const PAYPAL_CLIENT_ID = "Ab0g8xRsOTFf_ft9NAn_t_7fecO_JJ_Rard10BINDBs-cmWxvVgIJfwmyueQrJm3pq5600at6J_cyMeg";

  const decodeBase64Id = (encodedId) => {
    try {
      const decodedString = atob(encodedId);
      const idMatch = decodedString.match(/\d+$/);
      return idMatch ? Number(idMatch[0]) : null;
    } catch (error) {
      console.error("errore nella codifica dell’id:", error);
      return null;
    }
  };

    //creo l'ordine woocommerce
  const handleCreateWooOrder = async () => {
    try {
      const lineItems = cartItems.map((item) => {
        const decodedId = Number(decodeBase64Id(item.id));
        return {
          productId: decodedId,
          name: item.name || "Prodotto",
          quantity: Number(item.quantity),
        };
      });

      const input = {
        customerNote: "ordine pagato con PayPal",
        billing: {
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          address1: userData.address,
          city: "Cosenza",
          country: "IT",
        },
        paymentMethod: "paypal",
        lineItems,
      };

      //creo l'ordine paypal
      const { data } = await createOrder({ variables: { input } });

      if (data?.createOrder?.order?.id) {
        const orderId = decodeBase64Id(data.createOrder.order.id);
        console.log("id ordine woocommerce decodificato:", orderId);
        return orderId;
      } else {
        console.error("id non trovato");
        return null;
      }
    } catch (error) {
      console.error("errore nella creazione dell’ordine WooCommerce:", error);
      return null;
    }
  };


  return (
    <PayPalScriptProvider options={{ "client-id": PAYPAL_CLIENT_ID, currency: "EUR" }}>
      <div className="mt-6">
        <PayPalButtons
          style={{ layout: "vertical" }}
          createOrder={async (data, actions) => {
            const orderId = await handleCreateWooOrder();
            if (!orderId) {
              throw new Error("errore: id ordine non ottenuto");
            }

            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    currency_code: "EUR",
                    value: totalPrice.toFixed(2),
                    breakdown: {
                      item_total: {
                        currency_code: "EUR",
                        value:totalPrice.toFixed(2),
                      },
                    },
                  },
                  items: cartItems.map((item) => ({
                    name: item.name || "prodotto",
                    unit_amount: {
                      currency_code: "EUR",
                      value: parseFloat(item.salePrice || item.regularPrice).toFixed(2),
                    },
                    quantity: item.quantity.toString(),
                    description: item.description || "",
                    category: "PHYSICAL_GOODS",
                  })),
                  custom_id: orderId.toString(),
                  invoice_id: orderId.toString(),
                },
              ],
            }).then((_ppcp_paypal_order_id) => {
              console.log("ordine paypal creato con id:", _ppcp_paypal_order_id);
              return _ppcp_paypal_order_id;
            });
          }}
          onApprove={async (data, actions) => {
            console.log("pagamento approvato:", data.orderID);
            return actions.order.capture().then(() => {
              dispatch(clearCart());
              navigate("/");
            });
          }}
          onError={(err) => {
            console.error("errore nel pagamento:", err);
          }}
        />
      </div>
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
