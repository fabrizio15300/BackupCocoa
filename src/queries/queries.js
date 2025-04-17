import { gql } from "@apollo/client";

//query per i dettagli del prodotto
export const GET_PRODUCT_DETAILS = gql`
  query GetProductDetails($id: ID!) {
    product(id: $id, idType: ID) {
      id
      name
      description
      shortDescription
      image {
        sourceUrl
        altText
      }
      galleryImages{
        nodes{
            sourceUrl
        }
      }
      ... on SimpleProduct{
      regularPrice
      salePrice
      }
    }
  }
`;

//query per ottenere i prodotti bestseller che ho definito in evidenza su woocommerce
export const GET_BEST_SELLERS = gql`
  query GetBestSellers {
    products(where: { featured: true }, first: 3) {
      nodes {
        id
        name
        image {
          sourceUrl
          altText
        }
        ... on SimpleProduct {
          regularPrice
          salePrice
        }
      }
    }
  }
`;

//Prendo tutti i prodotti da restituire all'apertura della product page
export const GET_ALL_PRODUCTS = gql`
  query GetAllProducts {
    products(first: 20) {
      nodes {
        id
        name
        description
        shortDescription
        image {
          sourceUrl
          altText
        }
        ... on SimpleProduct {
          regularPrice
          salePrice
            productCategories{
            nodes{
             id
             name
          }

          }
        }
      }
    }
  }
`;

//Prendo le categorie di prodotto
export const GET_CATEGORIES = gql`
  query GetCategories {
    productCategories(first: 6) {
      nodes {
        id
        name
      }
    }
  }

`;

//creo l'ordine in woocommerce
export const CREATE_ORDER = gql`
  mutation CreateOrder($input: CreateOrderInput!) {
    createOrder(input: $input) {
      order {
        id
        status
        total
      }
    }
  }
`;
