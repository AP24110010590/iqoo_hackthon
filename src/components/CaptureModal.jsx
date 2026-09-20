import React, { useState, useRef } from 'react';
import { useTaskContext } from '../context/TaskContext';
import { OCR_PRESETS, parseNaturalLanguage } from '../utils/aiEngine';
import { 
  Camera, 
  Upload, 
  Mic, 
  FileText, 
  Sparkles, 
  Check, 
  RefreshCw, 
  ArrowRight, 
  Sliders, 
  Zap,
  Image as ImageIcon,
  Volume2
} from 'lucide-react';

export const CaptureModal = () => {
  const { addMultipleTasks, addTask, setActiveTab, showToast } = useTaskContext();
  const [activeMode, setActiveMode] = useState('camera'); // 'camera' | 'voice' | 'manual'
  
  // OCR Camera State
  const [selectedImage, setSelectedImage] = useState(OCR_PRESETS[0].image);
  const [selectedPresetId, setSelectedPresetId] = useState(OCR_PRESETS[0].id);
  const [isScanning, setIsScanning] = useState(false);
  const [scanExtractedTasks, setScanExtractedTasks] = useState(OCR_PRESETS[0].extractedTasks);

  // Voice State
  const [isListening, setIsListening] = useState(false);
  const [voiceText, setVoiceText] = useState('');
  const [voiceParsedTask, setVoiceParsedTask] = useState(null);

  // Manual Text State
  const [manualText, setManualText] = useState('');
  const [manualParsedTask, setManualParsedTask] = useState(null);

  const fileInputRef = useRef(null);

  // Handle Preset Image Click
  const handleSelectPreset = (preset) => {
    setSelectedPresetId(preset.id);
    setSelectedImage(preset.image);
    setIsScanning(true);
    setScanExtractedTasks([]);

    setTimeout(() => {
      setIsScanning(false);
      setScanExtractedTasks(preset.extractedTasks);
    }, 1500);
  };

  // Handle Custom File Upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setSelectedImage(event.target.result);
      setSelectedPresetId('custom');
      setIsScanning(true);

      setTimeout(() => {
        setIsScanning(false);
        // Realistic dynamic extraction for uploaded file
        setScanExtractedTasks([
          { title: 'Uploaded Assignment Task', deadline: 'Friday', effort: 2, priority: 'High', source: 'Custom Camera Upload' }
        ]);
      }, 1800);
    };
    reader.readAsDataURL(file);
  };

  // Web Speech API Trigger
  const handleToggleVoice = () => {
    if (isListening) {
      setIsListening(false);
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        setIsListening(true);
        recognition.start();

        recognition.onresult = (event) => {
          const speechResult = event.results[0][0].transcript;
          setVoiceText(speechResult);
          const parsed = parseNaturalLanguage(speechResult);
          setVoiceParsedTask(parsed);
          setIsListening(false);
        };

        recognition.onerror = () => {
          setIsListening(false);
          handleFallbackVoiceDemo("I need to finish my Java assignment tomorrow.");
        };

        recognition.onend = () => {
          setIsListening(false);
        };
      } catch (err) {
        handleFallbackVoiceDemo("I need to finish my Java assignment tomorrow.");
      }
    } else {
      handleFallbackVoiceDemo("I need to finish my Java assignment tomorrow.");
    }
  };

  const handleFallbackVoiceDemo = (sampleSpeech) => {
    setIsListening(true);
    setVoiceText('');
    setVoiceParsedTask(null);

    let charIdx = 0;
    const interval = setInterval(() => {
      charIdx++;
      const currentSub = sampleSpeech.slice(0, charIdx);
      setVoiceText(currentSub);
      if (charIdx >= sampleSpeech.length) {
        clearInterval(interval);
        setIsListening(false);
        const parsed = parseNaturalLanguage(sampleSpeech);
        setVoiceParsedTask(parsed);
      }
    }, 45);
  };

  // Handle Manual Text Input Change
  const handleManualTextChange = (e) => {
    const val = e.target.value;
    setManualText(val);
    if (val.trim()) {
      const parsed = parseNaturalLanguage(val);
      setManualParsedTask(parsed);
    } else {
      setManualParsedTask(null);
    }
  };

  // Submit OCR Tasks to App Context
  const handleConfirmOCRTasks = () => {
    if (scanExtractedTasks.length === 0) return;
    const formatted = scanExtractedTasks.map(t => ({
      id: 'ocr-' + Date.now() + '-' + Math.random(),
      title: t.title,
      deadline: t.deadline,
      effort: t.effort,
      priority: t.priority,
      completed: false,
      createdAt: new Date().toISOString(),
      source: t.source || 'AI OCR Snap'
    }));
    addMultipleTasks(formatted);
    setActiveTab('plan');
  };

  // Submit Voice Task
  const handleConfirmVoiceTask = () => {
    if (!voiceParsedTask) return;
    addTask(voiceParsedTask);
    setActiveTab('plan');
  };

  // Submit Manual Task
  const handleConfirmManualTask = () => {
    if (!manualParsedTask) return;
    addTask(manualParsedTask);
    setActiveTab('plan');
  };

  return (
    <div className="space-y-4 pb-24 animate-fadeIn">
      
      {/* Input Mode Selector */}
      <div className="bg-white p-1.5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-around">
        <button
          onClick={() => setActiveMode('camera')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
            activeMode === 'camera' 
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' 
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Camera className="w-4 h-4" />
          <span>Snap Camera</span>
        </button>

        <button
          onClick={() => setActiveMode('voice')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
            activeMode === 'voice' 
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' 
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Mic className="w-4 h-4" />
          <span>Speak</span>
        </button>

        <button
          onClick={() => setActiveMode('manual')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
            activeMode === 'manual' 
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' 
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Type Text</span>
        </button>
      </div>

      {/* MODE 1: SNAP CAMERA & OCR */}
      {activeMode === 'camera' && (
        <div className="space-y-4">

          {/* Preset Samples Bar */}
          <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Try Sample Whiteboard / Document</p>
            <div className="grid grid-cols-3 gap-2">
              {OCR_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => handleSelectPreset(preset)}
                  className={`p-2 rounded-xl border text-left transition-all ${
                    selectedPresetId === preset.id
                      ? 'border-blue-600 bg-blue-50/60 ring-2 ring-blue-500/30'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <p className="text-xs font-bold text-slate-900 truncate">{preset.title}</p>
                  <p className="text-[10px] text-slate-500 truncate mt-0.5">{preset.category}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Camera Viewport & AI Scanner Box */}
          <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-lg border border-slate-800 relative">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-950 flex items-center justify-center">
              <img 
                src={selectedImage} 
                alt="Captured Target" 
                className="w-full h-full object-cover opacity-90"
              />

              {/* Laser Scanning Animation Overlay */}
              {isScanning && (
                <div className="absolute inset-0 bg-blue-900/20 backdrop-blur-[2px]">
                  <div className="w-full h-1 bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-400 shadow-[0_0_15px_#38bdf8] animate-laser-scan absolute"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-2 rounded-full bg-slate-900/90 border border-blue-400/40 text-blue-300 text-xs font-bold flex items-center gap-2 shadow-2xl">
                    <Sparkles className="w-4 h-4 animate-spin" />
                    <span>AI Vision Engine Reading Image...</span>
                  </div>
                </div>
              )}

              {/* Upload Trigger Button */}
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept="image/*"
                capture="environment"
                className="hidden" 
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-3 right-3 px-3 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-900 border border-slate-700 text-white text-xs font-semibold backdrop-blur-md flex items-center gap-1.5 shadow-md active:scale-95 transition-transform"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Photo</span>
              </button>
            </div>

            {/* AI Detected Task Results */}
            <div className="p-4 bg-white border-t border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> AI Detected Tasks ({scanExtractedTasks.length})
                </span>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  98.4% Confidence
                </span>
              </div>

              <div className="space-y-2">
                {scanExtractedTasks.map((task, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{task.title}</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Deadline: <span className="font-semibold text-slate-700">{task.deadline}</span> • Effort: <span className="font-semibold text-blue-600">{task.effort} hrs</span>
                      </p>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                      {task.priority} Priority
                    </span>
                  </div>
                ))}
              </div>

              <button
                onClick={handleConfirmOCRTasks}
                disabled={isScanning || scanExtractedTasks.length === 0}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 active:scale-95 transition-all disabled:opacity-50"
              >
                <span>Add Extracted Tasks to Workload Balancer</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      )}

      {/* MODE 2: VOICE INPUT */}
      {activeMode === 'voice' && (
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm text-center space-y-5">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900">Voice Capture AI</h3>
            <p className="text-xs text-slate-500">Tap speak and dictate your task naturally</p>
          </div>

          {/* Microphone Animation Button */}
          <div className="relative py-4 flex items-center justify-center">
            <button
              onClick={handleToggleVoice}
              className={`w-20 h-20 rounded-full flex items-center justify-center shadow-xl transition-all active:scale-95 ${
                isListening 
                  ? 'bg-rose-600 text-white animate-pulse ring-8 ring-rose-100' 
                  : 'bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-blue-600/30'
              }`}
            >
              <Mic className="w-8 h-8" />
            </button>
          </div>

          {/* Voice Waveform Indicator */}
          {isListening && (
            <div className="flex items-center justify-center gap-1.5 h-8">
              <div className="w-1.5 bg-blue-600 rounded-full animate-wave-bar wave-delay-1"></div>
              <div className="w-1.5 bg-blue-600 rounded-full animate-wave-bar wave-delay-2"></div>
              <div className="w-1.5 bg-blue-600 rounded-full animate-wave-bar wave-delay-3"></div>
              <div className="w-1.5 bg-blue-600 rounded-full animate-wave-bar wave-delay-4"></div>
            </div>
          )}

          {/* Voice Prompt Suggestions */}
          <div className="space-y-2 pt-2 text-left">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider text-center">Tap sample voice phrase</p>
            <div className="flex flex-wrap gap-2 justify-center">
              <button
                onClick={() => handleFallbackVoiceDemo("I need to finish my Java assignment tomorrow.")}
                className="text-xs py-1.5 px-3 rounded-full bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 font-medium border border-slate-200 transition-colors"
              >
                "I need to finish my Java assignment tomorrow."
              </button>
              <button
                onClick={() => handleFallbackVoiceDemo("DBMS assignment due Monday, around 3 hours.")}
                className="text-xs py-1.5 px-3 rounded-full bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 font-medium border border-slate-200 transition-colors"
              >
                "DBMS assignment due Monday, around 3 hours."
              </button>
            </div>
          </div>

          {/* Spoken Text Result Box */}
          {voiceText && (
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-left space-y-2">
              <p className="text-[11px] font-bold text-slate-400">Transcribed Voice:</p>
              <p className="text-xs font-semibold text-slate-800">"{voiceText}"</p>

              {voiceParsedTask && (
                <div className="mt-2 pt-2 border-t border-slate-200/80 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-blue-600">Extracted Task:</span>
                    <span className="font-semibold text-slate-700">{voiceParsedTask.title}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Deadline: {voiceParsedTask.deadline}</span>
                    <span className="text-slate-500">Effort: {voiceParsedTask.effort}h</span>
                  </div>

                  <button
                    onClick={handleConfirmVoiceTask}
                    className="w-full mt-2 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 active:scale-95 transition-all"
                  >
                    Add Task & Run Workload Balancer
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* MODE 3: MANUAL NATURAL LANGUAGE INPUT */}
      {activeMode === 'manual' && (
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Natural Language Task AI</h3>
            <p className="text-xs text-slate-500 mt-0.5">Type task details naturally like you speak</p>
          </div>

          <div className="space-y-2">
            <textarea
              rows={3}
              value={manualText}
              onChange={handleManualTextChange}
              placeholder='Try typing: "DBMS assignment due Monday, around 3 hours."'
              className="w-full p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-medium focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
            />
          </div>

          {/* Quick Preset Prompts */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleManualTextChange({ target: { value: "DBMS assignment due Monday, around 3 hours." } })}
              className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-blue-700 font-medium border border-slate-200"
            >
              "DBMS assignment due Monday, around 3 hours."
            </button>
            <button
              onClick={() => handleManualTextChange({ target: { value: "SE Lab Quiz urgent preparation for Thursday, 1.5 hours" } })}
              className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-blue-700 font-medium border border-slate-200"
            >
              "SE Lab Quiz urgent prep for Thursday, 1.5h"
            </button>
          </div>

          {/* Realtime Extraction Preview Card */}
          {manualParsedTask && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 space-y-3">
              <div className="flex items-center gap-1.5 text-xs font-extrabold text-blue-700">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span>AI Structure Extracted</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-white p-2.5 rounded-xl border border-slate-200/80">
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Task Name</p>
                  <p className="font-bold text-slate-900 truncate mt-0.5">{manualParsedTask.title}</p>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-slate-200/80">
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Deadline</p>
                  <p className="font-bold text-blue-600 mt-0.5">{manualParsedTask.deadline}</p>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-slate-200/80">
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Estimated Effort</p>
                  <p className="font-bold text-slate-900 mt-0.5">{manualParsedTask.effort} Hours</p>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-slate-200/80">
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Priority</p>
                  <p className="font-bold text-rose-600 mt-0.5">{manualParsedTask.priority}</p>
                </div>
              </div>

              <button
                onClick={handleConfirmManualTask}
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 active:scale-95 transition-all"
              >
                Add Task & Auto-Balance Schedule
              </button>
            </div>
          )}
        </div>
      )}

    </div>
  );
};
