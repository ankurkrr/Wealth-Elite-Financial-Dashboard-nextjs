import { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { FileDown } from "lucide-react";

interface Props { targetId: string }

export function PDFGenerator({ targetId }: Props) {
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    try {
      setLoading(true);
      const el = document.getElementById(targetId);
      if (!el) return;
      const canvas = await html2canvas(el, {
        scale: 2,
        useCORS: true,
        backgroundColor: getComputedStyle(document.body).backgroundColor,
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ orientation: "landscape", unit: "px", format: [canvas.width, canvas.height] });
      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      const ts = new Date().toLocaleString();
      pdf.setTextColor("#6B7280");
      pdf.setFontSize(10);
      pdf.text(`Generated: ${ts}`, 16, canvas.height - 12);
      pdf.save("wealth-dashboard.pdf");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={generate} className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-white hover:bg-primary/90 disabled:opacity-70" aria-busy={loading} aria-label="Download PDF">
      <FileDown className="h-4 w-4" />
      {loading ? "Generating PDF..." : "Download PDF"}
    </button>
  );
}
