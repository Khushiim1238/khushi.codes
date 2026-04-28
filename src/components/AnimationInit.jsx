import { useEffect } from 'react';

/**
 * AnimationEngineInit - Dynamically loads the original JavaScript files
 * after React has rendered the DOM.
 *
 * WHY: exported JS contains the IX2 interaction engine which handles
 * ALL animations (scroll, hover, entrance), plus component behaviors (slider,
 * tabs, hamburger nav). Loading these scripts after React renders ensures the
 * DOM elements exist when the engine tries to find them.
 *
 * LOADING ORDER matters:
 * 1. jQuery (runtime dependency)
 * 2. Shared chunks (core component logic)
 * 3. Site-specific bundle (contains IX2 animation data)
 * 4. GSAP + plugins (used by custom code)
 * 5. Re-initialize after everything loads
 */

const SCRIPTS = [
  // jQuery — runtime dependency
  {
    src: 'https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=68dbb9a72b91c794d0cdd10c',
    integrity: 'sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=',
    crossOrigin: 'anonymous',
  },
  // Shared chunks (core component logic)
  {
    src: 'https://cdn.prod.website-files.com/68dbb9a72b91c794d0cdd10c/js/webflow.schunk.36b8fb49256177c8.js',
    integrity: 'sha384-4abIlA5/v7XaW1HMXKBgnUuhnjBYJ/Z9C1OSg4OhmVw9O3QeHJ/qJqFBERCDPv7G',
    crossOrigin: 'anonymous',
  },
  {
    src: 'https://cdn.prod.website-files.com/68dbb9a72b91c794d0cdd10c/js/webflow.schunk.2bea9f2bc6f9a8f8.js',
    integrity: 'sha384-HU3f/zPTK60lybTHJ38xdadNbt0ztZDz7TdkmQ5BYp/Xw+HER83wP/hMt0hYiigx',
    crossOrigin: 'anonymous',
  },
  {
    src: 'https://cdn.prod.website-files.com/68dbb9a72b91c794d0cdd10c/js/webflow.schunk.61b534daaaeddbc7.js',
    integrity: 'sha384-zJCHv7ItWTNHbMmm2epSn5+4tX0nIPKUmNfcwwpQKCcPP5HC9rjwYp8giICW6yEw',
    crossOrigin: 'anonymous',
  },
  // Site-specific bundle (contains IX2 animation data for THIS site)
  {
    src: 'https://cdn.prod.website-files.com/68dbb9a72b91c794d0cdd10c/js/webflow.9afb6367.094aedc2bbd9f610.js',
    integrity: 'sha384-L0d5qNBCHEct7x9U2sumioDjgz6o0jNOQ/JdD/D8ATEvZOvpqxnonh69GGEUTtpt',
    crossOrigin: 'anonymous',
  },
  // GSAP + plugins (loaded by the original site for custom interactions)
  {
    src: 'https://cdn.prod.website-files.com/gsap/3.14.2/gsap.min.js',
  },
  {
    src: 'https://cdn.prod.website-files.com/gsap/3.14.2/SplitText.min.js',
  },
  {
    src: 'https://cdn.prod.website-files.com/gsap/3.14.2/ScrollTrigger.min.js',
  },
];

function loadScript(scriptConfig) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = scriptConfig.src;
    script.type = 'text/javascript';
    if (scriptConfig.integrity) {
      script.integrity = scriptConfig.integrity;
    }
    if (scriptConfig.crossOrigin) {
      script.crossOrigin = scriptConfig.crossOrigin;
    }
    script.onload = resolve;
    script.onerror = reject;
    document.body.appendChild(script);
  });
}

const AnimationInit = () => {
  useEffect(() => {
    let mounted = true;

    async function initAnimationEngine() {
      // Load all scripts in sequence (order matters!)
      for (const scriptConfig of SCRIPTS) {
        if (!mounted) return;
        try {
          await loadScript(scriptConfig);
        } catch (err) {
          console.warn(`Failed to load: ${scriptConfig.src}`, err);
        }
      }

      if (!mounted) return;

      // Give engine a moment to register, then re-initialize
      setTimeout(() => {
        if (window.Webflow) {
          // Destroy previous instance (if any) and re-initialize
          window.Webflow.destroy();
          window.Webflow.ready();
          window.Webflow.require('ix2').init();
          console.log('✅ Animation IX2 initialized successfully');
        }
      }, 100);
    }

    initAnimationEngine();

    return () => {
      mounted = false;
    };
  }, []);

  return null; // This component renders nothing — it only loads scripts
};

export default AnimationInit;
