/**
 * Voice Service - Handles Text-to-Speech functionality
 * English TTS only using Web Speech API
 */

export interface VoiceOptions {
  rate?: number; // Speed: 0.1 to 10, default 1
  pitch?: number; // Pitch: 0 to 2, default 1
  volume?: number; // Volume: 0 to 1, default 1
  repeat?: number; // Number of times to repeat, default 1
  lang?: string; // Language code, default 'en-US'
}

class VoiceService {
  private static instance: VoiceService;
  private synthesis: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isPlaying: boolean = false;
  private repeatCount: number = 0;
  private targetRepeats: number = 1;
  private onPlayingChange: ((playing: boolean) => void) | null = null;

  private constructor() {
    if ('speechSynthesis' in window) {
      this.synthesis = window.speechSynthesis;
      
      // Wait for voices to be loaded
      if (this.synthesis.getVoices().length === 0) {
        this.synthesis.addEventListener('voiceschanged', () => {
          console.log('Voices loaded:', this.synthesis?.getVoices().length);
        });
      }
    } else {
      console.warn('Speech Synthesis API not supported in this browser');
    }
  }

  static getInstance(): VoiceService {
    if (!VoiceService.instance) {
      VoiceService.instance = new VoiceService();
    }
    return VoiceService.instance;
  }

  /**
   * Check if Text-to-Speech is supported
   */
  isSupported(): boolean {
    return this.synthesis !== null;
  }

  /**
   * Speak text with specified options
   */
  speak(text: string, options: VoiceOptions = {}): void {
    if (!this.synthesis || !text) {
      console.warn('Speech synthesis not supported or empty text');
      return;
    }

    // Stop any ongoing speech
    this.stop();

    // Small delay to ensure clean state after cancellation
    setTimeout(() => {
      const {
        rate = 1,
        pitch = 1,
        volume = 1,
        repeat = 1,
        lang = 'en-US'
      } = options;

      this.targetRepeats = repeat;
      this.repeatCount = 0;
      this.isPlaying = true;
      this.notifyPlayingChange(true);

      this.speakOnce(text, { rate, pitch, volume, lang });
    }, 100); // 100ms delay to prevent rapid-fire calls
  }

  /**
   * Speak text once
   */
  private speakOnce(text: string, options: VoiceOptions): void {
    if (!this.synthesis) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = options.rate || 1;
    utterance.pitch = options.pitch || 1;
    utterance.volume = options.volume || 1;
    utterance.lang = options.lang || 'en-US';

    // Event handlers
    utterance.onend = () => {
      this.repeatCount++;
      if (this.repeatCount < this.targetRepeats) {
        // Repeat
        setTimeout(() => {
          this.speakOnce(text, options);
        }, 300); // Small delay between repeats
      } else {
        // Finished all repeats
        this.isPlaying = false;
        this.currentUtterance = null;
        this.notifyPlayingChange(false);
      }
    };

    utterance.onerror = (event) => {
      // Improved error handling with specific error types
      const errorEvent = event as SpeechSynthesisErrorEvent
      const errorType = errorEvent.error || 'unknown'
      
      // Suppress common non-critical errors
      if (errorType === 'interrupted' || errorType === 'canceled') {
        // User interrupted or canceled - not a real error
        console.log('Speech interrupted by user')
      } else if (errorType === 'network') {
        console.warn('Speech synthesis network error - check internet connection')
      } else if (errorType === 'not-allowed') {
        console.warn('Speech synthesis not allowed - check browser permissions')
      } else {
        console.error('Speech synthesis error:', errorType)
      }
      
      this.isPlaying = false
      this.currentUtterance = null
      this.notifyPlayingChange(false)
    };

    this.currentUtterance = utterance;
    this.synthesis.speak(utterance);
  }

  /**
   * Pause current speech
   */
  pause(): void {
    if (this.synthesis && this.isPlaying) {
      this.synthesis.pause();
    }
  }

  /**
   * Resume paused speech
   */
  resume(): void {
    if (this.synthesis) {
      this.synthesis.resume();
    }
  }

  /**
   * Stop current speech
   */
  stop(): void {
    if (this.synthesis) {
      this.synthesis.cancel();
      this.isPlaying = false;
      this.currentUtterance = null;
      this.repeatCount = 0;
      this.notifyPlayingChange(false);
    }
  }

  /**
   * Check if currently playing
   */
  getIsPlaying(): boolean {
    return this.isPlaying;
  }

  /**
   * Set callback for playing state changes
   */
  setOnPlayingChange(callback: (playing: boolean) => void): void {
    this.onPlayingChange = callback;
  }

  /**
   * Notify playing state change
   */
  private notifyPlayingChange(playing: boolean): void {
    if (this.onPlayingChange) {
      this.onPlayingChange(playing);
    }
  }

  /**
   * Get available voices (for future enhancement)
   */
  getVoices(): SpeechSynthesisVoice[] {
    if (this.synthesis) {
      return this.synthesis.getVoices().filter(voice => voice.lang.startsWith('en'));
    }
    return [];
  }

  /**
   * Set specific voice by name
   */
  setVoice(voiceName: string): void {
    if (this.currentUtterance) {
      const voices = this.getVoices();
      const voice = voices.find(v => v.name === voiceName);
      if (voice) {
        this.currentUtterance.voice = voice;
      }
    }
  }
}

export default VoiceService.getInstance();
