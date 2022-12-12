import React, { useEffect, useState } from 'react';

let nextId = 0;
const listeners = new Set();

export function toast(message, opts = {}) {
  const id = ++nextId;
  const ttl = opts.ttl || 1800;
  listeners.forEach((fn) => fn({ type: 'add', id, message, kind: opts.kind || 'info' }));
  setTimeout(() => {
    listeners.forEach((fn) => fn({ type: 'remove', id }));
  }, ttl);
}

function ToastHost() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    function onEvent(evt) {
      if (evt.type === 'add') {
        setItems((prev) => [...prev, evt]);
      } else {
        setItems((prev) => prev.filter((p) => p.id !== evt.id));
      }
    }
    listeners.add(onEvent);
    return () => listeners.delete(onEvent);
  }, []);
  return (
    <div className="toast-host" role="status" aria-live="polite">
      {items.map((t) => (
        <div className={`toast toast--${t.kind}`} key={t.id}>{t.message}</div>
      ))}
    </div>
  );
}

export default ToastHost;
