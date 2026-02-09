"use client"

/**
 * EclipseGlow - Atmospheric background effect
 * Creates a planetary horizon/arc effect with radial gradients
 * Positioned behind hero content but visible through glass elements
 */
export function EclipseGlow() {
    return (
        <div
            className="pointer-events-none absolute inset-x-0 top-16 z-0 h-[600px] overflow-hidden"
            aria-hidden="true"
        >
            {/* Main eclipse arc */}
            <div
                className="absolute left-1/2 top-0 h-[800px] w-[1400px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60"
                style={{
                    background: `radial-gradient(
            ellipse 100% 100% at 50% 100%,
            #1a4d1a 0%,
            #0E300E 35%,
            rgba(14, 48, 14, 0.4) 55%,
            rgba(1, 1, 1, 0) 75%
          )`,
                }}
            />

            {/* Secondary glow layer for depth */}
            <div
                className="absolute left-1/2 top-8 h-[600px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40"
                style={{
                    background: `radial-gradient(
            ellipse 80% 80% at 50% 100%,
            #1a4d1a 0%,
            rgba(26, 77, 26, 0.3) 40%,
            transparent 70%
          )`,
                }}
            />

            {/* Subtle horizon line glow */}
            <div
                className="absolute left-1/2 top-0 h-px w-[800px] -translate-x-1/2 opacity-30"
                style={{
                    background: `linear-gradient(
            90deg,
            transparent 0%,
            #1a4d1a 30%,
            #2a6d2a 50%,
            #1a4d1a 70%,
            transparent 100%
          )`,
                    boxShadow: '0 0 60px 30px rgba(26, 77, 26, 0.3)',
                }}
            />
        </div>
    )
}
