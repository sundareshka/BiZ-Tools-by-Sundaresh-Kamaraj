import { jsPDF } from 'jspdf';
import { ToolDefinition } from '../data/toolsData.ts';

export interface ReportCustomizationOptions {
  companyName: string;
  authorName: string;
  executiveNotes: string;
  includeCaseStudy: boolean;
  includeActionPlan: boolean;
  reportDate?: string;
}

// Preset factor data for SWOT session export
export const SWOT_DEFAULT_SESSION = {
  factors: [
    { quadrant: 'Strengths (S)', text: '20-year deep relationships with 40 regional retail dealers', evidence: 'Average dealer tenure > 12 years; 85% exclusive shelf share', score: 'High Impact (5/5)' },
    { quadrant: 'Strengths (S)', text: 'In-house certified agronomist advisory team', evidence: '2 agronomists serving 1,200 farmer customers with soil tests', score: 'High Impact (4/5)' },
    { quadrant: 'Weaknesses (W)', text: 'Zero direct mobile app or digital ordering interface', evidence: '100% of orders placed via phone calls or paper notebooks', score: 'High Impact (4/5)' },
    { quadrant: 'Weaknesses (W)', text: 'Cash flow tied up in 45-day uncollateralized credit to farmers', evidence: '₹1.8 Cr trapped in delayed seasonal receivables', score: 'High Impact (4/5)' },
    { quadrant: 'Opportunities (O)', text: 'Surging smartphone and WhatsApp adoption among farmers', evidence: '94% of dealers use WhatsApp for daily business inquiries', score: 'High Impact (5/5)' },
    { quadrant: 'Opportunities (O)', text: 'High-margin organic fertilizer and bio-stimulant demand growth', evidence: 'State agriculture dept data shows 18% YoY growth', score: 'High Impact (4/5)' },
    { quadrant: 'Threats (T)', text: 'Venture-funded agri-tech platforms offering doorstep delivery', evidence: 'Two platforms launched with same-day delivery guarantees', score: 'Critical Threat (5/5)' },
    { quadrant: 'Threats (T)', text: 'Erratic monsoon rainfall causing unpredictable sowing cycles', evidence: 'Regional meteorological forecast projects 15% delayed window', score: 'Moderate Threat (3/5)' }
  ],
  towsStrategies: [
    { type: 'SO Strategy (Maxi-Maxi)', title: 'WhatsApp Rapid Ordering with Pre-Approved Dealer Credit', action: 'Leverage 20-year dealer trust (S) and WhatsApp adoption (O) for instant ordering.', owner: 'Sales Head', metric: 'Cycle time < 4h', milestone: '30 dealers onboarded' },
    { type: 'ST Strategy (Maxi-Mini)', title: 'Bundled Agronomist Field Advisory with Bulk Delivery', action: 'Counter online platforms (T) by bundling agronomist visits (S) with bulk deliveries.', owner: 'Lead Agronomist', metric: 'Volume +14%', milestone: 'Pilot 250 farmers' },
    { type: 'WT Strategy (Mini-Mini)', title: 'Cap Native Software R&D Spend to Protect Working Capital', action: 'Avoid high capex app build during liquidity crunch; deploy lightweight tools.', owner: 'CFO / Controller', metric: '₹0 new debt', milestone: '₹12L retained in reserve' }
  ]
};

// Preset macro driver data for PESTLE session export
export const PESTLE_DEFAULT_SESSION = {
  drivers: [
    { category: 'Political & Policy', driver: 'Regional subsidies shifting toward regenerative farming and solar irrigation', timing: '0-12 months', impact: 'High (4/5)', certainty: 'Certain (5/5)', response: 'Align portfolio to subsidy-qualifying eco-certified inputs' },
    { category: 'Economic & Cost', driver: 'Raw material freight and import tariff volatility on phosphate inputs', timing: '0-12 months', impact: 'Critical (5/5)', certainty: 'High (4/5)', response: 'Enter 6-month hedge contracts with domestic bulk suppliers' },
    { category: 'Social & Demographic', driver: 'Next-generation farmers prioritizing high-yield precision crop nutrients', timing: '1-3 years', impact: 'High (4/5)', certainty: 'High (4/5)', response: 'Launch digital soil advisory WhatsApp helpline' },
    { category: 'Technological', driver: 'Rapid expansion of automated agtech logistics and drone spraying services', timing: '0-12 months', impact: 'High (4/5)', certainty: 'Certain (5/5)', response: 'Partner with local drone operators as affiliated service' },
    { category: 'Legal & Regulatory', driver: 'Supreme Court green packaging and barcode chemical traceability mandates', timing: '0-12 months', impact: 'Critical (5/5)', certainty: 'Certain (5/5)', response: 'Mandate QR-code verified batch compliance on 100% cartons' },
    { category: 'Environmental', driver: 'Extended dry spell risks requiring drought-tolerant bio-stimulant formulations', timing: '1-3 years', impact: 'High (4/5)', certainty: 'Moderate (3/5)', response: 'Expand shelf share of drought-resilient organic nutrients' }
  ]
};

export function exportSimulatorPdf(
  tool: ToolDefinition,
  options: ReportCustomizationOptions
): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 16;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  const checkPageBreak = (neededHeight: number) => {
    if (y + neededHeight > pageHeight - 18) {
      doc.addPage();
      y = margin;
      renderPageHeader();
    }
  };

  const renderPageHeader = () => {
    doc.setFillColor(15, 23, 42); // slate-900
    doc.rect(margin, y, contentWidth, 1.2, 'F');
    y += 5;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text(`BizTools Executive Report · ${tool.name}`, margin, y);
    doc.text(`Confidential · ${options.companyName || 'Enterprise'}`, pageWidth - margin, y, { align: 'right' });
    y += 6;
  };

  // --- COVER / HEADER BANNER ---
  doc.setFillColor(15, 23, 42); // slate-900
  doc.roundedRect(margin, y, contentWidth, 34, 3, 3, 'F');

  // Title inside banner
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text('EXECUTIVE STRATEGY BRIEF', margin + 8, y + 12);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(203, 213, 225); // slate-300
  doc.text(`Framework: ${tool.name} (${tool.shortName})`, margin + 8, y + 20);

  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184); // slate-400
  const dateStr = options.reportDate || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  doc.text(`Curriculum: ${tool.category} · Platform: BizTools by Sundaresh Kamaraj · Date: ${dateStr}`, margin + 8, y + 27);

  y += 40;

  // --- METADATA STRIP ---
  doc.setFillColor(248, 250, 252); // slate-50
  doc.setDrawColor(226, 232, 240); // slate-200
  doc.roundedRect(margin, y, contentWidth, 18, 2, 2, 'FD');

  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(51, 65, 85);

  const colWidth = contentWidth / 4;
  doc.text('ORGANIZATION', margin + 6, y + 6);
  doc.text('PREPARED BY', margin + colWidth + 6, y + 6);
  doc.text('DECISION HORIZON', margin + colWidth * 2 + 6, y + 6);
  doc.text('CORE SCOPE', margin + colWidth * 3 + 6, y + 6);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(15, 23, 42);
  doc.text(options.companyName || 'Executive Committee', margin + 6, y + 12);
  doc.text(options.authorName || 'Strategy Lead', margin + colWidth + 6, y + 12);
  doc.text(tool.horizon || '1-3 Years', margin + colWidth * 2 + 6, y + 12);
  doc.text(tool.scope || 'Enterprise-wide', margin + colWidth * 3 + 6, y + 12);

  y += 24;

  // --- EXECUTIVE SUMMARY & CORE PURPOSE ---
  checkPageBreak(30);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42);
  doc.text('1. Strategic Context & Objective', margin, y);
  y += 6;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(51, 65, 85);

  const purposeLines = doc.splitTextToSize(`Core Purpose: ${tool.corePurpose} Tagline: ${tool.tagline}`, contentWidth);
  doc.text(purposeLines, margin, y);
  y += purposeLines.length * 4.5 + 4;

  // Executive Notes (if customized by user)
  if (options.executiveNotes && options.executiveNotes.trim().length > 0) {
    checkPageBreak(25);
    doc.setFillColor(238, 242, 255); // indigo-50
    doc.setDrawColor(199, 210, 254); // indigo-200
    doc.roundedRect(margin, y, contentWidth, 20, 2, 2, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(67, 56, 202); // indigo-700
    doc.text('EXECUTIVE VERDICT & STRATEGIC RECOMMENDATION', margin + 6, y + 6);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(30, 41, 59);
    const noteLines = doc.splitTextToSize(options.executiveNotes, contentWidth - 12);
    doc.text(noteLines, margin + 6, y + 12);
    y += Math.max(20, noteLines.length * 4 + 10) + 4;
  }

  // --- FRAMEWORK-SPECIFIC SESSION DATA ---
  if (tool.id === 'swot') {
    // SWOT & TOWS Specific Report Output
    checkPageBreak(40);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(15, 23, 42);
    doc.text('2. SWOT Four-Quadrant Inventory & Severity Analysis', margin, y);
    y += 6;

    // SWOT Factor table
    SWOT_DEFAULT_SESSION.factors.forEach((f) => {
      checkPageBreak(14);
      doc.setFillColor(248, 250, 252);
      doc.setDrawColor(226, 232, 240);
      doc.roundedRect(margin, y, contentWidth, 12, 1.5, 1.5, 'FD');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(15, 23, 42);
      doc.text(f.quadrant, margin + 4, y + 5);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(51, 65, 85);
      const factorText = doc.splitTextToSize(`${f.text} — Evidence: ${f.evidence}`, contentWidth - 45);
      doc.text(factorText[0], margin + 35, y + 5);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(79, 70, 229); // indigo-600
      doc.text(f.score, pageWidth - margin - 4, y + 5, { align: 'right' });

      y += 14;
    });

    if (options.includeActionPlan) {
      y += 4;
      checkPageBreak(40);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.setTextColor(15, 23, 42);
      doc.text('3. TOWS Cross-Strategic Action Matrix', margin, y);
      y += 6;

      SWOT_DEFAULT_SESSION.towsStrategies.forEach((t) => {
        checkPageBreak(22);
        doc.setFillColor(255, 255, 255);
        doc.setDrawColor(203, 213, 225);
        doc.roundedRect(margin, y, contentWidth, 20, 2, 2, 'D');

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8.5);
        doc.setTextColor(15, 23, 42);
        doc.text(`${t.type}: ${t.title}`, margin + 5, y + 6);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(71, 85, 105);
        const actionLines = doc.splitTextToSize(t.action, contentWidth - 10);
        doc.text(actionLines, margin + 5, y + 11);

        doc.setFontSize(7.5);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(100, 116, 139);
        doc.text(`Owner: ${t.owner}   |   Target KPI: ${t.metric}   |   90-Day Milestone: ${t.milestone}`, margin + 5, y + 17);

        y += 23;
      });
    }
  } else if (tool.id === 'pestle') {
    // PESTLE Specific Report Output
    checkPageBreak(40);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(15, 23, 42);
    doc.text('2. PESTLE Macro-Environmental Assessment', margin, y);
    y += 6;

    PESTLE_DEFAULT_SESSION.drivers.forEach((d) => {
      checkPageBreak(18);
      doc.setFillColor(248, 250, 252);
      doc.setDrawColor(226, 232, 240);
      doc.roundedRect(margin, y, contentWidth, 16, 1.5, 1.5, 'FD');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(15, 23, 42);
      doc.text(d.category, margin + 4, y + 5);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(51, 65, 85);
      const driverText = doc.splitTextToSize(d.driver, contentWidth - 48);
      doc.text(driverText[0], margin + 42, y + 5);

      doc.setFontSize(7.5);
      doc.setTextColor(100, 116, 139);
      doc.text(`Response: ${d.response}`, margin + 42, y + 10);
      doc.text(`Timing: ${d.timing} · ${d.impact}`, margin + 42, y + 14);

      y += 18;
    });
  } else {
    // Universal Framework Mechanics & Core Concepts
    checkPageBreak(40);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(15, 23, 42);
    doc.text('2. Operational Mechanics & Core Concepts', margin, y);
    y += 6;

    if (tool.coreConcepts && tool.coreConcepts.length > 0) {
      tool.coreConcepts.slice(0, 4).forEach((c) => {
        checkPageBreak(16);
        doc.setFillColor(248, 250, 252);
        doc.setDrawColor(226, 232, 240);
        doc.roundedRect(margin, y, contentWidth, 14, 1.5, 1.5, 'FD');

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8.5);
        doc.setTextColor(15, 23, 42);
        doc.text(c.term, margin + 5, y + 5);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(71, 85, 105);
        const defLines = doc.splitTextToSize(c.definition, contentWidth - 10);
        doc.text(defLines[0], margin + 5, y + 10);

        y += 16;
      });
    }

    // Strengths & Limitations
    checkPageBreak(30);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(15, 23, 42);
    doc.text('Key Strengths & Analytical Boundaries', margin, y);
    y += 5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(51, 65, 85);
    if (tool.strengths && tool.strengths.length > 0) {
      doc.text(`Strengths: ${tool.strengths.slice(0, 2).join('; ')}`, margin, y);
      y += 5;
    }
    if (tool.limitations && tool.limitations.length > 0) {
      doc.text(`Boundary: ${tool.limitations.slice(0, 2).join('; ')}`, margin, y);
      y += 6;
    }
  }

  // --- CASE STUDY BENCHMARK TEARDOWN ---
  if (options.includeCaseStudy && tool.caseStudy) {
    checkPageBreak(45);
    y += 4;
    doc.setFillColor(241, 245, 249); // slate-100
    doc.setDrawColor(203, 213, 225);
    doc.roundedRect(margin, y, contentWidth, 40, 2, 2, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(15, 23, 42);
    doc.text(`3. Empirical Benchmark Case Study: ${tool.caseStudy.company}`, margin + 6, y + 7);

    doc.setFontSize(7.5);
    doc.setTextColor(100, 116, 139);
    doc.text(`Revenue: ${tool.caseStudy.revenue}   |   Organization: ${tool.caseStudy.staff} Staff   |   Profile: ${tool.caseStudy.profile}`, margin + 6, y + 13);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(51, 65, 85);

    const challengeLines = doc.splitTextToSize(`Strategic Challenge: ${tool.caseStudy.challenge}`, contentWidth - 12);
    doc.text(challengeLines[0], margin + 6, y + 20);

    if (tool.caseStudy.results && tool.caseStudy.results.length > 0) {
      const resultsText = doc.splitTextToSize(`Quantified Outcome: ${tool.caseStudy.results.slice(0, 2).join(' · ')}`, contentWidth - 12);
      doc.text(resultsText[0], margin + 6, y + 26);
    }

    if (tool.caseStudy.lessonsLearned && tool.caseStudy.lessonsLearned.length > 0) {
      const lessonText = doc.splitTextToSize(`Executive Lesson: ${tool.caseStudy.lessonsLearned[0]}`, contentWidth - 12);
      doc.text(lessonText[0], margin + 6, y + 32);
    }

    y += 44;
  }

  // --- FOOTER & SIGN-OFF ---
  checkPageBreak(25);
  y += 4;
  doc.setDrawColor(226, 232, 240);
  doc.line(margin, y, pageWidth - margin, y);
  y += 6;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(15, 23, 42);
  doc.text('EXECUTIVE AUDIT & SIGN-OFF', margin, y);
  y += 5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text('Strategy Reviewer: _____________________________      Approval Date: ___________________      Status: FINAL ADOPTED', margin, y);
  y += 6;
  doc.text('Generated via BizTools (by Sundaresh Kamaraj · sundaresh.blog) — 57 Core Executive Decision Systems Suite', margin, y);

  // Trigger browser file download
  const sanitizedName = tool.shortName.replace(/[^a-zA-Z0-9]/g, '_');
  doc.save(`BizTools_${sanitizedName}_Executive_Report.pdf`);
}
