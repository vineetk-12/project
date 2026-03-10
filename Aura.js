 // Initialize Lenis smooth scrolling
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);
 

    
    // UI Helpers
    const openOverlay = () => {
      lenis.stop();
      document.body.classList.add("no-scroll");
      gsap.to("#overlay", { display: "block", opacity: 1, duration: 0.3 });
      gsap.to("#heroVideo", {
        filter: "blur(10px)",
        scale: 1.05,
        duration: 0.8,
      });
    };
    const closeOverlay = () => {
      // Check if any timeline is still active/open before closing overlay
      gsap.delayedCall(0.1, () => {
        if (!contactTL.isActive() && !menuTL.isActive() && !searchTL.isActive() && !bagTL.isActive() &&
            contactTL.progress() === 0 && menuTL.progress() === 0 && searchTL.progress() === 0 && bagTL.progress() === 0) {
          lenis.start();
          document.body.classList.remove("no-scroll");
          gsap.to("#overlay", {
            opacity: 0,
            duration: 0.3,
            onComplete: () => gsap.set("#overlay", { display: "none" }),
          });
          gsap.to("#heroVideo", { filter: "blur(0px)", scale: 1, duration: 0.8 });
        }
      });
    };

    // Panel Timelines
    const contactTL = gsap.timeline({
      paused: true,
      onStart: openOverlay,
      onReverseComplete: closeOverlay,
    });
    contactTL
      .to("#contactPanel", { left: 0, duration: 0.7, ease: "power4.out" })
      .to(".stagger-contact", { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 }, "-=0.4");

    const menuTL = gsap.timeline({
      paused: true,
      onStart: openOverlay,
      onReverseComplete: closeOverlay,
    });
    menuTL
      .to("#menuPanel", { right: 0, duration: 0.7, ease: "power4.out" })
      .to(".stagger-menu", { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 }, "-=0.4");

    const searchTL = gsap.timeline({
      paused: true,
      onStart: openOverlay,
      onReverseComplete: closeOverlay,
    });
    searchTL
      .to("#searchPanel", { top: 0, duration: 0.7, ease: "power4.out" })
      .to("#searchStagger", { opacity: 1, y: 0, duration: 0.5 }, "-=0.4")
      .to(".stagger-trend", { opacity: 1, y: 0, duration: 0.4, stagger: 0.1 }, "-=0.3");

    const bagTL = gsap.timeline({
      paused: true,
      onStart: () => {
        openOverlay();
        document.getElementById("shoppingBagPanel").classList.add("active");
      },
      onReverseComplete: () => {
        closeOverlay();
        document.getElementById("shoppingBagPanel").classList.remove("active");
      },
    });
    bagTL.to("#shoppingBagPanel", {
      right: 0,
      duration: 0.7,
      ease: "power4.out",
    });

    // Event Listeners
    document.getElementById("openContact").onclick = () => {
      menuTL.reverse();
      searchTL.reverse();
      bagTL.reverse();
      contactTL.play();
    };
    document.getElementById("closeContact").onclick = () => contactTL.reverse();
    document.getElementById("openMenu").onclick = () => {
      contactTL.reverse();
      searchTL.reverse();
      bagTL.reverse();
      menuTL.play();
    };
    document.getElementById("closeMenu").onclick = () => menuTL.reverse();

    const mobileContactBtn = document.getElementById("mobileContactBtn");
    if (mobileContactBtn) {
      mobileContactBtn.onclick = () => {
        menuTL.reverse();
        gsap.delayedCall(0.75, () => {
          searchTL.reverse();
          bagTL.reverse();
          contactTL.play();
        });
      };
    }

    document.getElementById("openSearch").onclick = () => {
      contactTL.reverse();
      menuTL.reverse();
      bagTL.reverse();
      searchTL.play();
    };
    document.getElementById("closeSearch").onclick = () => searchTL.reverse();
    document.getElementById("shoppingBag").onclick = () => {
      contactTL.reverse();
      menuTL.reverse();
      searchTL.reverse();
      bagTL.play();
    };
    document.getElementById("closeBag").onclick = () => bagTL.reverse();
    document.getElementById("overlay").onclick = () => {
      contactTL.reverse();
      menuTL.reverse();
      searchTL.reverse();
      bagTL.reverse();
    };

    // Set initial panel positions
    function setInitialPositions() {
      const isTablet = window.matchMedia("(min-width: 768px) and (max-width: 1024px)").matches;
      if (isTablet) {
        gsap.set("#contactPanel", { left: "-45%" });
        gsap.set("#menuPanel", { right: "-100%" });
        gsap.set("#shoppingBagPanel", { right: "-100%" });
      }
    }
    setInitialPositions();
    window.addEventListener("resize", setInitialPositions);

    // Responsive Animation Logic
    let mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      gsap.timeline({
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom 20%",
          scrub: 1.2,
        },
      })
      .to(".logo-large", {
        scale: 0.12,
        y: -window.innerHeight * 0.45,
        opacity: 0,
      })
      .to(".logo-small", { opacity: 1, y: 0 }, "-=0.4");
    });

    mm.add("(max-width: 767px)", () => {
      const mobileTL = gsap.timeline({
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom 50%",
          scrub: true,
        },
      });
      mobileTL
        .to(".logo-large", { opacity: 0 })
        .to(".logo-small", { opacity: 1, y: 0 }, "-=0.5");
    });

    ScrollTrigger.create({
      trigger: ".hero",
      start: "bottom 15%",
      onEnter: () => document.getElementById("navbar").classList.add("nav-white-bg"),
      onLeaveBack: () => document.getElementById("navbar").classList.remove("nav-white-bg"),
    });

    function viewMore() {
      lenis.scrollTo(0, { duration: 1.2 });
    }

    // === SHOPPING BAG LOGIC ===
    const cartContainer = document.getElementById('cartItemsContainer');
    const emptyMsg = document.getElementById('emptyBagMessage');
    const cartFooter = document.getElementById('cartFooter');
    const totalPriceEl = document.getElementById('cartTotalPrice');
    const checkoutBtn = document.getElementById('checkoutBtn');

    function getCart() {
      return JSON.parse(localStorage.getItem('auraCart')) || [];
    }

    function saveCart(cart) {
      localStorage.setItem('auraCart', JSON.stringify(cart));
      renderCart();
    }

    function renderCart() {
      const cart = getCart();
      
      // Update Badge
      const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
      const badge = document.querySelector('.cart-badge');
      if (badge) {
        badge.innerText = totalQty;
        badge.style.display = totalQty > 0 ? 'flex' : 'none';
      }

      if (!cartContainer || !emptyMsg || !cartFooter) return;

      if (cart.length === 0) {
        cartContainer.style.display = 'none';
        cartFooter.style.display = 'none';
        emptyMsg.style.display = 'flex';
        cartContainer.innerHTML = '';
      } else {
        emptyMsg.style.display = 'none';
        cartContainer.style.display = 'block';
        cartFooter.style.display = 'block';
        
        let total = 0;
        let currency = '₹';
        if (cart.length > 0) {
           const priceMatch = cart[0].price.match(/^[^\d]+/);
           if (priceMatch) currency = priceMatch[0];
        }
        cart.forEach(item => {
            const price = parseFloat(item.price.replace(/[^0-9.]/g, ''));
            total += price * item.quantity;
        });
        if (totalPriceEl) {
            totalPriceEl.innerText = currency + total.toLocaleString();
        }

        cartContainer.innerHTML = cart.map(item => `
          <div class="cart-item" style="display: flex; gap: 15px; margin-bottom: 20px; align-items: center; border-bottom: 1px solid #eee; padding-bottom: 15px;">
              <img src="${item.image}" style="width: 60px; height: 80px; object-fit: cover;">
              <div style="flex: 1;">
                  <h4 style="font-size: 12px; margin: 0 0 5px 0; text-transform: uppercase; font-family: 'Inter', sans-serif;">${item.title}</h4>
                  <p style="font-size: 12px; font-weight: bold; margin: 0; font-family: 'Inter', sans-serif;">${item.price}</p>
                  <div style="display: flex; align-items: center; gap: 10px; margin-top: 8px;">
                      <button class="qty-btn" data-action="decrease" data-id="${item.id}" style="border: 1px solid #ddd; background: none; width: 24px; height: 24px; cursor: pointer; display: flex; align-items: center; justify-content: center;">-</button>
                      <span style="font-size: 12px; min-width: 20px; text-align: center;">${item.quantity}</span>
                      <button class="qty-btn" data-action="increase" data-id="${item.id}" style="border: 1px solid #ddd; background: none; width: 24px; height: 24px; cursor: pointer; display: flex; align-items: center; justify-content: center;">+</button>
                  </div>
              </div>
              <div class="remove-btn" data-action="remove" data-id="${item.id}" style="cursor: pointer; padding: 5px; color: #999;">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"></path></svg>
              </div>
          </div>
        `).join('');
      }
    }

    // Event Delegation
    if (cartContainer) {
      cartContainer.addEventListener('click', (e) => {
        const btn = e.target.closest('.qty-btn') || e.target.closest('.remove-btn');
        if (!btn) return;

        const action = btn.dataset.action;
        const id = btn.dataset.id;
        let cart = getCart();
        const item = cart.find(i => i.id === id);

        if (action === 'remove') {
          cart = cart.filter(i => i.id !== id);
        } else if (item) {
          if (action === 'increase') item.quantity++;
          if (action === 'decrease') {
            item.quantity--;
            if (item.quantity <= 0) cart = cart.filter(i => i.id !== id);
          }
        }
        saveCart(cart);
      });
    }

    // Checkout Button Logic
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', () => {
        checkoutBtn.style.backgroundColor = '#000';
        checkoutBtn.style.color = '#fff';
      });
    }

    // Add to Cart Logic
    function addToCart(card) {
      const img = card.querySelector('.base-image').src;
      const title = card.querySelector('h3').innerText;
      const price = card.querySelector('.product-price').innerText;
      const id = title.replace(/\s+/g, '-').toLowerCase();

      let cart = getCart();
      const existing = cart.find(i => i.id === id);
      
      if (existing) {
        existing.quantity++;
      } else {
        cart.push({ id, title, price, image: img, quantity: 1 });
      }
      
      saveCart(cart);
      bagTL.play();
    }

    // Initialize Cart
    renderCart();

    // Hover Animations for Products
    function initAnimations() {
      document.querySelectorAll(".product-card").forEach((p) => {
        const main = p.querySelector(".base-image");
        const hover = p.querySelector(".hover-image");
        const action = p.querySelector(".action-overlay");

        p.addEventListener("mouseenter", () => {
          gsap.to(main, { scale: 1.05, duration: 0.6 });
          gsap.to(hover, { scale: 1.05, opacity: 1, duration: 0.6 });
          gsap.to(action, { y: 0, duration: 0.4, ease: "power2.out" });
        });

        p.addEventListener("mouseleave", () => {
          gsap.to(main, { scale: 1, duration: 0.6 });
          gsap.to(hover, { scale: 1, opacity: 0, duration: 0.6 });
          gsap.to(action, { y: "100%", duration: 0.3 });
        });

        action.addEventListener("click", (e) => {
          e.preventDefault();
          addToCart(p);
        });
      });
    }

    // Inject Wishlist Heart HTML
    function injectWishlist() {
      const heartHTML = `
        <div class="wishlist-btn">
          <input type="checkbox" class="wishlist-checkbox">
          <div class="svg-wrapper">
            <svg viewBox="0 0 24 24" class="icon-svg"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="none" stroke="currentColor" stroke-width="2"/></svg>
            <svg viewBox="0 0 24 24" class="icon-svg icon-filled"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
          </div>
        </div>`;
      document.querySelectorAll(".image-wrapper").forEach((box) => {
        box.insertAdjacentHTML("beforeend", heartHTML);
      });
    }

    initAnimations();
    injectWishlist();

    // Product Grid Switching
    function switchTab(targetId, btnId) {
      const currentGrid = document.querySelector('.product-grid.active');
      const nextGrid = document.getElementById(targetId);
      const activeBtn = document.getElementById(btnId);
      const allBtns = document.querySelectorAll('.store-btn');

      if (currentGrid === nextGrid) return;

      // Update Buttons
      allBtns.forEach(btn => btn.classList.remove('active'));
      activeBtn.classList.add('active');

      // Smooth Scroll to top of container
      lenis.scrollTo('.store-container', { offset: -120, duration: 1.2 });

      // Animate Transition
      gsap.to(currentGrid, {
        opacity: 0,
        y: 20,
        duration: 0.3,
        onComplete: () => {
          currentGrid.classList.remove('active');
          nextGrid.classList.add('active');

          // Reset and animate in new items
          gsap.set(nextGrid, { opacity: 1, y: 0 });
          gsap.fromTo(
            nextGrid.querySelectorAll('.product-card'),
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.6, stagger: 0.05, ease: "power2.out" }
          );
        }
      });
    }

    document.getElementById('bestSellerBtn').addEventListener('click', () => switchTab('bestsellers', 'bestSellerBtn'));
    document.getElementById('newInBtn').addEventListener('click', () => switchTab('new-in', 'newInBtn'));

    // Menu New Arrival Link
    const newArrivalLink = document.getElementById('newArrivalLink');
    if (newArrivalLink) {
      newArrivalLink.addEventListener('click', (e) => {
        e.preventDefault();
        menuTL.reverse();
        const currentGrid = document.querySelector('.product-grid.active');
        const nextGrid = document.getElementById('new-in');
        if (currentGrid !== nextGrid) {
          switchTab('new-in', 'newInBtn');
        } else {
          lenis.scrollTo('.store-container', { offset: -120, duration: 1.2 });
        }
      });
    }

    // === SPLIT PAGE INTERACTION ===
    const splits = document.querySelectorAll('.split-section');
    const splitLogo = document.getElementById('main-logo');

    mm.add("(min-width: 769px)", () => {
      splits.forEach(split => {
        const video = split.querySelector('video');
        if (!video) return;

        const mouseenterHandler = () => {
          splits.forEach(s => { s.classList.remove('is-active'); const v = s.querySelector('video'); if (v) v.pause(); });
          split.classList.add('is-active');
          video.play();
          const side = split.getAttribute('data-side');
          gsap.to(splitLogo, { x: side === 'left' ? -20 : 20, duration: 1, ease: "power2.out" });
        };

        const mouseleaveHandler = () => {
          split.classList.remove('is-active');
          video.pause();
          gsap.to(splitLogo, { x: 0, duration: 1, ease: "power2.out" });
        };

        split.addEventListener('mouseenter', mouseenterHandler);
        split.addEventListener('mouseleave', mouseleaveHandler);

        return () => { // Cleanup function
          split.removeEventListener('mouseenter', mouseenterHandler);
          split.removeEventListener('mouseleave', mouseleaveHandler);
        };
      });
    });

    mm.add("(max-width: 768px)", () => {
      splits.forEach(split => {
        split.classList.add('is-active');
        const video = split.querySelector('video');
        if (video) video.play();
      });
      return () => { // Cleanup function
        splits.forEach(split => { split.classList.remove('is-active'); const video = split.querySelector('video'); if (video) video.pause(); });
      };
    });

    // Reveal Split Page on Scroll
    ScrollTrigger.create({
      trigger: ".split-page-container",
      start: "top 60%",
      onEnter: () => {
        gsap.from(".split-section", {
          width: 0,
          stagger: 0.2,
          duration: 1.5,
          ease: "expo.inOut",
          clearProps: "width"
        });
        gsap.from(".page-logo h1", {
          opacity: 0,
          letterSpacing: "1em",
          duration: 2,
          ease: "power3.out"
        });
      }
    });
    // Back to Top Logic
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        gsap.to(backToTopBtn, { autoAlpha: 1, duration: 0.3 });
      } else {
        gsap.to(backToTopBtn, { autoAlpha: 0, duration: 0.3 });
      }
    });

    backToTopBtn.addEventListener('click', () => {
      lenis.scrollTo(0, { duration: 1.5, ease: "power4.out" });
    });


     document.getElementById('bg-video').onerror = function() {
            alert("Error: 'kids3.mp4' not found. Please check the filename.");
        };