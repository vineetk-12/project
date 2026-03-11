AOS.init();

     // Mobile Menu Toggle
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("mobileMenuToggle");
  const menu = document.querySelector(".menu-pill");
  const dropdownItems = document.querySelectorAll(".has-dropdown");


  toggleBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleBtn.classList.toggle("active");
    menu.classList.toggle("active");
  });

 
  dropdownItems.forEach(item => {
    const trigger = item.querySelector(".dropdown-toggle");

    if (!trigger) return;

    trigger.addEventListener("click", (e) => {
      if (window.innerWidth > 768) return;

      e.preventDefault();
      e.stopPropagation();

      const isOpen = item.classList.contains("open");

     
      dropdownItems.forEach(i => i.classList.remove("open"));

      if (!isOpen) {
        item.classList.add("open");
      }
    });
  });

 
  document.addEventListener("click", (e) => {
    if (
      !menu.contains(e.target) &&
      !toggleBtn.contains(e.target)
    ) {
      menu.classList.remove("active");
      toggleBtn.classList.remove("active");
      dropdownItems.forEach(i => i.classList.remove("open"));
    }
  });

  
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      menu.classList.remove("active");
      toggleBtn.classList.remove("active");
      dropdownItems.forEach(i => i.classList.remove("open"));
    }
  });
});

      // Timeline Carousel
      const timelineTrack = document.querySelector(".timeline-steps");
      const timelinePrevBtn = document.getElementById("prevBtn");
      const timelineNextBtn = document.getElementById("nextBtn");
      const steps = document.querySelectorAll(".timeline-step");

      let timelineCurrentIndex = 0;
      let itemsToShow = 3;

      function updateItemsToShow() {
        if (window.innerWidth <= 768) {
          itemsToShow = 1;
        } else if (window.innerWidth <= 1200) {
          itemsToShow = 2;
        } else {
          itemsToShow = 3;
        }

       
        const maxIndex = Math.max(0, steps.length - itemsToShow);
        if (timelineCurrentIndex > maxIndex) {
          timelineCurrentIndex = maxIndex;
        }

        updateTimelineCarousel();
      }

      function updateTimelineCarousel() {
        const itemWidth = 100 / itemsToShow;
        timelineTrack.style.transform = `translateX(-${timelineCurrentIndex * itemWidth}%)`;

        timelinePrevBtn.disabled = timelineCurrentIndex === 0;
        timelineNextBtn.disabled =
          timelineCurrentIndex >= steps.length - itemsToShow;
      }

      timelineNextBtn.addEventListener("click", () => {
        if (timelineCurrentIndex < steps.length - itemsToShow) {
          timelineCurrentIndex++;
          updateTimelineCarousel();
        }
      });

      timelinePrevBtn.addEventListener("click", () => {
        if (timelineCurrentIndex > 0) {
          timelineCurrentIndex--;
          updateTimelineCarousel();
        }
      });

      window.addEventListener("resize", updateItemsToShow);
      updateItemsToShow();

      // Header Slider
      const track = document.querySelector(".slider-track");
  const slides = document.querySelectorAll(".slide");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");

  let currentIndex = 0;
  const totalSlides = slides.length;

  function updateSlider() {
    const percentage = (currentIndex * 100) / totalSlides;
    track.style.transform = `translateX(-${percentage}%)`;
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlider();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateSlider();
  }

  nextBtn?.addEventListener("click", () => {
    nextSlide();
    resetTimer();
  });

  prevBtn?.addEventListener("click", () => {
    prevSlide();
    resetTimer();
  });

  let autoSlide = setInterval(nextSlide, 5000);

  function resetTimer() {
    clearInterval(autoSlide);
    autoSlide = setInterval(nextSlide, 5000);
  }



      // Search Widget Logic
      const searchToggle = document.getElementById("searchToggle");
      const searchBox = document.getElementById("searchBox");
      const searchClose = document.getElementById("searchClose");

      searchToggle.addEventListener("click", () => {
        searchBox.classList.add("active");
        searchToggle.style.opacity = "0";
        searchToggle.style.pointerEvents = "none";
      });

      searchClose.addEventListener("click", () => {
        searchBox.classList.remove("active");
        searchToggle.style.opacity = "1";
        searchToggle.style.pointerEvents = "auto";
      });

     
      const backToTopBtn = document.querySelector(".back-to-top-btn");
      window.addEventListener("scroll", () => {
        if (window.scrollY > window.innerHeight) {
          backToTopBtn.classList.add("show");
        } else {
          backToTopBtn.classList.remove("show");
        }
      });

      //  Counter
      gsap.registerPlugin(ScrollTrigger);

      document.querySelectorAll(".counter").forEach((counter) => {
        const target = +counter.dataset.target;

        gsap.fromTo(
          counter,
          { innerText: 0 },
          {
            innerText: target,
            duration: 4.2,
            ease: "power2.out",
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: "#stats",
              start: "top 70%",
              once: true,
            },
            onUpdate: function () {
              counter.innerText = Math.floor(counter.innerText) + "+";
            },
          },
        );
      });
      // card animation//
      const cards = document.querySelectorAll(".card");

      cards.forEach((card) => {
        const content = card.querySelector(".content-area");

        card.addEventListener("mouseenter", () => {
          if (window.innerWidth <= 1024) return; 

          
          gsap.to(card, {
            flex: 2,
            duration: 0.8,
            ease: "power3.out",
            overwrite: "auto",
          });

        
          gsap.to(content, {
            opacity: 1,
            visibility: "visible",
            y: 0,
            duration: 0.6,
            delay: 0.1,
            overwrite: "auto",
          });
        });

        card.addEventListener("mouseleave", () => {
          if (window.innerWidth <= 1024) return;

         
          gsap.to(card, {
            flex: 1,
            duration: 0.8,
            ease: "power3.out",
            overwrite: "auto",
          });

       
          gsap.to(content, {
            opacity: 0,
            y: 20,
            duration: 0.4,
            overwrite: "auto",
            onComplete: () => gsap.set(content, { visibility: "hidden" }),
          });
        });
      });

      // Digital Solutions Scroll Reveal
      document.addEventListener("DOMContentLoaded", () => {
        const dsCards = document.querySelectorAll(".ds-service-card");
        const dsObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add("revealed");
              }
            });
          },
          { threshold: 0.15 },
        );
        dsCards.forEach((card) => {
          dsObserver.observe(card);
          const bgUrl = card.getAttribute("data-img");
          card.querySelector(".ds-card-bg-hover").style.backgroundImage =
            `url('${bgUrl}')`;
        });
      });

      // Testimonials Scroll Reveal
      const testimonials = [
        {
          name: "Suraj Prajapati",
          role: "Amazon Seller",
          quote:
            "“Very nice and useful service provider. Always ready to provide internet marketing Services with a reasonable package. I have been working with Cruzendigital for a few months now and I must say that their work is absolutely outstanding.”",
          image: "dp.jpg",
        },
        {
          name: "Niramla Bareth",
          role: "Flipkart & Amazon Seller",
          quote:
            "“Service beyond expectation. Always deliver something more than what Cruzen digital & team promise. for SEO & Web Designing and Corporate Presentation it is the Best Company.",
          image: "dp.jpg",
        },
        {
          name: "Ankit kr Soni",
          role: "Meesho Seller",
          quote:
            "“I am so impressed with the work that Cruzen Digital did on my website. Their team was highly skilled, responsive, and professional. They helped me create a website that perfectly captured my brand's identity and attracted more business. I would highly recommend their services!”",
          image: "dp.jpg",
        },
        {
          name: "Aman Tyagi",
          role: "Snapdeal Seller",
          quote:
            "“Our talented team of marketing professionals has a wealth of experience working with businesses of all shapes and sizes, so we can help your business grow using the most effective digital marketing techniques Available ”",
          image: "dp.jpg",
        },
        {
          name: "Surendra Panda",
          role: "E-commerce Seller",
          quote:
            "“I'm really thankful to Cruzendigital for the amazing job they did in marketing my business. I finally made a decision to let them handle it and I've never been happier with the outcome. They helped me design an amazing website and I couldn't be more satisfied.”",
          image: "dp.jpg",
        },
        {
          name: "Suraj Prajapati",
          role: "Website Seller",
          quote:
            "“Thank you aapki wajah se meri website down jane se bacha gayi, very much happy with your work and support.”",
          image: "dp.jpg",
        },
        {
          name: "Abhisheak Verma",
          role: "Amazon Seller",
          quote:
            "“Main Delhi se hun and main yahan per aaya tha visit kiya tha bahut achcha experience bahut achcha tha team bhi bahut achcha hai aur condition bhi bahut Mast hai”",
          image: "dp.jpg",
        },
        {
          name: "Ramesh Kumar",
          role: "Etsy Seller",
          quote:
            "“Cruzendigital ek perfect jagah hai digital marketing aur e-commerce ki saari zarooraton ke liye. Unki services bharosey ke layak hain, aur affordable rates mein world-class digital marketing solutions dete hain. ”",
          image: "dp.jpg",
        },
        {
          name: "Suraj kumar",
          role: "Gamer",
          quote:
            "“Best company best service best Store according to my experience this was best place for marketing service because I have seen many store and he was give top notch service”",
          image: "dp.jpg",
        },
        {
          name: "Shree Brothers Editz",
          role: "Client",
          quote:
            "“Cruzendigital ke experts innovative strategies offer karte hain, Jo ki mere business ko online market mein stand out karne mein madad karte hain.”",
          image: "dp.jpg",
        },
        {
          name: "Rahul Sharma",
          role: "Cruzen Client",
          quote:
            "“ very good services provided by cruzen digital my sales have doubled in just a month because of them they crafted a strategic marketing plan according to my brand and engagement and I cannot say enough how much it benefited me i highly recommended their service to everyone lookin to double their sales”",
          image: "dp.jpg",
        },
        {
          name: "Cheikh Sow",
          role: "Cruzen Client",
          quote:
            "“I am the owner of a small business with over 15 years of expertise in the industry. Cruzendigital sounded too good to be true when I first heard about it. They take care of everything, and their pricing is the most reasonable I've seen. Customer service has also been outstanding.”",
          image: "dp.jpg",
        },
      ];

      let testimonialIndex = 0;

      const nameEl = document.getElementById("name");
      const roleEl = document.getElementById("role");
      const quoteEl = document.getElementById("quote");
      const imgEl = document.getElementById("img");
      const cardEl = document.getElementById("card");

      function updateContent() {
       
        cardEl.classList.remove("fade-in");
        void cardEl.offsetWidth;
        cardEl.classList.add("fade-in");

       
        const current = testimonials[testimonialIndex];
        nameEl.innerText = current.name;
        roleEl.innerText = current.role;
        quoteEl.innerText = current.quote;
        imgEl.src = current.image;
      }

      // Previous Button 
      document.getElementById("btn-prev").onclick = function () {
        if (testimonialIndex === 0) {
          testimonialIndex = testimonials.length - 1;
        } else {
          testimonialIndex--;
        }
        updateContent();
      };

      // Next Button 
      document.getElementById("btn-next").onclick = function () {
        testimonialIndex = (testimonialIndex + 1) % testimonials.length;
        updateContent();
      };

      
      updateContent();

      // faq section 
      gsap.to("#faqWrapper", {
        opacity: 1,
        y: -20,
        duration: 1,
        ease: "power3.out",
      });
      gsap.from(".faq-item", {
        opacity: 0,
        y: 30,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.3,
      });

      const items = document.querySelectorAll(".faq-item");

      items.forEach((item) => {
        const question = item.querySelector(".faq-question");
        const answer = item.querySelector(".faq-answer");
        const icon = item.querySelector(".icon");

        question.addEventListener("click", () => {
          const isOpen = item.classList.contains("active");

          items.forEach((otherItem) => {
            if (otherItem !== item && otherItem.classList.contains("active")) {
              otherItem.classList.remove("active");
              gsap.to(otherItem.querySelector(".faq-answer"), {
                height: 0,
                duration: 0.5,
                ease: "power4.inOut",
              });
              gsap.to(otherItem.querySelector(".icon"), {
                rotation: 0,
                duration: 0.5,
              });
            }
          });

          item.classList.toggle("active");

          if (!isOpen) {
            gsap.to(answer, {
              height: "auto",
              duration: 0.6,
              ease: "power4.out",
            });
            gsap.to(icon, { rotation: 45, duration: 0.5, ease: "back.out(2)" });
          } else {
            gsap.to(answer, { height: 0, duration: 0.5, ease: "power4.inOut" });
            gsap.to(icon, { rotation: 0, duration: 0.5, ease: "power2.inOut" });
          }
        });
      });

      const navContainer = document.querySelector(".nav-container");
      if (navContainer) {
        navContainer.addEventListener("click", function () {
          this.classList.toggle("active");
        });
      }

      // consult alert
      setTimeout(() => {
            const overlay = document.querySelector('.modal-overlay');
            overlay.style.display = 'flex';
            setTimeout(() => { overlay.style.opacity = '1'; }, 10);
        }, 5000);

        const closeBtn = document.querySelector('.close-btn');
        if(closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }

        function closeModal() {
            const overlay = document.querySelector('.modal-overlay');
            overlay.style.opacity = '0';
            setTimeout(() => { overlay.style.display = 'none'; }, 400);
        }