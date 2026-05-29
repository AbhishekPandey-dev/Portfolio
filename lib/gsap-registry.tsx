'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { SplitText } from 'gsap/SplitText';

export default function GSAPRegistry() {
  useEffect(() => {
    try {
      gsap.registerPlugin(SplitText, DrawSVGPlugin);
    } catch (e) {
      console.warn('GSAP bonus plugins failed to register:', e);
    }
  }, []);

  return null;
}
