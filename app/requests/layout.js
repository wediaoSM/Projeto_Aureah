import { Suspense } from 'react';

export default function RequestsLayout({ children }) {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      {children}
    </Suspense>
  );
}