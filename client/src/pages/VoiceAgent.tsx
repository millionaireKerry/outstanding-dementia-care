import { useState, useRef, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Send, Loader2, Volume2 } from "lucide-react";
import { toast } from "sonner";
import { Streamdown } from "streamdown";


type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function VoiceAgent() {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const transcribeMutation = trpc.voice.transcribe.useMutation();
  const chatMutation = trpc.voice.chat.useMutation();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        
        // Check file size (16MB limit)
        if (audioBlob.size > 16 * 1024 * 1024) {
          toast.error("Recording too large. Please keep recordings under 16MB.");
          return;
        }

        await processAudio(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      toast.success("Recording started");
    } catch (error) {
      console.error("Error starting recording:", error);
      toast.error("Failed to start recording. Please check microphone permissions.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      toast.info("Processing your recording...");
    }
  };

  const uploadMutation = trpc.upload.uploadFile.useMutation();

  const processAudio = async (audioBlob: Blob) => {
    setIsProcessing(true);
    
    try {
      // Convert blob to base64
      const arrayBuffer = await audioBlob.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      let binary = '';
      for (let i = 0; i < uint8Array.byteLength; i++) {
        binary += String.fromCharCode(uint8Array[i]);
      }
      const base64Data = btoa(binary);
      const fileName = `voice-recordings/recording-${Date.now()}.webm`;

      // Upload audio to S3
      const uploadResult = await uploadMutation.mutateAsync({
        fileData: base64Data,
        fileName,
        contentType: 'audio/webm',
      });

      if (!uploadResult.success || !uploadResult.url) {
        throw new Error('Failed to upload audio');
      }

      // Transcribe the uploaded audio
      const transcribeResult = await transcribeMutation.mutateAsync({
        audioUrl: uploadResult.url,
      });

      if (!transcribeResult.success || !transcribeResult.transcript) {
        throw new Error('Failed to transcribe audio');
      }

      const transcript = transcribeResult.transcript;
      toast.success(`Heard: "${transcript.slice(0, 60)}${transcript.length > 60 ? '...' : ''}"`); 

      // Add user message and get AI response
      const userMessage: Message = { role: 'user', content: transcript };
      setMessages(prev => [...prev, userMessage]);
      await getAIResponse(transcript);
    } catch (error) {
      console.error("Error processing audio:", error);
      toast.error("Failed to process audio. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const getAIResponse = async (userMessage: string) => {
    try {
      const conversationHistory = messages.map(msg => ({
        role: msg.role,
        content: msg.content,
      }));

      const response = await chatMutation.mutateAsync({
        message: userMessage,
        conversationHistory,
      });

      if (response.success && typeof response.response === 'string') {
        const assistantMessage: Message = {
          role: "assistant",
          content: response.response,
        };
        setMessages(prev => [...prev, assistantMessage]);
      }
    } catch (error) {
      console.error("Error getting AI response:", error);
      toast.error("Failed to get response. Please try again.");
    }
  };

  const handleTextSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isProcessing) return;

    const userMessage: Message = {
      role: "user",
      content: inputText.trim(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputText("");
    setIsProcessing(true);

    await getAIResponse(userMessage.content);
    setIsProcessing(false);
  };
  useEffect(() => {
    document.title = "Voice Assistant | Outstanding Dementia Care";
    return () => { document.title = "Outstanding Dementia Care - Resources for Carers"; };
  }, []);


  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center retro-border">
              <Volume2 size={32} className="text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 retro-heading text-foreground">
            Dementia Pocket Expert
          </h1>
          <p className="text-lg text-muted-foreground">
            Your AI-powered voice assistant for dementia care guidance
          </p>
        </div>

        {/* Chat Interface */}
        <div className="retro-card p-6 mb-6 bg-card min-h-[400px] max-h-[500px] overflow-y-auto">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <Mic size={48} className="text-muted-foreground/40 mb-4" />
              <p className="text-muted-foreground mb-2">
                Start a conversation by recording your question or typing below
              </p>
              <p className="text-sm text-muted-foreground/60">
                Ask about dementia care, communication strategies, or carer support
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-4 rounded-lg ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    {message.role === "assistant" ? (
                      <Streamdown>{message.content}</Streamdown>
                    ) : (
                      <p>{message.content}</p>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Voice Recording Controls */}
        <div className="flex justify-center mb-6">
          <Button
            onClick={isRecording ? stopRecording : startRecording}
            disabled={isProcessing}
            size="lg"
            className={`retro-button ${
              isRecording
                ? "bg-destructive text-destructive-foreground animate-pulse"
                : "bg-accent text-accent-foreground"
            }`}
          >
            {isRecording ? (
              <>
                <MicOff className="mr-2" size={24} />
                Stop Recording
              </>
            ) : isProcessing ? (
              <>
                <Loader2 className="mr-2 animate-spin" size={24} />
                Processing...
              </>
            ) : (
              <>
                <Mic className="mr-2" size={24} />
                Start Recording
              </>
            )}
          </Button>
        </div>

        {/* Text Input */}
        <form onSubmit={handleTextSubmit} className="flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Or type your question here..."
            disabled={isProcessing}
            className="flex-1 px-4 py-3 rounded-lg border-2 border-charcoal bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Button
            type="submit"
            disabled={!inputText.trim() || isProcessing}
            className="retro-button bg-primary text-primary-foreground"
          >
            <Send size={20} />
          </Button>
        </form>

        {/* Info Section */}
        <div className="mt-8 p-6 bg-mint/20 rounded-lg border-2 border-mint">
          <h3 className="text-lg font-bold mb-2 text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
            How to use
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Click "Start Recording" and speak your question clearly</li>
            <li>• Click "Stop Recording" when finished</li>
            <li>• Or type your question in the text box below</li>
            <li>• The AI will provide expert guidance based on dementia care best practices</li>
            <li>• For medical advice, always consult healthcare professionals</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
