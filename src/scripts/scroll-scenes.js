import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { typewriter } from "./typewriter.js";

gsap.registerPlugin(ScrollTrigger);

export function setupScrollScenes() {
  const isCapture = document.documentElement.dataset.capture === "true";
  const mm = gsap.matchMedia();

  if (isCapture) {
    document.querySelectorAll(".reveal").forEach((el) => {
      el.style.opacity = 1;
      el.style.transform = "none";
    });
    return () => {};
  }

  gsap.defaults({ ease: "power2.out", duration: 0.8 });

  mm.add(
    {
      reduceMotion: "(prefers-reduced-motion: reduce)",
      isDesktop: "(min-width: 1025px)",
      isMobile: "(max-width: 1024px)"
    },
    (context) => {
      const { reduceMotion, isDesktop } = context.conditions;
      if (reduceMotion) {
        gsap.set(".reveal", { autoAlpha: 1, y: 0 });
        gsap.set(".thread-path", { strokeDashoffset: 0 });
        return;
      }

      gsap.utils.toArray(".reveal").forEach((el) => {
        gsap.to(el, {
          autoAlpha: 1,
          y: 0,
          scrollTrigger: {
            trigger: el,
            start: "top 82%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        });
      });

      gsap.utils.toArray(".asset-bg img").forEach((img) => {
        gsap.fromTo(img, { scale: 1.08 }, {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: img.closest(".chapter-section"),
            start: "top bottom",
            end: "bottom top",
            scrub: isDesktop ? 1.2 : 0.4
          }
        });
      });

      const path = document.querySelector(".thread-path");
      if (path) {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(path, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: ".story",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.8
          }
        });
      }

      gsap.to(".strike-word", {
        "--strike-progress": 1,
        scrollTrigger: {
          trigger: ".strike-word",
          start: "top 76%",
          toggleActions: "play none none reset"
        },
        duration: 0.9
      });

      gsap.utils.toArray(".film-frame").forEach((frame, index) => {
        gsap.from(frame, {
          autoAlpha: 0,
          y: 28,
          delay: (index % 2) * 0.08,
          scrollTrigger: {
            trigger: frame,
            start: "top 86%",
            toggleActions: "play none none reverse"
          }
        });
      });

      return () => ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    }
  );

  const typeTarget = document.querySelector("[data-typewriter]");
  if (typeTarget) {
    ScrollTrigger.create({
      trigger: typeTarget,
      start: "top 75%",
      once: true,
      onEnter: () => typewriter(typeTarget, typeTarget.dataset.typewriter)
    });
  }

  window.addEventListener("load", () => ScrollTrigger.refresh(), { once: true });
  return () => mm.revert();
}

export function setupNavSpy(chapters) {
  const navLinks = [...document.querySelectorAll(".chapter-nav a")];
  const mobileLabel = document.querySelector(".mobile-progress span");
  chapters.forEach((chapter) => {
    ScrollTrigger.create({
      trigger: `#${chapter.id}`,
      start: "top center",
      end: "bottom center",
      onToggle: (self) => {
        if (!self.isActive) return;
        navLinks.forEach((link) => link.classList.toggle("is-active", link.hash === `#${chapter.id}`));
        if (mobileLabel) mobileLabel.textContent = chapter.number;
      }
    });
  });
}
