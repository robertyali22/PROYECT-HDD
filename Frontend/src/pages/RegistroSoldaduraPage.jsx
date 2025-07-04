import React, { useState, useEffect, useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { NavBar } from '../components/Navbar';
import { SideBar } from '../components/Sidebar';

export function RegistroPage() {
  const [activeTab, setActiveTab] = useState('registro');

  // Array para guardar
  // Form state
  const [projectCode, setProjectCode] = useState('');
  const [executionDate, setExecutionDate] = useState('');
  const [weldType, setWeldType] = useState('');
  const [baseMaterial, setBaseMaterial] = useState('');
  const [description, setDescription] = useState('');
  const [thickness, setThickness] = useState('');
  const [position, setPosition] = useState('');
  const [fillerMaterial, setFillerMaterial] = useState('');
  const [electrodeDiameter, setElectrodeDiameter] = useState('');
  const [amperage, setAmperage] = useState('');
  const [voltage, setVoltage] = useState('');
  const [images, setImages] = useState([]);
  const [observations, setObservations] = useState('');
  const [signature, setSignature] = useState('');
  const sigPadRef = useRef(null);

  // Records array
  const [records, setRecords] = useState([]);

  const handleImageChange = e => {
    const files = Array.from(e.target.files);
    const urls = files.map(file => URL.createObjectURL(file));
    setImages(urls);
  };

  const clearSignature = () => {
    sigPadRef.current.clear();
    setSignature('');
  };

  const saveSignature = () => {
    if (sigPadRef.current && !sigPadRef.current.isEmpty()) {
      setSignature(sigPadRef.current.getTrimmedCanvas().toDataURL('image/png'));
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const newRecord = {
      projectCode,
      executionDate,
      weldType,
      baseMaterial,
      description,
      thickness,
      position,
      fillerMaterial,
      electrodeDiameter,
      amperage,
      voltage,
      images,
      observations,
      signature
    };
    setRecords(prev => [...prev, newRecord]);
    // Clear form
    setProjectCode('');
    setExecutionDate('');
    setWeldType('');
    setBaseMaterial('');
    setDescription('');
    setThickness('');
    setPosition('');
    setFillerMaterial('');
    setElectrodeDiameter('');
    setAmperage('');
    setVoltage('');
    setImages([]);
    setObservations('');
    clearSignature();
    alert('Registro guardado correctamente.');
  };

  return (
    <>
      <NavBar />
      <SideBar />
      <div className="sm:ml-64 bg-slate-100">
        <div className="p-4 mt-16">
          <div className="bg-white rounded-lg shadow p-6">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2 border-b-2 border-blue-500 pb-2 inline-block">
                  Registro de Soldaduras
                </h1>

              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b mb-6">
              <div
                className={`px-6 py-2 cursor-pointer font-medium ${activeTab === 'registro' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
                onClick={() => setActiveTab('registro')}
              >Registro</div>
              <div
                className={`px-6 py-2 cursor-pointer font-medium ${activeTab === 'historial' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
                onClick={() => setActiveTab('historial')}
              >Historial</div>
            </div>

            {/* Alert */}
            <div className="bg-blue-100 border-l-4 border-blue-600 text-blue-800 px-4 py-3 mb-6 rounded">
              Recuerda completar todos los campos obligatorios y adjuntar fotografías de la soldadura.
            </div>

            {/* Registro Form */}
            {activeTab === 'registro' && (
              <div className="bg-white rounded-lg shadow p-6 mb-8">
                <form onSubmit={handleSubmit}>
                  {/* Row 1 */}
                  <div className="flex flex-wrap gap-4 mb-6">
                    <div className="flex-1">
                      <label className="block font-medium mb-2">Código de Proyecto *</label>
                      <input type="text" required value={projectCode} onChange={e => setProjectCode(e.target.value)} placeholder="Ej. PROJ-2025-042" className="w-full p-2 border border-gray-300 rounded-md" />
                    </div>
                    <div className="flex-1">
                      <label className="block font-medium mb-2">Fecha de Ejecución *</label>
                      <input type="date" required value={executionDate} onChange={e => setExecutionDate(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" />
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="flex flex-wrap gap-4 mb-6">
                    <div className="flex-1">
                      <label className="block font-medium mb-2">Tipo de Soldadura *</label>
                      <select required value={weldType} onChange={e => setWeldType(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md">
                        <option value="">Seleccionar...</option>
                        <option value="MIG">MIG</option>
                        <option value="TIG">TIG</option>
                        <option value="SMAW">SMAW</option>
                        <option value="FCAW">FCAW</option>
                        <option value="SAW">SAW</option>
                      </select>
                    </div>
                    <div className="flex-1">
                      <label className="block font-medium mb-2">Material Base *</label>
                      <select required value={baseMaterial} onChange={e => setBaseMaterial(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md">
                        <option value="">Seleccionar...</option>
                        <option value="acero_carbono">Acero Carbono</option>
                        <option value="acero_inoxidable">Acero Inoxidable</option>
                        <option value="aluminio">Aluminio</option>
                        <option value="cobre">Cobre</option>
                        <option value="titanio">Titanio</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 3 */}
                  <div className="mb-6">
                    <label className="block font-medium mb-2">Descripción del Trabajo</label>
                    <textarea rows="3" placeholder="Describe el trabajo realizado..." value={description} onChange={e => setDescription(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" />
                  </div>

                  {/* Row 4 */}
                  <div className="flex flex-wrap gap-4 mb-6">
                    <div className="flex-1">
                      <label className="block font-medium mb-2">Espesor (mm) *</label>
                      <input type="number" step="0.1" required value={thickness} onChange={e => setThickness(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" />
                    </div>
                    <div className="flex-1">
                      <label className="block font-medium mb-2">Posición *</label>
                      <select required value={position} onChange={e => setPosition(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md">
                        <option value="">Seleccionar...</option>
                        <option value="1G">1G (Plana)</option>
                        <option value="2G">2G (Horizontal)</option>
                        <option value="3G">3G (Vertical)</option>
                        <option value="4G">4G (Sobre Cabeza)</option>
                        <option value="5G">5G (Tubería Horizontal)</option>
                        <option value="6G">6G (Tubería Inclinada)</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 5 */}
                  <div className="flex flex-wrap gap-4 mb-6">
                    <div className="flex-1">
                      <label className="block font-medium mb-2">Material de Aporte *</label>
                      <input type="text" required value={fillerMaterial} onChange={e => setFillerMaterial(e.target.value)} placeholder="Ej. ER70S-6" className="w-full p-2 border border-gray-300 rounded-md" />
                    </div>
                    <div className="flex-1">
                      <label className="block font-medium mb-2">Diámetro Electrodo (mm) *</label>
                      <input type="number" step="0.1" required value={electrodeDiameter} onChange={e => setElectrodeDiameter(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" />
                    </div>
                  </div>

                  {/* Row 6 */}
                  <div className="flex flex-wrap gap-4 mb-6">
                    <div className="flex-1">
                      <label className="block font-medium mb-2">Amperaje (A) *</label>
                      <input type="number" required value={amperage} onChange={e => setAmperage(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" />
                    </div>
                    <div className="flex-1">
                      <label className="block font-medium mb-2">Voltaje (V) *</label>
                      <input type="number" step="0.1" required value={voltage} onChange={e => setVoltage(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" />
                    </div>
                  </div>

                  {/* Row 7 Images */}
                  <div className="mb-6">
                    <label className="block font-medium mb-2">Fotografías de la Soldadura *</label>
                    <input type="file" accept="image/*" multiple onChange={handleImageChange} className="block w-full text-gray-600" />
                    <div className="flex flex-wrap gap-2 mt-4">
                      {images.map((src, i) => (
                        <div key={i} className="w-24 h-24 overflow-hidden rounded-md bg-gray-100">
                          <img src={src} alt={`sold-${i}`} className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Row 8 Observaciones */}
                  <div className="mb-6">
                    <label className="block font-medium mb-2">Observaciones Adicionales</label>
                    <textarea rows="2" placeholder="..." value={observations} onChange={e => setObservations(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" />
                  </div>

                  {/* Firma Digital */}
                  <div className="mb-6">
                    <label className="block font-medium mb-2">Firma Digital *</label>
                    <SignatureCanvas ref={sigPadRef} penColor="black" canvasProps={{
                      width: 600, height: 150, style: {       // ajusta el estilo, no uses clases que reescalen
                        border: '1px solid #ccc',
                        width: '600px',
                        height: '150px'
                      }
                    }}
                    />
                  </div>
                  <button type="button" onClick={clearSignature} className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md text-sm">Limpiar Firma</button>


                  {/* Actions */}
                  <div className="flex justify-end gap-2">
                    <button type="button" onClick={() => setActiveTab('historial')} className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md">Cancelar</button>
                    <button type="submit" className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md">Guardar Registro</button>
                  </div>
                </form>
              </div>
            )}

            {/* Historial */}
            {activeTab === 'historial' && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Historial de Soldaduras</h2>
                {records.length === 0 ? (
                  <p className="text-gray-500">No hay registros aún.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="p-2 border-b">Código</th>
                          <th className="p-2 border-b">Fecha</th>
                          <th className="p-2 border-b">Tipo</th>
                          <th className="p-2 border-b">Material</th>
                          <th className="p-2 border-b">Espesor</th>
                          <th className="p-2 border-b">Posición</th>
                          <th className="p-2 border-b">Amperaje/Voltaje</th>
                          <th className="p-2 border-b">Fotos</th>
                          <th className="p-2 border-b">Obs.</th>
                        </tr>
                      </thead>
                      <tbody>
                        {records.map((r, idx) => (
                          <tr key={idx} className="hover:bg-gray-50">
                            <td className="p-2 border-b">{r.projectCode}</td>
                            <td className="p-2 border-b">{r.executionDate}</td>
                            <td className="p-2 border-b">{r.weldType}</td>
                            <td className="p-2 border-b">{r.baseMaterial}</td>
                            <td className="p-2 border-b">{r.thickness} mm</td>
                            <td className="p-2 border-b">{r.position}</td>
                            <td className="p-2 border-b">{r.amperage}A/{r.voltage}V</td>
                            <td className="p-2 border-b flex gap-1">
                              {r.images.map((src, i) => (
                                <img key={i} src={src} alt={`hist-${i}`} className="w-12 h-12 object-cover rounded" />
                              ))}
                            </td>
                            <td className="p-2 border-b">{r.observations}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>

  );
}
