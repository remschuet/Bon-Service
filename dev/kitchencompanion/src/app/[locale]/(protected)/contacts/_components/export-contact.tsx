import { Button } from "@/components/ui/button";
import { useSession } from "@/hooks/useSession";
import { exportContactPdf } from "@/app/[locale]/(protected)/contacts/_export/pdf-contact-export";
import { Download } from "lucide-react";

export function ExportContact() {
  const { id, name } = useSession();

  function exportToPDF() {
    console.log("contact exported to PDF");
    exportContactPdf(id, name);
  }
  return (
    <Button
      className='flex gap-2'
      onClick={exportToPDF}>
      {" "}
      <Download className='w-4' />
      Exporter
    </Button>
  );
}
