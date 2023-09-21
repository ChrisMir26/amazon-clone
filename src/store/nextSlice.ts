// Importa la función `createSlice` desde la biblioteca Redux Toolkit.
import { createSlice } from "@reduxjs/toolkit";

import { StoreProduct } from "../../type";

interface NextState {
  productData: StoreProduct[];
  favoriteData: StoreProduct[];
  allProducts: StoreProduct[];
  userInfo: null | string;
}

// Define el estado inicial del slice (rebanada) de Redux.
const initialState = {
  productData: [], // Almacena datos de productos.
  favoriteData: [], // Almacena datos de productos favoritos.
  allProducts: [], // Almacena todos los productos.
  userInfo: null, // Almacena información del usuario.
};

// Crea un slice (rebanada) de Redux llamado "nextSlice" que contiene:
// - El nombre del slice: "next".
// - El estado inicial: "initialState".
// - Reductores: funciones que especifican cómo cambia el estado en respuesta a acciones.
export const nextSlice = createSlice({
  name: "next", // Nombre del slice.
  initialState, // Estado inicial.
  reducers: {
    // Reductor "addToCart": Esta función se ejecutará cuando se despache una acción "addToCart".
    // addToCart: (state, action) => {
    //     // Actualiza el valor de "state.productData" con los datos proporcionados en la acción.
    //     const existingProduct = state.productData.find(
    //         (item: StoreProduct) => item._id === action.payload._id
    //     )
    //     if (existingProduct) {
    //         existingProduct.quantity += action.payload.quantity
    //     } else {
    //         state.productData.push(action.payload)
    //     }
    // },
    addToCart: (state, action) => {
      // Verifica si el usuario está autenticado (puedes obtener esta información desde tu estado)
      const isAuthenticated = state.userInfo !== null;

      // Si el usuario no está autenticado, no agrega productos al carrito
      if (!isAuthenticated) {
        // const existingProduct = state.productData.find(
        //   (item: StoreProduct) => item._id === action.payload._id
        // );
        const existingProduct: StoreProduct | undefined = state.productData.find(
          (item: StoreProduct) => item._id === action.payload._id
        );
        if (existingProduct) {
          //@ts-ignore
          existingProduct.quantity += action.payload.quantity;
        } else {
          //@ts-ignore
          state.productData.push(action.payload);
        }
      } else {
        //@ts-ignore
        const existingProduct = state.userInfo?.productData?.find(
          (item: StoreProduct) => item._id === action.payload._id
        );
        if (existingProduct) {
          existingProduct.quantity += action.payload.quantity;
        } else {
          //@ts-ignore
          state.userInfo?.productData?.push(action.payload);
        }
      }
    },

    addToFavorite: (state, action) => {
      const isAuthenticated = state.userInfo !== null;

      if (!isAuthenticated) {
      /*   const existingProduct = state.favoriteData.find(
          (item: StoreProduct) => item._id === action.payload._id
        );
        if (!existingProduct) {
          // state.favoriteData = [...state.favoriteData, action.payload];
          state.favoriteData.push(action.payload);

        } else {
          state.favoriteData = state.favoriteData.filter(
            (item: StoreProduct) => {
              return item._id !== action.payload._id;
            }
          );
        } */
        alert(`Sorry you have to log in to add favorites`)
      } 
      if(isAuthenticated){
        //@ts-ignore
        const existingProduct = state.userInfo?.favoriteData?.find(
          (item: StoreProduct) => item._id === action.payload._id
        );
        if (!existingProduct) {
            //@ts-ignore
          state.userInfo.favoriteData = [...state.userInfo.favoriteData, action.payload];
        } else {
          //@ts-ignore
          state.userInfo.favoriteData = state.userInfo?.favoriteData?.filter(
            (item: StoreProduct) => {
              return item._id !== action.payload._id;
            }
          );
        }
      }
    },

    increaseQuantity: (state, action) => {
      const isAuthenticated = state.userInfo !== null;

      if (!isAuthenticated) {
        const existingProduct = state.productData.find(
          (item: StoreProduct) => item._id === action.payload._id
        );
            //@ts-ignore
        if (existingProduct.quantity < 10) return existingProduct.quantity++;
                //@ts-ignore
        else return existingProduct.quantity;
      } else {
                //@ts-ignore
        const existingProduct = state.userInfo?.productData?.find(
          (item: StoreProduct) => item._id === action.payload._id
        );
        if (existingProduct.quantity < 10) existingProduct.quantity++;
        else existingProduct.quantity;
      }
    },
    decreaseQuantity: (state, action) => {
      const isAuthenticated = state.userInfo !== null;

      if (!isAuthenticated) {
        const existingProduct = state.productData.find(
          (item: StoreProduct) => item._id === action.payload._id
        );
                //@ts-ignore
        if (existingProduct.quantity > 1) return existingProduct.quantity--;
                //@ts-ignore
        else return existingProduct.quantity;
      } else {
                //@ts-ignore
        const existingProduct = state.userInfo?.productData?.find(
          (item: StoreProduct) => item._id === action.payload._id
        );
        if (existingProduct.quantity > 1) existingProduct.quantity--;
        else existingProduct.quantity;
      }
    },
    deleteProduct: (state, action) => {
      const isAuthenticated = state.userInfo !== null;

      if (!isAuthenticated) {
        state.productData = state.productData.filter(
          (item: StoreProduct) => item._id !== action.payload._id
        );
      } else {
                //@ts-ignore
        state.userInfo.productData = state.userInfo.productData.filter(
          (item: StoreProduct) => item._id !== action.payload._id
        );
      }
    },
    resetCart: (state) => {
      const isAuthenticated = state.userInfo !== null;

      if (!isAuthenticated) state.productData = [];
              //@ts-ignore
      else state.userInfo.productData = [];
    },

    addUser: (state, action) => {
      state.userInfo = action.payload;
    },
    removeUser: (state) => {
      state.userInfo = null;
    },
    setAllProducts: (state, action) => {
      state.allProducts = action.payload;
    },
  },
});

// Exporta el action creator "addToCart" para que se pueda utilizar para despachar acciones.
export const {
  addToCart,
  addToFavorite,
  increaseQuantity,
  decreaseQuantity,
  deleteProduct,
  resetCart,
  addUser,
  removeUser,
  setAllProducts,
} = nextSlice.actions;

// Exporta el reducer creado por createSlice para que se pueda utilizar en el store de Redux.
export default nextSlice.reducer;
