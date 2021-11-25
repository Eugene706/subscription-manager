import { useEffect, useRef, useState } from 'react';
import './diagram.scss';

function Diagram({ profit, subscription }) {
  const mainDiagram = useRef();
  const diagram = useRef();

  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const ctx = diagram.current.getContext('2d');
    ctx.beginPath();
    ctx.strokeStyle = '#F4F2F5';
    ctx.lineWidth = 17;
    ctx.arc(180, 76, 60, 0, 2 * Math.PI, false);
    ctx.stroke();
  }, []);

  useEffect(() => {
    const percentCalc = Math.round((subscription / profit) * 100);
    if (percentCalc > 100) {
      setPercent('>100');
    }
    setPercent(percentCalc);
  }, [profit, subscription]);

  useEffect(() => {
    const calc = (percent * 3.6 * Math.PI) / 180 + Math.PI;
    const ctx = mainDiagram.current.getContext('2d');
    ctx.beginPath();
    ctx.clearRect(0, 0, 340, 170);
    ctx.strokeStyle = '#ffb35d';
    ctx.lineWidth = 18;
    ctx.lineCap = 'round';
    ctx.arc(180, 76, 60, Math.PI, calc, false);
    ctx.stroke();
  }, [percent]);

  return (
    <div className="diagram">
      <span className="diagram__text">on subscriptions, you spend:</span>
      <div className="diagram__circles">
        <canvas className="diagram__circle" ref={diagram}></canvas>
        <canvas className="diagram__circle" ref={mainDiagram}></canvas>
        <div className="diagram__info">
          <span className="diagram__pecent">{percent}%</span>
          <span className="diagram__text">of income</span>
        </div>
      </div>
    </div>
  );
}

export default Diagram;
