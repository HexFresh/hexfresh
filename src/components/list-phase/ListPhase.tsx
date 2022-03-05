import React, { useEffect, useState } from 'react';
import './list-phase.css';

interface IPhase {
  id: string;
  name: string;
  plannet: string;
}

export default function ListPhase() {
  const [phase, setPhase] = useState<IPhase[] | []>([]);

  return (
    <div className="list-phase">
      <div className="container">This is list phase</div>
    </div>
  );
}
