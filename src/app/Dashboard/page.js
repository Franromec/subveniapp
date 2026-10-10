'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();
  const [empresa, setEmpresa] = useState('Mi Empresa');
  const [telefono, setTelefono] = useState('');
  const [sector, setSector] = useState('construccion');

  useEffect(() => {
    // Recuperamos los datos introducidos en el registro de la landing
    const emp = sessionStorage.getItem('subvenia_empresa');
    const tel = sessionStorage.getItem('subvenia_telefono');
    const sec = sessionStorage.getItem('subvenia_sector');

    if (emp) setEmpresa(emp);
    if (tel) setTelefono(tel);
    if (sec) setSector(sec);
  }, []);

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
            <h1 className="text-2xl font-black text-blue-600 mt-1">Panel de Control: {empresa}</h1>
            <p className="text-xs text-gray-500 mt-0.5">Alertas configuradas en el móvil: <strong className="text-gray-800">{telefono || 'No especificado'}</strong></p>
          </div>
          <button 
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
                onClick={() => alert('IA analizando perfil fiscal y rellenando formularios oficiales... ¡Listo para firmar digitalmente!')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl text-xs transition-colors cursor-pointer"
              >
                Autocompletar con IA ➔
              </button>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-gray-50 rounded-2xl border border-gray-100 gap-4">
              <div>
                <strong className="text-sm text-gray-900 block">Subvención Autonómica para Inversión en Maquinaria</strong>
                <span className="text-xs text-gray-500">Plazo abierto • Importe: Hasta 6.000 €</span>
              </div>
              <button 
                onClick={() => alert('IA analizando perfil fiscal y rellenando formularios oficiales... ¡Listo para firmar digitalmente!')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl text-xs transition-colors cursor-pointer"
              >
                Autocompletar con IA ➔
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}