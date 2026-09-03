import { useEffect, useRef } from "react";
import earthMapUrl from "@/assets/earth-map.png";

/**
 * Interactive 3D globe (Three.js): dotted sphere mapping every continent,
 * auto-rotation, drag-to-spin with inertia and a soft atmosphere glow.
 */
export function Globe({ className }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let cleanup: (() => void) | undefined;
    let cancelled = false;

    (async () => {
      const THREE = await import("three");
      if (cancelled || !mountRef.current) return;

      const width = mount.clientWidth;
      const height = mount.clientHeight;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
      camera.position.z = 3.1;

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      mount.appendChild(renderer.domElement);
      renderer.domElement.style.cursor = "grab";

      const globe = new THREE.Group();
      scene.add(globe);

      const RADIUS = 1;

      // Dotted sphere (fibonacci distribution)
      const DOTS = 2600;
      const positions = new Float32Array(DOTS * 3);
      const colors = new Float32Array(DOTS * 3);
      const baseColor = new THREE.Color("#4a5a75");
      const accentColor = new THREE.Color("#f0c45c");
      const goldenRatio = Math.PI * (3 - Math.sqrt(5));
      for (let i = 0; i < DOTS; i++) {
        const y = 1 - (i / (DOTS - 1)) * 2;
        const r = Math.sqrt(1 - y * y);
        const theta = goldenRatio * i;
        positions[i * 3] = Math.cos(theta) * r * RADIUS;
        positions[i * 3 + 1] = y * RADIUS;
        positions[i * 3 + 2] = Math.sin(theta) * r * RADIUS;
        // sparse golden "city lights"
        const c = Math.random() < 0.07 ? accentColor : baseColor;
        colors[i * 3] = c.r;
        colors[i * 3 + 1] = c.g;
        colors[i * 3 + 2] = c.b;
      }
      const dotGeometry = new THREE.BufferGeometry();
      dotGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      dotGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
      const dots = new THREE.Points(
        dotGeometry,
        new THREE.PointsMaterial({
          size: 0.016,
          vertexColors: true,
          transparent: true,
          opacity: 0.95,
          sizeAttenuation: true,
        })
      );
      globe.add(dots);

      // Inner sphere to occlude back-face dots
      const inner = new THREE.Mesh(
        new THREE.SphereGeometry(RADIUS * 0.985, 64, 64),
        new THREE.MeshBasicMaterial({ color: "#0d1420" })
      );
      globe.add(inner);

      // Connection arcs between random point pairs
      const arcMaterial = new THREE.LineBasicMaterial({
        color: "#f0c45c",
        transparent: true,
        opacity: 0.35,
      });
      const randomPoint = () => {
        const i = Math.floor(Math.random() * DOTS);
        return new THREE.Vector3(
          positions[i * 3],
          positions[i * 3 + 1],
          positions[i * 3 + 2]
        );
      };
      for (let a = 0; a < 14; a++) {
        const p1 = randomPoint();
        const p2 = randomPoint();
        const mid = p1
          .clone()
          .add(p2)
          .multiplyScalar(0.5)
          .normalize()
          .multiplyScalar(RADIUS * (1.15 + Math.random() * 0.25));
        const curve = new THREE.QuadraticBezierCurve3(p1, mid, p2);
        const arc = new THREE.Line(
          new THREE.BufferGeometry().setFromPoints(curve.getPoints(40)),
          arcMaterial
        );
        globe.add(arc);
      }

      // Atmosphere glow (radial-gradient sprite behind the globe)
      const glowCanvas = document.createElement("canvas");
      glowCanvas.width = glowCanvas.height = 256;
      const gctx = glowCanvas.getContext("2d")!;
      const grad = gctx.createRadialGradient(128, 128, 40, 128, 128, 128);
      grad.addColorStop(0, "rgba(240, 196, 92, 0.18)");
      grad.addColorStop(0.55, "rgba(120, 140, 190, 0.10)");
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");
      gctx.fillStyle = grad;
      gctx.fillRect(0, 0, 256, 256);
      const glow = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: new THREE.CanvasTexture(glowCanvas),
          transparent: true,
          depthWrite: false,
        })
      );
      glow.scale.setScalar(4.2);
      scene.add(glow);

      globe.rotation.x = 0.25;

      // Interaction: drag to spin, auto-rotate with inertia
      let velocityY = 0.0028;
      let targetVelocityY = 0.0028;
      let dragging = false;
      let lastX = 0;
      let extraRotationX = 0;

      const onPointerDown = (e: PointerEvent) => {
        dragging = true;
        lastX = e.clientX;
        renderer.domElement.style.cursor = "grabbing";
        renderer.domElement.setPointerCapture(e.pointerId);
      };
      const onPointerMove = (e: PointerEvent) => {
        if (!dragging) return;
        const dx = e.clientX - lastX;
        lastX = e.clientX;
        velocityY = dx * 0.005;
        extraRotationX = THREE.MathUtils.clamp(
          extraRotationX + (e.movementY ?? 0) * 0.002,
          -0.6,
          0.6
        );
      };
      const onPointerUp = () => {
        dragging = false;
        renderer.domElement.style.cursor = "grab";
      };
      renderer.domElement.addEventListener("pointerdown", onPointerDown);
      window.addEventListener("pointermove", onPointerMove);
      window.addEventListener("pointerup", onPointerUp);

      const onResize = () => {
        const w = mount.clientWidth;
        const h = mount.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener("resize", onResize);

      let raf = 0;
      const animate = () => {
        raf = requestAnimationFrame(animate);
        if (!dragging) {
          // ease back toward idle spin (inertia)
          velocityY += (targetVelocityY - velocityY) * 0.03;
          extraRotationX *= 0.97;
        }
        globe.rotation.y += velocityY;
        globe.rotation.x = 0.25 + extraRotationX;
        renderer.render(scene, camera);
      };
      animate();

      cleanup = () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("resize", onResize);
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("pointerup", onPointerUp);
        renderer.domElement.removeEventListener("pointerdown", onPointerDown);
        renderer.dispose();
        dotGeometry.dispose();
        mount.removeChild(renderer.domElement);
      };
    })();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return <div ref={mountRef} className={className} aria-label="Globo terrestre 3D interativo — arraste para girar" role="img" />;
}
