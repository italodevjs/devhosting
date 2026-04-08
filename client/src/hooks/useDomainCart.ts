import { useState, useCallback } from "react";

export interface CartItem {
  domain: string;
  tld: string;
  price: number;
  years: number;
}

export function useDomainCart() {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = useCallback((item: CartItem) => {
    setItems((prev) => {
      const exists = prev.find((i) => i.domain + i.tld === item.domain + item.tld);
      if (exists) return prev;
      return [...prev, item];
    });
  }, []);

  const removeItem = useCallback((domain: string, tld: string) => {
    setItems((prev) => prev.filter((i) => !(i.domain === domain && i.tld === tld)));
  }, []);

  const updateYears = useCallback((domain: string, tld: string, years: number) => {
    setItems((prev) =>
      prev.map((i) =>
        i.domain === domain && i.tld === tld ? { ...i, years } : i
      )
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const total = items.reduce((sum, i) => sum + i.price * i.years, 0);
  const count = items.length;

  const hasItem = useCallback(
    (domain: string, tld: string) =>
      items.some((i) => i.domain === domain && i.tld === tld),
    [items]
  );

  return { items, addItem, removeItem, updateYears, clearCart, total, count, hasItem };
}
