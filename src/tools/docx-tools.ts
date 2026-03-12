import { tool } from "langchain";
import { z } from "zod";
import * as fs from "fs";
import * as path from "path";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  Table,
  TableRow,
  TableCell,
  BorderStyle,
  WidthType,
  AlignmentType,
  ShadingType,
} from "docx";

// ============================================================
// Tool: Generate a filled DOCX document
// ============================================================
export const generateDocx = tool(
  async ({
    filename,
    title,
    sections,
    outputDir,
  }: {
    filename: string;
    title: string;
    sections: Array<{
      heading: string;
      content: string;
      level?: number;
    }>;
    outputDir: string;
  }) => {
    try {
      const dir = path.resolve(outputDir);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      const border = {
        style: BorderStyle.SINGLE,
        size: 1,
        color: "CCCCCC",
      };
      const borders = {
        top: border,
        bottom: border,
        left: border,
        right: border,
      };

      const children: (Paragraph | Table)[] = [];

      // Title
      children.push(
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          children: [
            new TextRun({ text: title, bold: true, size: 36, font: "Calibri" }),
          ],
          spacing: { after: 400 },
        })
      );

      // Sections
      for (const section of sections) {
        const headingLevel =
          section.level === 3
            ? HeadingLevel.HEADING_3
            : section.level === 2
            ? HeadingLevel.HEADING_2
            : HeadingLevel.HEADING_1;

        children.push(
          new Paragraph({
            heading: headingLevel,
            children: [
              new TextRun({
                text: section.heading,
                bold: true,
                size: section.level === 3 ? 24 : section.level === 2 ? 28 : 32,
                font: "Calibri",
              }),
            ],
            spacing: { before: 240, after: 120 },
          })
        );

        // Parse content - split by newlines
        const lines = section.content.split("\n");
        for (const line of lines) {
          if (line.trim() === "") continue;
          children.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: line,
                  size: 24,
                  font: "Calibri",
                }),
              ],
              spacing: { after: 80 },
            })
          );
        }
      }

      const doc = new Document({
        styles: {
          default: {
            document: {
              run: { font: "Calibri", size: 24 },
            },
          },
        },
        sections: [
          {
            properties: {
              page: {
                size: { width: 11906, height: 16838 },
                margin: {
                  top: 1440,
                  right: 1440,
                  bottom: 1440,
                  left: 1440,
                },
              },
            },
            children,
          },
        ],
      });

      const buffer = await Packer.toBuffer(doc);
      const outputPath = path.join(dir, filename);
      fs.writeFileSync(outputPath, buffer);

      return `Document saved successfully: ${outputPath}`;
    } catch (error) {
      return `Error generating document: ${error}`;
    }
  },
  {
    name: "generate_docx",
    description:
      "Generate a filled DOCX document with title and sections. Use for creating product lifecycle documents.",
    schema: z.object({
      filename: z.string().describe("Output filename (e.g., 01-Founding-Hypothesis.docx)"),
      title: z.string().describe("Document title"),
      sections: z.array(
        z.object({
          heading: z.string().describe("Section heading"),
          content: z.string().describe("Section content (use \\n for line breaks)"),
          level: z.number().optional().describe("Heading level: 1, 2, or 3"),
        })
      ),
      outputDir: z.string().describe("Output directory path"),
    }),
  }
);

// ============================================================
// Tool: Read a template DOCX for reference
// ============================================================
export const readDocxTemplate = tool(
  async ({ filepath }: { filepath: string }) => {
    try {
      if (!fs.existsSync(filepath)) {
        return `File not found: ${filepath}`;
      }
      // Return file info since we can't easily parse DOCX to text here
      const stats = fs.statSync(filepath);
      return `Template exists: ${filepath} (${stats.size} bytes). Use the template structure as reference for generating the filled document.`;
    } catch (error) {
      return `Error reading template: ${error}`;
    }
  },
  {
    name: "read_docx_template",
    description: "Check if a DOCX template exists and get its info",
    schema: z.object({
      filepath: z.string().describe("Path to the DOCX template file"),
    }),
  }
);

export const docxTools = [generateDocx, readDocxTemplate];
