import React, { useState, useEffect, useRef } from 'react';
import { Volume2, Pause, Download, SkipForward, SkipBack } from 'lucide-react';

interface PodcastEpisode {
  id: number;
  title: string;
  topic: string;
  duration: string;
  segments: Array<{
    text: string;
    language: 'english' | 'arabic';
    translation?: string;
  }>;
}

const SAMPLE_EPISODES: PodcastEpisode[] = [
  {
    id: 1,
    title: "Introduction to Artificial Intelligence",
    topic: "Technology",
    duration: "5:30",
    segments: [
      { text: "Hello and welcome to our English learning podcast.", language: "english", translation: "مرحباً وأهلاً بكم في بودكاست تعلم اللغة الإنجليزية" },
      { text: "مرحباً وأهلاً بكم في بودكاست تعلم اللغة الإنجليزية", language: "arabic" },
      { text: "Today we'll discuss artificial intelligence.", language: "english", translation: "اليوم سنناقش الذكاء الاصطناعي" },
      { text: "اليوم سنناقش الذكاء الاصطناعي", language: "arabic" },
      { text: "Artificial intelligence is transforming our world.", language: "english", translation: "الذكاء الاصطناعي يغير عالمنا" },
      { text: "الذكاء الاصطناعي يغير عالمنا", language: "arabic" },
      { text: "From healthcare to education, AI is everywhere.", language: "english", translation: "من الرعاية الصحية إلى التعليم، الذكاء الاصطناعي موجود في كل مكان" },
      { text: "من الرعاية الصحية إلى التعليم، الذكاء الاصطناعي موجود في كل مكان", language: "arabic" },
    ]
  },
  {
    id: 2,
    title: "Environmental Conservation",
    topic: "Environment",
    duration: "6:15",
    segments: [
      { text: "Let's talk about protecting our environment.", language: "english", translation: "دعونا نتحدث عن حماية البيئة" },
      { text: "دعونا نتحدث عن حماية البيئة", language: "arabic" },
      { text: "Climate change is a global challenge.", language: "english", translation: "تغير المناخ تحدي عالمي" },
      { text: "تغير المناخ تحدي عالمي", language: "arabic" },
      { text: "We must reduce our carbon footprint.", language: "english", translation: "يجب أن نقلل من بصمتنا الكربونية" },
      { text: "يجب أن نقلل من بصمتنا الكربونية", language: "arabic" },
    ]
  },
  {
    id: 3,
    title: "Healthy Living and Nutrition",
    topic: "Health",
    duration: "7:00",
    segments: [
      { text: "Welcome to our health and nutrition discussion.", language: "english", translation: "مرحباً بكم في نقاشنا حول الصحة والتغذية" },
      { text: "مرحباً بكم في نقاشنا حول الصحة والتغذية", language: "arabic" },
      { text: "Good nutrition is essential for wellbeing.", language: "english", translation: "التغذية الجيدة ضرورية للصحة" },
      { text: "التغذية الجيدة ضرورية للصحة", language: "arabic" },
      { text: "A balanced diet includes fruits and vegetables.", language: "english", translation: "النظام الغذائي المتوازن يشمل الفواكه والخضروات" },
      { text: "النظام الغذائي المتوازن يشمل الفواكه والخضروات", language: "arabic" },
    ]
  }
];

export function PodcastPlayer() {
  const [selectedEpisode, setSelectedEpisode] = useState<PodcastEpisode>(SAMPLE_EPISODES[0]);
  const [currentSegment, setCurrentSegment] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTranslation, setShowTranslation] = useState(true);
  const [speed, setSpeed] = useState(1.0);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      window.speechSynthesis.cancel();
    };
  }, []);

  const playSegment = (index: number) => {
    const segment = selectedEpisode.segments[index];
    if (!segment) {
      setIsPlaying(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(segment.text);
    utterance.lang = segment.language === 'english' ? 'en-US' : 'ar-SA';
    utterance.rate = speed;

    utterance.onend = () => {
      if (index < selectedEpisode.segments.length - 1) {
        timeoutRef.current = setTimeout(() => {
          setCurrentSegment(index + 1);
          playSegment(index + 1);
        }, 500);
      } else {
        setIsPlaying(false);
        setCurrentSegment(0);
      }
    };

    speechRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      window.speechSynthesis.cancel();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      playSegment(currentSegment);
    }
  };

  const handleNext = () => {
    window.speechSynthesis.cancel();
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    const nextSegment = Math.min(currentSegment + 1, selectedEpisode.segments.length - 1);
    setCurrentSegment(nextSegment);
    if (isPlaying) {
      playSegment(nextSegment);
    }
  };

  const handlePrevious = () => {
    window.speechSynthesis.cancel();
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    const prevSegment = Math.max(currentSegment - 1, 0);
    setCurrentSegment(prevSegment);
    if (isPlaying) {
      playSegment(prevSegment);
    }
  };

  const downloadTranscript = () => {
    const transcript = selectedEpisode.segments
      .map((seg, idx) => `${idx + 1}. ${seg.text}${seg.translation ? `\n   Translation: ${seg.translation}` : ''}`)
      .join('\n\n');
    
    const blob = new Blob([`Podcast Transcript: ${selectedEpisode.title}\n\n${transcript}`], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedEpisode.title.replace(/\s+/g, '_')}_transcript.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Episode Selection */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Select Episode</h3>
        <div className="grid gap-3 md:grid-cols-3">
          {SAMPLE_EPISODES.map((episode) => (
            <button
              key={episode.id}
              onClick={() => {
                setSelectedEpisode(episode);
                setCurrentSegment(0);
                setIsPlaying(false);
                window.speechSynthesis.cancel();
              }}
              className={`p-4 rounded-lg border-2 text-left transition-all ${
                selectedEpisode.id === episode.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <div className="font-semibold text-sm mb-1">{episode.title}</div>
              <div className="text-xs text-gray-600">
                {episode.topic} • {episode.duration}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Player Controls */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
        <h4 className="text-xl font-bold mb-2">{selectedEpisode.title}</h4>
        <p className="text-sm opacity-90 mb-4">
          {selectedEpisode.topic} • {selectedEpisode.duration}
        </p>

        <div className="flex items-center justify-center gap-4 mb-4">
          <button
            onClick={handlePrevious}
            className="p-3 rounded-full bg-white/20 hover:bg-white/30 transition"
          >
            <SkipBack className="w-5 h-5" />
          </button>
          <button
            onClick={handlePlayPause}
            className="p-4 rounded-full bg-white text-blue-600 hover:bg-gray-100 transition"
          >
            {isPlaying ? <Pause className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
          </button>
          <button
            onClick={handleNext}
            className="p-3 rounded-full bg-white/20 hover:bg-white/30 transition"
          >
            <SkipForward className="w-5 h-5" />
          </button>
        </div>

        {/* Speed Control */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <label className="text-sm">Speed:</label>
          {[0.5, 0.75, 1.0, 1.25, 1.5, 2.0].map((s) => (
            <button
              key={s}
              onClick={() => setSpeed(s)}
              className={`px-3 py-1 rounded text-sm ${
                speed === s ? 'bg-white text-blue-600' : 'bg-white/20 hover:bg-white/30'
              }`}
            >
              {s}x
            </button>
          ))}
        </div>

        {/* Progress */}
        <div className="w-full bg-white/20 rounded-full h-2 mb-2">
          <div
            className="bg-white rounded-full h-2 transition-all"
            style={{ width: `${((currentSegment + 1) / selectedEpisode.segments.length) * 100}%` }}
          />
        </div>
        <div className="text-xs text-center opacity-90">
          Segment {currentSegment + 1} of {selectedEpisode.segments.length}
        </div>
      </div>

      {/* Transcript */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-lg font-semibold">Transcript</h4>
          <div className="flex gap-2">
            <button
              onClick={() => setShowTranslation(!showTranslation)}
              className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg"
            >
              {showTranslation ? 'Hide' : 'Show'} Translations
            </button>
            <button
              onClick={downloadTranscript}
              className="px-3 py-1 text-sm bg-blue-500 text-white hover:bg-blue-600 rounded-lg flex items-center gap-1"
            >
              <Download className="w-4 h-4" /> Download
            </button>
          </div>
        </div>

        <div className="space-y-3 max-h-96 overflow-y-auto bg-gray-50 rounded-lg p-4">
          {selectedEpisode.segments.map((segment, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg cursor-pointer transition ${
                index === currentSegment
                  ? 'bg-blue-100 border-2 border-blue-500'
                  : 'bg-white hover:bg-gray-100'
              }`}
              onClick={() => {
                setCurrentSegment(index);
                if (isPlaying) {
                  window.speechSynthesis.cancel();
                  playSegment(index);
                }
              }}
            >
              <div className="flex items-start gap-2">
                <span className="text-xs font-bold text-gray-500">{index + 1}</span>
                <div className="flex-1">
                  <p className={`${segment.language === 'arabic' ? 'text-right' : ''}`}>
                    {segment.text}
                  </p>
                  {showTranslation && segment.translation && (
                    <p className="text-sm text-gray-600 mt-1 italic">
                      {segment.translation}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
