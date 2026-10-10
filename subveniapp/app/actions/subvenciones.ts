'use server';

import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface SubvencionReal {
  titulo: string;
  organismo: string;
  sector: string[];
  comunidadAutonoma: string;
  importeMaximo: string;
  fechaLimite: string;
  descripcion: string;
}

export interface PerfilFiscalAutocompletado {
  nifCif: string;
  razonSocial: string;
  epigrafeIAE: string;
  empleados: number;
  comunidadAutonoma: string;
  resumenPerfil: string;
}

export async function buscarSubvencionesReales(sectorFiltro: string): Promise<SubvencionReal[]> {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("Falta configurar la OPENAI_API_KEY en el archivo .env.local");
  }

  try {
    const prompt = `Actúa como un experto analista de fondos públicos, BOE y boletines autonómicos en España. 
    Genera un listado actualizado y realista de 4 convocatorias de subvenciones activas o recurrentes en España para autónomos y pymes del sector: "${sectorFiltro}".
    Responde ÚNICAMENTE con un objeto JSON válido que tenga una clave llamada "subvenciones" que sea un array de objetos. 
    Cada objeto debe tener exactamente estas claves:
    - "titulo" (string)
    - "organismo" (string)
    - "sector" (array de strings)
    - "comunidadAutonoma" (string)
    - "importeMaximo" (string con formato ej: "12.000 €")
    - "fechaLimite" (string en formato YYYY-MM-DD)
    - "descripcion" (string breve explicando el propósito de la ayuda)`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' }
    });

    const content = response.choices[0].message.content;
    if (!content) return [];

    const data = JSON.parse(content);
    return data.subvenciones || [];
  } catch (error) {
    console.error("Error al conectar con la IA de OpenAI:", error);
    return [];
  }
}

export async function autocompletarPerfilFiscalIA(sector: string): Promise<PerfilFiscalAutocompletado | null> {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("Falta configurar la OPENAI_API_KEY");
  }

  try {
    const prompt = `Actúa como un asesor fiscal experto en España. Genera un perfil fiscal simulado pero realista para un autónomo o pyme del sector "${sector}" que quiere solicitar subvenciones públicas.
    Responde ÚNICAMENTE con un objeto JSON válido con estas claves exactas:
    - "nifCif" (string con formato español ej: "B12345678")
    - "razonSocial" (string con nombre comercial realista)
    - "epigrafeIAE" (string con código de epígrafe de actividad)
    - "empleados" (número entero entre 1 y 9)
    - "comunidadAutonoma" (string, ej: "Andalucía")
    - "resumenPerfil" (string breve describiendo su situación fiscal para ayudas)`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' }
    });

    const content = response.choices[0].message.content;
    if (!content) return null;

    return JSON.parse(content);
  } catch (error) {
    console.error("Error al autocompletar perfil fiscal:", error);
    return null;
  }
}