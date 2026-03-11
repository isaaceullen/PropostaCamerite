import { PDFDocument, rgb, StandardFonts, PDFFont } from 'pdf-lib';
import { ProposalItem, ColorSettings, ProposalSettings } from '../types';
import { valorPorExtenso, MESES } from '../constants';

const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? rgb(
    parseInt(result[1], 16) / 255,
    parseInt(result[2], 16) / 255,
    parseInt(result[3], 16) / 255
  ) : rgb(0, 0, 0);
};

const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('pt-BR', { 
    style: 'currency', 
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2 
  }).format(val);
};

export const generateProposalPDF = async (
  basePdfBuffer: ArrayBuffer,
  items: ProposalItem[],
  colors: ColorSettings,
  settings: ProposalSettings
): Promise<Uint8Array> => {
  const basePdf = await PDFDocument.load(basePdfBuffer);
  const pdfDoc = await PDFDocument.create();
  
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const selectedItems = items.filter(i => i.quantity > 0);

  const REALOCACAO_IDS = [26, 27, 28];
  const TREINAMENTO_ID = 25;

  const totalMensal = selectedItems
    .filter(i => i.type === 'mensal')
    .reduce((acc, curr) => acc + (curr.quantity * curr.unitPrice), 0);
  
  const totalTreinamento = selectedItems
    .filter(i => i.id === TREINAMENTO_ID)
    .reduce((acc, curr) => acc + (curr.quantity * curr.unitPrice), 0);

  const totalRealocacoes = selectedItems
    .filter(i => REALOCACAO_IDS.includes(i.id))
    .reduce((acc, curr) => acc + (curr.quantity * curr.unitPrice), 0);

  const totalImplantacao = selectedItems
    .filter(i => i.type === 'unico' && !REALOCACAO_IDS.includes(i.id) && i.id !== TREINAMENTO_ID)
    .reduce((acc, curr) => acc + (curr.quantity * curr.unitPrice), 0);

  const totalAnualGeral = (totalMensal * 12) + totalImplantacao + totalRealocacoes + totalTreinamento;

  const templatePageIndex = basePdf.getPageCount() - 1;
  const [firstCopiedPage] = await pdfDoc.copyPages(basePdf, [templatePageIndex]);
  pdfDoc.addPage(firstCopiedPage);

  let currentPage = pdfDoc.getPages()[0];
  const { width, height } = currentPage.getSize();

  const marginX = 50;
  const marginTop = height - 150; // Margem superior padrão
  const marginBottom = 100; // Margem inferior segura
  let currentY = marginTop;

  const drawText = (text: string, font: PDFFont, size: number, color: any, x: number, y: number, align: 'left' | 'center' | 'right' = 'left') => {
    let textWidth = font.widthOfTextAtSize(text, size);
    let drawX = x;
    if (align === 'center') {
      drawX = x - textWidth / 2;
    } else if (align === 'right') {
      drawX = x - textWidth;
    }
    currentPage.drawText(text, { x: drawX, y, font, size, color });
  };

  // 2. ESTRUTURA E LARGURA DAS COLUNAS DA TABELA
  const tableWidth = width - 2 * marginX;
  const colWidths = [
    tableWidth * 0.50, // Item
    tableWidth * 0.10, // Qtd
    tableWidth * 0.13, // Unitário
    tableWidth * 0.13, // Mensal
    tableWidth * 0.14  // Anual
  ];
  
  const colX = [
    marginX,
    marginX + colWidths[0],
    marginX + colWidths[0] + colWidths[1],
    marginX + colWidths[0] + colWidths[1] + colWidths[2],
    marginX + colWidths[0] + colWidths[1] + colWidths[2] + colWidths[3]
  ];

  const headerHeight = 20;
  const primaryColor = hexToRgb('#7B48EA');

  const drawTableHeader = () => {
    currentPage.drawRectangle({
      x: marginX,
      y: currentY - headerHeight + 5,
      width: tableWidth,
      height: headerHeight,
      color: primaryColor,
    });

    const headerY = currentY - 10;
    drawText("Item", helveticaBold, 10, rgb(1,1,1), colX[0] + 5, headerY);
    drawText("Qtd.", helveticaBold, 10, rgb(1,1,1), colX[1] + colWidths[1]/2, headerY, 'center');
    drawText("Unitário", helveticaBold, 10, rgb(1,1,1), colX[2] + colWidths[2] - 5, headerY, 'right');
    drawText("Mensal", helveticaBold, 10, rgb(1,1,1), colX[3] + colWidths[3] - 5, headerY, 'right');
    drawText("Anual", helveticaBold, 10, rgb(1,1,1), colX[4] + colWidths[4] - 5, headerY, 'right');

    currentY -= headerHeight;
  };

  const checkPageBreak = async (requiredSpace: number, isTable: boolean = false) => {
    if (currentY - requiredSpace < marginBottom) {
      const [copiedPage] = await pdfDoc.copyPages(basePdf, [templatePageIndex]);
      pdfDoc.addPage(copiedPage);
      currentPage = pdfDoc.getPages()[pdfDoc.getPages().length - 1];
      currentY = marginTop;
      
      if (isTable) {
        drawTableHeader();
      }
    }
  };

  // 1. CABEÇALHO DO DESTINATÁRIO
  const textColor = rgb(0, 0, 0);
  drawText(`À ${settings.recipientName || ''}`, helveticaFont, 11, textColor, marginX, currentY);
  currentY -= 15;
  drawText(`CNPJ/MF: ${settings.cnpj || ''}`, helveticaFont, 11, textColor, marginX, currentY);
  currentY -= 15;
  drawText(`Endereço: ${settings.address || ''}`, helveticaFont, 11, textColor, marginX, currentY);
  currentY -= 30; // Spacing before table

  // 3. CABEÇALHO DA TABELA (Página 1)
  await checkPageBreak(headerHeight, false);
  drawTableHeader();

  // 4. LINHAS DA TABELA (ITENS)
  for (let i = 0; i < selectedItems.length; i++) {
    const item = selectedItems[i];
    
    const descText = item.desc;
    const maxDescWidth = colWidths[0] - 10;
    const words = descText.split(' ');
    let lines = [];
    let currentLine = words[0];
    
    for (let j = 1; j < words.length; j++) {
      const word = words[j];
      const w = helveticaFont.widthOfTextAtSize(currentLine + " " + word, 9);
      if (w < maxDescWidth) {
        currentLine += " " + word;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }
    lines.push(currentLine);

    const itemHeight = Math.max(20, lines.length * 12 + 8);
    
    await checkPageBreak(itemHeight, true);

    // Bottom border
    currentPage.drawLine({
      start: { x: marginX, y: currentY - itemHeight + 5 },
      end: { x: marginX + tableWidth, y: currentY - itemHeight + 5 },
      thickness: 1,
      color: hexToRgb('#E5E7EB'),
    });

    let lineY = currentY - 10;
    for (const line of lines) {
      drawText(line, helveticaFont, 9, rgb(0,0,0), colX[0] + 5, lineY);
      lineY -= 12;
    }

    const isMonthly = item.type === 'mensal';
    const valorAnualItem = isMonthly ? (item.quantity * item.unitPrice * 12) : (item.quantity * item.unitPrice);
    const valorMensalItem = isMonthly ? (item.quantity * item.unitPrice) : 0;

    const textY = currentY - 10;
    drawText(item.quantity.toString(), helveticaFont, 9, rgb(0,0,0), colX[1] + colWidths[1]/2, textY, 'center');
    drawText(formatCurrency(item.unitPrice), helveticaFont, 9, rgb(0,0,0), colX[2] + colWidths[2] - 5, textY, 'right');
    drawText(isMonthly ? formatCurrency(valorMensalItem) : "-", helveticaFont, 9, rgb(0,0,0), colX[3] + colWidths[3] - 5, textY, 'right');
    drawText(formatCurrency(valorAnualItem), helveticaFont, 9, rgb(0,0,0), colX[4] + colWidths[4] - 5, textY, 'right');

    currentY -= itemHeight;
  }

  // 5. RODAPÉ DA TABELA (TOTAIS)
  const footerHeight = 20;
  await checkPageBreak(footerHeight * 2);
  
  const purpleWidth = tableWidth * 0.75;
  const grayWidth = tableWidth * 0.25;
  
  // Linha 1: TOTAL MENSAL
  currentPage.drawRectangle({
    x: marginX,
    y: currentY - footerHeight + 5,
    width: purpleWidth,
    height: footerHeight,
    color: primaryColor,
  });
  currentPage.drawRectangle({
    x: marginX + purpleWidth,
    y: currentY - footerHeight + 5,
    width: grayWidth,
    height: footerHeight,
    color: hexToRgb('#E5E7EB'),
  });
  
  drawText("TOTAL MENSAL", helveticaBold, 10, rgb(1,1,1), marginX + purpleWidth - 10, currentY - 10, 'right');
  drawText(formatCurrency(totalMensal), helveticaBold, 10, rgb(0,0,0), marginX + tableWidth - 10, currentY - 10, 'right');
  
  currentY -= footerHeight;

  // Linha 2: TOTAL PARA 12 MESES
  currentPage.drawRectangle({
    x: marginX,
    y: currentY - footerHeight + 5,
    width: purpleWidth,
    height: footerHeight,
    color: primaryColor,
  });
  currentPage.drawRectangle({
    x: marginX + purpleWidth,
    y: currentY - footerHeight + 5,
    width: grayWidth,
    height: footerHeight,
    color: hexToRgb('#E5E7EB'),
  });
  
  drawText("TOTAL PARA 12 (DOZE) MESES DE CONTRATO", helveticaBold, 10, rgb(1,1,1), marginX + purpleWidth - 10, currentY - 10, 'right');
  drawText(formatCurrency(totalAnualGeral), helveticaBold, 10, rgb(0,0,0), marginX + tableWidth - 10, currentY - 10, 'right');

  currentY -= (footerHeight + 20);

  // 7. TEXTOS FINAIS DE FECHAMENTO
  await checkPageBreak(60);
  drawText("DO INVESTIMENTO", helveticaBold, 12, primaryColor, marginX, currentY);
  currentY -= 15;
  
  const investimentoText = `O valor mensal para a prestação dos serviços é de ${formatCurrency(totalMensal)} (${valorPorExtenso(totalMensal)}). O custo de implantação é de ${formatCurrency(totalImplantacao)} (${valorPorExtenso(totalImplantacao)}). O valor total para 12 meses é de ${formatCurrency(totalAnualGeral)} (${valorPorExtenso(totalAnualGeral)}).`;
  
  const invWords = investimentoText.split(' ');
  let invLines = [];
  let invLine = invWords[0];
  for (let j = 1; j < invWords.length; j++) {
    const word = invWords[j];
    const w = helveticaFont.widthOfTextAtSize(invLine + " " + word, 10);
    if (w < width - 2 * marginX) {
      invLine += " " + word;
    } else {
      invLines.push(invLine);
      invLine = word;
    }
  }
  invLines.push(invLine);

  for (const line of invLines) {
    await checkPageBreak(15);
    drawText(line, helveticaFont, 10, rgb(0,0,0), marginX, currentY);
    currentY -= 15;
  }
  currentY -= 15;

  await checkPageBreak(40);
  drawText("DA VALIDADE DA PROPOSTA", helveticaBold, 12, primaryColor, marginX, currentY);
  currentY -= 15;
  drawText(`Esta proposta é válida por ${settings.validityDays} dias a contar da data de sua emissão.`, helveticaFont, 10, rgb(0,0,0), marginX, currentY);
  currentY -= 40;

  await checkPageBreak(30);
  const [yearStr, monthStr, dayStr] = settings.proposalDate.split('-');
  const day = parseInt(dayStr, 10);
  const month = MESES[parseInt(monthStr, 10) - 1];
  const year = parseInt(yearStr, 10);
  const dateString = `${settings.city}, ${day} de ${month} de ${year}`;
  
  drawText(dateString, helveticaFont, 10, rgb(0,0,0), width - marginX, currentY, 'right');
  currentY -= 40;

  await checkPageBreak(40);
  drawText("Camerite Sistemas S/A", helveticaBold, 12, primaryColor, width / 2, currentY, 'center');
  currentY -= 15;
  drawText("CNPJ: 14.656.882/0001-04", helveticaFont, 10, rgb(0,0,0), width / 2, currentY, 'center');

  return await pdfDoc.save();
};

