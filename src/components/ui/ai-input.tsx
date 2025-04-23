import * as React from 'react';
import { Sparkles } from 'lucide-react';

import { Button } from './button';
import { Input, InputProps } from './input';
import { Textarea, TextareaProps } from './textarea';
import { mockAIResponse } from '@/lib/utils';

interface BaseAIFieldProps {
  value: string;
  onChange: (value: string) => void;
  aiPrompt: string;
  label?: string;
  className?: string;
  placeholder?: string;
}

interface AIInputProps extends BaseAIFieldProps {
  multiline?: false;
  inputProps?: Omit<InputProps, 'value' | 'onChange' | 'label' | 'className' | 'placeholder'>;
}

interface AITextareaProps extends BaseAIFieldProps {
  multiline: true;
  textareaProps?: Omit<TextareaProps, 'value' | 'onChange' | 'label' | 'className' | 'placeholder'>;
}

type AIFieldProps = AIInputProps | AITextareaProps;

export function AIField(props: AIFieldProps) {
  const { value, onChange, aiPrompt, multiline, label, className, placeholder } = props;
  const [isGenerating, setIsGenerating] = React.useState(false);

  const handleGenerateContent = async () => {
    try {
      setIsGenerating(true);
      // In a real app, this would call an API endpoint
      // For now, we'll use a mock function that returns dummy responses
      const generatedContent = await mockAIResponse(aiPrompt);
      onChange(generatedContent);
    } catch (error) {
      console.error('Error generating content:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-1">
        {label && <span className="text-sm font-medium text-[#2C3138]">{label}</span>}
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-2 text-xs"
          onClick={handleGenerateContent}
          isLoading={isGenerating}
          disabled={isGenerating}
          type="button"
        >
          {!isGenerating && <Sparkles className="mr-1 h-3.5 w-3.5" />}
          {isGenerating ? 'Generating...' : 'Generate with AI'}
        </Button>
      </div>
      {multiline ? (
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={className}
          placeholder={placeholder}
          {...('textareaProps' in props ? props.textareaProps : {})}
        />
      ) : (
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={className}
          placeholder={placeholder}
          {...('inputProps' in props ? props.inputProps : {})}
        />
      )}
    </div>
  );
} 