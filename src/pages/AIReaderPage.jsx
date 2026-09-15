import { useState, useRef } from 'react'
import './AIReaderPage.css'

const MOCK_RESULT = {
  petName: 'Bruno',
  species: 'Labrador Retriever (Dog)',
  visitDate: '12 Sep 2025',
  vet: 'Dr. Priya Sharma, BVSc',
  clinic: "Dr. Priya's Small Animal Clinic, JP Nagar",
  diagnosis: [
    { label: 'Primary Diagnosis', value: 'Acute Otitis Externa (Ear Infection)', severity: 'moderate' },
    { label: 'Secondary Finding', value: 'Mild Food Allergy — suspected beef sensitivity', severity: 'low' },
  ],
  medications: [
    { name: 'Surolan Ear Drops', dose: '4 drops in left ear', frequency: 'Twice daily', duration: '10 days' },
    { name: 'Atopica (Cyclosporin)', dose: '50mg capsule', frequency: 'Once daily with food', duration: '4 weeks' },
    { name: 'Hill\'s z/d Diet', dose: 'Exclusive diet', frequency: 'All meals', duration: '8 weeks (trial)' },
  ],
  followUp: 'Return visit in 2 weeks (26 Sep 2025) to assess ear healing. Blood allergy panel if symptoms persist.',
  redFlags: [
    'Stop ear drops immediately if Bruno shakes head violently or shows pain',
    'Watch for vomiting, lethargy or reduced appetite — report within 24 hrs',
  ],
  vitals: [
    { label: 'Weight', value: '28.4 kg' },
    { label: 'Temperature', value: '38.6°C (Normal)' },
    { label: 'Pulse', value: '78 bpm' },
    { label: 'Condition Score', value: '4/9 (Slightly thin)' },
  ],
}

const STEPS = [
  { icon: '📄', label: 'Reading document…', duration: 900 },
  { icon: '🔍', label: 'Extracting medical data…', duration: 1100 },
  { icon: '🧠', label: 'Analysing diagnosis & medications…', duration: 1200 },
  { icon: '⚠️', label: 'Identifying red flags…', duration: 800 },
  { icon: '✅', label: 'Generating summary…', duration: 600 },
]

export default function AIReaderPage({ navigate }) {
  const [stage, setStage] = useState('idle') // idle | uploading | processing | result
  const [dragOver, setDragOver] = useState(false)
  const [fileName, setFileName] = useState('')
  const [processStep, setProcessStep] = useState(0)
  const [stepsDone, setStepsDone] = useState([])
  const [saved, setSaved] = useState(false)
  const fileInputRef = useRef(null)

  const startProcessing = (name) => {
    setFileName(name)
    setStage('processing')
    setProcessStep(0)
    setStepsDone([])

    let delay = 0
    STEPS.forEach((step, i) => {
      delay += i === 0 ? 300 : STEPS[i - 1].duration
      setTimeout(() => setProcessStep(i), delay)
      setTimeout(() => setStepsDone(prev => [...prev, i]), delay + step.duration - 100)
    })

    const total = STEPS.reduce((acc, s) => acc + s.duration, 300)
    setTimeout(() => setStage('result'), total + 200)
  }

  const handleFile = (file) => {
    if (!file) return
    setStage('uploading')
    setTimeout(() => startProcessing(file.name || 'prescription.pdf'), 600)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    handleFile(file)
  }

  const handleFileInput = (e) => {
    const file = e.target.files[0]
    handleFile(file)
  }

  const reset = () => {
    setStage('idle')
    setFileName('')
    setProcessStep(0)
    setStepsDone([])
    setSaved(false)
  }

  return (
    <div className="ai-page page-enter">
      {/* Header */}
      <div className="ai-header">
        <button className="btn btn-ghost" onClick={() => navigate('home')} id="ai-back-btn">← Back</button>
        <div className="ai-header-center">
          <div className="ai-header-badge">
            <span className="ai-pulse" />
            ✨ AI-Powered
          </div>
          <h1 className="ai-title font-display">Medical Record Reader</h1>
          <p className="ai-subtitle">
            Upload any pet prescription, discharge summary, or lab report.
            Our AI extracts key health info in plain language — instantly.
          </p>
        </div>
      </div>

      <div className="ai-content">

        {/* IDLE: Upload Area */}
        {(stage === 'idle' || stage === 'uploading') && (
          <div
            className={`upload-zone glass ${dragOver ? 'drag-over' : ''} ${stage === 'uploading' ? 'uploading' : ''}`}
            onDragOver={e => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => stage === 'idle' && fileInputRef.current?.click()}
            id="upload-drop-zone"
          >
            <input
              type="file"
              ref={fileInputRef}
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileInput}
              style={{ display: 'none' }}
              id="file-input"
            />

            {stage === 'uploading' ? (
              <>
                <div className="upload-spinner" />
                <p className="upload-status-text font-display">Uploading document…</p>
              </>
            ) : (
              <>
                <div className={`upload-icon-big ${dragOver ? 'bounce' : ''}`}>
                  {dragOver ? '📂' : '📋'}
                </div>
                <h2 className="upload-heading font-display">
                  {dragOver ? 'Drop it here!' : 'Upload Medical Record'}
                </h2>
                <p className="upload-desc">
                  Drag & drop your pet's prescription, lab report, or discharge summary here,
                  or <span className="upload-link">click to browse</span>
                </p>
                <div className="upload-formats">
                  <span className="format-tag">PDF</span>
                  <span className="format-tag">JPG</span>
                  <span className="format-tag">PNG</span>
                </div>

                <div className="upload-demo-hint">
                  <span className="hint-icon">💡</span>
                  <span>No file? <button className="hint-btn" onClick={(e) => { e.stopPropagation(); startProcessing('sample_prescription.pdf') }}>Try our demo record →</button></span>
                </div>
              </>
            )}
          </div>
        )}

        {/* PROCESSING: Step-by-step animation */}
        {stage === 'processing' && (
          <div className="processing-card glass">
            <div className="processing-icon-wrap">
              <div className="processing-ring" />
              <div className="processing-ring processing-ring-2" />
              <span className="processing-center-icon">🧠</span>
            </div>
            <h2 className="font-display processing-title">Analysing your document…</h2>
            <p className="processing-file">📄 {fileName}</p>

            <div className="steps-list">
              {STEPS.map((step, i) => (
                <div
                  key={i}
                  className={`step-row ${i <= processStep ? 'active' : ''} ${stepsDone.includes(i) ? 'done' : ''}`}
                >
                  <div className="step-row-icon">
                    {stepsDone.includes(i) ? '✅' : i === processStep ? '⏳' : '○'}
                  </div>
                  <span className="step-row-label">{step.icon} {step.label}</span>
                  {i === processStep && !stepsDone.includes(i) && (
                    <div className="step-progress">
                      <div className="step-progress-bar" style={{ animationDuration: `${step.duration}ms` }} />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="processing-note">🔒 Your data is processed securely and never stored without consent</div>
          </div>
        )}

        {/* RESULT: AI Summary */}
        {stage === 'result' && (
          <div className="result-layout">
            {/* Result Header */}
            <div className="result-header glass">
              <div className="result-header-left">
                <div className="result-success-icon">✅</div>
                <div>
                  <h2 className="font-display result-title">Analysis Complete</h2>
                  <p className="result-file">📄 {fileName} · Processed by Pawzz AI</p>
                </div>
              </div>
              <div className="result-actions">
                <button
                  className={`btn ${saved ? 'btn-ghost' : 'btn-primary'}`}
                  onClick={() => setSaved(true)}
                  id="save-passport-btn"
                >
                  {saved ? '✓ Saved to Passport' : '🐾 Save to Pet Passport'}
                </button>
                <button className="btn btn-ghost" onClick={reset} id="upload-another-btn">Upload Another</button>
              </div>
            </div>

            {/* Pet Info */}
            <div className="result-section glass">
              <h3 className="result-section-title font-display">🐶 Pet Information</h3>
              <div className="info-grid">
                <div className="info-item">
                  <span className="info-label">Pet</span>
                  <span className="info-value">{MOCK_RESULT.petName}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Breed</span>
                  <span className="info-value">{MOCK_RESULT.species}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Visit Date</span>
                  <span className="info-value">{MOCK_RESULT.visitDate}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Veterinarian</span>
                  <span className="info-value">{MOCK_RESULT.vet}</span>
                </div>
              </div>
            </div>

            {/* Vitals */}
            <div className="result-section glass">
              <h3 className="result-section-title font-display">📊 Vitals</h3>
              <div className="vitals-grid">
                {MOCK_RESULT.vitals.map((v, i) => (
                  <div key={i} className="vital-card">
                    <div className="vital-label">{v.label}</div>
                    <div className="vital-value font-display">{v.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Diagnosis */}
            <div className="result-section glass">
              <h3 className="result-section-title font-display">🩺 Diagnosis</h3>
              {MOCK_RESULT.diagnosis.map((d, i) => (
                <div key={i} className={`diagnosis-card severity-${d.severity}`}>
                  <div className="diagnosis-label">{d.label}</div>
                  <div className="diagnosis-value">{d.value}</div>
                  <div className={`severity-badge severity-${d.severity}`}>
                    {d.severity === 'moderate' ? '⚡ Moderate' : '💚 Low Risk'}
                  </div>
                </div>
              ))}
            </div>

            {/* Medications */}
            <div className="result-section glass">
              <h3 className="result-section-title font-display">💊 Medications</h3>
              <div className="meds-table">
                <div className="meds-header">
                  <span>Medication</span>
                  <span>Dose</span>
                  <span>Frequency</span>
                  <span>Duration</span>
                </div>
                {MOCK_RESULT.medications.map((m, i) => (
                  <div key={i} className="med-row">
                    <span className="med-name">{m.name}</span>
                    <span className="med-dose">{m.dose}</span>
                    <span className="med-freq">{m.frequency}</span>
                    <span className="med-dur">{m.duration}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Red Flags */}
            <div className="result-section glass red-flags-section">
              <h3 className="result-section-title font-display">🚨 Red Flags — Watch For</h3>
              {MOCK_RESULT.redFlags.map((f, i) => (
                <div key={i} className="red-flag-item">
                  <span className="red-flag-icon">⚠️</span>
                  <span>{f}</span>
                </div>
              ))}
            </div>

            {/* Follow Up */}
            <div className="result-section glass follow-up-section">
              <h3 className="result-section-title font-display">📅 Follow-Up</h3>
              <p className="follow-up-text">{MOCK_RESULT.followUp}</p>
              <button
                className="btn btn-primary"
                style={{ marginTop: 'var(--sp-md)' }}
                onClick={() => navigate('results')}
                id="book-followup-btn"
              >
                Book Follow-Up Appointment →
              </button>
            </div>

            {/* AI Disclaimer */}
            <div className="ai-disclaimer glass">
              <span>🤖</span>
              <p>This summary was generated by Pawzz AI and is for informational purposes only. Always consult your veterinarian for medical decisions. AI may make errors — verify critical details with the original document.</p>
            </div>
          </div>
        )}

        {/* Feature Highlights (shown in idle) */}
        {stage === 'idle' && (
          <div className="ai-features">
            {[
              { icon: '📋', title: 'Reads Prescriptions', desc: 'Extracts medication names, doses, and frequency from handwritten or typed notes.' },
              { icon: '🔬', title: 'Interprets Lab Reports', desc: 'Translates complex blood panels and diagnostic results into plain language.' },
              { icon: '🚨', title: 'Flags Red Alerts', desc: 'Highlights critical findings that need immediate veterinary attention.' },
              { icon: '🐾', title: 'Builds Health Passport', desc: 'Saves extracted data to your pet\'s digital health timeline automatically.' },
            ].map((f, i) => (
              <div key={i} className="ai-feature-card glass glass-hover" style={{ animationDelay: `${i * 80}ms` }}>
                <div className="ai-feat-icon">{f.icon}</div>
                <h4 className="font-display ai-feat-title">{f.title}</h4>
                <p className="ai-feat-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
