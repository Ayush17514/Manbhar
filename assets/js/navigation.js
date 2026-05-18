document.addEventListener('DOMContentLoaded', () => {
  const openMobileNav = document.getElementById("open-mobile-nav");
  const closeMobileNav = document.getElementById("close-mobile-nav");
  const mobileNav = document.getElementById("mobile-nav");

  const openSearch = document.getElementById("open-search");
  const closeSearch = document.getElementById("close-search");
  const searchDrawer = document.getElementById("search-drawer");

  const openCart = document.getElementById("open-cart");
  const closeCart = document.getElementById("close-cart");
  const cartDrawer = document.getElementById("cart-drawer");

  const drawerOpen = (drawer) => {
    drawer.classList.remove("hidden");
  };

  const drawerClose = (drawer) => {
    drawer.classList.add("hidden");
  };

  openMobileNav.addEventListener("click", () => drawerOpen(mobileNav));
  closeMobileNav.addEventListener("click", () => drawerClose(mobileNav));

  openSearch.addEventListener("click", () => drawerOpen(searchDrawer));
  closeSearch.addEventListener("click", () => drawerClose(searchDrawer));

  openCart.addEventListener("click", () => drawerOpen(cartDrawer));
  closeCart.addEventListener("click", () => drawerClose(cartDrawer));
});
