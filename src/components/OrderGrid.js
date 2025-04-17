import React, { useEffect, useState } from "react";
import { getToken } from "../services/authService";
import client from "../apolloClient";
import { gql } from "@apollo/client";

const GET_USER_ORDERS = gql`
  query GetCustomerOrders {
    customer {
      orders {
        nodes {
          id
          orderNumber
          total
          date
          status
        }
      }
    }
  }
`;

const OrderGrid = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = getToken();

      if (!token) return;

      try {
        const { data } = await client.query({
          query: GET_USER_ORDERS,
          context: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        });

        setOrders(data.customer.orders.nodes || []);
      } catch (error) {
        console.error("Errore nel recupero ordini:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Caricamento ordini...</p>;

  return (
    <div className="mt-2">
      <h2 className="text-4xl italic font-bold text-amber-950 mb-4">I tuoi ordini</h2>
      {orders.length === 0 ? (
        <p>Nessun ordine trovato.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {orders.map((order) => (
            <div key={order.id} className="p-4 border border-gray-200 rounded bg-white shadow-sm">
              <p><strong>Ordine:</strong> #{order.orderNumber}</p>
              <p><strong>Totale:</strong> €{order.total}</p>
              <p><strong>Data:</strong> {new Date(order.date).toLocaleDateString()}</p>
              <p><strong>Stato:</strong> {order.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderGrid;
