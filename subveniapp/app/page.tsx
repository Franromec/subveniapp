'use client';

import { useState, useTransition } from 'react';
import { 
  buscarSubvencionesReales, 
  autocompletarPerfilFiscalIA, 
  SubvencionReal, 
  PerfilFiscalAutocompletado 
} from '@/app/actions/subvenciones';

const sectoresSugeridos = [
  "Construcción y Reformas",
  "Carpintería y Mueble",
  "Instalaciones Eléctricas",
  "Comercio Local",
  "Tecnología y Digitalización"
];

export default function Home() {
  const [sector, setSector] = useState("Construcción y Reformas");
  const [subvenciones, setSubvenciones] = useState<SubvencionReal[]>([]);
  const [perfilFiscal, setPerfilFiscal] = useState<PerfilFiscalAutocompletado | null>(null);
  const [isPending, startTransition] = useTransition();
  const [isAutocompleting, setIsAutocompleting] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleBuscar = (sectorSeleccionado: string) => {
    setSector(sectorSeleccionado);
    startTransition(async () => {
      const resultados = await buscarSubvencionesReales(sectorSeleccionado);
      setSubvenciones(resultados);
      setHasSearched(true);
    });
  };

  const handleAutocompletarPerfil = () => {
    setIsAutocompleting(true);
    startTransition(async () => {
      const perfil = await autocompletarPerfilFiscalIA(sector);
      setPerfilFiscal(perfil);
      setIsAutocompleting(false);
    });
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        {/* Cabecera */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10 border-b border-slate-800 pb-6">
          <div>
            <span className="text-xs uppercase tracking-widest bg-emerald-500/10 text-emerald-400 font-semibold px-3 py-1 rounded-full border border-emerald-500/20">
              Vektor Labs Ecosystem
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-2 text-white">
              SubvenI<span className="text-emerald-400">App</span>
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Buscador inteligente de subvenciones y ayudas públicas con IA para España.
            </p>
          </div>
          <div className="bg-slate-900 border border-slate-800 px-4 py-3 rounded-2xl text-right">
            <p className="text-xs text-slate-400">Dominio activo</p>
            <p className="text-emerald-400 font-bold text-sm">subveniapp.es 🌐</p>
          </div>
        </div>

        {/* Panel de Filtros por Sector */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 mb-8 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
              Selecciona tu sector profesional:
            </h2>
            <button
              onClick={handleAutocompletarPerfil}
              disabled={isAutocompleting}
              className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 text-xs font-bold rounded-xl transition-all flex items-center gap-2"
            >
              {isAutocompleting ? (
                <>
                  <span className="w-3 h-3 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin"></span>
                  Analizando perfil fiscal...
                </>
              ) : (
                <>✨ Autocompletar perfil con IA</>
              )}
            </button>
          </div>

          <div className="flex flex-wrap gap-3">
            {sectoresSugeridos.map((s) => (
              <button
                key={s}
                onClick={() => handleBuscar(s)}
                disabled={isPending}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  sector === s
                    ? 'bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/20'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Tarjeta de Perfil Fiscal Autocompletado si existe */}
        {perfilFiscal && (
          <div className="bg-emerald-950/20 border border-emerald-500/40 rounded-2xl p-6 mb-8">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold">
                📋 Perfil Fiscal Verificado por IA ({sector})
              </span>
              <span className="text-xs text-slate-400 font-mono">Listo para firmar digitalmente</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400 block">Razón Social / Autónomo</span>
                <span className="font-bold text-white">{perfilFiscal.razonSocial}</span>
              </div>
              <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400 block">NIF / CIF</span>
                <span className="font-bold text-emerald-400 font-mono">{perfilFiscal.nifCif}</span>
              </div>
              <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400 block">Epígrafe IAE & Empleados</span>
                <span className="font-bold text-white">{perfilFiscal.epigrafeIAE} ({perfilFiscal.empleados} emp.)</span>
              </div>
            </div>
            <p className="text-xs text-slate-300 mt-3 bg-slate-900/50 p-3 rounded-xl border border-slate-800">
              💡 <span className="font-semibold">Resumen IA:</span> {perfilFiscal.resumenPerfil}
            </p>
          </div>
        )}

        {/* Botón de Disparo o Estado de Carga */}
        <div className="text-center mb-10">
          <button
            onClick={() => handleBuscar(sector)}
            disabled={isPending}
            className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-extrabold rounded-2xl shadow-xl hover:opacity-95 transition-all text-base flex items-center justify-center gap-3 mx-auto"
          >
            {isPending ? (
              <>
                <span className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
                La IA está barriendo el BOE y boletines autonómicos...
              </>
            ) : (
              <>
                ⚡ Consultar Subvenciones Activas para {sector}
              </>
            )}
          </button>
        </div>

        {/* Listado de Resultados */}
        {hasSearched && (
          <div>
            <h2 className="text-xl font-bold mb-6 text-slate-200 flex items-center justify-between">
              <span>Resultados analizados por IA</span>
              <span className="text-xs bg-slate-900 text-emerald-400 border border-slate-800 px-3 py-1 rounded-full font-normal">
                {subvenciones.length} ayudas encontradas
              </span>
            </h2>

            {subvenciones.length === 0 ? (
              <div className="text-center py-12 bg-slate-900/40 border border-slate-800 rounded-2xl text-slate-400">
                No se han encontrado convocatorias abiertas en este momento para este sector.
              </div>
            ) : (
              <div className="grid gap-6">
                {subvenciones.map((sub, index) => (
                  <div 
                    key={index} 
                    className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 hover:border-emerald-500/50 transition-all shadow-lg"
                  >
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                      <div>
                        <span className="text-xs text-emerald-400 font-semibold uppercase">{sub.organismo}</span>
                        <h3 className="text-lg font-bold text-white mt-1">{sub.titulo}</h3>
                      </div>
                      <div className="bg-emerald-950/60 border border-emerald-800/50 px-4 py-2 rounded-xl text-right shrink-0">
                        <span className="text-xs text-emerald-300 block">Importe Máximo</span>
                        <span className="text-emerald-400 font-black text-lg">{sub.importeMaximo}</span>
                      </div>
                    </div>

                    <p className="text-slate-300 text-sm mb-4">{sub.descripcion}</p>

                    <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800 text-xs text-slate-400">
                      <div className="flex items-center gap-2">
                        <span>📍 {sub.comunidadAutonoma}</span>
                        <span>•</span>
                        <span>🏷️ {Array.isArray(sub.sector) ? sub.sector.join(', ') : sector}</span>
                      </div>
                      <div className="text-amber-400 font-medium">
                        ⏳ Límite solicitud: {sub.fechaLimite}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}