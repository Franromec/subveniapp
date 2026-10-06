'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SubvenIALanding() {
  const router = useRouter();
  
  // Estados para el calculador interactivo
  const [sector, setSector] = useState('construccion');
  const [empleados, setEmpleados] = useState('1-5');
  const [calculado, setCalculado] = useState(false);
  const [estimacionDinero, setEstimacionDinero] = useState('6.000 € - 12.000 €');

  // Estados para leads y modal de acceso
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authEmail, setAuthEmail] = useState('');

  const handleCalcular = (e) => {
    e.preventDefault();
    setCalculado(true);
    if (empleados === '6-20') setEstimacionDinero('15.000 € - 30.000 €');
    else if (empleados === '20+') setEstimacionDinero('40.000 €+');
    else setEstimacionDinero('6.000 € - 12.000 €');
  };

  const handleLeadSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!authEmail) return;
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 selection:bg-blue-600 selection:text-white">
      
      {/* NAVEGACIÓN */}
      <nav className="flex items-center justify-between px-6 sm:px-8 py-5 bg-white shadow-sm sticky top-0 z-50">
        <div className="text-2xl font-black text-blue-600 tracking-tighter cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          Subven<span className="text-gray-900">IApp</span>
        </div>
        <button 
          type="button"
          onClick={() => setShowAuthModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-5 rounded-xl transition-all cursor-pointer shadow-sm text-sm active:scale-95"
        >
          Acceso Usuarios
        </button>
      </nav>

      {/* HERO SECTION CON EL CALCULADOR */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid lg:grid-cols-12 gap-12 items-center">
        
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-block bg-blue-100 text-blue-800 font-bold px-4 py-1.5 rounded-full text-xs uppercase tracking-wider">
            🚀 Inteligencia Artificial aplicada a Pymes y Autónomos
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            No pierdas más subvenciones por culpa del <span className="text-blue-600">papeleo interminable.</span>
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Mientras otros se leen el BOE durante horas, nuestra IA rastrea las ayudas de tu sector, te avisa por WhatsApp al instante y te autocompleta los formularios oficiales listos para firmar.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-2 text-sm text-gray-500 font-medium">
            <span className="flex items-center gap-2">✅ Sin esperas ni gestorías lentas</span>
            <span className="flex items-center gap-2">✅ Avisos directos al móvil</span>
          </div>
        </div>

        {/* HERRAMIENTA INTERACTIVA */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl shadow-xl border border-blue-100">
          <h3 className="text-xl font-bold mb-2 text-gray-900">🧮 Calcula tus ayudas perdidas</h3>
          <p className="text-xs text-gray-500 mb-6">Descubre en 5 segundos cuánto dinero público hay disponible para tu empresa este año.</p>

          {!calculado ? (
            <form onSubmit={handleCalcular} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Tu sector principal</label>
                <select 
                  value={sector}
                  onChange={(e) => setSector(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 bg-gray-50 text-gray-900"
                >
                  <option value="construccion">Construcción y Reformas</option>
                  <option value="carpinteria">Carpintería y Madera</option>
                  <option value="instalaciones">Instalaciones (Fontanería, Electricidad)</option>
                  <option value="otro">Otro sector industrial / autónomo</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Número de trabajadores</label>
                <select 
                  value={empleados}
                  onChange={(e) => setEmpleados(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 bg-gray-50 text-gray-900"
                >
                  <option value="1-5">1 a 5 trabajadores (Autónomo / Micro)</option>
                  <option value="6-20">6 a 20 trabajadores</option>
                  <option value="20+">Más de 20 trabajadores</option>
                </select>
              </div>

              <button 
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-md cursor-pointer text-sm mt-2 active:scale-95"
              >
                Calcular dinero disponible ➔
              </button>
            </form>
          ) : (
            <div className="text-center space-y-4 py-2">
              <div className="bg-green-50 border border-green-200 p-4 rounded-2xl">
                <span className="text-xs text-green-700 font-bold uppercase block mb-1">Subvenciones estimadas para ti</span>
                <strong className="text-3xl font-black text-green-800">{estimacionDinero}</strong>
                <p className="text-xs text-gray-600 mt-2">Fondos europeos, Kit Digital y ayudas autonómicas detectadas.</p>
              </div>

              {submitted ? (
                <div className="bg-blue-50 p-4 rounded-xl text-left border border-blue-200 space-y-3">
                  <div>
                    <p className="text-xs font-bold text-blue-900">🎉 ¡Guardado con éxito!</p>
                    <p className="text-xs text-blue-700 mt-1">Te hemos enviado el acceso y el informe a <strong>{email}</strong>.</p>
                  </div>
                  <button 
                    type="button"
                    onClick={() => router.push('/dashboard')}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-colors cursor-pointer"
                  >
                    Entrar a mi Panel de Control ➔
                  </button>
                </div>
              ) : (
                <form onSubmit={handleLeadSubmit} className="space-y-3 pt-2">
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Tu correo de empresa" 
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-900"
                  />
                  <button 
                    type="submit"
                    className="w-full bg-blue-900 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-xl transition-colors cursor-pointer text-sm active:scale-95"
                  >
                    Desbloquear mis ayudas
                  </button>
                </form>
              )}

              <button 
                type="button"
                onClick={() => setCalculado(false)}
                className="text-xs text-gray-400 hover:text-gray-600 underline pt-1 block mx-auto cursor-pointer"
              >
                ← Volver a calcular
              </button>
            </div>
          )}
        </div>

      </section>

      {/* SECCIÓN VALOR DIFERENCIAL */}
      <section className="bg-white py-20 px-6 border-t border-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Diseñado para el mundo real, no para despachos</h2>
            <p className="text-gray-600">Mientras otros softwares te obligan a leer manuales farragosos, SubvenIApp lo automatiza todo para ti.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 relative shadow-sm">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl mb-6 shadow-md">1</div>
              <h3 className="text-xl font-bold mb-3">📡 Alertas por WhatsApp</h3>
              <p className="text-gray-600 text-sm leading-relaxed">No tienes que entrar a mirar portales web. Te avisamos directamente al móvil en cuanto se abre una ayuda para tu código de actividad.</p>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 relative shadow-sm">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl mb-6 shadow-md">2</div>
              <h3 className="text-xl font-bold mb-3">⚡ Autocompletado IA</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Nuestra inteligencia artificial redacta el contenido de los formularios complejos cruzando tus datos fiscales automáticamente.</p>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 relative shadow-sm">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl mb-6 shadow-md">3</div>
              <h3 className="text-xl font-bold mb-3">🎯 Enfoque a tu Sector</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Filtramos todo el ruido del BOE. Si eres de la construcción o reformas, solo ves lo que realmente pone dinero en tu cuenta.</p>
            </div>
          </div>
        </div>
      </section>

      {/* MODAL DE ACCESO */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative text-left">
            <button 
              type="button"
              onClick={() => setShowAuthModal(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 font-bold text-xl cursor-pointer w-8 h-8 flex items-center justify-center rounded-full bg-gray-100"
            >
              ✕
            </button>
            <h3 className="text-2xl font-bold mb-2 text-gray-900">Acceso a SubvenIApp</h3>
            <p className="text-gray-600 text-sm mb-6">Introduce tu correo corporativo para acceder directamente al panel de control.</p>
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
                <input 
                  type="email" 
                  required
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  placeholder="nombre@empresa.es" 
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-900 text-sm bg-gray-50"
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-6 rounded-xl transition-colors cursor-pointer shadow-md text-sm active:scale-95"
              >
                Entrar a mi panel ➔
              </button>
            </form>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-white border-t border-gray-200 py-8 text-center text-gray-500 text-sm">
        <p>© 2026 SubvenIApp. Tu copiloto legal de subvenciones.</p>
      </footer>
    </div> 
  );
}