import { Button } from "@/components/ui/button";
import { useSession } from "@/hooks/useSession";
import { exportContactPdf } from "@/app/[locale]/(protected)/contacts/_export/pdf-contact-export";

export function ExportContact() {
  const { id } = useSession();

  function exportToPDF() {
    console.log("contact exported to PDF");
    exportContactPdf(id);
  }
  return <Button onClick={exportToPDF}>Exporter</Button>;
}
