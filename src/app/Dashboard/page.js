'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      
      {/* BARRA SUPERIOR DEL PANEL */}
      <header className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center sticky top-0 z-30 shadow-xs">
        <div className="text-xl font-black text-blue-600 tracking-tighter">
          Subven<span className="text-gray-900">IApp</span> <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-semibold ml-2">Panel Activo</span>
        </div>
        <button 
          type="button"
          onClick={() => router.push('/')}
          className="text-sm font-semibold text-gray-600 hover:text-gray-900 bg-gray-100 px-4 py-2 rounded-xl transition-colors cursor-pointer"
        >
          Cerrar sesión ➔
        </button>
      </header>

      {/* CONTENIDO DEL PANEL */}
      <main className="max-w-6xl mx-auto px-6 py-10 space-y-8">
        
        {/* TARJETA DE BIENVENIDA */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white p-8 rounded-3xl shadow-xl">
          <h1 className="text-3xl font-extrabold mb-2">¡Bienvenido a tu panel de control! 🚀</h1>
          <p className="text-blue-100 text-sm max-w-2xl leading-relaxed">
            Tu IA ya está monitorizando en tiempo real el BOE y los boletines autonómicos en busca de ayudas para tu sector. Te avisaremos por WhatsApp en cuanto detectemos una oportunidad compatible.
          </p>
        </div>

        {/* ESTADÍSTICAS RÁPIDAS */}
        <div className="grid sm:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Ayudas Activas en tu Zona</p>
            <p className="text-3xl font-black text-blue-600">14</p>
            <p className="text-xs text-gray-500 mt-1">Actualizado hace 5 minutos</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Estado de Alertas WhatsApp</p>
            <p className="text-3xl font-black text-green-600">Conectado</p>
            <p className="text-xs text-gray-500 mt-1">Número verificado correctamente</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Suscripción Actual</p>
            <p className="text-3xl font-black text-gray-900">Plan Pyme</p>
            <p className="text-xs text-gray-500 mt-1">Renovación automática activa</p>
          </div>
        </div>

        {/* LISTA DE SUBVENCIONES RECIENTES */}
        <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-gray-900">📋 Últimas Subvenciones Detectadas</h3>
            <span className="text-xs bg-green-100 text-green-800 font-bold px-3 py-1 rounded-full">Filtrado por tu sector</span>
          </div>

          <div className="divide-y divide-gray-100">
            <div className="py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h4 className="font-bold text-gray-900">Ayuda a la Modernización de Maquinaria y Oficios</h4>
                <p className="text-xs text-gray-500 mt-0.5">Subvención autonómica a fondo perdido • Plazo abierto hasta el 30 de noviembre</p>
              </div>
              <button 
                type="button"
                onClick={() => alert('Generando autocompletado con IA...')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs py-2.5 px-4 rounded-xl transition-all cursor-pointer whitespace-nowrap shadow-xs"
              >
                Autocompletar con IA ⚡
              </button>
            </div>

            <div className="py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h4 className="font-bold text-gray-900">Kit Digital - Segmento III (Autónomos)</h4>
                <p className="text-xs text-gray-500 mt-0.5">Bono digital para digitalización de procesos • Hasta 3.000 €</p>
              </div>
              <button 
                type="button"
                onClick={() => alert('Generando autocompletado con IA...')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs py-2.5 px-4 rounded-xl transition-all cursor-pointer whitespace-nowrap shadow-xs"
              >
                Autocompletar con IA ⚡
              </button>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}