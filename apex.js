
      gsap.registerPlugin(ScrollTrigger);
      let lenis;
      try {
        lenis = new Lenis({
          duration: 1.6,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
          wheelMultiplier: 0.85,
        });
        lenis.on("scroll", ScrollTrigger.update);
        gsap.ticker.add((t) => lenis.raf(t * 1000));
        gsap.ticker.lagSmoothing(0);
      } catch (e) {
        
        lenis = {
          on: (ev, cb) => {
            if (ev === "scroll")
              window.addEventListener("scroll", () =>
                cb({ scroll: window.scrollY }),
              );
          },
          scrollTo: (target) => {
            if (target && target.scrollIntoView)
              target.scrollIntoView({ behavior: "smooth" });
          },
          raf: () => {},
        };
        window.addEventListener("scroll", ScrollTrigger.update);
      }



      const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

hamburger.addEventListener("click", () => {
hamburger.classList.toggle("active");
navMenu.classList.toggle("active");
});
      // ═══ PRELOADER ═══
      let pct = 0;
      const preBar = document.getElementById("preBar");
      const prePct = document.getElementById("prePct");
      gsap.to(".pre-logo", {
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.2,
      });
      const preInterval = setInterval(() => {
        pct += Math.random() * 8 + 2;
        if (pct >= 100) {
          pct = 100;
          clearInterval(preInterval);
          finishPreloader();
        }
        preBar.style.width = pct + "%";
        prePct.textContent = String(Math.floor(pct)).padStart(3, "0");
      }, 60);
      function finishPreloader() {
        setTimeout(() => {
          const tl = gsap.timeline();
          tl.to("#preloader", {
            yPercent: -100,
            duration: 1.2,
            ease: "power4.inOut",
          }).call(startHeroAnim, null, 0.4);
        }, 400);
      }

    
      const heroVid = document.getElementById("heroVideo");
      heroVid.addEventListener("canplay", () =>
        heroVid.classList.add("loaded"),
      );
      heroVid.addEventListener("loadeddata", () =>
        heroVid.classList.add("loaded"),
      );
      // Fallback: show after 1s anyway
      setTimeout(() => heroVid.classList.add("loaded"), 1000);

      // ═══ HERO ANIM ═══
      function startHeroAnim() {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        // Cinematic video scale-in
        tl.fromTo(
          "#heroVideo",
          { scale: 1.1 },
          { scale: 1.04, duration: 2.6, ease: "power2.out" },
          0,
        )
          // Corner frames fade in
          .to(".hero-corner", { opacity: 1, duration: 0.9, stagger: 0.12 }, 0.2)
          // Eyebrow + year
          .to("#heroTag", { opacity: 1, y: 0, duration: 0.7 }, 0.55)
          .to("#heroYear", { opacity: 1, y: 0, duration: 0.55 }, 0.7)
          // Headline lines stagger up
          .to(
            ["#hhl0", "#hhl1", "#hhl2"],
            { y: "0%", duration: 1.25, ease: "expo.out", stagger: 0.13 },
            0.76,
          )
          // Gold rule expands
          .to(
            "#heroRule",
            { width: 210, duration: 1.1, ease: "expo.out" },
            1.28,
          )
          // Description + CTAs
          .to("#heroSubWrap", { opacity: 1, y: 0, duration: 0.75 }, 1.38)
          .to("#heroCtaRow", { opacity: 1, y: 0, duration: 0.75 }, 1.52)
          .to("#heroStatsRow", { opacity: 1, duration: 0.85 }, 1.65)
          // HUD overlays
          .to("#heroVideoRec", { opacity: 1, duration: 0.65 }, 1.95)
          .to("#heroYearBadge", { opacity: 1, duration: 0.65 }, 1.95)
          .to("#heroScroll", { opacity: 1, duration: 0.65 }, 2.15);

        document
          .querySelectorAll(".hero-stat-num[data-count]")
          .forEach((el) => {
            const to = parseInt(el.getAttribute("data-count"));
            tl.to(
              { v: 0 },
              {
                v: to,
                duration: 2,
                ease: "power2.out",
                onUpdate() {
                  el.textContent = Math.round(this.targets()[0].v);
                },
              },
              1.65,
            );
          });
      }
      gsap.set("#heroTag", { opacity: 0, y: 12 });
      gsap.set("#heroYear", { opacity: 0, y: 8 });
      gsap.set(["#hhl0", "#hhl1", "#hhl2"], { y: "110%" });
      gsap.set("#heroRule", { width: 0 });
      gsap.set("#heroSubWrap", { opacity: 0, y: 14 });
      gsap.set("#heroCtaRow", { opacity: 0, y: 14 });
      gsap.set("#heroStatsRow", { opacity: 0 });
      gsap.set("#heroVideoRec", { opacity: 0 });
      gsap.set("#heroYearBadge", { opacity: 0 });
      gsap.set("#heroScroll", { opacity: 0 });

      // Parallax on scroll
      gsap.to("#heroVideo", {
        scale: 1.12,
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });
      gsap.to(".hero-content", {
        y: 80,
        opacity: 0,
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "55% top",
          scrub: 1,
        },
      });

      // ═══ NAVBAR ═══
      lenis.on("scroll", ({ scroll }) => {
        const nb = document.getElementById("navbar");
        scroll > 80 ? nb.classList.add("solid") : nb.classList.remove("solid");
      });

      // ═══ NAV SMOOTH SCROLL ═══
      document.querySelectorAll('a[href^="#"], .nav-btn').forEach((el) => {
        el.addEventListener("click", (e) => {
          e.preventDefault();
          const href = el.getAttribute("href") || "#concierge";
          const target =
            href === "#" ? document.body : document.querySelector(href);
          if (target) lenis.scrollTo(target, { offset: -60, duration: 2 });
        });
      });

      // ═══ STATS COUNTER ═══
      document.querySelectorAll("[data-to]").forEach((el) => {
        const to = parseInt(el.getAttribute("data-to"));
        const sup = el.querySelector("sup")
          ? el.querySelector("sup").outerHTML
          : "";
        ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.to(
              { v: 0 },
              {
                v: to,
                duration: 2.5,
                ease: "power2.out",
                onUpdate() {
                  el.innerHTML = Math.round(this.targets()[0].v) + sup;
                },
              },
            );
          },
        });
      });

      // ═══ DRIVE CANVAS ═══
      const dCanvas = document.getElementById("drive-canvas");
      const dCtx = dCanvas.getContext("2d");
      let dW, dH;
      function resizeDCanvas() {
        dW = dCanvas.width = dCanvas.offsetWidth;
        dH = dCanvas.height = dCanvas.offsetHeight;
      }
      resizeDCanvas();
      window.addEventListener("resize", resizeDCanvas);
      const dStars = Array.from({ length: 80 }, () => ({
        x: Math.random(),
        y: Math.random(),
        size: Math.random() * 0.8 + 0.2,
        opacity: Math.random() * 0.4 + 0.05,
      }));
      let dScrollProg = 0;
      function drawDriveCanvas() {
        dCtx.clearRect(0, 0, dW, dH);
        dStars.forEach((s) => {
          dCtx.globalAlpha = s.opacity;
          dCtx.fillStyle = "#C8A951";
          dCtx.beginPath();
          dCtx.arc(s.x * dW, s.y * dH, s.size, 0, Math.PI * 2);
          dCtx.fill();
        });
        dCtx.globalAlpha = 0.04 + dScrollProg * 0.06;
        dCtx.strokeStyle = "#C8A951";
        dCtx.lineWidth = 0.5;
        const vanX = dW / 2,
          vanY = dH * 0.68;
        for (let i = -12; i <= 12; i++) {
          const ex = dW / 2 + i * (dW / 12);
          dCtx.beginPath();
          dCtx.moveTo(vanX, vanY);
          dCtx.lineTo(ex, dH);
          dCtx.stroke();
        }
        for (let j = 0; j < 8; j++) {
          const yf = j / 8;
          const y = vanY + (dH - vanY) * yf;
          const xSpread = (dW / 2) * yf;
          dCtx.beginPath();
          dCtx.moveTo(vanX - xSpread, y);
          dCtx.lineTo(vanX + xSpread, y);
          dCtx.stroke();
        }
        dCtx.globalAlpha = 1;
        requestAnimationFrame(drawDriveCanvas);
      }
      drawDriveCanvas();

      let roadLineOffset = 0;
      function animRoadLine() {
        roadLineOffset -= 2 + dScrollProg * 6;
        const cl = document.getElementById("roadCenterLine");
        if (cl) cl.style.strokeDashoffset = roadLineOffset;
        requestAnimationFrame(animRoadLine);
      }
      animRoadLine();

      const atmospheres = [
        "radial-gradient(ellipse 120% 80% at 50% 100%,rgba(200,169,81,.07) 0%,transparent 55%),linear-gradient(180deg,#060608 0%,#07070b 100%)",
        "radial-gradient(ellipse 120% 80% at 50% 100%,rgba(180,40,10,.12) 0%,transparent 55%),linear-gradient(180deg,#080402 0%,#060608 100%)",
        "radial-gradient(ellipse 120% 80% at 50% 100%,rgba(200,140,0,.14) 0%,transparent 55%),linear-gradient(180deg,#060500 0%,#060608 100%)",
        "radial-gradient(ellipse 120% 80% at 50% 100%,rgba(60,80,180,.1) 0%,transparent 55%),linear-gradient(180deg,#040408 0%,#060608 100%)",
      ];
      let currentChapter = 0;

      function gotoChapter(idx) {
        if (idx === currentChapter) return;
        const old = document.getElementById("driveChapter" + currentChapter);
        const nw = document.getElementById("driveChapter" + idx);
        const scan = document.getElementById("driveScan");
        gsap.fromTo(
          scan,
          { top: 0, opacity: 0 },
          {
            top: "100%",
            opacity: 1,
            duration: 0.6,
            ease: "power2.inOut",
            onComplete: () => gsap.set(scan, { opacity: 0 }),
          },
        );
        gsap.to(old, {
          opacity: 0,
          duration: 0.35,
          ease: "power2.in",
          onComplete: () => {
            old.classList.remove("ch-active");
            nw.classList.add("ch-active");
            gsap.fromTo(
              nw.querySelector(".dch-headline"),
              { y: 40, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
            );
            gsap.fromTo(
              nw.querySelector(".dch-desc"),
              { y: 20, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.7,
                ease: "power3.out",
                delay: 0.1,
              },
            );
            gsap.fromTo(
              nw.querySelector(".dch-metrics"),
              { y: 20, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.6,
                ease: "power3.out",
                delay: 0.2,
              },
            );
            gsap.fromTo(
              nw.querySelector(".dch-chapter-num"),
              { x: -20, opacity: 0 },
              {
                x: 0,
                opacity: 1,
                duration: 0.5,
                ease: "power3.out",
                delay: 0.05,
              },
            );
            const photoGrp = nw.querySelector(".dch-photo-group");
            if (photoGrp)
              gsap.fromTo(
                photoGrp,
                { x: "10%", opacity: 0, rotationY: 10 },
                {
                  x: "0%",
                  opacity: 1,
                  rotationY: 0,
                  duration: 1.2,
                  ease: "power3.out",
                  delay: 0.1,
                },
              );
            nw.style.opacity = 1;
          },
        });
        document.getElementById("driveAtmosphere").style.background =
          atmospheres[idx];
        document
          .querySelectorAll(".dcd")
          .forEach((d, i) => d.classList.toggle("active", i === idx));
        currentChapter = idx;
      }

      let targetSpeed = 0,
        displayedSpeed = 0;
      function animateSpeed() {
        displayedSpeed += (targetSpeed - displayedSpeed) * 0.06;
        const el = document.getElementById("dSpdNum");
        if (el) el.textContent = Math.round(displayedSpeed);
        requestAnimationFrame(animateSpeed);
      }
      animateSpeed();

      function fireSpeedBursts(intensity) {
        const container = document.getElementById("speedBurstContainer");
        for (let i = 0; i < Math.floor(intensity * 12); i++) {
          const line = document.createElement("div");
          line.className = "speed-burst-line";
          const top = 10 + Math.random() * 80,
            width = 60 + Math.random() * 300;
          line.style.cssText = `top:${top}%;left:${-width - 50}px;width:${width}px;opacity:0`;
          container.appendChild(line);
          gsap.to(line, {
            x: window.innerWidth + width + 200,
            opacity: [0, intensity * 0.7, 0],
            duration: 0.3 + Math.random() * 0.4,
            ease: "power1.out",
            delay: Math.random() * 0.15,
            onComplete: () => line.remove(),
          });
        }
      }

      ScrollTrigger.create({
        trigger: "#drive-section",
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const prog = self.progress;
          dScrollProg = prog;
          document.getElementById("driveProgressFill").style.height =
            prog * 100 + "%";
          document.getElementById("driveProgressDot").style.top =
            prog * 100 + "%";
          const chapIdx = Math.min(Math.floor(prog * 4), 3);
          if (chapIdx !== currentChapter) gotoChapter(chapIdx);
          const chProg = (prog - 0.25) / 0.25;
          if (chapIdx === 1) {
            targetSpeed = Math.min(chProg * 1.4, 1) * 350;
          } else if (chapIdx === 2) {
            targetSpeed = 350;
          } else if (chapIdx === 0) {
            targetSpeed = 0;
          } else {
            targetSpeed = 0;
          }
          const vel = Math.abs(self.getVelocity());
          if (vel > 300) fireSpeedBursts(Math.min(vel / 1200, 1));
        },
      });
      document.getElementById("driveAtmosphere").style.background =
        atmospheres[0];

      (function floatCars() {
        const t = Date.now() / 1000;
        const activeGroup = document.querySelector(
          "#driveChapter" + currentChapter + " .dch-photo-group",
        );
        if (activeGroup)
          gsap.to(activeGroup, {
            y: Math.sin(t * 0.5) * 10,
            rotation: Math.sin(t * 0.3) * 1.5,
            duration: 1,
            ease: "none",
            overwrite: "auto",
          });
        setTimeout(floatCars, 50);
      })();

      // ═══ BRANDS ═══
      const track = document.getElementById("brandTrack");
      const bcards = track.querySelectorAll(".brand-card");
      const cardWidth = bcards[0].offsetWidth;
      const totalWidth = cardWidth * bcards.length + 120; // +60 start, +60 end padding
      const scrollDist = totalWidth - window.innerWidth;
      if (scrollDist > 0) {
        document.querySelector(".brand-reveal-section").style.height =
          `calc(100vh + ${scrollDist}px)`;
        gsap.to(track, {
          x: -scrollDist,
          ease: "none",
          scrollTrigger: {
            trigger: ".brand-reveal-section",
            start: "top top",
            end: "bottom bottom",
            scrub: 1.2,
            pin: ".brand-sticky",
            anticipatePin: 1,
          },
        });
      }
      gsap.to("#brandBgText", {
        x: "-20%",
        ease: "none",
        scrollTrigger: {
          trigger: ".brand-reveal-section",
          start: "top top",
          end: "bottom bottom",
          scrub: 2,
        },
      });
      bcards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 60, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            scrollTrigger: {
              trigger: ".brand-reveal-section",
              start: `top+=${i * 80} top`,
              end: `top+=${i * 80 + 200} top`,
              scrub: false,
              toggleActions: "play none none none",
            },
          },
        );
      });

      // ═══ SPECS ═══
      const specSlides = document.querySelectorAll(".spec-slide");
      const specDotBtns = document.querySelectorAll(".snd");
      const specCarImgs = document.querySelectorAll(".spec-car-img");
      let currentSpec = 0;
      const specBgColors = [
        "linear-gradient(160deg,#08080c 0%,#0a0f1a 100%)",
        "linear-gradient(160deg,#1a0202 0%,#08080c 100%)",
        "linear-gradient(160deg,#0e0b00 0%,#08080c 100%)",
        "linear-gradient(160deg,#090608 0%,#0c0a12 100%)",
      ];
      const specGlowBg = [
        "radial-gradient(ellipse at 50% 100%,rgba(200,169,81,.22) 0%,transparent 70%)",
        "radial-gradient(ellipse at 50% 100%,rgba(200,30,30,.28) 0%,transparent 70%)",
        "radial-gradient(ellipse at 50% 100%,rgba(200,140,0,.28) 0%,transparent 70%)",
        "radial-gradient(ellipse at 50% 100%,rgba(120,60,200,.22) 0%,transparent 70%)",
      ];
      function gotoSpec(idx) {
        const oldEl = specSlides[currentSpec],
          newEl = specSlides[idx];
        const oldImg = specCarImgs[currentSpec],
          newImg = specCarImgs[idx];
        gsap.to(oldEl, {
          opacity: 0,
          y: -28,
          duration: 0.32,
          ease: "power2.in",
          onComplete: () => {
            oldEl.classList.remove("s-active");
            newEl.classList.add("s-active");
            gsap.fromTo(
              newEl,
              { opacity: 0, y: 28 },
              { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
            );
          },
        });
        gsap.to(oldImg, {
          x: "-6%",
          opacity: 0,
          scale: 0.95,
          duration: 0.4,
          ease: "power2.in",
          onComplete: () => {
            oldImg.classList.remove("sc-active");
            gsap.set(oldImg, { x: "0%", scale: 1 });
            newImg.classList.add("sc-active");
            gsap.fromTo(
              newImg,
              { x: "6%", opacity: 0, scale: 0.96 },
              {
                x: "0%",
                opacity: 1,
                scale: 1,
                duration: 0.7,
                ease: "power3.out",
              },
            );
          },
        });
        document.getElementById("specsBgOverlay").style.background =
          specBgColors[idx];
        document.getElementById("specsGlowInner").style.background =
          specGlowBg[idx];
        gsap.fromTo(
          "#scanLine",
          { top: "5%", opacity: 0 },
          {
            top: "95%",
            opacity: 1,
            duration: 0.7,
            ease: "power2.out",
            onComplete: () =>
              gsap.to("#scanLine", { opacity: 0, duration: 0.25 }),
          },
        );
        specDotBtns.forEach((d, i) => d.classList.toggle("a", i === idx));
        currentSpec = idx;
      }
      specDotBtns.forEach((btn, i) =>
        btn.addEventListener("click", () => gotoSpec(i)),
      );
      ScrollTrigger.create({
        trigger: "#specs-section",
        start: "top top",
        end: "bottom bottom",
        pin: ".specs-sticky",
        scrub: false,
        onUpdate: (self) => {
          const idx = Math.min(Math.floor(self.progress * 4), 3);
          if (idx !== currentSpec) gotoSpec(idx);
        },
      });
      gsap.to("#specsGlowInner", {
        opacity: 0.4,
        scaleY: 1.2,
        duration: 2.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        transformOrigin: "bottom center",
      });

      // ═══ SCROLL REVEALS ═══
      gsap.utils.toArray(".exp-card").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: "power3.out",
            delay: (i % 3) * 0.12,
            scrollTrigger: {
              trigger: el,
              start: "top 87%",
              toggleActions: "play none none none",
            },
          },
        );
      });
      gsap.utils.toArray(".stat-card").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            delay: i * 0.1,
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          },
        );
      });
      gsap.utils.toArray(".section-heading").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
      });
      gsap.utils.toArray(".section-eyebrow").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          },
        );
      });
      gsap.fromTo(
        ".con-left",
        { opacity: 0, x: -60 },
        {
          opacity: 1,
          x: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: "#concierge", start: "top 80%" },
        },
      );
      gsap.fromTo(
        ".con-right",
        { opacity: 0, x: 60 },
        {
          opacity: 1,
          x: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: "#concierge", start: "top 80%" },
        },
      );

      // ═══ TESTIMONIALS ═══
      let curTest = 0;
      const testSlides = document.querySelectorAll(".test-slide");
      const testDots = document.querySelectorAll(".td");
      function gotoTest(idx) {
        testSlides[curTest].classList.remove("active");
        testDots[curTest].classList.remove("a");
        curTest = idx;
        testSlides[curTest].classList.add("active");
        testDots[curTest].classList.add("a");
      }
      testDots.forEach((d, i) =>
        d.addEventListener("click", () => gotoTest(i)),
      );
      setInterval(() => gotoTest((curTest + 1) % testSlides.length), 5000);

      // ═══ FORM ═══
      document
        .getElementById("submitBtn")
        .addEventListener("click", function () {
          const txt = document.getElementById("submitTxt");
          gsap.to(this, { scale: 0.97, duration: 0.1, yoyo: true, repeat: 1 });
          txt.textContent = "Processing…";
          setTimeout(() => {
            txt.textContent = "✓ Enquiry Received";
            gsap.to(this, { background: "#2d6a40", duration: 0.4 });
            setTimeout(() => {
              txt.textContent = "Submit Private Enquiry";
              gsap.to(this, { background: "var(--gold)", duration: 0.4 });
            }, 3500);
          }, 1400);
        });

      // ═══ MARQUEE ═══
      document.querySelectorAll(".marquee-row").forEach((row) => {
        row.addEventListener(
          "mouseenter",
          () => (row.style.animationPlayState = "paused"),
        );
        row.addEventListener(
          "mouseleave",
          () => (row.style.animationPlayState = "running"),
        );
      });
      document
        .getElementById("ticker")
        .addEventListener(
          "mouseenter",
          () =>
            (document.getElementById("ticker").style.animationPlayState =
              "paused"),
        );
      document
        .getElementById("ticker")
        .addEventListener(
          "mouseleave",
          () =>
            (document.getElementById("ticker").style.animationPlayState =
              "running"),
        );

      // ═══ BRAND CARD TILT ═══
      document.querySelectorAll(".brand-card").forEach((card) => {
        card.addEventListener("mousemove", (e) => {
          const r = card.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width - 0.5,
            y = (e.clientY - r.top) / r.height - 0.5;
          gsap.to(card, {
            rotateY: x * 12,
            rotateX: -y * 8,
            transformPerspective: 800,
            duration: 0.4,
            ease: "power2.out",
          });
          gsap.to(card.querySelector(".bc-gradient"), {
            x: x * 20,
            y: y * 14,
            duration: 0.4,
          });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            rotateY: 0,
            rotateX: 0,
            duration: 0.8,
            ease: "power3.out",
          });
          gsap.to(card.querySelector(".bc-gradient"), {
            x: 0,
            y: 0,
            duration: 0.8,
          });
        });
      });

      // ═══ EXP CARDS MAGNETIC ═══
      document.querySelectorAll(".exp-card").forEach((card) => {
        card.addEventListener("mousemove", (e) => {
          const r = card.getBoundingClientRect();
          gsap.to(card, {
            x: (e.clientX - r.left - r.width / 2) * 0.05,
            y: (e.clientY - r.top - r.height / 2) * 0.05,
            duration: 0.3,
            ease: "power2.out",
          });
        });
        card.addEventListener("mouseleave", () =>
          gsap.to(card, {
            x: 0,
            y: 0,
            duration: 0.8,
            ease: "elastic.out(1,0.4)",
          }),
        );
      });

      // ═══ SPECS PARALLAX ═══
      document
        .querySelector(".specs-visual")
        ?.addEventListener("mousemove", (e) => {
          const r = document
            .querySelector(".specs-visual")
            .getBoundingClientRect();
          const x = (e.clientX - r.left - r.width / 2) / r.width,
            y = (e.clientY - r.top - r.height / 2) / r.height;
          const container = document.querySelector(".spec-car-img.sc-active");
          if (container)
            gsap.to(container, {
              rotateY: x * 14,
              rotateX: -y * 8,
              transformPerspective: 1000,
              duration: 0.55,
              ease: "power2.out",
            });
          gsap.to("#specsGlowInner", { x: x * 24, duration: 0.5 });
        });
      document
        .querySelector(".specs-visual")
        ?.addEventListener("mouseleave", () => {
          const container = document.querySelector(".spec-car-img.sc-active");
          if (container)
            gsap.to(container, {
              rotateY: 0,
              rotateX: 0,
              duration: 1,
              ease: "power3.out",
            });
          gsap.to("#specsGlowInner", { x: 0, duration: 0.8 });
        });

      // ═══ FOOTER ═══
      gsap.fromTo(
        "footer",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: "footer", start: "top 92%" },
        },
      );