/**
 * Listen and Learn Component
 * Text-to-speech functionality for English learning with repetition and speed controls
 */

import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2, Settings, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Slider } from '../ui/slider';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Separator } from '../ui/separator';

interface AudioSettings {
  speed: number;
  repetition: number;
  voice: string;
  volume: number;
}

export function ListenAndLearnPage() {
  const [inputText, setInputText] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioSettings, setAudioSettings] = useState<AudioSettings>({
    speed: 1.0,
    repetition: 1,
    voice: 'female-1',
    volume: 5.0
  });
  const [availableVoices, setAvailableVoices] = useState<any[]>([]);
  const [generatedAudios, setGeneratedAudios] = useState<string[]>([]);
  const [currentAudioIndex, setCurrentAudioIndex] = useState(0);
  const [customTexts, setCustomTexts] = useState<string[]>([
    "Hello! Welcome to English learning. This is a sample text to help you practice pronunciation.",
    "The quick brown fox jumps over the lazy dog. This sentence contains every letter of the alphabet.",
    "Learning English requires practice, patience, and dedication. Keep working hard every day!"
  ]);

  // Load available voices on component mount
  useEffect(() => {
    loadVoices();
  }, []);

  const loadVoices = async () => {
    try {
      // Use browser's speech synthesis voices
      const voices = window.speechSynthesis.getVoices();
      const formattedVoices = voices.map(voice => ({
        voice_id: voice.name,
        name: `${voice.name} (${voice.lang})`,
        language: voice.lang
      }));
      setAvailableVoices(formattedVoices);
      if (formattedVoices.length > 0) {
        setAudioSettings(prev => ({
          ...prev,
          voice: formattedVoices[0].voice_id
        }));
      }
    } catch (error) {
      console.error('Error loading voices:', error);
      // Set default voices if browser API fails
      setAvailableVoices([
        { voice_id: 'default', name: 'System Default Voice' },
        { voice_id: 'female-1', name: 'Female Voice 1' },
        { voice_id: 'male-1', name: 'Male Voice 1' }
      ]);
    }
  };

  const generateAudio = async (text: string, count: number = 1) => {
    if (!text.trim()) return;

    try {
      setIsPlaying(true);
      const outputFiles: string[] = [];
      
      // Generate multiple audio files for repetition
      for (let i = 0; i < count; i++) {
        const fileName = `listen_learn_audio_${Date.now()}_${i}.mp3`;
        outputFiles.push(fileName);
        
        // For now, we'll generate a single file and handle repetition in the UI
        // In a real implementation, you might want to generate multiple files
        await generateSingleAudio(text, fileName);
      }
      
      setGeneratedAudios(outputFiles);
      setCurrentAudioIndex(0);
      
    } catch (error) {
      console.error('Error generating audio:', error);
      setIsPlaying(false);
    }
  };

  const generateSingleAudio = async (text: string, fileName: string) => {
    try {
      // Use browser's speech synthesis
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        
        // Find the selected voice
        const voices = window.speechSynthesis.getVoices();
        const selectedVoice = voices.find(voice => voice.name === audioSettings.voice);
        if (selectedVoice) {
          utterance.voice = selectedVoice;
        }
        
        // Set speech parameters
        utterance.rate = audioSettings.speed;
        utterance.volume = audioSettings.volume / 10; // Convert 0-10 to 0-1
        
        utterance.onend = () => {
          setIsPlaying(false);
        };
        
        utterance.onerror = (event) => {
          console.error('Speech synthesis error:', event);
          setIsPlaying(false);
        };
        
        window.speechSynthesis.speak(utterance);
      } else {
        console.warn('Speech synthesis not supported in this browser');
        setIsPlaying(false);
      }
    } catch (error) {
      console.error('Error generating audio:', error);
      setIsPlaying(false);
    }
  };

  const playAudio = () => {
    if (inputText.trim()) {
      setIsPlaying(true);
      generateSingleAudio(inputText.trim(), 'temp_audio');
    }
  };

  const pauseAudio = () => {
    setIsPlaying(false);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  const resetAudio = () => {
    setCurrentAudioIndex(0);
    setIsPlaying(false);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  const handleTextChange = (value: string) => {
    setInputText(value);
  };

  const handleGenerateAndPlay = () => {
    if (inputText.trim()) {
      generateAudio(inputText.trim(), audioSettings.repetition);
    }
  };

  const selectPresetText = (text: string) => {
    setInputText(text);
  };

  const handleSettingChange = (key: keyof AudioSettings, value: number | string) => {
    setAudioSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-gradient-purple-blue">
            Listen & Learn
          </h1>
          <p className="text-xl text-muted-foreground">
            Practice English pronunciation with text-to-speech technology
          </p>
        </div>

        <Tabs defaultValue="practice" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="practice">Practice Mode</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="practice" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Text Input Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Enter Your Text
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    placeholder="Type or paste your English text here for pronunciation practice..."
                    value={inputText}
                    onChange={(e) => handleTextChange(e.target.value)}
                    className="min-h-[120px] resize-none"
                    maxLength={500}
                  />
                  <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <span>{inputText.length}/500 characters</span>
                    <Badge variant={inputText.length > 400 ? "destructive" : "secondary"}>
                      {audioSettings.repetition}x repetition
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Audio Controls */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Volume2 className="w-5 h-5" />
                    Audio Controls
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Button 
                      onClick={handleGenerateAndPlay}
                      disabled={!inputText.trim() || isPlaying}
                      className="flex-1"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Generate & Play
                    </Button>
                    <Button 
                      onClick={isPlaying ? pauseAudio : playAudio}
                      variant="outline"
                      disabled={generatedAudios.length === 0}
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>
                    <Button 
                      onClick={resetAudio}
                      variant="outline"
                      disabled={generatedAudios.length === 0}
                    >
                      <RotateCcw className="w-4 h-4" />
                    </Button>
                  </div>

                  {generatedAudios.length > 0 && (
                    <div className="p-4 bg-muted rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Audio Status</span>
                        <Badge variant={isPlaying ? "default" : "secondary"}>
                          {isPlaying ? "Playing" : "Ready"}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {currentAudioIndex + 1} of {audioSettings.repetition} repetitions
                      </div>
                      <div className="w-full bg-background rounded-full h-2 mt-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all"
                          style={{ width: `${((currentAudioIndex + 1) / audioSettings.repetition) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Quick Settings */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Speed: {audioSettings.speed}x</span>
                      <Slider
                        value={[audioSettings.speed]}
                        onValueChange={(value) => handleSettingChange('speed', value[0])}
                        min={0.5}
                        max={2.0}
                        step={0.1}
                        className="w-32"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Volume: {audioSettings.volume}</span>
                      <Slider
                        value={[audioSettings.volume]}
                        onValueChange={(value) => handleSettingChange('volume', value[0])}
                        min={0.0}
                        max={10.0}
                        step={0.5}
                        className="w-32"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Repetition: {audioSettings.repetition}x</span>
                      <Slider
                        value={[audioSettings.repetition]}
                        onValueChange={(value) => handleSettingChange('repetition', value[0])}
                        min={1}
                        max={10}
                        step={1}
                        className="w-32"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Preset Texts */}
            <Card>
              <CardHeader>
                <CardTitle>Practice Sentences</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Click on any sentence below to use it for practice
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {customTexts.map((text, index) => (
                    <div
                      key={index}
                      onClick={() => selectPresetText(text)}
                      className="p-3 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                    >
                      <p className="text-sm">{text}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Voice Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Voice Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Voice Selection</label>
                    <select 
                      value={audioSettings.voice}
                      onChange={(e) => handleSettingChange('voice', e.target.value)}
                      className="w-full p-2 border rounded-md bg-background"
                    >
                      {availableVoices.map((voice, index) => (
                        <option key={index} value={voice.voice_id}>
                          {voice.name || `Voice ${index + 1}`}
                        </option>
                      ))}
                    </select>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Speech Speed</span>
                        <span className="text-sm text-muted-foreground">{audioSettings.speed}x</span>
                      </div>
                      <Slider
                        value={[audioSettings.speed]}
                        onValueChange={(value) => handleSettingChange('speed', value[0])}
                        min={0.5}
                        max={2.0}
                        step={0.1}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>0.5x (Slow)</span>
                        <span>2.0x (Fast)</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Volume</span>
                        <span className="text-sm text-muted-foreground">{audioSettings.volume}/10</span>
                      </div>
                      <Slider
                        value={[audioSettings.volume]}
                        onValueChange={(value) => handleSettingChange('volume', value[0])}
                        min={0.0}
                        max={10.0}
                        step={0.5}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>0 (Silent)</span>
                        <span>10 (Maximum)</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Repetition Count</span>
                        <span className="text-sm text-muted-foreground">{audioSettings.repetition} times</span>
                      </div>
                      <Slider
                        value={[audioSettings.repetition]}
                        onValueChange={(value) => handleSettingChange('repetition', value[0])}
                        min={1}
                        max={10}
                        step={1}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>1 (No repeat)</span>
                        <span>10 (Max repeat)</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Practice Tips */}
              <Card>
                <CardHeader>
                  <CardTitle>Practice Tips</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                      <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-1">
                        📚 Start Simple
                      </h4>
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        Begin with short sentences and gradually work towards longer texts.
                      </p>
                    </div>

                    <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                      <h4 className="font-medium text-green-900 dark:text-green-100 mb-1">
                        🔄 Use Repetition
                      </h4>
                      <p className="text-sm text-green-700 dark:text-green-300">
                        Listen multiple times to improve your pronunciation and rhythm.
                      </p>
                    </div>

                    <div className="p-3 bg-purple-50 dark:bg-purple-950 rounded-lg">
                      <h4 className="font-medium text-purple-900 dark:text-purple-100 mb-1">
                        🎯 Focus on Rhythm
                      </h4>
                      <p className="text-sm text-purple-700 dark:text-purple-300">
                        Pay attention to stress patterns and intonation in English.
                      </p>
                    </div>

                    <div className="p-3 bg-orange-50 dark:bg-orange-950 rounded-lg">
                      <h4 className="font-medium text-orange-900 dark:text-orange-100 mb-1">
                        📖 Practice Daily
                      </h4>
                      <p className="text-sm text-orange-700 dark:text-orange-300">
                        Consistent practice for 10-15 minutes daily yields the best results.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}