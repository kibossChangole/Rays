// RainBackground.tsx
'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';


export default function RainBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.Camera();
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const uniforms = {
      iTime: { value: 0 },
      iResolution: { value: new THREE.Vector3(window.innerWidth, window.innerHeight, 1) },
      iChannel0: { value: new THREE.TextureLoader().load('/texture.jpg') },
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: `
        void main() {
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 iResolution;
        uniform float iTime;
        uniform sampler2D iChannel0;

        void mainImage(out vec4 fragColor, in vec2 fragCoord) {
          vec2 q = fragCoord.xy / iResolution.xy;
          vec2 p = -1.0 + 2.0 * q;
          p.x *= iResolution.x / iResolution.y;
          vec3 col = vec3(0.0);

          vec2 st = p * vec2(0.5, 0.01) + vec2(0.0, iTime * 0.3);

          vec2 stRepeat = fract(st);
          float f = texture(iChannel0, stRepeat).y * texture(iChannel0, stRepeat * 0.773).x * 1.55;
          f = clamp(pow(abs(f), 23.0) * 13.0, 0.0, q.y * 0.14);

          col += f;

          // --- Lightning flash here ---
          float lightningFreq = 0.05;
          float flashDuration = 0.4;

          float t = floor(iTime);
          float randomValue = fract(sin(t * 17.0) * 43758.5453123);

          float flashStart = step(1.0 - lightningFreq, randomValue);
          float flashTimer = fract(iTime);
          float flash = flashStart * step(flashTimer, flashDuration);

          col *= mix(1.4, 3.0, flash);

          fragColor = vec4(col, 1.0);

        }

        void main() {
          mainImage(gl_FragColor, gl_FragCoord.xy);
        }


      `,
    });

    const plane = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(plane);

    const clock = new THREE.Clock();

    function animate() {
      requestAnimationFrame(animate);
      uniforms.iTime.value = clock.getElapsedTime();
      renderer.render(scene, camera);
    }
    animate();

    function handleResize() {
      uniforms.iResolution.value.set(window.innerWidth, window.innerHeight, 1);
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      mountRef.current?.removeChild(renderer.domElement);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} style={{ position: 'fixed', width: '100%', height: '100%', zIndex: 0, top: 0, left: 0 }} />;
}
