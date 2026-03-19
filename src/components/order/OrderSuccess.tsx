"use client";

import { buildWhatsAppURL } from "@/lib/whatsapp";

interface Props {
  orderNumber: string;
  whatsappMessage: string;
  onReset: () => void;
}

export default function OrderSuccess({ orderNumber, whatsappMessage, onReset }: Props) {
  const whatsappURL = buildWhatsAppURL(whatsappMessage);

  function copyMessage() {
    navigator.clipboard.writeText(whatsappMessage);
  }

  return (
    <div className="text-center py-12 px-4">
      <div className="text-4xl mb-4">&#10003;</div>
      <h2 className="font-heading text-2xl font-bold mb-2">Order Placed!</h2>
      <p className="text-[#888] dark:text-[#777] mb-2">
        Your order number is <span className="font-bold text-gold-muted dark:text-gold">{orderNumber}</span>
      </p>
      <p className="text-sm text-[#888] dark:text-[#777] mb-8 max-w-md mx-auto">
        Please send the order details on WhatsApp so we can start working on your stamp.
      </p>
      <div className="flex gap-4 justify-center flex-wrap">
        <a href={whatsappURL} target="_blank" rel="noopener noreferrer"
          className="px-6 py-3 bg-[#25D366] text-white font-semibold rounded-lg hover:opacity-90 transition-opacity">
          Send on WhatsApp
        </a>
        <button onClick={copyMessage}
          className="px-6 py-3 border border-light-border dark:border-gold/30 rounded-lg hover:bg-gold-muted/10 dark:hover:bg-gold/10 transition-colors">
          Copy Message
        </button>
      </div>
      <details className="mt-8 max-w-lg mx-auto text-left">
        <summary className="text-sm text-[#888] dark:text-[#777] cursor-pointer hover:text-gold-muted dark:hover:text-gold">View message text</summary>
        <pre className="mt-2 p-4 bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-lg text-xs whitespace-pre-wrap">{whatsappMessage}</pre>
      </details>
      <button onClick={onReset} className="mt-8 text-sm text-[#888] dark:text-[#777] hover:text-gold-muted dark:hover:text-gold underline">
        Place another order
      </button>
    </div>
  );
}
