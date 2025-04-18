const CoachChill = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      width="100"
      height="100"
    >
      <defs>
        <radialGradient id="haloChill" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#5dade2" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#0a1a2f" stopOpacity="0" />
        </radialGradient>
      </defs>
  
      {/* Glow circle */}
      <circle cx="60" cy="60" r="55" fill="url(#haloChill)" />
  
      {/* Head */}
      <circle cx="60" cy="60" r="35" fill="#cfe9fa" stroke="#1b4f72" strokeWidth="3" />
  
      {/* Eyes - relaxed */}
      <path d="M48 55 Q50 57 52 55" stroke="#1b4f72" strokeWidth="2" fill="none" />
      <path d="M68 55 Q70 57 72 55" stroke="#1b4f72" strokeWidth="2" fill="none" />
  
      {/* Chill Smile */}
      <path
        d="M 48 72 Q 60 76 72 72"
        stroke="#1b4f72"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
  
      {/* Hoodie */}
      <path
        d="M 30 90 Q 60 108 90 90 Q 85 100 35 100 Z"
        fill="#3498db"
      />
    </svg>
  );
  
  export default CoachChill;
  