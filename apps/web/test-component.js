import React from 'react';
import { renderToString } from 'react-dom/server';
import Home from './app/page';

console.log('Testing Home component...');

try {
  const html = renderToString(<Home />);
  console.log('✅ Home component rendered successfully!');
  console.log('Output length:', html.length, 'characters');
} catch (error) {
  console.error('❌ Error rendering Home component:');
  console.error(error);
}