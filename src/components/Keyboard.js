import React, { useEffect, useRef } from 'react';

const ROWS_LETTERS = [
  ['q','w','e','r','t','y','u','i','o','p'],
  ['a','s','d','f','g','h','j','k','l'],
  ['ENTER','z','x','c','v','b','n','m','BACK'],
];

const ROWS_NERDLE = [
  ['0','1','2','3','4','5','6','7','8','9'],
  ['+','-','*','/','='],
  ['ENTER','BACK'],
];

function Keyboard({ statusMap, onKey, variant }) {
  const rows = variant === 'nerdle' ? ROWS_NERDLE : ROWS_LETTERS;
  const onKeyRef = useRef(onKey);
  onKeyRef.current = onKey;

  useEffect(() => {
    const flat = rows.flat();
    function handle(e) {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      let k = e.key;
      if (k === 'Enter') k = 'ENTER';
      else if (k === 'Backspace' || k === 'Delete') k = 'BACK';
      else if (k.length === 1) k = k.toLowerCase();
      else return;
      if (!flat.includes(k)) return;
      onKeyRef.current(k);
      e.preventDefault();
    }
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
    // rows is a stable module-level array per variant; we ignore lint
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variant]);

  return (
    <div className={`keyboard keyboard--${variant || 'letters'}`}>
      {rows.map((row, ri) => (
        <div className="keyboard__row" key={ri}>
          {row.map((k) => {
            const wide = k === 'ENTER' || k === 'BACK';
            const status = statusMap && statusMap[k];
            const cls = ['key'];
            if (wide) cls.push('key--wide');
            if (status) cls.push(`key--${status}`);
            return (
              <button
                key={k}
                type="button"
                className={cls.join(' ')}
                onClick={() => onKey(k)}
                aria-label={k === 'BACK' ? 'Backspace' : k === 'ENTER' ? 'Enter' : k}
              >
                {k === 'BACK' ? '⌫' : k.toUpperCase()}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default Keyboard;
