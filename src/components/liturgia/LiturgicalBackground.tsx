"use client";

import { useState, useEffect, useRef } from "react";

interface LiturgicalBackgroundProps {
  cor: string;
}

const LiturgicalBackground = ({ cor }: LiturgicalBackgroundProps) => {
  const [mounted, setMounted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const normalize = (s: string) =>
    s?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim() || "";

  const c = normalize(cor);

  // ─── Canvas particle engine ───────────────────────────────────────────────
  useEffect(() => {
    if (!mounted) {
      return;
    }
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    interface Particle {
      x: number; y: number; vx: number; vy: number;
      size: number; opacity: number; life: number; maxLife: number;
      hue?: number; symbol?: string; angle: number; va: number;
    }

    const particles: Particle[] = [];
    const count = 60;

    const getColor = () => {
      if (c.includes("verde")) {
        return { r: 16, g: 185, b: 129 };
      }
      if (c.includes("roxo") || c.includes("violeta")) {
        return { r: 139, g: 92, b: 246 };
      }
      if (c.includes("vermelho")) {
        return { r: 220, g: 38, b: 38 };
      }
      if (c.includes("rosa")) {
        return { r: 244, g: 114, b: 182 };
      }
      if (c.includes("preto")) {
        return { r: 148, g: 163, b: 184 };
      }
      return { r: 234, g: 179, b: 8 }; // dourado/branco
    };

    const col = getColor();

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -0.3 - Math.random() * 0.6,
        size: 2 + Math.random() * 5,
        opacity: 0,
        life: Math.random() * 200,
        maxLife: 150 + Math.random() * 200,
        angle: Math.random() * Math.PI * 2,
        va: (Math.random() - 0.5) * 0.02,
      });
    }

    let tick = 0;

    const draw = () => {
      tick++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Fundo: ondas suaves baseadas na cor
      if (c.includes("verde")) {
        // Ondas bioluminescentes
        for (let i = 0; i < 4; i++) {
          const wave = Math.sin(tick * 0.008 + i * 1.2) * 60;
          const grad = ctx.createRadialGradient(
            canvas.width * 0.3 + wave, canvas.height * 0.5, 0,
            canvas.width * 0.5, canvas.height * 0.5, canvas.width * 0.7
          );
          grad.addColorStop(0, `rgba(16, 185, 129, ${0.04 + i * 0.01})`);
          grad.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
      } else if (c.includes("roxo") || c.includes("violeta")) {
        // Pulso místico
        const pulse = Math.sin(tick * 0.015) * 0.5 + 0.5;
        const grad = ctx.createRadialGradient(
          canvas.width / 2, canvas.height / 2, 0,
          canvas.width / 2, canvas.height / 2, canvas.width * 0.8
        );
        grad.addColorStop(0, `rgba(139, 92, 246, ${0.08 * pulse})`);
        grad.addColorStop(0.5, `rgba(109, 40, 217, ${0.04 * pulse})`);
        grad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      } else if (c.includes("vermelho")) {
        // Chamas na base
        for (let i = 0; i < 3; i++) {
          const flicker = Math.sin(tick * 0.05 + i * 2) * 30;
          const grad = ctx.createRadialGradient(
            canvas.width * (0.3 + i * 0.2), canvas.height + flicker, 0,
            canvas.width * (0.3 + i * 0.2), canvas.height - 200, 350
          );
          grad.addColorStop(0, `rgba(220, 38, 38, 0.15)`);
          grad.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
      } else if (c.includes("rosa")) {
        // Aura pulsante
        const pulse = Math.sin(tick * 0.012) * 0.5 + 0.5;
        const grad = ctx.createRadialGradient(
          canvas.width / 2, canvas.height / 2, 50,
          canvas.width / 2, canvas.height / 2, canvas.width * 0.6
        );
        grad.addColorStop(0, `rgba(244, 114, 182, ${0.06 + pulse * 0.04})`);
        grad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      } else if (c.includes("preto")) {
        // Nada, escuro absoluto
      } else {
        // Dourado: luz divina varredura
        const sweep = ((tick * 0.005) % 1) * canvas.width * 1.5 - canvas.width * 0.25;
        const grad = ctx.createLinearGradient(sweep - 200, 0, sweep + 200, canvas.height);
        grad.addColorStop(0, "rgba(0,0,0,0)");
        grad.addColorStop(0.5, "rgba(234, 179, 8, 0.04)");
        grad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // Partículas
      for (const p of particles) {
        p.life++;
        if (p.life > p.maxLife) {
          p.life = 0;
          p.x = Math.random() * canvas.width;
          p.y = canvas.height + 20;
          p.vx = (Math.random() - 0.5) * 0.4;
          p.vy = -0.3 - Math.random() * 0.6;
          p.opacity = 0;
        }

        const lifeRatio = p.life / p.maxLife;
        p.opacity = lifeRatio < 0.1
          ? lifeRatio * 10
          : lifeRatio > 0.8
            ? (1 - lifeRatio) * 5
            : 1;

        p.x += p.vx + Math.sin(tick * 0.02 + p.angle) * 0.3;
        p.y += p.vy;
        p.angle += p.va;

        // Verde: partículas hexagonais (folhas)
        if (c.includes("verde")) {
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.angle);
          ctx.globalAlpha = p.opacity * 0.6;
          ctx.beginPath();
          for (let k = 0; k < 6; k++) {
            const a = (k / 6) * Math.PI * 2;
            if (k === 0) {
              ctx.moveTo(Math.cos(a) * p.size, Math.sin(a) * p.size);
            } else {
              ctx.lineTo(Math.cos(a) * p.size, Math.sin(a) * p.size);
            }
          }
          ctx.closePath();
          ctx.fillStyle = `rgba(${col.r}, ${col.g}, ${col.b}, 0.4)`;
          ctx.fill();
          ctx.restore();
        }
        // Roxo: estrelas de 4 pontas
        else if (c.includes("roxo") || c.includes("violeta")) {
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.angle + tick * 0.01);
          ctx.globalAlpha = p.opacity * 0.7;
          ctx.beginPath();
          for (let k = 0; k < 8; k++) {
            const a = (k / 8) * Math.PI * 2;
            const r = k % 2 === 0 ? p.size * 1.4 : p.size * 0.5;
            if (k === 0) {
              ctx.moveTo(Math.cos(a) * r, Math.sin(a) * r);
            } else {
              ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
            }
          }
          ctx.closePath();
          ctx.fillStyle = `rgba(${col.r}, ${col.g}, ${col.b}, 0.5)`;
          ctx.fill();
          ctx.restore();
        }
        // Vermelho: gotas de chama
        else if (c.includes("vermelho")) {
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.angle);
          ctx.globalAlpha = p.opacity * 0.5;
          ctx.beginPath();
          ctx.moveTo(0, -p.size * 1.5);
          ctx.bezierCurveTo(p.size, 0, p.size * 0.8, p.size, 0, p.size);
          ctx.bezierCurveTo(-p.size * 0.8, p.size, -p.size, 0, 0, -p.size * 1.5);
          ctx.fillStyle = `rgba(${col.r}, ${col.g}, ${col.b}, 0.6)`;
          ctx.fill();
          ctx.restore();
        }
        // Rosa: corações (círculos duplos)
        else if (c.includes("rosa")) {
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.globalAlpha = p.opacity * 0.5;
          ctx.beginPath();
          ctx.arc(-p.size * 0.5, 0, p.size * 0.7, 0, Math.PI * 2);
          ctx.arc(p.size * 0.5, 0, p.size * 0.7, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${col.r}, ${col.g}, ${col.b}, 0.5)`;
          ctx.fill();
          ctx.restore();
        }
        // Preto: cruzes feitas de retângulos
        else if (c.includes("preto")) {
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.angle);
          ctx.globalAlpha = p.opacity * 0.3;
          ctx.fillStyle = `rgba(148, 163, 184, 0.4)`;
          ctx.fillRect(-p.size * 0.3, -p.size * 1.2, p.size * 0.6, p.size * 2.4);
          ctx.fillRect(-p.size * 1.0, -p.size * 0.3, p.size * 2.0, p.size * 0.6);
          ctx.restore();
        }
        // Dourado: sparkles (estrelas de 4 pontas)
        else {
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.angle + tick * 0.02);
          ctx.globalAlpha = p.opacity * 0.8;
          ctx.beginPath();
          for (let k = 0; k < 8; k++) {
            const a = (k / 8) * Math.PI * 2;
            const r = k % 2 === 0 ? p.size * 1.6 : p.size * 0.4;
            if (k === 0) {
              ctx.moveTo(Math.cos(a) * r, Math.sin(a) * r);
            } else {
              ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
            }
          }
          ctx.closePath();
          ctx.fillStyle = `rgba(${col.r}, ${col.g}, ${col.b}, 0.7)`;
          ctx.fill();
          ctx.restore();
        }
      }

      // Efeitos especiais extras

      // Roxo: círculos de onda expandindo (tipo sonar místico)
      if (c.includes("roxo") || c.includes("violeta")) {
        for (let w = 0; w < 3; w++) {
          const phase = ((tick * 0.008 + w * 0.33) % 1);
          const radius = phase * Math.max(canvas.width, canvas.height) * 0.8;
          ctx.beginPath();
          ctx.arc(canvas.width / 2, canvas.height / 2, radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(139, 92, 246, ${(1 - phase) * 0.08})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // Preto: scanlines lentas
      if (c.includes("preto")) {
        const lineY = (tick * 0.5) % canvas.height;
        ctx.fillStyle = "rgba(255,255,255,0.015)";
        ctx.fillRect(0, lineY, canvas.width, 2);
        ctx.fillStyle = "rgba(255,255,255,0.01)";
        ctx.fillRect(0, lineY + 60, canvas.width, 1);
      }

      // Dourado: raios de luz de baixo para cima
      if (!c.includes("verde") && !c.includes("roxo") && !c.includes("violeta") &&
        !c.includes("vermelho") && !c.includes("rosa") && !c.includes("preto")) {
        for (let r = 0; r < 5; r++) {
          const angle = ((tick * 0.003 + r * 0.7) % 1) * Math.PI - Math.PI / 2;
          const cx = canvas.width / 2;
          const cy = canvas.height;
          const len = canvas.height * 1.4;
          const spread = 0.06;
          const grad = ctx.createLinearGradient(cx, cy, cx + Math.cos(angle) * len, cy + Math.sin(angle) * len);
          grad.addColorStop(0, "rgba(234, 179, 8, 0.06)");
          grad.addColorStop(1, "rgba(234, 179, 8, 0)");
          ctx.save();
          ctx.translate(cx, cy);
          ctx.rotate(angle);
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(-len * spread, -len);
          ctx.lineTo(len * spread, -len);
          ctx.closePath();
          ctx.fillStyle = grad;
          ctx.fill();
          ctx.restore();
        }
      }

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [mounted, c]);

  if (!mounted) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.9 }}
    />
  );
};

export default LiturgicalBackground;
