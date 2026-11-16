import React from 'react';
import { motion } from 'framer-motion';

export default function LoadingScreen() {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: '#08090D',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '2.5rem',
      overflow: 'hidden'
    }}>
      {/* Background ambient pulse glow */}
      <motion.div
        animate={{
          scale: [0.85, 1.25, 0.85],
          opacity: [0.2, 0.45, 0.2]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(229, 9, 58, 0.35) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}
      />

      {/* Main Logo with smooth cinematic breathing and scale */}
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <motion.div
          animate={{
            scale: [0.96, 1.05, 0.96],
            filter: [
              'drop-shadow(0 0 15px rgba(229, 9, 58, 0.3))',
              'drop-shadow(0 0 35px rgba(229, 9, 58, 0.8))',
              'drop-shadow(0 0 15px rgba(229, 9, 58, 0.3))'
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <img
            src="/images/stackly-logo.webp"
            alt="STACKLY"
            style={{
              height: '65px',
              width: 'auto',
              display: 'block',
              objectFit: 'contain'
            }}
          />
        </motion.div>
      </div>

      {/* Cinematic Progress Bar */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.85rem'
      }}>
        <div style={{
          width: '200px',
          height: '3px',
          background: 'rgba(255, 255, 255, 0.08)',
          borderRadius: '999px',
          overflow: 'hidden',
          position: 'relative'
        }}>
          <motion.div
            animate={{
              x: ['-100%', '100%']
            }}
            transition={{
              duration: 1.4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              width: '50%',
              background: 'linear-gradient(90deg, transparent, #E5093A, #FF4757, transparent)',
              borderRadius: '999px'
            }}
          />
        </div>

        <motion.span
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          style={{
            fontSize: '0.8rem',
            fontWeight: 700,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)'
          }}
        >
          LOADING CINEMA...
        </motion.span>
      </div>
    </div>
  );
}
