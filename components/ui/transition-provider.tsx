'use client';

import { createContext, useContext, useEffect, useRef, useCallback, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';

type TransitionPhase = 'idle' | 'setup' | 'leaving' | 'entering';

interface TransitionContextValue {
  navigate: (route: string) => void;
  phase: TransitionPhase;
}

const TransitionContext = createContext<TransitionContextValue>({
  navigate: () => {},
  phase: 'idle',
});

export function useTransitionNavigate() {
  return useContext(TransitionContext);
}

const OVERLAY_TEXT: Record<string, string> = {
  '/work': "Let See my Work and Capabilities",
  '/process': "Let See How i do this magical work",
};

export default function TransitionProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const phase = useRef<TransitionPhase>('idle');
  const pendingRoute = useRef<string | null>(null);
  const prevPathname = useRef(pathname);
  const splitTitle = useRef<SplitText | null>(null);
  const [phaseState, setPhaseState] = useState<TransitionPhase>('idle');

  const getBody = () => document.body;

  function getPercentageVerticalClip(): number {
    const titleEl = document.querySelector('.title__destination') as HTMLElement;
    if (!titleEl) return 5;
    const rect = titleEl.getBoundingClientRect();
    const halfHeight = rect.height / 2;
    const halfViewport = window.innerHeight / 2;
    return (halfHeight / halfViewport) * 50;
  }

  // ============================================================
  // TRANSITION ONE — SVG Spiral Draw
  // ============================================================

  const t1Before = useCallback(() => {
    getBody().classList.add('is__transitioning');
  }, []);

  const t1Leave = useCallback((): Promise<void> => {
    return new Promise((resolve) => {
      const wrapper = document.querySelector('.transition__svg__wrapper') as HTMLElement;
      const path = wrapper?.querySelector('svg path');

      if (!wrapper || !path) {
        resolve();
        return;
      }

      gsap.set(wrapper, {
        pointerEvents: 'auto',
        autoAlpha: 1,
        visibility: 'visible',
      });

      gsap.set(path, {
        drawSVG: '0% 0%',
        attr: { 'stroke-width': 100 },
        opacity: 0,
      });

      const tl = gsap.timeline({
        defaults: { duration: 1.4, ease: 'sine.inOut' },
        onComplete: () => {
          tl.kill();
          resolve();
        },
      });

      tl.to(path, { opacity: 1, duration: 0.5 });
      tl.to(path, { drawSVG: '0% 100%' }, '<');
      tl.to(path, { attr: { 'stroke-width': 400 } }, '<+=0.18');
    });
  }, []);

  const t1After = useCallback((): Promise<void> => {
    return new Promise((resolve) => {
      const wrapper = document.querySelector('.transition__svg__wrapper') as HTMLElement;
      const path = wrapper?.querySelector('svg path');

      if (!wrapper || !path) {
        resolve();
        return;
      }

      const tl = gsap.timeline({
        defaults: { duration: 1, ease: 'sine.inOut' },
        onComplete: () => {
          gsap.set(wrapper, {
            pointerEvents: 'none',
            autoAlpha: 0,
            visibility: 'hidden',
          });
          gsap.set(path, {
            drawSVG: '0% 0%',
            attr: { 'stroke-width': 100 },
          });
          getBody().classList.remove('is__transitioning');
          tl.kill();
          resolve();
        },
      });

      tl.to(path, { attr: { 'stroke-width': 100 } });
      tl.to(path, { drawSVG: '100% 100%' }, '<+=0.45');
    });
  }, []);

  // ============================================================
  // TRANSITION TWO — Clip-path Overlay
  // ============================================================

  const t2Before = useCallback((targetRoute: string) => {
    const overlay = document.querySelector('.transition__overlay') as HTMLElement;
    const body = getBody();

    body.classList.add('is__transitioning');
    overlay.classList.add('team__transition');

    const clip = getPercentageVerticalClip();

    gsap.set(overlay, {
      '--clip': `polygon(0% ${50 - clip}%, 0% ${50 - clip}%, 0% ${50 + clip}%, 0% ${50 + clip}%)`,
    });

    const titleEl = overlay.querySelector('.title__destination') as HTMLElement;
    if (titleEl) {
      titleEl.textContent = OVERLAY_TEXT[targetRoute] || '';
    }

    if (splitTitle.current) {
      splitTitle.current.revert();
      splitTitle.current = null;
    }

    if (titleEl) {
      splitTitle.current = new SplitText(titleEl, {
        type: 'words',
        mask: 'words',
        wordsClass: 'words',
      });
    }
  }, []);

  const t2Leave = useCallback((): Promise<void> => {
    return new Promise((resolve) => {
      const overlay = document.querySelector('.transition__overlay') as HTMLElement;
      const clip = getPercentageVerticalClip();

      gsap.set(overlay, {
        pointerEvents: 'auto',
        autoAlpha: 1,
        visibility: 'visible',
      });

      const tl = gsap.timeline({
        defaults: { duration: 1, ease: 'expo.inOut' },
        onComplete: () => {
          tl.kill();
          resolve();
        },
      });

      tl.to(overlay, {
        '--clip': `polygon(0% ${50 - clip}%, 100% ${50 - clip}%, 100% ${50 + clip}%, 0% ${50 + clip}%)`,
      });

      tl.to(overlay, {
        '--clip': 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      });
    });
  }, []);

  const t2After = useCallback((): Promise<void> => {
    return new Promise((resolve) => {
      const overlay = document.querySelector('.transition__overlay') as HTMLElement;

      const tl = gsap.timeline({
        defaults: { duration: 1, ease: 'hop' },
        onComplete: () => {
          if (splitTitle.current) {
            splitTitle.current.revert();
            splitTitle.current = null;
          }

          gsap.set(overlay, {
            pointerEvents: 'none',
            autoAlpha: 0,
            visibility: 'hidden',
          });

          getBody().classList.remove('is__transitioning');
          overlay.classList.remove('team__transition');

          tl.kill();
          resolve();
        },
      });

      if (splitTitle.current?.words) {
        tl.to(splitTitle.current.words, {
          yPercent: -120,
          duration: 0.5,
          stagger: { amount: 0.25 },
          ease: 'elastic.in(1, 1)',
        });
      }

      tl.to(
        overlay,
        {
          '--clip': 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
        },
        '<+0.25',
      );
    });
  }, []);

  // ============================================================
  // ROUTE MAPPING
  // ============================================================

  function getTransitionType(route: string): 't1' | 't2' | 'none' {
    if (route === '/about' || route === '/services' || route === '/contact') return 't1';
    if (route === '/work' || route === '/process') return 't2';
    return 'none';
  }

  // ============================================================
  // "AFTER" PHASE — triggered by route change
  // ============================================================

  useEffect(() => {
    if (phase.current === 'idle') return;
    if (prevPathname.current === pathname) return;

    const runAfter = async () => {
      phase.current = 'entering';
      setPhaseState('entering');

      try {
        const type = getTransitionType(pathname);
        if (type === 't1') {
          await t1After();
        } else if (type === 't2') {
          await t2After();
        }
      } catch {
        getBody().classList.remove('is__transitioning');
      }

      phase.current = 'idle';
      setPhaseState('idle');
      pendingRoute.current = null;
    };

    runAfter();
    prevPathname.current = pathname;
  }, [pathname, t1After, t2After]);

  // ============================================================
  // NAVIGATE — called before route changes
  // ============================================================

  const navigate = useCallback(
    async (targetRoute: string) => {
      if (phase.current !== 'idle') return;
      if (targetRoute === window.location.pathname) return;

      const type = getTransitionType(targetRoute);

      if (type === 'none') {
        router.push(targetRoute);
        return;
      }

      phase.current = 'setup';
      setPhaseState('setup');
      pendingRoute.current = targetRoute;

      try {
        if (type === 't2') {
          t2Before(targetRoute);
        } else {
          t1Before();
        }

        phase.current = 'leaving';
        setPhaseState('leaving');

        if (type === 't2') {
          await t2Leave();
        } else {
          await t1Leave();
        }

        router.push(targetRoute);
      } catch {
        getBody().classList.remove('is__transitioning');
        phase.current = 'idle';
        setPhaseState('idle');
        pendingRoute.current = null;
      }
    },
    [router, t1Before, t2Before, t1Leave, t2Leave, t1After, t2After],
  );

  // ============================================================
  // CLICK DELEGATION
  // ============================================================

  useEffect(() => {
    const handleNavClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest('a');
      if (!link) return;

      const href = link.getAttribute('href');
      if (!href || !href.startsWith('/')) return;
      if (href === window.location.pathname) {
        e.preventDefault();
        return;
      }

      const nav = link.closest('nav, header');
      if (!nav) return;

      e.preventDefault();
      navigate(href);
    };

    document.addEventListener('click', handleNavClick);
    return () => document.removeEventListener('click', handleNavClick);
  }, [navigate]);

  return (
    <TransitionContext.Provider value={{ navigate, phase: phaseState }}>
      <div className="app__wrapper">{children}</div>
    </TransitionContext.Provider>
  );
}
