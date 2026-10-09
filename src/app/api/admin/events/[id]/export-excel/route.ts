import { NextResponse } from "next/server";
import ExcelJS from "exceljs";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  const params = await context.params;
  const { id } = params;

  try {
    const event = await prisma.event.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
      },
      include: {
        attendees: {
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    const workbook = new ExcelJS.Workbook();
    workbook.creator = "EDC BUET";
    workbook.created = new Date();

    const sheet = workbook.addWorksheet("Attendees");

    // Define columns
    sheet.columns = [
      { header: "Name", key: "name", width: 25 },
      { header: "Email", key: "email", width: 30 },
      { header: "Phone", key: "phone", width: 20 },
      { header: "Institution", key: "institution", width: 20 },
      { header: "Department", key: "dept", width: 15 },
      { header: "Student ID", key: "studentId", width: 16 },
      { header: "Year", key: "year", width: 14 },
      { header: "Payment Method", key: "paymentMethod", width: 16 },
      { header: "Transaction ID", key: "trxId", width: 20 },
      { header: "Registration Date", key: "createdAt", width: 22 },
    ];

    // Style the header row
    const headerRow = sheet.getRow(1);
    headerRow.font = { name: "Arial", size: 12, bold: true, color: { argb: "FFFFFFFF" } };
    headerRow.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FF013565" }, // Deep Navy #013565
    };
    headerRow.alignment = { vertical: "middle", horizontal: "center" };

    // Add rows
    if (event.attendees && event.attendees.length > 0) {
      event.attendees.forEach((att) => {
        sheet.addRow({
          name: att.name,
          email: att.email,
          phone: att.phone,
          institution: att.institution,
          dept: att.dept,
          studentId: att.studentId,
          year: att.year,
          paymentMethod: att.paymentMethod,
          trxId: att.trxId,
          createdAt: new Date(att.createdAt).toLocaleString(),
        });
      });
    }

    // Format all cells
    sheet.eachRow((row, rowNumber) => {
      row.eachCell((cell) => {
        if (rowNumber > 1) {
          cell.alignment = { vertical: "middle", horizontal: "left" };
        }
        cell.border = {
          top: { style: "thin", color: { argb: "FFCCCCCC" } },
          left: { style: "thin", color: { argb: "FFCCCCCC" } },
          bottom: { style: "thin", color: { argb: "FFCCCCCC" } },
          right: { style: "thin", color: { argb: "FFCCCCCC" } },
        };
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Disposition": `attachment; filename="${event.title.replace(/\s+/g, '-').toLowerCase()}-attendees.xlsx"`,
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
    });
  } catch (error) {
    console.error("Excel Export Error:", error);
    return NextResponse.json({ error: "Failed to generate Excel file" }, { status: 500 });
  }
}
