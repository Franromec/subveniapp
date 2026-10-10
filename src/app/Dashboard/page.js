'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { autocompletarPerfilFiscalIA } from '@/app/actions/subvenciones';

export default function DashboardPage() {
  const router = useRouter();
  const [empresa, setEmpresa] = useState('Mi Empresa');
  const [telefono, setTelefono] = useState('');
  const [sector, setSector] = useState('construccion');

  // Estados de IA para cuando pulsen en los expedientes
  const [cargandoIA, setCargandoIA] = useState(false);
  const [resultadoExpediente, setResultadoExpediente] = useState(null);

  useEffect(() => {
    // Recuperamos los datos introducidos en el registro de la landing
    const emp = sessionStorage.getItem('subvenia_empresa');
    const tel = sessionStorage.getItem('subvenia_telefono');
    const sec = sessionStorage.getItem('subvenia_sector');

    if (emp) setEmpresa(emp);
    if (tel) setTelefono(tel);
    if (sec) setSector(sec);
  }, []);

  const handleAutocompletarExpediente = async (nombreAyuda) => {
    setCargandoIA(true);
    setResultadoExpediente(null);
    try {
      const sectorReal = sector === 'construccion' ? 'Construcción y Reformas' : sector === 'carpinteria' ? 'Carpintería y Madera' : 'Instalaciones';
      const perfil = await autocompletarPerfilFiscalIA(sectorReal);
      setResultadoExpediente({
        ayuda: nombreAyuda,
        ...perfil
      });
    } catch (error) {
      console.error("Error al procesar expediente con IA:", error);
      alert("Hubo un error al conectar con OpenAI.");
    } finally {
      setCargandoIA(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 sm:p-10 font-sans text-gray-900">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* CABECERA DEL DASHBOARD */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-6 rounded-3xl shadow-sm border border-gray-200 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-green-100 text-green-800 text-xs font-bold px-2.5 py-1 rounded-full uppercase">● IA Activa</span>
              <span className="text-xs text-gray-500 uppercase font-semibold">Sector: {sector}</span>
            </div>
           <h1 className="text-2xl font-black text-blue-600 mt-1">Panel de Control (Versión Nueva 2026): {empresa}</h1>
            <p className="text-xs text-gray-500 mt-0.5">Alertas configuradas en el móvil: <strong className="text-gray-800">{telefono || 'No especificado'}</strong></p>
          </div>
          <button 
            type="button"
            onClick={() => router.push('/')}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-xl text-xs transition-colors cursor-pointer"
          >
            ← Salir al Inicio
          </button>
        </div>

        {/* TARJETAS DE ESTADÍSTICAS */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-200">
            <span className="text-xs font-bold uppercase text-gray-400 block mb-1">Ayudas detectadas</span>
            <h2 className="text-3xl font-black text-blue-600">4 activas</h2>
            <p className="text-xs text-gray-500 mt-2">Cruzadas con tu código de actividad en tiempo real.</p>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-200">
            <span className="text-xs font-bold uppercase text-gray-400 block mb-1">Importe estimado</span>
            <h2 className="text-3xl font-black text-green-600">18.000 €</h2>
            <p className="text-xs text-gray-500 mt-2">Disponibles para solicitud inmediata.</p>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-200">
            <span className="text-xs font-bold uppercase text-gray-400 block mb-1">Estado de WhatsApp</span>
            <h2 className="text-3xl font-black text-purple-600">Sincronizado</h2>
            <p className="text-xs text-gray-500 mt-2">Avisos automáticos de BOE activados.</p>
          </div>
        </div>

        {/* MODAL / TARJETA DE RESULTADO DE LA IA CUANDO AUTOCOMPLETA */}
        {resultadoExpediente && (
          <div className="bg-emerald-900 text-white p-6 rounded-3xl shadow-xl border border-emerald-700 space-y-4">
            <div className="flex justify-between items-center border-b border-emerald-800 pb-3">
              <div>
                <span className="bg-emerald-800 text-emerald-200 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">Formulario Autocompletado por IA</span>
                <h3 className="text-lg font-bold mt-1 text-emerald-100">{resultadoExpediente.ayuda}</h3>
              </div>
              <button 
                type="button"
                onClick={() => setResultadoExpediente(null)}
                className="text-emerald-300 hover:text-white text-lg font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="grid sm:grid-cols-3 gap-4 text-xs">
              <div className="bg-emerald-950 p-3 rounded-xl"><span className="text-emerald-400 block">Razón Social:</span> <strong>{resultadoExpediente.razonSocial}</strong></div>
              <div className="bg-emerald-950 p-3 rounded-xl"><span className="text-emerald-400 block">NIF / CIF:</span> <strong>{resultadoExpediente.nifCif}</strong></div>
              <div className="bg-emerald-950 p-3 rounded-xl"><span className="text-emerald-400 block">Epígrafe IAE:</span> <strong>{resultadoExpediente.epigrafeIAE}</strong></div>
            </div>
            <p className="text-xs text-emerald-200 italic bg-emerald-950 p-3 rounded-xl">💡 <strong>Análisis IA:</strong> {resultadoExpediente.resumenPerfil}</p>
            <div className="pt-2 flex justify-end">
              <button 
                type="button"
                onClick={() => alert('¡Expediente enviado a tramitación oficial con éxito!')}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2.5 px-6 rounded-xl text-xs transition-colors cursor-pointer shadow-md"
              >
                Firmar y Presentar Oficialmente ➔
              </button>
            </div>
          </div>
        )}

        {/* LISTADO DE SUBVENCIONES */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200 space-y-6">
          <h3 className="text-lg font-bold text-gray-900">📄 Expedientes y Convocatorias del BOE para ti</h3>
          <div className="space-y-4">
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-gray-50 rounded-2xl border border-gray-100 gap-4">
              <div>
                <strong className="text-sm text-gray-900 block">Ayuda a la Modernización Digital de Pymes (Kit Digital)</strong>
                <span className="text-xs text-gray-500">Plazo abierto hasta el 31 de Diciembre • Importe: Hasta 12.000 €</span>
              </div>
              <button 
                type="button"
                disabled={cargandoIA}
                onClick={() => handleAutocompletarExpediente('Ayuda a la Modernización Digital de Pymes (Kit Digital)')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-colors cursor-pointer flex items-center gap-2 disabled:opacity-50"
              >
                {cargandoIA ? (
                  <>
                    <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    La IA está rellenando...
                  </>
                ) : (
                  <>Autocompletar con IA ➔</>
                )}
              </button>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-gray-50 rounded-2xl border border-gray-100 gap-4">
              <div>
                <strong className="text-sm text-gray-900 block">Subvención Autonómica para Inversión en Maquinaria</strong>
                <span className="text-xs text-gray-500">Plazo abierto • Importe: Hasta 6.000 €</span>
              </div>
              <button 
                type="button"
                disabled={cargandoIA}
                onClick={() => handleAutocompletarExpediente('Subvención Autonómica para Inversión en Maquinaria')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-colors cursor-pointer flex items-center gap-2 disabled:opacity-50"
              >
                {cargandoIA ? (
                  <>
                    <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    La IA está rellenando...
                  </>
                ) : (
                  <>Autocompletar con IA ➔</>
                )}
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}