import React, { createContext, useState, useContext, ReactNode } from 'react';

export interface MenuItem {
  id: string;
  dishName: string;
  description: string;
  course: 'Starter' | 'Main' | 'Dessert';
  price: string;
}

interface MenuContextType {
  menuItems: MenuItem[];
  addMenuItem: (item: Omit<MenuItem, 'id'>) => void;
  removeMenuItem: (id: string) => void;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
};

export const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  const addMenuItem = (item: Omit<MenuItem, 'id'>) => {
    const newItem = { ...item, id: Date.now().toString() };
    setMenuItems((prev) => [...prev, newItem]);
  };

  const removeMenuItem = (id: string) => {
    setMenuItems((prev) => prev.filter((item) => item.id !== id));
  };

  const value = { menuItems, addMenuItem, removeMenuItem };

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
};

