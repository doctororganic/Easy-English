/**
 * VoiceButton Component
 * Reusable button for text-to-speech functionality
 */

import { useState, useEffect } from 'react';
import { Volume2, VolumeX, Loader2 } from 'lucide-react';
import voiceService from '../../services/voiceService';
import { Button } from '../ui/button';

interface VoiceButtonProps {
  text: string;
  rate?: number;
  repeat?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outline' | 'ghost';
  className?: string;
  showLabel?: boolean;
}

export function VoiceButton({
  text,
  rate = 1,
  repeat = 1,
  size = 'md',
  variant = 'default',
  className = '',
  showLabel = false
}: VoiceButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Subscribe to voice service playing state
    voiceService.setOnPlayingChange(setIsPlaying);
    
    return () => {
      voiceService.stop();
    };
  }, []);

  const handleClick = () => {
    if (!voiceService.isSupported()) {
      alert('Text-to-speech is not supported in your browser');
      return;
    }

    if (isPlaying) {
      voiceService.stop();
      setIsPlaying(false);
    } else {
      setIsLoading(true);
      try {
        voiceService.speak(text, { rate, repeat, lang: 'en-US' });
        setTimeout(() => setIsLoading(false), 100);
      } catch (error) {
        console.error('Voice error:', error);
        setIsLoading(false);
      }
    }
  };

  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12'
  };

  const iconSize = {
    sm: 16,
    md: 20,
    lg: 24
  };

  return (
    <Button
      onClick={handleClick}
      variant={variant}
      size="icon"
      className={`${sizeClasses[size]} ${className} ${isPlaying ? 'voice-playing' : ''}`}
      title={isPlaying ? 'Stop' : 'Play'}
      disabled={isLoading || !text}
    >
      {isLoading ? (
        <Loader2 className="animate-spin" size={iconSize[size]} />
      ) : isPlaying ? (
        <VolumeX size={iconSize[size]} />
      ) : (
        <Volume2 size={iconSize[size]} />
      )}
      {showLabel && (
        <span className="ml-2">{isPlaying ? 'Stop' : 'Listen'}</span>
      )}
    </Button>
  );
}
