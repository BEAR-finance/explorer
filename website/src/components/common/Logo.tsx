import React from 'react'

export const Logo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    height="31"
    width="31"
    viewBox="0 0 31 31"
    {...props}
    className={'dcl-logo ' + (props.className || '')}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="c" x1=".5" x2="-.20734" y1="-.20711" y2=".49977">
        <stop stopColor="#1DB954" offset="0" />
        <stop stopColor="#FFBC5B" offset="1" />
      </linearGradient>
      <linearGradient id="b" x1="-.00033" x2="-.00033" y2="1">
        <stop stopColor="#A524B3" offset="0" />
        <stop stopColor="#1DB954" offset="1" />
      </linearGradient>
      <linearGradient id="a" x1="-.00034" x2="-.00034" y2="1">
        <stop stopColor="#A524B3" offset="0" />
        <stop stopColor="#1DB954" offset="1" />
      </linearGradient>
    </defs>
    <g>
      <title>background</title>
      <rect x="-1" y="-1" width="10.267" height="10.267" fill="none" />
    </g>
    <g>
      <title>Layer 1</title>
      <path
        d="m15.45 30.91c8.5327 0 15.45-6.9194 15.45-15.455 0-8.5355-6.9171-15.455-15.45-15.455-8.5328 0-15.45 6.9194-15.45 15.455 0 8.5356 6.9171 15.455 15.45 15.455z"
        clipRule="evenodd"
        fill="url(#c)"
        fillRule="evenodd"
      />
      <path d="m10.948 10.046v11.591h9.6561l-9.6561-11.591z" clipRule="evenodd" fill="url(#b)" fillRule="evenodd" />
      <path d="m1.29 21.637h9.6561v-11.591l-9.6561 11.591z" clipRule="evenodd" fill="#fff" fillRule="evenodd" />
<<<<<<< HEAD
      <path d="m6.1802 27.819c2.5801 1.9396 5.7937 3.091 9.2699 3.091s6.6898-1.1514 9.2699-3.091h-18.54z" clipRule="evenodd" fill="#1DB954" fillRule="evenodd" />
      <path d="m3.0901 24.728c0.88064 1.1669 1.9235 2.2101 3.09 3.091h18.54c1.1664-0.8809 2.2093-1.9241 3.0899-3.091h-24.72z" clipRule="evenodd" fill="#FC9965" fillRule="evenodd" />
      <path d="m20.726 21.637h-19.436c0.47894 1.105 1.0892 2.1405 1.7999 3.091h17.644v-3.091h-0.0077z" clipRule="evenodd" fill="#FFBC5B" fillRule="evenodd" />
=======
      <path
        d="m6.1802 27.819c2.5801 1.9396 5.7937 3.091 9.2699 3.091s6.6898-1.1514 9.2699-3.091h-18.54z"
        clipRule="evenodd"
        fill="#FF2D55"
        fillRule="evenodd"
      />
      <path
        d="m3.0901 24.728c0.88064 1.1669 1.9235 2.2101 3.09 3.091h18.54c1.1664-0.8809 2.2093-1.9241 3.0899-3.091h-24.72z"
        clipRule="evenodd"
        fill="#FC9965"
        fillRule="evenodd"
      />
      <path
        d="m20.726 21.637h-19.436c0.47894 1.105 1.0892 2.1405 1.7999 3.091h17.644v-3.091h-0.0077z"
        clipRule="evenodd"
        fill="#FFBC5B"
        fillRule="evenodd"
      />
>>>>>>> 7f19988295bc26bb94346a9a4f9c5a27e5ee74a4
      <path d="m20.727 16.228v8.5003h7.0838l-7.0838-8.5003z" clipRule="evenodd" fill="url(#a)" fillRule="evenodd" />
      <path d="m13.65 24.728h7.076v-8.5003l-7.076 8.5003z" clipRule="evenodd" fill="#fff" fillRule="evenodd" />
      <path
        d="m20.727 13.909c2.1331 0 3.8624-1.7298 3.8624-3.8637 0-2.1339-1.7293-3.8637-3.8624-3.8637-2.1332 0-3.8625 1.7299-3.8625 3.8637 0 2.1339 1.7293 3.8637 3.8625 3.8637z"
        clipRule="evenodd"
        fill="#FFC95B"
        fillRule="evenodd"
      />
      <path
        d="m10.947 7.7278c1.0666 0 1.9312-0.86493 1.9312-1.9319s-0.8646-1.9319-1.9312-1.9319c-1.0666 0-1.9312 0.86493-1.9312 1.9319s0.86464 1.9319 1.9312 1.9319z"
        clipRule="evenodd"
        fill="#FFC95B"
        fillRule="evenodd"
      />
    </g>
  </svg>
)
