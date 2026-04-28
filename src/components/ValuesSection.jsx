import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const ValuesSection = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Initial configs for accordion state
    gsap.set('.single-mission-wrapper._01', { width: '50%' });
    gsap.set('.mission-name._01', { color: 'rgb(255, 255, 255)' });
    gsap.set('.mission-name-hover-bg._01', { opacity: 1 });
    gsap.set('.mission-image-wrap._01', { width: '100%', height: '7.5rem' });

    gsap.set('.single-mission-wrapper._02, .single-mission-wrapper._03', { width: '24%' });
    gsap.set('.mission-name._02, .mission-name._03', { color: 'rgb(9, 9, 9)' });
    gsap.set('.mission-name-hover-bg._02, .mission-name-hover-bg._03', { opacity: 0 });
    gsap.set('.mission-image-wrap._02, .mission-image-wrap._03', { width: '0%', height: '7.5rem' });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.mission-vh-wrap',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      }
    });

    // Part 1: Switch from 01 to 02
    tl.to('.single-mission-wrapper._01', { width: '24%', ease: 'power1.inOut' }, 0)
      .to('.mission-image-wrap._01', { width: '0%', ease: 'power1.inOut' }, 0)
      .to('.mission-name._01', { color: 'rgb(9, 9, 9)', ease: 'power1.inOut' }, 0)
      .to('.mission-name-hover-bg._01', { opacity: 0, ease: 'power1.inOut' }, 0)

      .to('.single-mission-wrapper._02', { width: '50%', ease: 'power1.inOut' }, 0)
      .to('.mission-image-wrap._02', { width: '100%', ease: 'power1.inOut' }, 0)
      .to('.mission-name._02', { color: 'rgb(255, 255, 255)', ease: 'power1.inOut' }, 0)
      .to('.mission-name-hover-bg._02', { opacity: 1, ease: 'power1.inOut' }, 0);

    // Part 2: Switch from 02 to 03
    tl.to('.single-mission-wrapper._02', { width: '24%', ease: 'power1.inOut' }, 1)
      .to('.mission-image-wrap._02', { width: '0%', ease: 'power1.inOut' }, 1)
      .to('.mission-name._02', { color: 'rgb(9, 9, 9)', ease: 'power1.inOut' }, 1)
      .to('.mission-name-hover-bg._02', { opacity: 0, ease: 'power1.inOut' }, 1)

      .to('.single-mission-wrapper._03', { width: '50%', ease: 'power1.inOut' }, 1)
      .to('.mission-image-wrap._03', { width: '100%', ease: 'power1.inOut' }, 1)
      .to('.mission-name._03', { color: 'rgb(255, 255, 255)', ease: 'power1.inOut' }, 1)
      .to('.mission-name-hover-bg._03', { opacity: 1, ease: 'power1.inOut' }, 1);

  }, { scope: containerRef });

  return (
    <section className="section" ref={containerRef}>
      <div className="container">
        <div data-w-id="dd529003-f9f9-9165-1b60-4ee0d6102cf0" className="mission-vh-wrap">
          <div className="mission-sticky-wrap">
            <div className="section-title-wrapper flex mission">
              <div className="section-title-left-wrap mission">
                <div className="section-subtile-wrap">
                  <div data-wf--subtitle--variant="borders" className="subtitle-wrap w-variant-89dd2e21-7faa-27ca-a536-110057684450">
                    <div className="subtitle-flex-wrap">
                      <img src="https://cdn.prod.website-files.com/68dbb9a72b91c794d0cdd10c/690f9e158664fc7bd2753513_Subtitle-Icon.svg" loading="lazy" alt="Subtitle Icon" className="subtitle-icon" />
                      <div className="subtitle-text">Our Values</div>
                    </div>
                  </div>
                </div>
                <h2 className="section-title">
                  Values Shapes <span className="section-title-mark">Everything.</span>
                </h2>
              </div>
              <div className="section-title-right-wrap mission-button-wrap">
                <a data-wf--primary-button--variant="alice-blue" href="/projects" className="primary-button w-variant-3b35c6e6-bf39-22a4-81e5-2d58550c88a7 w-inline-block">
                  <div className="primary-button-flex">
                    <div className="primary-button-text-wrap">
                      <div className="primary-button-text" aria-label="View All Projects">
                        View All Projects
                      </div>
                      <div className="primary-button-text-hover" aria-label="View All Projects">
                        View All Projects
                      </div>
                    </div>
                    <div className="primary-button-arrow-wrapper">
                      <div className="primary-button-arrow-wrap">
                        <img src="https://cdn.prod.website-files.com/68dbb9a72b91c794d0cdd10c/69108960e3284bb1a2e481a4_Button-Arrow.svg" loading="lazy" alt="Arrow" className="primary-button-arrow" />
                        <img src="https://cdn.prod.website-files.com/68dbb9a72b91c794d0cdd10c/69108960e3284bb1a2e481a4_Button-Arrow.svg" loading="lazy" alt="Arrow" className="primary-button-arrow-hover" />
                      </div>
                    </div>
                  </div>
                  <div className="primary-button-hover-bg"></div>
                </a>
              </div>
            </div>

            <div className="mission-flex-wrap">
              <div className="single-mission-wrapper _01">
                <div className="mission-counter-wrap _01">
                  <div className="mission-name-wrap">
                    <div className="mission-name _01">Mission</div>
                    <div className="mission-name-hover-bg _01"></div>
                  </div>
                  <div className="mission-border"></div>
                </div>
                <div className="mission-card-wrap">
                  <div className="mission-card-content-wrap">
                    <div className="mission-icon-wrap">
                      <img src="https://cdn.prod.website-files.com/68dbb9a72b91c794d0cdd10c/6921cb589d47768656dc4903_Mission-Icon-1.svg" loading="lazy" alt="Mission Icon" className="mission-icon" />
                    </div>
                    <div className="mission-contents-flex">
                      <div className="mission-details-wrap">
                        <h3 className="mission-title">Focused On Impact</h3>
                        <p className="mission-details">Our mission is creating experience that inspire, deliver results.</p>
                      </div>
                      <div className="mission-image-wrap _01">
                        <img src="https://cdn.prod.website-files.com/68dbb9a72b91c794d0cdd10c/6921cc716d7304d3ca57aea9_Mission-Image-1.jpg" loading="lazy" alt="Mission Image" className="mission-image" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="single-mission-wrapper _02">
                <div className="mission-counter-wrap _02">
                  <div className="mission-name-wrap">
                    <div className="mission-name _02">Vision</div>
                    <div className="mission-name-hover-bg _02"></div>
                  </div>
                  <div className="mission-border"></div>
                </div>
                <div className="mission-card-wrap">
                  <div className="mission-card-content-wrap">
                    <div className="mission-icon-wrap">
                      <img src="https://cdn.prod.website-files.com/68dbb9a72b91c794d0cdd10c/6921cb58248258afdc90491e_Mission-Icon-2.svg" loading="lazy" alt="Mission Icon" className="mission-icon" />
                    </div>
                    <div className="mission-contents-flex">
                      <div className="mission-details-wrap">
                        <h3 className="mission-title">Digital Innovation</h3>
                        <p className="mission-details">Our vision is to shape the future of digital innovation.</p>
                      </div>
                      <div className="mission-image-wrap _02">
                        <img src="https://cdn.prod.website-files.com/68dbb9a72b91c794d0cdd10c/6921cc716d7304d3ca57aea9_Mission-Image-1.jpg" loading="lazy" alt="Mission Image" className="mission-image" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="single-mission-wrapper _03">
                <div className="mission-counter-wrap _03">
                  <div className="mission-name-wrap">
                    <div className="mission-name _03">Goals</div>
                    <div className="mission-name-hover-bg _03"></div>
                  </div>
                  <div className="mission-border"></div>
                </div>
                <div className="mission-card-wrap">
                  <div className="mission-card-content-wrap">
                    <div className="mission-icon-wrap">
                      <img src="https://cdn.prod.website-files.com/68dbb9a72b91c794d0cdd10c/6921cb58c89775bca22ccba5_Mission-Icon-3.svg" loading="lazy" alt="Mission Icon" className="mission-icon" />
                    </div>
                    <div className="mission-contents-flex">
                      <div className="mission-details-wrap">
                        <h3 className="mission-title">Inspire Growth</h3>
                        <p className="mission-details">Our goal is to continuously push boundaries &amp; help business.</p>
                      </div>
                      <div className="mission-image-wrap _03">
                        <img src="https://cdn.prod.website-files.com/68dbb9a72b91c794d0cdd10c/6921cc716d7304d3ca57aea9_Mission-Image-1.jpg" loading="lazy" alt="Mission Image" className="mission-image _03" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;
