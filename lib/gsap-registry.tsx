'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { SplitText } from 'gsap/SplitText';

export default function GSAPRegistry() {
  useEffect(() => {
    try {
      gsap.registerPlugin(SplitText, CustomEase, DrawSVGPlugin);
      CustomEase.create('hop', '0.56, 0, 0.35, 0.98');
    } catch (e) {
      console.warn('GSAP bonus plugins failed to register:', e);
    }
  }, []);

  return null;
}
