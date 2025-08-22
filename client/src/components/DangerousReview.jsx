import React, { useRef, useLayoutEffect } from 'react';

export default function DangerousReview({ content }) {
  const elRef = useRef(null);

  useLayoutEffect(() => {
    if (elRef.current) {
      const range = document.createRange();
      range.selectNode(elRef.current);
      const documentFragment = range.createContextualFragment(content);
      elRef.current.innerHTML = ''; // Clear existing content
      elRef.current.appendChild(documentFragment); // Append fragment to execute scripts
    }
  }, [content]); // Re-run if content changes

  return <div ref={elRef} dangerouslySetInnerHTML={{ __html: content }} />;
}