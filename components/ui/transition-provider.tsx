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

function getBody() {
  return document.body;
}

function getPercentageVerticalClip(): number {
  const titleEl = document.querySelector('.title__destination') as HTMLElement;
  if (!titleEl) return 5;
  const rect = titleEl.getBoundingClientRect();
  const halfHeight = rect.height / 2;
  const halfViewport = window.innerHeight / 2;
  return (halfHeight / halfViewport) * 50;
}

function getContentChildren(): Element[] | null {
  const main = document.querySelector('.app__wrapper main');
  if (!main) return null;
  const children = Array.from(main.children);
  return children.length ? children : null;
}

function hideContent(children: Element[]) {
  gsap.set(children, { y: 24, opacity: 0 });
}

function animateContentIn(children: Element[]): Promise<void> {
  return new Promise((resolve) => {
    gsap.to(children, {
      y: 0,
      opacity: 1,
      duration: 0.7,
      stagger: 0.08,
      ease: 'power3.out',
      clearProps: 'transform',
      onComplete: resolve,
    });
  });
}

export default function TransitionProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const phase = useRef<TransitionPhase>('idle');
  const pendingRoute = useRef<string | null>(null);
  const prevPathname = useRef(pathname);
  const splitTitle = useRef<SplitText | null>(null);
  const [phaseState, setPhaseState] = useState<TransitionPhase>('idle');

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
        attr: { 'stroke-width': 120 },
        opacity: 0,
      });

      const tl = gsap.timeline({
        defaults: { duration: 1.2, ease: 'power4.inOut' },
        onComplete: () => {
          tl.kill();
          resolve();
        },
      });

      tl.to(path, { opacity: 1, duration: 0.4 });
      tl.to(path, { drawSVG: '0% 100%' }, '<');
      tl.to(path, { attr: { 'stroke-width': 280 } }, '-=0.6');
    });
  }, []);

  const t1After = useCallback((): Promise<void> => {
    return new Promise((resolve) => {
      const wrapper = document.querySelector('.transition__svg__wrapper') as HTMLElement;
      const path = wrapper?.querySelector('svg path');
      const contentChildren = getContentChildren();

      if (!wrapper || !path) {
        resolve();
        return;
      }

      if (contentChildren) hideContent(contentChildren);

      const tl = gsap.timeline({
        defaults: { duration: 0.9, ease: 'power4.inOut' },
        onComplete: async () => {
          gsap.set(wrapper, {
            pointerEvents: 'none',
            autoAlpha: 0,
            visibility: 'hidden',
          });
          gsap.set(path, {
            drawSVG: '0% 0%',
            attr: { 'stroke-width': 120 },
            opacity: 0,
          });
          getBody().classList.remove('is__transitioning');

          if (contentChildren) {
            await animateContentIn(contentChildren);
          }

          tl.kill();
          resolve();
        },
      });

      tl.to(path, { attr: { 'stroke-width': 120 } });
      tl.to(path, { drawSVG: '100% 100%' }, '-=0.3');
      tl.to(path, { opacity: 0 }, '-=0.4');
    });
  }, []);

  const t2Before = useCallback((targetRoute: string) => {
    const overlay = document.querySelector('.transition__overlay') as HTMLElement;
    const body = getBody();

    body.classList.add('is__transitioning');
    overlay.classList.add('team__transition');

    gsap.set(overlay, {
      clipPath: 'polygon(0% 45%, 100% 45%, 100% 55%, 0% 55%)',
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
        wordsClass: 'words',
      });
    }
  }, []);

  const t2Leave = useCallback((): Promise<void> => {
    return new Promise((resolve) => {
      const overlay = document.querySelector('.transition__overlay') as HTMLElement;

      gsap.set(overlay, {
        pointerEvents: 'auto',
        autoAlpha: 1,
        visibility: 'visible',
      });

      const tl = gsap.timeline({
        defaults: { duration: 1, ease: 'power4.inOut' },
        onComplete: () => {
          tl.kill();
          resolve();
        },
      });

      tl.to(overlay, {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      });
    });
  }, []);

  const t2After = useCallback((): Promise<void> => {
    return new Promise((resolve) => {
      const overlay = document.querySelector('.transition__overlay') as HTMLElement;
      const contentChildren = getContentChildren();

      if (contentChildren) hideContent(contentChildren);

      const tl = gsap.timeline({
        defaults: { duration: 0.9, ease: 'power4.inOut' },
        onComplete: async () => {
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

          if (contentChildren) {
            await animateContentIn(contentChildren);
          }

          tl.kill();
          resolve();
        },
      });

      if (splitTitle.current?.words) {
        tl.to(splitTitle.current.words, {
          yPercent: -120,
          duration: 0.5,
          stagger: { amount: 0.25 },
          ease: 'power2.in',
        }, 0);
      }

      tl.to(
        overlay,
        {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
        },
        '-=0.1',
      );
    });
  }, []);

  function getTransitionType(route: string): 't1' | 't2' | 'none' {
    if (route === '/about' || route === '/services' || route === '/contact') return 't1';
    if (route === '/work' || route === '/process') return 't2';
    return 'none';
  }

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
      prevPathname.current = pathname;
    };

    runAfter();
  }, [pathname, t1After, t2After]);

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
    [router, t1Before, t2Before, t1Leave, t2Leave],
  );

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
