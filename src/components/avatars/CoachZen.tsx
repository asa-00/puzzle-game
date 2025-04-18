const CoachZen = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      width="100"
      height="100"
    >
      <defs>
        <radialGradient id="halo" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#a3e4d7" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#1a2e2b" stopOpacity="0" />
        </radialGradient>
      </defs>
  
      {/* Glow circle */}
      <circle cx="60" cy="60" r="55" fill="url(#halo)" />
  
      {/* Head */}
      <circle cx="60" cy="60" r="35" fill="#d1f2eb" stroke="#0f4037" strokeWidth="3" />
  
      {/* Eyes */}
      <circle cx="50" cy="55" r="4" fill="#0f4037" />
      <circle cx="70" cy="55" r="4" fill="#0f4037" />
  
      {/* Smile */}
      <path
        d="M 48 72 Q 60 80 72 72"
        stroke="#0f4037"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
  
      {/* Robe / shoulders */}
      <path
        d="M 30 90 Q 60 110 90 90 Q 85 100 35 100 Z"
        fill="#117a65"
      />
    </svg>
  );
  
  export default CoachZen;
  