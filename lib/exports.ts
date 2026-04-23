"use client";

import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { formatMAD } from "@/lib/cn";

export interface ExportLine {
  label: string;
  subcategory: string;
  direction?: "import" | "export" | "both";
  quantity: number;
  unit: string;
  unitPrice: number;
  subtotal: number;
}

export interface ExportData {
  portName: string;
  portCity: string;
  portRegion: string;
  lines: ExportLine[];
  grandTotal: number;
}

const BRAND_NAVY = "#1A3768";
const BRAND_BLUE = "#007CBB";
const BRAND_GREY = "#4A5568";

function nowStamp() {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}-${pad(d.getHours())}${pad(d.getMinutes())}`;
}

function prettyDate() {
  return new Date().toLocaleString("fr-FR", {
    dateStyle: "long",
    timeStyle: "short",
  });
}

export function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/* =========================================================
   1. CSV (Excel-compatible, BOM UTF-8, séparateur ;)
   ========================================================= */
export function exportCSV(data: ExportData) {
  const header = [
    "Port",
    "Prestation",
    "Sous-catégorie",
    "Sens",
    "Quantité",
    "Unité",
    "Prix unitaire (MAD HT)",
    "Sous-total (MAD HT)",
  ];
  const body = data.lines.map((l) => [
    data.portName,
    l.label,
    l.subcategory,
    l.direction ?? "—",
    String(l.quantity),
    l.unit,
    l.unitPrice.toFixed(2).replace(".", ","),
    l.subtotal.toFixed(2).replace(".", ","),
  ]);
  const rows = [
    [`# Marsa Maroc — Simulateur Tarifs 2025`],
    [`# ${prettyDate()}`],
    [`# Port : ${data.portName} · ${data.portCity} · ${data.portRegion}`],
    [],
    header,
    ...body,
    ["", "", "", "", "", "", "TOTAL HT", data.grandTotal.toFixed(2).replace(".", ",")],
  ];
  const csv =
    "\uFEFF" +
    rows
      .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(";"))
      .join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  triggerDownload(blob, `marsa-simulateur-${nowStamp()}.csv`);
}

/* =========================================================
   2. Excel (XLSX) bien formaté
   ========================================================= */
export function exportXLSX(data: ExportData) {
  const wb = XLSX.utils.book_new();

  // Header metadata rows
  const metadata: (string | number)[][] = [
    ["MARSA MAROC — SIMULATEUR TARIFS 2025"],
    [`Port : ${data.portName}`],
    [`Ville : ${data.portCity}`],
    [`Région : ${data.portRegion}`],
    [`Généré le : ${prettyDate()}`],
    [],
    ["Prestation", "Sous-catégorie", "Sens", "Quantité", "Unité", "Prix unitaire (MAD HT)", "Sous-total (MAD HT)"],
  ];

  const body: (string | number)[][] = data.lines.map((l) => [
    l.label,
    l.subcategory,
    l.direction ?? "—",
    l.quantity,
    l.unit,
    Number(l.unitPrice.toFixed(2)),
    Number(l.subtotal.toFixed(2)),
  ]);

  const total: (string | number)[][] = [
    [],
    ["", "", "", "", "", "TOTAL HT (MAD)", Number(data.grandTotal.toFixed(2))],
    [],
    [
      "Estimation indicative hors taxes, basée sur la grille publique Marsa Maroc 2025.",
    ],
    ["Devis contractuel à demander au service commercial : commercial@marsamaroc.co.ma"],
  ];

  const sheet = XLSX.utils.aoa_to_sheet([...metadata, ...body, ...total]);

  // Column widths
  sheet["!cols"] = [
    { wch: 42 }, // Prestation
    { wch: 22 }, // Sous-catégorie
    { wch: 10 }, // Sens
    { wch: 10 }, // Quantité
    { wch: 10 }, // Unité
    { wch: 20 }, // Prix unitaire
    { wch: 20 }, // Sous-total
  ];

  // Merge header title across A1:G1
  sheet["!merges"] = [
    { s: { r: 0, c: 0 }, e: { r: 0, c: 6 } },
    { s: { r: 1, c: 0 }, e: { r: 1, c: 6 } },
    { s: { r: 2, c: 0 }, e: { r: 2, c: 6 } },
    { s: { r: 3, c: 0 }, e: { r: 3, c: 6 } },
    { s: { r: 4, c: 0 }, e: { r: 4, c: 6 } },
  ];

  // Cell styling (xlsx community supports limited styling but ok for basic formatting)
  const styleHeader = {
    font: { bold: true, color: { rgb: "FFFFFF" }, sz: 14 },
    fill: { fgColor: { rgb: "1A3768" } },
    alignment: { horizontal: "center", vertical: "center" },
  };
  const styleMeta = { font: { color: { rgb: "1A3768" }, sz: 11 }, alignment: { horizontal: "left" } };
  const styleTableHeader = {
    font: { bold: true, color: { rgb: "FFFFFF" }, sz: 11 },
    fill: { fgColor: { rgb: "007CBB" } },
    alignment: { horizontal: "center", vertical: "center" },
  };
  const styleTotal = {
    font: { bold: true, color: { rgb: "1A3768" }, sz: 13 },
    fill: { fgColor: { rgb: "E9F3FA" } },
  };

  // Apply to specific cells
  if (sheet["A1"]) sheet["A1"].s = styleHeader;
  for (let r = 1; r < 5; r++) {
    const ref = XLSX.utils.encode_cell({ r, c: 0 });
    if (sheet[ref]) sheet[ref].s = styleMeta;
  }
  ["A7", "B7", "C7", "D7", "E7", "F7", "G7"].forEach((ref) => {
    if (sheet[ref]) sheet[ref].s = styleTableHeader;
  });

  const totalRowIdx = metadata.length + body.length + 1; // 0-based
  ["F", "G"].forEach((col) => {
    const ref = `${col}${totalRowIdx + 1}`;
    if (sheet[ref]) sheet[ref].s = styleTotal;
  });

  // Number format for currency columns
  for (let i = 0; i < body.length; i++) {
    const rowNum = metadata.length + i + 1;
    const fRef = `F${rowNum}`;
    const gRef = `G${rowNum}`;
    if (sheet[fRef]) sheet[fRef].z = '#,##0.00 " MAD"';
    if (sheet[gRef]) sheet[gRef].z = '#,##0.00 " MAD"';
  }

  sheet["!rows"] = [
    { hpt: 28 },
    { hpt: 18 },
    { hpt: 18 },
    { hpt: 18 },
    { hpt: 18 },
    { hpt: 10 },
    { hpt: 22 },
  ];

  XLSX.utils.book_append_sheet(wb, sheet, "Simulation");

  const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array", cellStyles: true });
  const blob = new Blob([wbout], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  triggerDownload(blob, `marsa-simulateur-${nowStamp()}.xlsx`);
}

/* =========================================================
   3. PDF brandé Marsa Maroc
   ========================================================= */
export async function exportPDF(data: ExportData) {
  const doc = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 18;

  // Header band
  doc.setFillColor(BRAND_NAVY);
  doc.rect(0, 0, pageWidth, 28, "F");

  // Try to load logo from public and embed
  try {
    const logoResp = await fetch("/marsa-logo.png");
    if (logoResp.ok) {
      const blob = await logoResp.blob();
      const dataUrl = await new Promise<string>((resolve, reject) => {
        const fr = new FileReader();
        fr.onload = () => resolve(fr.result as string);
        fr.onerror = reject;
        fr.readAsDataURL(blob);
      });
      // Render logo in white rounded panel on dark header for visibility
      doc.setFillColor(255, 255, 255);
      doc.roundedRect(margin - 3, 6, 44, 16, 2, 2, "F");
      doc.addImage(dataUrl, "PNG", margin, 8, 38, 12);
    }
  } catch {
    // silently ignore if logo fetch fails
  }

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("Simulateur Tarifs 2025", pageWidth - margin, 15, { align: "right" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text("Grille publique — MAD Hors Taxes", pageWidth - margin, 21, { align: "right" });

  // Meta block
  let y = 40;
  doc.setTextColor(BRAND_NAVY);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text(data.portName, margin, y);
  y += 6;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(BRAND_GREY);
  doc.text(`${data.portCity} · ${data.portRegion}`, margin, y);
  y += 5;
  doc.text(`Généré le ${prettyDate()}`, margin, y);

  // Table
  y += 8;
  autoTable(doc, {
    startY: y,
    head: [["#", "Prestation", "Sous-cat.", "Sens", "Qté", "Unité", "PU (MAD)", "Sous-total (MAD)"]],
    body: data.lines.map((l, i) => [
      String(i + 1),
      l.label,
      l.subcategory,
      l.direction ?? "—",
      String(l.quantity),
      l.unit,
      formatMAD(l.unitPrice),
      formatMAD(l.subtotal),
    ]),
    theme: "grid",
    headStyles: {
      fillColor: BRAND_NAVY,
      textColor: 255,
      fontStyle: "bold",
      fontSize: 9,
      halign: "center",
    },
    bodyStyles: {
      fontSize: 9,
      textColor: 50,
    },
    alternateRowStyles: {
      fillColor: [245, 248, 252],
    },
    columnStyles: {
      0: { cellWidth: 8, halign: "center" },
      1: { cellWidth: "auto" },
      2: { cellWidth: 28 },
      3: { cellWidth: 16, halign: "center" },
      4: { cellWidth: 12, halign: "right" },
      5: { cellWidth: 14, halign: "center" },
      6: { cellWidth: 22, halign: "right" },
      7: { cellWidth: 28, halign: "right", fontStyle: "bold" },
    },
    margin: { left: margin, right: margin },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const finalY: number = (doc as any).lastAutoTable?.finalY ?? y + 40;

  // Grand total box
  const boxY = finalY + 6;
  doc.setFillColor(BRAND_NAVY);
  doc.roundedRect(margin, boxY, pageWidth - margin * 2, 20, 2, 2, "F");
  doc.setTextColor(255);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text("Total estimé HT", margin + 6, boxY + 8);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(255, 220, 120);
  doc.text(`${formatMAD(data.grandTotal)} MAD`, pageWidth - margin - 6, boxY + 12, { align: "right" });

  // Footer
  const footerY = doc.internal.pageSize.getHeight() - 18;
  doc.setDrawColor(220);
  doc.line(margin, footerY - 4, pageWidth - margin, footerY - 4);
  doc.setTextColor(BRAND_GREY);
  doc.setFont("helvetica", "italic");
  doc.setFontSize(8);
  doc.text(
    "Estimation indicative basée sur la grille publique Marsa Maroc 2025. Un devis contractuel est émis par le service commercial.",
    margin,
    footerY,
    { maxWidth: pageWidth - margin * 2 }
  );
  doc.setFont("helvetica", "normal");
  doc.text("commercial@marsamaroc.co.ma · +212 5 22 23 85 85", margin, footerY + 6);
  doc.setTextColor(BRAND_BLUE);
  doc.text("marsamaroc.co.ma", pageWidth - margin, footerY + 6, { align: "right" });

  doc.save(`marsa-simulateur-${nowStamp()}.pdf`);
}
