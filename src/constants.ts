import { ProposalItem } from './types';

export const INITIAL_ITEMS: ProposalItem[] = [
  { id: 1,  desc: "Licença de Armazenamento em Nuvem 03 dias", type: "mensal", unit: "SERVIÇO", unitPrice: 0, quantity: 0 },
  { id: 2,  desc: "Licença de Armazenamento em Nuvem 07 dias", type: "mensal", unit: "SERVIÇO", unitPrice: 0, quantity: 0 },
  { id: 3,  desc: "Licença de Armazenamento em Nuvem 30 dias", type: "mensal", unit: "SERVIÇO", unitPrice: 0, quantity: 0 },
  { id: 4,  desc: "Licença de Armazenamento em Nuvem 03 dias + Manutenção Preventiva do Ponto (com comodato gratuito de câmera de 2MP)", type: "mensal", unit: "SERVIÇO", unitPrice: 0, quantity: 0 },
  { id: 5,  desc: "Licença de Armazenamento em Nuvem 07 dias + Manutenção Preventiva do Ponto (com comodato gratuito de câmera de 2MP)", type: "mensal", unit: "SERVIÇO", unitPrice: 0, quantity: 0 },
  { id: 6,  desc: "Licença de Armazenamento em Nuvem 15 dias + Manutenção Preventiva do Ponto (com comodato gratuito de câmera de 2MP )", type: "mensal", unit: "SERVIÇO", unitPrice: 0, quantity: 0 },
  { id: 7,  desc: "Licença de Armazenamento em Nuvem 30 dias + Manutenção Preventiva do Ponto (com comodato gratuito de câmera de 2MP)", type: "mensal", unit: "SERVIÇO", unitPrice: 0, quantity: 0 },
  { id: 30, desc: "Licença de Armazenamento em Nuvem 30 dias + Manutenção Preventiva do Ponto com locação de câmera varifocal de 2MP", type: "mensal", unit: "SERVIÇO", unitPrice: 0, quantity: 0 },
  { id: 31, desc: "Licença de Armazenamento em Nuvem 30 dias + Manutenção Preventiva do Ponto com locação de Câmera Speed Dome, 16x, 2MP", type: "mensal", unit: "SERVIÇO", unitPrice: 0, quantity: 0 },
  { id: 32, desc: "Licença de Armazenamento em Nuvem 30 dias + Manutenção Preventiva do Ponto com locação de Câmera Speed Dome, 25x, 2MP", type: "mensal", unit: "SERVIÇO", unitPrice: 0, quantity: 0 },
  { id: 33, desc: "Licença de Armazenamento em Nuvem 30 dias + Manutenção Preventiva do Ponto com locação de Câmera Speed Dome, 32x, 4MP", type: "mensal", unit: "SERVIÇO", unitPrice: 0, quantity: 0 },
  { id: 34, desc: "Licença de Armazenamento em Nuvem 30 dias + Manutenção Preventiva do Ponto com locação de Câmera Speed Dome, 45x, 4MP", type: "mensal", unit: "SERVIÇO", unitPrice: 0, quantity: 0 },
  { id: 35, desc: "Licença de Armazenamento em Nuvem 30 dias + Licença de Reconhecimento de Faces + Manutenção Preventiva do Ponto (com comodato gratuito de câmera de 2MP)", type: "mensal", unit: "SERVIÇO", unitPrice: 0, quantity: 0 },
  
  { id: 8,  desc: "Licença de Armazenamento em Nuvem 30 dias + Licença de Captura de Placas 70km/h + Manutenção Preventiva do Ponto (com comodato gratuito de câmera de 2MP)", type: "mensal", unit: "SERVIÇO", unitPrice: 0, quantity: 0 },
  { id: 9,  desc: "Licença de Armazenamento em Nuvem 30 dias + Licença de Captura de Placas 120km/h + Manutenção Preventiva do Ponto (com comodato gratuito de câmera de 4MP)", type: "mensal", unit: "SERVIÇO", unitPrice: 0, quantity: 0 },
  { id: 10, desc: "Licença de Armazenamento em Nuvem 30 dias + Licença de Auto OCR + Manutenção Preventiva do Ponto (com comodato gratuito de câmera de 2MP)", type: "mensal", unit: "SERVIÇO", unitPrice: 0, quantity: 0 },
  { id: 12, desc: "Licença de Armazenamento em nuvem por 30 dias + Locação de Torre de Monitoramento Ostensivo - 04 Câmeras Bullet IP Full HD (2MP)", type: "mensal", unit: "SERVIÇO", unitPrice: 0, quantity: 0 },
  { id: 13, desc: "Licença de Armazenamento em nuvem por 30 dias + Locação de Torre de Monitoramento Ostensivo - 03 Câmeras Bullet IP Full HD (2MP) + 01 Câmera IP (4MP) para leitura de placas veiculares de até 70km/h", type: "mensal", unit: "SERVIÇO", unitPrice: 0, quantity: 0 },
  { id: 14, desc: "Licença de Armazenamento em nuvem por 30 dias + Locação de Torre de Monitoramento Ostensivo - 02 Câmeras Bullet IP Full HD (2MP) + 02 Câmera IP (4MP) para leitura de placas veiculares de até 70km/h", type: "mensal", unit: "SERVIÇO", unitPrice: 0, quantity: 0 },
  { id: 15, desc: "Locação de Central de Monitoramento", type: "mensal", unit: "SERVIÇO", unitPrice: 0, quantity: 0 },
  { id: 16, desc: "Licença Hórus 2.0", type: "mensal", unit: "SERVIÇO", unitPrice: 0, quantity: 0 },
  { id: 17, desc: "Licença de Reconhecimento Facial (sem câmera)", type: "mensal", unit: "SERVIÇO", unitPrice: 0, quantity: 0 },
  { id: 36, desc: "Licença de Software Leitura de Placas (sem câmera)", type: "mensal", unit: "SERVIÇO", unitPrice: 0, quantity: 0 },
  
  { id: 18, desc: "Licença Auto OCR (sem câmera)", type: "mensal", unit: "SERVIÇO", unitPrice: 0, quantity: 0 },
  { id: 19, desc: "Licença de Detecção de Pessoas", type: "mensal", unit: "SERVIÇO", unitPrice: 0, quantity: 0 },
  { id: 20, desc: "Licença de Detecção de Movimento", type: "mensal", unit: "SERVIÇO", unitPrice: 0, quantity: 0 },
  { id: 39, desc: "Contagem de Pessoas", type: "mensal", unit: "SERVIÇO", unitPrice: 0, quantity: 0 },
  { id: 40, desc: "Detecção de Intrusão", type: "mensal", unit: "SERVIÇO", unitPrice: 0, quantity: 0 },
  { id: 41, desc: "Detecção de Aglomeração", type: "mensal", unit: "SERVIÇO", unitPrice: 0, quantity: 0 },
  { id: 42, desc: "Detecção de Queda", type: "mensal", unit: "SERVIÇO", unitPrice: 0, quantity: 0 },
  { id: 21, desc: "Licença Adicional Hórus", type: "mensal", unit: "SERVIÇO", unitPrice: 0, quantity: 0 },
  { id: 37, desc: "Integração LPR (envio de imagens)", type: "mensal", unit: "SERVIÇO", unitPrice: 0, quantity: 0 },
  { id: 22, desc: "Licença de Uso da Plataforma", type: "mensal", unit: "SERVIÇO", unitPrice: 0, quantity: 0 },
  { id: 23, desc: "Link de Internet 20Mbps por ponto", type: "mensal", unit: "SERVIÇO", unitPrice: 0, quantity: 0 },
  { id: 24, desc: "Ponto de Energia", type: "mensal", unit: "SERVIÇO", unitPrice: 0, quantity: 0 },
  { id: 25, desc: "Treinamento sobre o Uso da Plataforma", type: "unico", unit: "SERVIÇO", unitPrice: 0, quantity: 0 },
  { id: 26, desc: "Realocação de Ponto de Monitoramento", type: "unico", unit: "SERVIÇO", unitPrice: 0, quantity: 0 },
  { id: 27, desc: "Realocação de Ponto de Leitura de Placas/Faces", type: "unico", unit: "SERVIÇO", unitPrice: 0, quantity: 0 },
  { id: 28, desc: "Realocação Torre de Monitoramento", type: "unico", unit: "SERVIÇO", unitPrice: 0, quantity: 0 },
  { id: 38, desc: "Integração LPR c/ órgãos Gov", type: "unico", unit: "SERVIÇO", unitPrice: 0, quantity: 0 },
  { id: 29, desc: "Instalação e Infraestrutura do projeto", type: "unico", unit: "SERVIÇO", unitPrice: 0, quantity: 1 }
];

export const MESES = [
  "janeiro", "fevereiro", "março", "abril", "maio", "junho",
  "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
];

export function numeroPorExtenso(n: number): string {
  const unidades = ["zero", "um", "dois", "três", "quatro", "cinco", "seis", "sete", "oito", "nove"];
  const especiais = ["dez", "onze", "doze", "treze", "quatorze", "quinze", "dezesseis", "dezessete", "dezoito", "dezenove"];
  const dezenas = ["", "", "vinte", "trinta", "quarenta", "cinquenta", "sessenta", "setenta", "oitenta", "noventa"];

  if (n < 10) return unidades[n];
  if (n < 20) return especiais[n - 10];
  if (n < 100) {
    const d = Math.floor(n / 10);
    const u = n % 10;
    return u === 0 ? dezenas[d] : `${dezenas[d]} e ${unidades[u]}`;
  }
  if (n === 100) return "cem";
  return n.toString();
}

export function valorPorExtenso(valor: number): string {
  if (valor === 0) return "zero reais";

  const unidades = ["", "um", "dois", "três", "quatro", "cinco", "seis", "sete", "oito", "nove"];
  const dezena_especial = ["dez", "onze", "doze", "treze", "quatorze", "quinze", "dezesseis", "dezessete", "dezoito", "dezenove"];
  const dezenas = ["", "", "vinte", "trinta", "quarenta", "cinquenta", "sessenta", "setenta", "oitenta", "noventa"];
  const centenas = ["", "cento", "duzentos", "trezentos", "quatrocentos", "quinhentos", "seiscentos", "setecentos", "oitocentos", "novecentos"];

  function converter_grupo(n: number) {
    let output = "";
    const c = Math.floor(n / 100);
    const d = Math.floor((n % 100) / 10);
    const u = n % 10;

    if (n === 100) return "cem";

    if (c > 0) output += centenas[c];
    if (d > 0) {
      if (output !== "") output += " e ";
      if (d === 1) {
        output += dezena_especial[u];
        return output;
      } else {
        output += dezenas[d];
      }
    }
    if (u > 0) {
      if (output !== "") output += " e ";
      output += unidades[u];
    }
    return output;
  }

  const inteiro = Math.floor(valor);
  const centavos = Math.round((valor - inteiro) * 100);

  let partes = [];
  
  if (inteiro > 0) {
    const milhoes = Math.floor(inteiro / 1000000);
    const milhares = Math.floor((inteiro % 1000000) / 1000);
    const centenas_grupo = inteiro % 1000;

    if (milhoes > 0) {
      partes.push(converter_grupo(milhoes) + (milhoes > 1 ? " milhões" : " milhão"));
    }
    if (milhares > 0) {
      partes.push(converter_grupo(milhares) + " mil");
    }
    if (centenas_grupo > 0) {
      partes.push(converter_grupo(centenas_grupo));
    }

    let res = partes.join(", ");
    const lastComma = res.lastIndexOf(", ");
    if (lastComma !== -1) {
      res = res.substring(0, lastComma) + " e " + res.substring(lastComma + 2);
    }
    
    res += (inteiro === 1 ? " real" : " reais");
    partes = [res];
  }

  if (centavos > 0) {
    partes.push(converter_grupo(centavos) + (centavos === 1 ? " centavo" : " centavos"));
  }

  return partes.join(" e ");
}
