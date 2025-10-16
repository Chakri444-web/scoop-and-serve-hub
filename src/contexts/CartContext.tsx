import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { CartItem, IceCream } from "@/types";
import { toast } from "sonner";

interface CartContextType {
  cart: CartItem[];
  addToCart: (icecream: IceCream) => void;
  removeFromCart: (icecreamId: string) => void;
  updateQuantity: (icecreamId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  totalItems: 0,
  totalPrice: 0,
});

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (icecream: IceCream) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.icecream.id === icecream.id);
      if (existing) {
        if (existing.quantity >= icecream.stock) {
          toast.error("Cannot add more items than available in stock");
          return prev;
        }
        toast.success("Updated quantity in cart");
        return prev.map((item) =>
          item.icecream.id === icecream.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      toast.success("Added to cart!");
      return [...prev, { icecream, quantity: 1 }];
    });
  };

  const removeFromCart = (icecreamId: string) => {
    setCart((prev) => prev.filter((item) => item.icecream.id !== icecreamId));
    toast.success("Removed from cart");
  };

  const updateQuantity = (icecreamId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(icecreamId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.icecream.id === icecreamId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.icecream.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
