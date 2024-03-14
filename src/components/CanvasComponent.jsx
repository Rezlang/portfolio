import React, { useRef, useEffect } from 'react';

const CanvasComponent = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const adjustCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    adjustCanvasSize();

    const lines = [];
    const circles = [];
    const maxLines = 50;
    const maxCircles = 50;
    const lineSpeed = 1;
    const circleSpeed = 1;

    class Line {
      constructor(x, y, speed, color) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.color = color;
        this.direction = Math.random() * 2 * Math.PI;
      }

      update() {
        this.x += Math.cos(this.direction) * this.speed;
        this.y += Math.sin(this.direction) * this.speed;

        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
          this.direction += Math.PI;
        }
      }

      draw(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + Math.cos(this.direction) * 100, this.y + Math.sin(this.direction) * 100);
        ctx.strokeStyle = this.color;
        ctx.stroke();
      }
    }

    class Circle {
      constructor(x, y, speed, color, radius) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.color = color;
        this.radius = radius;
        this.direction = Math.random() * 2 * Math.PI;
      }

      update() {
        this.x += Math.cos(this.direction) * this.speed;
        this.y += Math.sin(this.direction) * this.speed;

        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
          this.direction += Math.PI;
        }
      }

      draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    const createLines = () => {
      for (let i = 0; i < maxLines; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const speed = Math.random() * lineSpeed + 0.1;
        const color = `rgba(200, 200, 200, ${Math.random()})`;
        lines.push(new Line(x, y, speed, color));
      }
    };

    const createCircles = () => {
      for (let i = 0; i < maxCircles; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const speed = Math.random() * circleSpeed + 0.1;
        const color = `rgba(200, 200, 200, ${Math.random()})`;
        const radius = Math.random() * 20 + 5;
        circles.push(new Circle(x, y, speed, color, radius));
      }
    };

    const animate = () => {
      ctx.fillStyle = '#13151a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.filter = 'blur(3px)';

      lines.forEach(line => {
        line.update();
        line.draw(ctx);
      });

      circles.forEach(circle => {
        circle.update();
        circle.draw(ctx);
      });

      ctx.filter = 'none';

      requestAnimationFrame(animate);
    };

    createLines();
    createCircles();
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      lines.length = 0;
      createLines();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: -1 }} />;
};

export default CanvasComponent;
