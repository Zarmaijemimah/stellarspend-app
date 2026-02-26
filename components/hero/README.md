# Hero Component

Landing page hero section for StellarSpend with animated entrance and accessible CTAs.

## Features

- **Responsive Design**: Mobile-first layout that scales beautifully to desktop
- **Framer Motion Animations**: Subtle fade-in with staggered children
- **Accessibility**: Full ARIA support, keyboard navigation, focus states
- **Visual Effects**: Gradient blobs, floating particles, grid overlay
- **CTAs**: Primary (sign-in) and secondary (docs) call-to-action buttons

## Usage

```tsx
import Hero from "@/components/hero/Hero";

export default function Home() {
  return <Hero />;
}
```

## Accessibility

- Semantic HTML with `role="banner"` and `aria-labelledby`
- Keyboard-focusable CTAs with visible focus rings
- Decorative elements marked with `aria-hidden`
- Proper heading hierarchy with `h1#hero-heading`

## Navigation

- **Primary CTA**: `/sign-in` - Main conversion path
- **Secondary CTA**: `/docs` - Documentation and learning resources

## Customization

Adjust animations in the component:
- `container.show.transition.staggerChildren` - Delay between elements
- `item.show.transition.duration` - Animation speed
- Particle count and positions in `particles` array
