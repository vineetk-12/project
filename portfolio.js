 $(function () {
        /* ── Lenis ── */
        const lenis = new Lenis({
          duration: 1.3,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
        });
        (function raf(time) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        })(0);
        lenis.on("scroll", ScrollTrigger.update);
        gsap.ticker.lagSmoothing(0);

        /* ── Cursor ── */
        let mx = 0,
          my = 0,
          fx = 0,
          fy = 0;
        $(document).mousemove((e) => {
          mx = e.clientX;
          my = e.clientY;
          $("#cursor").css({ left: mx, top: my });
        });
        (function moveFol() {
          fx += (mx - fx) * 0.12;
          fy += (my - fy) * 0.12;
          $("#cursor-follower").css({ left: fx, top: fy });
          requestAnimationFrame(moveFol);
        })();
        $("a,button,.project-item,.js-card,.skill-item,.social-link,.btn-link")
          .on("mouseenter", () => $("body").addClass("hovering"))
          .on("mouseleave", () => $("body").removeClass("hovering"));

        /* ── Hero entrance ── */
        gsap
          .timeline({ delay: 0.15 })
          .to(".hero-tag", {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
          })
          .to(
            ".hero-title .line span",
            { y: 0, duration: 1.1, stagger: 0.14, ease: "expo.out" },
            "-=.4",
          )
          .to(
            ".hero-desc",
            { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" },
            "-=.5",
          )
          .to(
            ".hero-scroll-hint",
            { opacity: 1, duration: 0.7, ease: "power2.out" },
            "-=.4",
          );

        /* ── Nav shrink ── */
        $(window).on("scroll", function () {
          $("nav").css(
            "padding",
            $(this).scrollTop() > 60 ? "14px 56px" : "22px 56px",
          );
        });

        /* ── Scroll reveals ── */
        gsap.utils.toArray(".reveal").forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 44 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: el,
                start: "top 88%",
                toggleActions: "play none none none",
              },
            },
          );
        });

        /* ── Section title skew ── */
        gsap.utils.toArray(".section-title").forEach((el) => {
          gsap.fromTo(
            el,
            { skewX: -4, opacity: 0 },
            {
              skewX: 0,
              opacity: 1,
              duration: 1.1,
              ease: "expo.out",
              scrollTrigger: { trigger: el, start: "top 86%" },
            },
          );
        });

        /* ── JS Cards stagger ── */
        gsap.to(".js-card", {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".js-grid", start: "top 80%" },
        });

        /* ── Project rows ── */
        gsap.from(".project-item", {
          opacity: 0,
          x: -30,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".projects-list", start: "top 82%" },
        });

        /* ── Hero parallax ── */
        gsap.to(".hero-bg-num", {
          y: 130,
          ease: "none",
          scrollTrigger: {
            trigger: "#hero",
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
          },
        });

        /* ── Contact parallax ── */
        gsap.to(".contact-bg-text", {
          y: -70,
          ease: "none",
          scrollTrigger: {
            trigger: "#contact",
            start: "top bottom",
            end: "bottom top",
            scrub: 2,
          },
        });

        /* ── Marquee speed on scroll ── */
        lenis.on("scroll", ({ velocity }) => {
          const d = Math.max(5, 22 - Math.abs(velocity) * 3);
          $(".marquee-inner").css("animation-duration", d + "s");
        });

        /* ── Project expand/collapse ── */
        $(".project-item").on("click", function () {
          const idx = $(this).data("idx");
          const $prev = $("#prev-" + idx);
          const open = $prev.hasClass("_open");
          $(".project-preview").removeClass("_open").slideUp(320);
          $(".project-arrow").text("↗");
          if (!open) {
            $prev.addClass("_open").hide().slideDown(380);
            $(this).find(".project-arrow").text("✕");
            gsap.fromTo(
              "#prev-" + idx + " .preview-screenshot img",
              { scale: 1.07, opacity: 0 },
              {
                scale: 1,
                opacity: 1,
                duration: 0.9,
                ease: "power3.out",
                delay: 0.08,
              },
            );
            gsap.fromTo(
              "#prev-" + idx + " .preview-meta-item",
              { opacity: 0, y: 14 },
              {
                opacity: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.08,
                ease: "power2.out",
                delay: 0.3,
              },
            );
          }
        });

        /* ── Active nav ── */
        [
          "#hero",
          "#about",
          "#work",
          "#js-projects",
          "#process",
          "#contact",
        ].forEach((id) => {
          ScrollTrigger.create({
            trigger: id,
            start: "top center",
            end: "bottom center",
            onEnter: () => highlight(id),
            onEnterBack: () => highlight(id),
          });
        });
        function highlight(id) {
          $(".nav-links a").css({ opacity: ".5", color: "" });
          $('.nav-links a[href="' + id + '"]').css({
            opacity: "1",
            color: "var(--accent)",
          });
        }
      });