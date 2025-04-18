const CoachHype = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      width="100"
      height="100"
    >
      <defs>
        <radialGradient id="haloHype" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#ff6f61" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#2d0503" stopOpacity="0" />
        </radialGradient>
      </defs>
  
      {/* Glow circle */}
      <circle cx="60" cy="60" r="55" fill="url(#haloHype)" />
  
      {/* Head */}
      <circle cx="60" cy="60" r="35" fill="#ffcfc9" stroke="#891100" strokeWidth="3" />
  
      {/* Eyes - energetic */}
      <circle cx="48" cy="54" r="4" fill="#891100" />
      <circle cx="72" cy="54" r="4" fill="#891100" />
      <path d="M45 50 L51 50" stroke="#891100" strokeWidth="1.5" />
      <path d="M69 50 L75 50" stroke="#891100" strokeWidth="1.5" />
  
      {/* Big Smile */}
      <path
        d="M 45 72 Q 60 90 75 72"
        stroke="#891100"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
  
      {/* Shoulders */}
      <path
        d="M 30 90 Q 60 110 90 90 Q 85 100 35 100 Z"
        fill="#e74c3c"
      />
    </svg>
  );
  
  export default CoachHype;
  