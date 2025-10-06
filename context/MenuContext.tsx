import React, { createContext, useState, useContext, ReactNode } from 'react';

// Type definitions for a single menu item and the context
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
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

// A custom hook to use the menu context
export const useMenu = () => {
  const context = useContext(MenuContext);
  if (context === undefined) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
};

// The provider component that will wrap the application
export const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  const addMenuItem = (item: Omit<MenuItem, 'id'>) => {
    const newItem = {
      ...item,
      id: Date.now().toString(), // Generate a unique ID
    };
    setMenuItems((currentItems) => [...currentItems, newItem]);
  };

  const value = { menuItems, addMenuItem };

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
};
