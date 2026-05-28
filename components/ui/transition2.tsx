'use client';

export default function Transition2() {
  return (
    <div className="transition__overlay" aria-hidden="true">
      <div className="transition__overlay__bar" />
      <div className="transition__overlay__content">
        <h1 className="title__destination"></h1>
      </div>
    </div>
  );
}
