import React from 'react';
import ReactDOM from 'react-dom/client';

export const createPrintIframe = (paperWidth, paperHeight) => {
  const iframe = document.createElement("iframe");
  iframe.style.position = "fixed";
  iframe.style.left = "-10000px";
  iframe.style.top = "-10000px";
  iframe.style.width = "1px";
  iframe.style.height = "1px";
  iframe.style.border = "none";
  iframe.style.opacity = "0";
  iframe.style.pointerEvents = "none";
  document.body.appendChild(iframe);

  const doc = iframe.contentDocument || iframe.contentWindow.document;
  doc.open();
  
  const style = `
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Lao:wght@400;700&display=swap');
      
      @page {
        size: ${paperWidth}mm ${paperHeight}mm;
        margin: 0;
      }
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
        color-adjust: exact !important;
      }
      html, body {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        background: white;
        font-family: 'Noto Sans Lao', sans-serif;
      }
      body {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
        color-adjust: exact !important;
        display: flex;
        justify-content: center;
        align-items: flex-start;
      }
      @media print {
        body {
          margin: 0 !important;
          padding: 0 !important;
        }
      }
    </style>
  `;

  doc.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Barcode Print</title>
        ${style}
      </head>
      <body>
        <div id="print-root"></div>
      </body>
    </html>
  `);
  doc.close();

  return { iframe, doc };
};

export const renderToPrintIframe = (Component, props, iframe) => {
  return new Promise((resolve) => {
    const doc = iframe.contentDocument || iframe.contentWindow.document;
    const container = doc.getElementById('print-root');
    
    if (container) {
      const root = ReactDOM.createRoot(container);
      root.render(React.createElement(Component, props));
      
      // รอให้เรนเดอร์เสร็จ
      setTimeout(() => {
        resolve();
      }, 300);
    } else {
      resolve();
    }
  });
};

export const printIframe = (iframe) => {
  return new Promise((resolve) => {
    const win = iframe.contentWindow;
    win.focus();
    
    // ใช้ setTimeout เพื่อให้บราวเซอร์เตรียมพิมพ์
    setTimeout(() => {
      win.print();
      
      // รอการพิมพ์เสร็จ
      setTimeout(() => {
        resolve();
      }, 1000);
    }, 500);
  });
};

export const cleanupIframe = (iframe) => {
  if (iframe && document.body.contains(iframe)) {
    document.body.removeChild(iframe);
  }
};