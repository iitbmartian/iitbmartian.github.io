// components/icons/RoverIcon.tsx

import React from 'react';
import Image from 'next/image';

const RoverIcon = ({className}) => (
  <Image
    src="https://cdn-icons-png.flaticon.com/512/947/947680.png"
    alt="Rover image"
    width={100}
    height={100}
    className={className}
  />
);

export default RoverIcon;
