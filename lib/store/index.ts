import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface SearchState {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (isOpen: boolean) => void;
}

interface NavigationState {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
  isServicesDropdownOpen: boolean;
  setIsServicesDropdownOpen: (isOpen: boolean) => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),
  isSearchOpen: false,
  setIsSearchOpen: (isOpen) => set({ isSearchOpen: isOpen }),
}));

export const useNavigationStore = create<NavigationState>((set) => ({
  isMobileMenuOpen: false,
  setIsMobileMenuOpen: (isOpen) => set({ isMobileMenuOpen: isOpen }),
  isServicesDropdownOpen: false,
  setIsServicesDropdownOpen: (isOpen) =>
    set({ isServicesDropdownOpen: isOpen }),
}));

interface SubscriberState {
  subscribedEmails: string[];
  addSubscriber: (email: string) => boolean;
}

export const useSubscriberStore = create<SubscriberState>()(
  persist(
    (set, get) => ({
      subscribedEmails: [],
      addSubscriber: (email) => {
        const { subscribedEmails } = get();
        if (subscribedEmails.includes(email.toLowerCase())) {
          return false;
        }
        set({ subscribedEmails: [...subscribedEmails, email.toLowerCase()] });
        return true;
      },
    }),
    {
      name: "subscriber-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
