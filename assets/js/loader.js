document.addEventListener('DOMContentLoaded', () => {
  const loader = document.getElementById("jewelry-loader");
  const loaderImg = document.getElementById("iconLoader");

  if (loader && loaderImg) {
    const icons = [
      "/uploads/icons/earrings.png",
      "/uploads/icons/diamond-ring.png",
      "/uploads/icons/earrings (1).png",
      "/uploads/icons/pendant.png",
      "/uploads/icons/necklace.png",
      "/uploads/icons/box.png",
      "/uploads/icons/jewelry (1).png",
    ];

    const pageKey = "manbhar_loader_shown_" + window.location.pathname;

    if (!sessionStorage.getItem(pageKey)) {
      document.body.style.overflow = "hidden";
      loader.style.display = "flex";
      loaderImg.classList.add("opacity-100");

      let index = 1;
      const rotateIcons = () => {
        loaderImg.classList.remove("opacity-100");
        loaderImg.classList.add("opacity-0");
        setTimeout(() => {
          loaderImg.src = icons[index];
          loaderImg.classList.remove("opacity-0");
          loaderImg.classList.add("opacity-100");
          index = (index + 1) % icons.length;
        }, 300);
      };

      const interval = setInterval(rotateIcons, 700);
      window.addEventListener("load", () => {
        setTimeout(() => {
          loader.classList.add("opacity-0");
          clearInterval(interval);
          setTimeout(() => {
            loader.remove();
            document.body.style.overflow = "";
            sessionStorage.setItem(pageKey, "true");
          }, 500);
        }, 2000);
      });
    } else {
      loader.remove();
    }
  }
});
