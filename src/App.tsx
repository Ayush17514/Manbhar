import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { Toast } from './components/Toast';

import { HomeView } from './views/HomeView';
import { CollectionsView } from './views/CollectionsView';
import { ProductDetailView } from './views/ProductDetailView';
import { CartView } from './views/CartView';
import { CheckoutView } from './views/CheckoutView';
import { OrderSuccessView } from './views/OrderSuccessView';
import { WishlistView } from './views/WishlistView';
import { AboutView } from './views/AboutView';
import { ServicesView } from './views/ServicesView';
import { ContactView } from './views/ContactView';
import { ProfileView } from './views/ProfileView';
import { AdminView } from './views/AdminView';

const AppContent: React.FC = () => {
  const { currentRoute } = useStore();

  const renderView = () => {
    switch (currentRoute.view) {
      case 'home':
        return <HomeView />;
      case 'collections':
        return <CollectionsView />;
      case 'product':
        return <ProductDetailView />;
      case 'cart':
        return <CartView />;
      case 'checkout':
        return <CheckoutView />;
      case 'order-success':
        return <OrderSuccessView />;
      case 'wishlist':
        return <WishlistView />;
      case 'about':
        return <AboutView />;
      case 'services':
        return <ServicesView />;
      case 'contact':
        return <ContactView />;
      case 'profile':
        return <ProfileView />;
      case 'admin':
        return <AdminView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fef9f5] text-[#2f2f2f] selection:bg-[#C5A880]/30 selection:text-[#273639]">
      <Header />
      <main className="flex-1 pt-16 sm:pt-20">
        {renderView()}
      </main>
      <Footer />
      <CartDrawer />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
