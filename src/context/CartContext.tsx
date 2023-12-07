import { ReactNode, createContext, useState } from "react";

interface CartContextType {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

const products: CartItem[] = [
  {
    products: {
      id: 1,
      name: "Sayur Wortel Kobis",
      stok: 120,
      price: 12000,
      photo_url: "string;",
      supplier_id: 2,
      jenis: "California",
      description: "string;",
    },
    qty: 2,
  },
  {
    products: {
      id: 2,
      name: "Sayur Wortel Kobis",
      stok: 120,
      price: 12000,
      photo_url: "string;",
      supplier_id: 2,
      jenis: "California",
      description: "string;",
    },
    qty: 2,
  },
  {
    products: {
      id: 3,
      name: "Sayur Wortel Kobis",
      stok: 120,
      price: 12000,
      photo_url: "string;",
      supplier_id: 2,
      jenis: "California",
      description: "string;",
    },
    qty: 2,
  },
];

export const CartContext = createContext<CartContextType | null>(null);

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(products);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
