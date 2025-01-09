// server/api/documents/generate-investment.post.ts
import PDFDocument from "pdfkit";
import QRCode from "qrcode";
import { promises as fs } from "fs";
import { Buffer } from "buffer";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    // Create PDF document
    const doc = new PDFDocument({
      size: "A4",
      margin: 50,
    });

    // Create buffer to store PDF
    const chunks: Buffer[] = [];
    doc.on("data", chunks.push.bind(chunks));

    // Add header
    doc
      .font("Helvetica-Bold")
      .fontSize(20)
      .fillColor("#0066CC")
      .text("CAMFID Engineering Recycling", { align: "center" });

    doc
      .font("Helvetica-Oblique")
      .fontSize(14)
      .fillColor("#323232")
      .text("Investissez dans l'innovation africaine", { align: "center" })
      .moveDown(2);

    // Add investment details
    doc.font("Helvetica").fontSize(12).fillColor("#000000");

    const details = [
      { label: "Nom Complet", value: body.full_name },
      { label: "Nombre d'Actions", value: body.number_of_shares },
      {
        label: "Montant par Action",
        value: `XAF ${body.amount_per_share.toLocaleString()}`,
      },
      {
        label: "Montant Total",
        value: `XAF ${body.total_amount.toLocaleString()}`,
      },
      { label: "Méthode de Paiement", value: body.payment_method },
      { label: "ID de Transaction", value: body.transaction_id },
      { label: "Date", value: new Date(body.date).toLocaleDateString("fr-FR") },
    ];

    details.forEach(({ label, value }) => {
      doc.text(`${label}: ${value}`).moveDown(0.5);
    });

    // Generate QR code as data URL
    const qrCodeDataUrl = await QRCode.toDataURL(body.uid);

    // Add QR code
    doc.moveDown(2).image(qrCodeDataUrl, {
      fit: [200, 200],
      align: "center",
    });

    // Finalize PDF
    doc.end();

    // Wait for PDF to be generated
    const pdfBuffer = await new Promise<Buffer>((resolve) => {
      doc.on("end", () => {
        resolve(Buffer.concat(chunks));
      });
    });

    // Set response headers for PDF download
    setHeaders(event, {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="investment_${body.uid}.pdf"`,
      "Content-Length": pdfBuffer.length.toString(),
    });

    // Return PDF buffer
    return pdfBuffer;
  } catch (error) {
    console.error("PDF generation failed:", error);
    throw createError({
      statusCode: 500,
      message: "Failed to generate PDF",
    });
  }
});
