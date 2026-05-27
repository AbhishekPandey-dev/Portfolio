'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface PillNavLinkProps {
  label: string;
  href: string;
  className?: string;
  baseColor?: string; // --base (background of hover-circle, e.g. #ED1C24 for red accent)
  pillBgColor?: string; // --pill-bg (initial pill background)
  textColor?: string; // --pill-text (initial text color)
  hoverTextColor?: string; // --hover-text (hovered text color)
  ease?: string;
}

export function PillNavLink({
  label,
  href,
  className = '',
  baseColor = '#ED1C24',
  pillBgColor = 'transparent',
  textColor = 'rgba(255,255,255,0.85)',
  hoverTextColor = '#ffffff',
  ease = 'power3.easeOut',
}: PillNavLinkProps) {
  const containerRef = useRef<HTMLAnchorElement | null>(null);
  const circleRef = useRef<HTMLSpanElement | null>(null);
  const labelRef = useRef<HTMLSpanElement | null>(null);
  const labelHoverRef = useRef<HTMLSpanElement | null>(null);

  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const layout = () => {
      const circle = circleRef.current;
      const pill = containerRef.current;
      if (!circle || !pill) return;

      const rect = pill.getBoundingClientRect();
      const { width: w, height: h } = rect;
      if (w === 0 || h === 0) return;

      // React Bits cord radius calculations for fluid circular expand mechanics
      const R = ((w * w) / 4 + h * h) / (2 * h);
      const D = Math.ceil(2 * R) + 2;
      const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
      const originY = D - delta;

      circle.style.width = `${D}px`;
      circle.style.height = `${D}px`;
      circle.style.bottom = `-${delta}px`;

      gsap.set(circle, {
        xPercent: -50,
        scale: 0,
        transformOrigin: `50% ${originY}px`
      });

      const labelEl = labelRef.current;
      const labelHoverEl = labelHoverRef.current;

      if (labelEl) gsap.set(labelEl, { y: 0 });
      if (labelHoverEl) gsap.set(labelHoverEl, { y: h + 12, opacity: 0 });

      // Kill previous layout-level timelines to avoid overlap
      timelineRef.current?.kill();

      const tl = gsap.timeline({ paused: true });

      tl.to(circle, { scale: 1.25, xPercent: -50, duration: 2, ease, overwrite: 'auto' }, 0);

      if (labelEl) {
        tl.to(labelEl, { y: -(h + 8), duration: 2, ease, overwrite: 'auto' }, 0);
      }

      if (labelHoverEl) {
        gsap.set(labelHoverEl, { y: Math.ceil(h + 12), opacity: 0 });
        tl.to(labelHoverEl, { y: 0, opacity: 1, duration: 2, ease, overwrite: 'auto' }, 0);
      }

      timelineRef.current = tl;
    };

    layout();

    const onResize = () => layout();
    window.addEventListener('resize', onResize);

    if (typeof document !== 'undefined' && document.fonts?.ready) {
      document.fonts.ready.then(layout).catch(() => {});
    }

    return () => {
      window.removeEventListener('resize', onResize);
      timelineRef.current?.kill();
      tweenRef.current?.kill();
    };
  }, [label, ease]);

  const handleMouseEnter = () => {
    const tl = timelineRef.current;
    if (!tl) return;
    tweenRef.current?.kill();
    tweenRef.current = tl.tweenTo(tl.duration(), {
      duration: 0.35,
      ease,
      overwrite: 'auto'
    });
  };

  const handleMouseLeave = () => {
    const tl = timelineRef.current;
    if (!tl) return;
    tweenRef.current?.kill();
    tweenRef.current = tl.tweenTo(0, {
      duration: 0.25,
      ease,
      overwrite: 'auto'
    });
  };

  const cssVars = {
    '--base': baseColor,
    '--pill-bg': pillBgColor,
    '--hover-text': hoverTextColor,
    '--pill-text': textColor,
  } as React.CSSProperties;

  return (
    <a
      ref={containerRef}
      href={href}
      style={cssVars}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`pill inline-flex items-center justify-center rounded-full text-[13px] tracking-wide relative overflow-hidden transition-colors duration-150 whitespace-nowrap cursor-pointer px-4 font-semibold ${className}`}
      id={`pill-nav-link-${label.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <span
        className="hover-circle absolute left-1/2 rounded-full select-none pointer-events-none"
        ref={circleRef}
      />
      <span className="label-stack relative inline-block z-10 pointer-events-none">
        <span className="pill-label relative z-10 inline-block leading-none" ref={labelRef}>
          {label}
        </span>
        <span className="pill-label-hover absolute left-0 top-0 z-20 inline-block leading-none" ref={labelHoverRef}>
          {label}
        </span>
      </span>
    </a>
  );
}

export default PillNavLink;
