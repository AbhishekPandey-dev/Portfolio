const fs = require('fs');

// 1. index.ts
const indexTsPath = 'src/lib/index.ts';
let p6 = fs.readFileSync(indexTsPath, 'utf8');
p6 = p6.replace(/export \{\s+tokens,\s+colors,\s+typography,\s+spacing,\s+motion,\s+zIndex,\s+breakpoints,\s+radius,\s+shadows,\s*\} from '\.\/tokens'/g, "export { DESIGN_TOKENS } from './tokens'");
fs.writeFileSync(indexTsPath, p6, 'utf8');

// 2. HoverImagePreview.tsx
const hoverImgPath = 'src/components/ui/HoverImagePreview.tsx';
let p5 = fs.readFileSync(hoverImgPath, 'utf8');
p5 = p5.replace(/useRef<gsap\.QuickToFunc>\(\)/g, "useRef<any>()");
fs.writeFileSync(hoverImgPath, p5, 'utf8');

// 3. HeadingReveal.tsx
const headingRevealPath = 'src/components/ui/HeadingReveal.tsx';
let p4 = fs.readFileSync(headingRevealPath, 'utf8');
p4 = p4.replace(/const Tag = tag/g, 'const Tag = tag as any');
// Just to be sure we hit the children type correctly
p4 = p4.replace(/children: string/g, 'children: React.ReactNode');
fs.writeFileSync(headingRevealPath, p4, 'utf8');

// 4. MagneticButton.tsx
const magButtonPath = 'src/components/ui/MagneticButton.tsx';
let p2 = fs.readFileSync(magButtonPath, 'utf8');
p2 = p2.replace(/variant\?:\s*'fill' \| 'outline'/g, "variant?: 'fill' | 'outline';\n  style?: React.CSSProperties;\n  className?: string;");
p2 = p2.replace(/<button\s+ref=\{wrapperRef\}/g, '<button ref={wrapperRef} style={style} className={className}');
fs.writeFileSync(magButtonPath, p2, 'utf8');

console.log('TypeScript errors patched (take 2).');
