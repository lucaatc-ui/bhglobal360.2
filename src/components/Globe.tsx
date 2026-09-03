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

      // Continents: sample a real equirectangular world map and place
      // dots only where the map shows land (land is dark in the mask).
      const mapImg = new Image();
      mapImg.src = earthMapUrl;
      await mapImg.decode();
      if (cancelled || !mountRef.current) return;

      const mapCanvas = document.createElement("canvas");
      mapCanvas.width = mapImg.width;
      mapCanvas.height = mapImg.height;
      const mctx = mapCanvas.getContext("2d")!;
      mctx.drawImage(mapImg, 0, 0);
      const mapData = mctx.getImageData(0, 0, mapCanvas.width, mapCanvas.height).data;

      const isLand = (lat: number, lon: number) => {
        // lat in [-90, 90], lon in [-180, 180]
        const x = Math.floor(((lon + 180) / 360) * mapCanvas.width);
        const y = Math.floor(((90 - lat) / 180) * mapCanvas.height);
        const idx = (y * mapCanvas.width + x) * 4;
        return (mapData[idx] ?? 255) < 128; // dark pixel = land
      };

      const baseColor = new THREE.Color("#5a6b85");
      const accentColor = new THREE.Color("#f4f7fb");
      const posList: number[] = [];
      const colList: number[] = [];
      const GOLDEN = Math.PI * (3 - Math.sqrt(5));
      const SAMPLES = 24000;
      for (let i = 0; i < SAMPLES; i++) {
        const y = 1 - (i / (SAMPLES - 1)) * 2;
        const r = Math.sqrt(1 - y * y);
        const theta = GOLDEN * i;
        const px = Math.cos(theta) * r;
        const pz = Math.sin(theta) * r;
        const lat = (Math.asin(y) * 180) / Math.PI;
        const lon = (Math.atan2(pz, px) * 180) / Math.PI;
        if (!isLand(lat, lon)) continue;
        // lat 90 = north pole = +y (top of the sphere)
        posList.push(px * RADIUS, y * RADIUS, pz * RADIUS);
        // sparse golden "city lights"
        const c = Math.random() < 0.05 ? accentColor : baseColor;
        colList.push(c.r, c.g, c.b);
      }
      const positions = new Float32Array(posList);
      const colors = new Float32Array(colList);
      const dotGeometry = new THREE.BufferGeometry();
      dotGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      dotGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
      const dots = new THREE.Points(
        dotGeometry,
        new THREE.PointsMaterial({
          size: 0.018,
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
        color: "#f4f7fb",
        transparent: true,
        opacity: 0.4,
      });
      const dotCount = positions.length / 3;
      const randomPoint = () => {
        const i = Math.floor(Math.random() * dotCount);
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
      grad.addColorStop(0, "rgba(244, 247, 251, 0.16)");
      grad.addColorStop(0.55, "rgba(150, 175, 220, 0.10)");
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

      globe.rotation.x = -0.12;

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
        globe.rotation.x = -0.12 + extraRotationX;
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
