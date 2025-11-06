import { useEffect, useState } from "react";

export default function AnimatedCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setVisible(true);
    const handleMouseLeave = () => setVisible(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <>
      {/* Small center dot */}
      <div
        className={`fixed top-0 left-0 w-[8px] h-[8px] rounded-full bg-yellow-500 z-[9999] pointer-events-none transition-transform duration-75 ease-out ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
      ></div>

      {/* Outer ring */}
      <div
        className={`fixed top-0 left-0 w-[30px] h-[30px] border-2 border-yellow-500 rounded-full z-[9998] pointer-events-none transition-transform duration-150 ease-out ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          transform: `translate(${position.x - 12}px, ${position.y - 12}px)`,
        }}
      ></div>
    </>
  );
}
