import React from 'react';
import { STATUS } from '../lib/scoring';

function Tile({ value, status, animate, delay, solved }) {
  const cls = ['tile'];
  if (status && status !== STATUS.EMPTY) cls.push(`tile--${status}`);
  if (value) cls.push('tile--filled');
  if (animate === 'flip') cls.push('tile--flip');
  if (animate === 'pop') cls.push('tile--pop');
  if (animate === 'shake') cls.push('tile--shake');
  if (solved) cls.push('tile--solved');
  const style = delay != null ? { animationDelay: `${delay}ms`, transitionDelay: `${delay}ms` } : undefined;
  return (
    <div className={cls.join(' ')} style={style}>
      <span className="tile__face tile__face--front">{value || ''}</span>
      <span className="tile__face tile__face--back">{value || ''}</span>
    </div>
  );
}

export default Tile;
