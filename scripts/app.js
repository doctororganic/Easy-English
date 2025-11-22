// Main Application JavaScript
class EnglishTutorApp {
    constructor() {
        this.currentSection = 'dashboard';
        this.isRecording = false;
        this.mediaRecorder = null;
        this.audioChunks = [];
        this.currentLanguage = 'en';
        this.recognition = null;
        this.synthesis = window.speechSynthesis;
        this.currentFeedback = [];
        this.currentScore = 0;
        
        // Initialize the application
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupSpeechRecognition();
        this.setupNavigation();
        this.setupSpeakingPractice();
        this.setupConversation();
        this.setupPodcastStudio();
        this.setupAnalytics();
        this.loadSavedData();
        
        // Hide loading screen after initialization
        setTimeout(() => {
            document.getElementById('loading-screen').classList.add('hidden');
        }, 2000);
    }

    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const section = e.currentTarget.dataset.section;
                this.switchSection(section);
            });
        });

        // Quick action buttons
        document.querySelectorAll('.action-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const section = e.currentTarget.dataset.section;
                if (section) {
                    this.switchSection(section);
                }
            });
        });

        // Language toggle
        document.getElementById('lang-toggle').addEventListener('click', () => {
            this.toggleLanguage();
        });

        // Mobile sidebar toggle
        document.addEventListener('click', (e) => {
            const sidebar = document.getElementById('sidebar');
            const hamburger = document.querySelector('.hamburger-menu');
            
            if (window.innerWidth <= 1024 && !sidebar.contains(e.target) && !hamburger?.contains(e.target)) {
                sidebar.classList.remove('open');
            }
        });
    }

    setupSpeechRecognition() {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            this.recognition = new SpeechRecognition();
            
            this.recognition.continuous = true;
            this.recognition.interimResults = true;
            this.recognition.lang = 'en-US';
            
            this.recognition.onresult = (event) => {
                let finalTranscript = '';
                let interimTranscript = '';
                
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    const transcript = event.results[i][0].transcript;
                    if (event.results[i].isFinal) {
                        finalTranscript += transcript;
                    } else {
                        interimTranscript += transcript;
                    }
                }
                
                this.displayRealTimeFeedback(finalTranscript + interimTranscript);
            };
            
            this.recognition.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                this.stopRecording();
            };
            
            this.recognition.onend = () => {
                if (this.isRecording) {
                    this.recognition.start();
                }
            };
        } else {
            console.warn('Speech recognition not supported in this browser');
        }
    }

    setupNavigation() {
        // Initialize progress rings animation
        this.animateProgressRings();
        
        // Set initial greeting
        this.updateGreeting();
    }

    setupSpeakingPractice() {
        // Practice module buttons
        document.querySelectorAll('.start-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const module = e.currentTarget.dataset.module;
                this.startPractice(module);
            });
        });

        // Recording controls
        document.getElementById('start-recording').addEventListener('click', () => {
            this.startRecording();
        });

        document.getElementById('stop-recording').addEventListener('click', () => {
            this.stopRecording();
        });

        document.getElementById('play-audio').addEventListener('click', () => {
            this.playRecording();
        });

        document.getElementById('close-practice').addEventListener('click', () => {
            this.closePractice();
        });

        document.getElementById('next-phrase').addEventListener('click', () => {
            this.nextPhrase();
        });

        // Initialize practice scripts
        this.initializePracticeScripts();
    }

    setupConversation() {
        // Topic selection
        document.querySelectorAll('.topic-item').forEach(item => {
            item.addEventListener('click', (e) => {
                document.querySelectorAll('.topic-item').forEach(t => t.classList.remove('active'));
                e.currentTarget.classList.add('active');
                this.changeConversationTopic(e.currentTarget.dataset.topic);
            });
        });

        // Message sending
        document.getElementById('send-message').addEventListener('click', () => {
            this.sendMessage();
        });

        document.getElementById('chat-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // Voice input
        document.getElementById('voice-input').addEventListener('click', () => {
            this.toggleVoiceInput();
        });

        // Language toggle for conversation
        document.getElementById('toggle-language').addEventListener('click', () => {
            this.toggleConversationLanguage();
        });
    }

    setupPodcastStudio() {
        document.getElementById('generate-podcast').addEventListener('click', () => {
            this.generatePodcast();
        });

        document.getElementById('play-podcast').addEventListener('click', () => {
            this.playPodcast();
        });

        document.getElementById('analyze-podcast').addEventListener('click', () => {
            this.analyzePodcast();
        });

        document.getElementById('download-podcast').addEventListener('click', () => {
            this.downloadPodcast();
        });
    }

    setupAnalytics() {
        this.renderCharts();
    }

    switchSection(sectionName) {
        // Update navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`[data-section="${sectionName}"]`).classList.add('active');

        // Update content sections
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(`${sectionName}-section`).classList.add('active');

        this.currentSection = sectionName;

        // Initialize section-specific features
        switch (sectionName) {
            case 'speaking':
                this.initializeSpeakingSection();
                break;
            case 'conversation':
                this.initializeConversationSection();
                break;
            case 'podcast':
                this.initializePodcastSection();
                break;
            case 'pronunciation':
                this.initializePronunciationSection();
                break;
            case 'vocabulary':
                this.initializeVocabularySection();
                break;
            case 'analytics':
                this.updateAnalytics();
                break;
        }
    }

    toggleLanguage() {
        const isArabic = document.body.dir === 'rtl';
        
        if (isArabic) {
            document.body.dir = 'ltr';
            document.body.lang = 'en';
            document.getElementById('lang-toggle').querySelector('span').textContent = 'العربية';
        } else {
            document.body.dir = 'rtl';
            document.body.lang = 'ar';
            document.getElementById('lang-toggle').querySelector('span').textContent = 'English';
        }
        
        // Update synthesis language
        if (this.synthesis) {
            this.synthesis.cancel();
        }
    }

    async startRecording() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            this.mediaRecorder = new MediaRecorder(stream);
            this.audioChunks = [];

            this.mediaRecorder.ondataavailable = (event) => {
                this.audioChunks.push(event.data);
            };

            this.mediaRecorder.onstop = () => {
                this.processRecording();
            };

            this.mediaRecorder.start();
            this.isRecording = true;
            this.updateRecordingUI(true);

            // Start speech recognition if available
            if (this.recognition) {
                this.recognition.start();
            }

        } catch (error) {
            console.error('Error accessing microphone:', error);
            alert('Unable to access microphone. Please check permissions.');
        }
    }

    stopRecording() {
        if (this.mediaRecorder && this.isRecording) {
            this.mediaRecorder.stop();
            this.isRecording = false;
            this.updateRecordingUI(false);

            // Stop speech recognition
            if (this.recognition) {
                this.recognition.stop();
            }

            // Stop all tracks to release microphone
            this.mediaRecorder.stream.getTracks().forEach(track => track.stop());
        }
    }

    updateRecordingUI(isRecording) {
        const startBtn = document.getElementById('start-recording');
        const stopBtn = document.getElementById('stop-recording');
        const feedback = document.getElementById('feedback-display');

        if (isRecording) {
            startBtn.classList.add('hidden');
            stopBtn.classList.remove('hidden');
            feedback.classList.remove('hidden');
            startBtn.textContent = 'Recording...';
            startBtn.classList.add('recording');
        } else {
            startBtn.classList.remove('hidden');
            stopBtn.classList.add('hidden');
            startBtn.textContent = 'Start Recording';
            startBtn.classList.remove('recording');
        }
    }

    displayRealTimeFeedback(transcript) {
        const feedbackText = document.getElementById('feedback-text');
        const words = transcript.trim().split(' ');
        
        feedbackText.innerHTML = '';
        
        words.forEach(word => {
            const span = document.createElement('span');
            span.textContent = word + ' ';
            span.className = this.getWordFeedbackClass(word);
            feedbackText.appendChild(span);
        });
    }

    getWordFeedbackClass(word) {
        // Simple scoring algorithm - in real app, this would use more sophisticated NLP
        const score = Math.random() * 100; // Mock score for demo
        
        if (score > 80) {
            return 'feedback-word correct';
        } else if (score > 60) {
            return 'feedback-word near-miss';
        } else {
            return 'feedback-word incorrect';
        }
    }

    processRecording() {
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        
        // Show play button
        document.getElementById('play-audio').classList.remove('hidden');
        
        // Store audio for playback
        this.lastRecording = audioUrl;
        
        // Calculate score based on speech recognition results
        this.calculateScore();
    }

    playRecording() {
        if (this.lastRecording) {
            const audio = new Audio(this.lastRecording);
            audio.play();
        }
    }

    calculateScore() {
        // Mock scoring - in real app, this would analyze actual pronunciation
        this.currentScore = Math.floor(Math.random() * 30) + 70; // Random score between 70-100
        document.getElementById('current-score').textContent = this.currentScore + '%';
    }

    startPractice(module) {
        document.getElementById('practice-interface').classList.remove('hidden');
        document.getElementById('practice-interface').classList.add('fade-in');
        
        const titles = {
            daily: 'Daily Conversation Practice',
            business: 'Business English Practice',
            pronunciation: 'Pronunciation Drill'
        };
        
        document.getElementById('practice-title').textContent = titles[module];
        this.currentPracticeModule = module;
        this.loadNextPhrase();
    }

    closePractice() {
        document.getElementById('practice-interface').classList.add('hidden');
        this.stopRecording();
    }

    nextPhrase() {
        this.loadNextPhrase();
        document.getElementById('current-score').textContent = '--';
        document.getElementById('feedback-text').innerHTML = '';
        document.getElementById('play-audio').classList.add('hidden');
    }

    initializePracticeScripts() {
        this.practiceScripts = {
            daily: [
                "Hello, how are you today?",
                "I'm doing well, thank you for asking.",
                "What are your plans for the weekend?",
                "I need to go grocery shopping tomorrow.",
                "The weather is beautiful today, isn't it?"
            ],
            business: [
                "I'd like to schedule a meeting for next week.",
                "Could you please send me the quarterly report?",
                "We're looking to expand our market presence.",
                "The project deadline is approaching quickly.",
                "Let's discuss the budget allocation for this quarter."
            ],
            pronunciation: [
                "The quick brown fox jumps over the lazy dog.",
                "She sells seashells by the seashore.",
                "Red lorry, yellow lorry.",
                "Three thin thieves thought they thought."
            ]
        };
    }

    loadNextPhrase() {
        if (this.currentPracticeModule && this.practiceScripts[this.currentPracticeModule]) {
            const scripts = this.practiceScripts[this.currentPracticeModule];
            const randomScript = scripts[Math.floor(Math.random() * scripts.length)];
            document.getElementById('current-script').textContent = randomScript;
        }
    }

    sendMessage() {
        const input = document.getElementById('chat-input');
        const message = input.value.trim();
        
        if (message) {
            this.addMessage(message, 'user');
            input.value = '';
            
            // Simulate AI response
            setTimeout(() => {
                this.generateAIResponse(message);
            }, 1000);
        }
    }

    addMessage(content, sender) {
        const chatMessages = document.getElementById('chat-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.innerHTML = sender === 'ai' ? '<i class="fas fa-robot"></i>' : '<i class="fas fa-user"></i>';
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.innerHTML = `<p>${content}</p>`;
        
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(contentDiv);
        chatMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Add animation
        messageDiv.classList.add('fade-in');
    }

    generateAIResponse(userMessage) {
        const responses = [
            "That's an interesting point! Can you tell me more about that?",
            "I understand your perspective. What do you think would be the best approach?",
            "Great question! In my experience, there are several ways to look at this.",
            "That's a valid concern. Let's explore some solutions together.",
            "Interesting! How did you come to that conclusion?",
            "I appreciate you sharing that with me. What aspects would you like to discuss further?"
        ];
        
        const response = responses[Math.floor(Math.random() * responses.length)];
        this.addMessage(response, 'ai');
        
        // If voice input is enabled, speak the response
        if (document.getElementById('voice-input').classList.contains('active')) {
            this.speakText(response);
        }
    }

    toggleVoiceInput() {
        const btn = document.getElementById('voice-input');
        btn.classList.toggle('active');
        
        if (btn.classList.contains('active')) {
            this.startVoiceRecognition();
        } else {
            this.stopVoiceRecognition();
        }
    }

    startVoiceRecognition() {
        if (this.recognition) {
            this.recognition.start();
            document.getElementById('chat-input').placeholder = 'Listening...';
        }
    }

    stopVoiceRecognition() {
        if (this.recognition) {
            this.recognition.stop();
            document.getElementById('chat-input').placeholder = 'Type your message or use voice input...';
        }
    }

    toggleConversationLanguage() {
        const btn = document.getElementById('toggle-language');
        const currentLang = btn.textContent.trim();
        
        if (currentLang === 'EN') {
            btn.textContent = 'AR';
            this.currentLanguage = 'ar';
        } else {
            btn.textContent = 'EN';
            this.currentLanguage = 'en';
        }
    }

    changeConversationTopic(topic) {
        const welcomeMessages = {
            general: "Let's have a casual conversation. What's on your mind today?",
            travel: "I'd love to hear about your travel experiences! What's the most interesting place you've visited?",
            business: "Let's discuss business topics. What challenges are you facing in your professional life?",
            casual: "This is just a friendly chat. How has your day been going?"
        };
        
        document.getElementById('chat-messages').innerHTML = `
            <div class="message ai-message">
                <div class="message-avatar">
                    <i class="fas fa-robot"></i>
                </div>
                <div class="message-content">
                    <p>${welcomeMessages[topic]}</p>
                </div>
            </div>
        `;
    }

    async generatePodcast() {
        const language = document.getElementById('podcast-language').value;
        const topic = document.getElementById('podcast-topic').value;
        const duration = document.getElementById('podcast-duration').value;
        
        if (!topic) {
            alert('Please enter a podcast topic');
            return;
        }
        
        const script = await this.createPodcastScript(topic, duration, language);
        document.getElementById('script-content').innerHTML = script;
        
        // Enable action buttons
        document.getElementById('play-podcast').disabled = false;
        document.getElementById('analyze-podcast').disabled = false;
        document.getElementById('download-podcast').disabled = false;
    }

    async createPodcastScript(topic, duration, language) {
        const languageName = language === 'en' ? 'English' : language === 'ar' ? 'Arabic' : 'Bilingual';
        const durationText = duration === '3' ? 'three minutes' : duration === '5' ? 'five minutes' : 'ten minutes';
        
        if (language === 'ar') {
            return `
مرحباً بكم في برنامجنا التعليمي لتعلم الإنجليزية!

موضوع اليوم: ${topic}
مدة البودكاست: ${durationText}

سنتحدث اليوم عن موضوع مهم جداً في تعلم اللغة الإنجليزية. ${topic} هو موضوع واسع ومفيد للطلاب المتوسطين والمتقدمين.

أولاً، دعونا نفهم المعنى الأساسي لـ ${topic}. في السياق التعليمي،${topic} يساعد الطلاب على تطوير مهاراتهم في المحادثة والكتابة.

ثانياً، سنتعلم بعض العبارات المفيدة. عندما تريد التحدث عن ${topic}، يمكنك استخدام العبارات التالية:

- "Let's discuss ${topic} in detail..."
- "This topic is particularly important because..."
- "In my experience with ${topic}..."

وأخيراً، ممارسة${topic} في الحياة اليومية ستساعدك كثيراً في تحسين مستواك في اللغة الإنجليزية.

شكراً لكم على الاستماع، ونراكم في الحلقة القادمة!
            `;
        } else if (language === 'mixed') {
            return `
Welcome to today's bilingual podcast episode!

Today we're exploring: ${topic}
Duration: ${durationText}

Hello everyone! مرحباً بالجميع!

In this episode, we'll discuss ${topic} in both English and Arabic. We'll start with the English explanation and then provide the Arabic translation and explanation.

## English Section
Let's talk about ${topic}. This is an important concept in English learning that students should master. Here are some key points:

1. ${topic} helps improve communication skills
2. It enhances vocabulary and fluency
3. Practice makes perfect in this area

## القسم العربي
الآن سنتحدث عن ${topic} باللغة العربية. هذا موضوع مهم جداً في تعلم اللغة الإنجليزية.

النقاط الرئيسية:
1. ${topic} يساعد في تحسين مهارات التواصل
2. يعزز المفردات والطلاقة
3. التدريب المستمر يؤدي إلى الإتقان

Thank you for listening! شكراً لكم على الاستماع!
            `;
        } else {
            return `
Welcome to our English Learning Podcast!

Today's Topic: ${topic}
Duration: ${durationText}

Hello everyone, and welcome to another episode of our English learning podcast! I'm your AI tutor, and today we'll be diving deep into the topic of ${topic}.

In this ${durationText} episode, we'll explore:

**Introduction to ${topic}**
${topic} is a fundamental concept that every English learner should understand. It's not just about grammar or vocabulary - it's about effective communication and cultural understanding.

**Key Learning Points**
1. **Pronunciation**: ${topic} has specific sounds that learners often find challenging
2. **Usage**: Understanding when and how to use ${topic} in different contexts
3. **Practice**: Regular practice is essential for mastery

**Practical Examples**
Let me give you some real-world examples of ${topic}:

- Professional setting: "I need to discuss ${topic} in tomorrow's meeting."
- Casual conversation: "Have you ever thought about ${topic}?"
- Academic context: "${topic} plays a crucial role in understanding this concept."

**Practice Exercises**
To help you improve, try these exercises:
1. Record yourself using ${topic} in a sentence
2. Listen to native speakers and note how they use ${topic}
3. Practice with conversation partners

**Cultural Context**
Understanding ${topic} isn't just about the language - it's about understanding the culture and context where it's used. This will help you communicate more naturally and effectively.

**Conclusion**
Remember, mastering ${topic} takes time and practice. Don't be discouraged if it doesn't come easily at first. With consistent effort, you'll see improvement.

Thank you for listening to this episode! Keep practicing, and I'll see you in the next one. Don't forget to subscribe for more English learning content!

Goodbye and happy learning!
            `;
        }
    }

    playPodcast() {
        const script = document.getElementById('script-content').innerText;
        this.speakText(script);
    }

    speakText(text) {
        if (this.synthesis) {
            this.synthesis.cancel();
            
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = this.currentLanguage === 'ar' ? 'ar-SA' : 'en-US';
            utterance.rate = 0.8;
            utterance.pitch = 1;
            utterance.volume = 0.8;
            
            this.synthesis.speak(utterance);
        }
    }

    analyzePodcast() {
        const analysis = `
PODCAST ANALYSIS REPORT

Language: ${this.currentLanguage === 'ar' ? 'Arabic' : 'English'}
Duration: 3-5 minutes
Content Quality: Excellent

SPEAKING ANALYSIS:
✓ Clear pronunciation: 92%
✓ Natural intonation: 88%
✓ Proper pacing: 85%
✓ Vocabulary usage: 90%

FEEDBACK:
- Excellent content structure and flow
- Good use of varied sentence types
- Strong introduction and conclusion
- Appropriate pacing for learning

RECOMMENDATIONS:
1. Continue practicing with similar topics
2. Focus on stress patterns in compound sentences
3. Work on connecting words for smoother transitions

OVERALL SCORE: 89%
        `;
        
        alert(analysis);
    }

    downloadPodcast() {
        const content = document.getElementById('script-content').innerText;
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'podcast-script.txt';
        a.click();
        URL.revokeObjectURL(url);
    }

    initializePronunciationSection() {
        this.loadPronunciationWords();
    }

    loadPronunciationWords() {
        const categories = {
            vowels: ['beat', 'bit', 'bet', 'but', 'boat', 'book'],
            consonants: ['think', 'this', 'light', 'right', 'cat', 'cap'],
            stress: ['Photograph', 'photography', 'photographic'],
            intonation: ['Really?', 'Really!', 'Really...']
        };

        // Display default category words
        this.displayWords(categories.vowels);
    }

    displayWords(words) {
        const wordsList = document.getElementById('words-list');
        wordsList.innerHTML = '';
        
        words.forEach(word => {
            const wordDiv = document.createElement('div');
            wordDiv.className = 'word-item';
            wordDiv.textContent = word;
            wordDiv.addEventListener('click', () => {
                this.pronounceWord(word);
            });
            wordsList.appendChild(wordDiv);
        });
    }

    pronounceWord(word) {
        this.speakText(word);
    }

    initializeVocabularySection() {
        // Initialize vocabulary categories
        document.querySelectorAll('.vocab-category').forEach(category => {
            category.addEventListener('click', (e) => {
                document.querySelectorAll('.vocab-category').forEach(c => c.classList.remove('active'));
                e.currentTarget.classList.add('active');
                this.loadVocabularyCategory(e.currentTarget.dataset.category);
            });
        });

        document.getElementById('speak-word').addEventListener('click', () => {
            const word = document.getElementById('word').textContent;
            this.speakText(word);
        });

        document.getElementById('next-word').addEventListener('click', () => {
            this.nextVocabularyWord();
        });

        document.getElementById('add-to-favorites').addEventListener('click', (e) => {
            e.currentTarget.classList.toggle('active');
            const icon = e.currentTarget.querySelector('i');
            icon.classList.toggle('far');
            icon.classList.toggle('fas');
        });
    }

    loadVocabularyCategory(category) {
        const vocabulary = {
            daily: [
                { word: 'beautiful', pronunciation: '/ˈbjuːtɪfəl/', definition: 'Having beauty; pleasing the senses or mind' },
                { word: 'convenient', pronunciation: '/kənˈviːniənt/', definition: 'Easy to use or access' },
                { word: 'comfortable', pronunciation: '/ˈkʌmftəbəl/', definition: 'Providing physical ease and relaxation' },
                { word: 'delicious', pronunciation: '/dɪˈlɪʃəs/', definition: 'Highly pleasant to the taste' }
            ],
            business: [
                { word: 'strategy', pronunciation: '/ˈstrætədʒi/', definition: 'A plan of action designed to achieve a goal' },
                { word: 'negotiate', pronunciation: '/nɪˈɡoʊʃieɪt/', definition: 'To discuss with others to reach an agreement' },
                { word: 'implement', pronunciation: '/ˈɪmplɪment/', definition: 'To put a decision or plan into effect' },
                { word: 'revenue', pronunciation: '/ˈrevənuː/', definition: 'Income generated from normal business operations' }
            ],
            academic: [
                { word: 'hypothesis', pronunciation: '/haɪˈpɑːθəsɪs/', definition: 'A proposed explanation made on the basis of limited evidence' },
                { word: 'analyze', pronunciation: '/ˈænəlaɪz/', definition: 'To examine in detail for purposes of explanation' },
                { word: 'synthesize', pronunciation: '/ˈsɪnθəsaɪz/', definition: 'To combine separate elements into a whole' },
                { word: 'methodology', pronunciation: '/ˌmeθəˈdɑːlədʒi/', definition: 'A system of methods used in a particular area of study' }
            ],
            technology: [
                { word: 'algorithm', pronunciation: '/ˈælɡərɪðəm/', definition: 'A set of rules for solving a problem in a finite number of steps' },
                { word: 'database', pronunciation: '/ˈdeɪtəbeɪs/', definition: 'A structured set of data held in computer storage' },
                { word: 'interface', pronunciation: '/ˈɪntərfeɪs/', definition: 'A point where two systems meet and interact' },
                { word: 'optimize', pronunciation: '/ˈɑːptɪmaɪz/', definition: 'To make something as effective as possible' }
            ]
        };

        this.currentVocabulary = vocabulary[category] || vocabulary.daily;
        this.currentWordIndex = 0;
        this.displayCurrentWord();
    }

    nextVocabularyWord() {
        this.currentWordIndex = (this.currentWordIndex + 1) % this.currentVocabulary.length;
        this.displayCurrentWord();
    }

    displayCurrentWord() {
        if (this.currentVocabulary && this.currentVocabulary[this.currentWordIndex]) {
            const word = this.currentVocabulary[this.currentWordIndex];
            document.getElementById('word').textContent = word.word;
            document.getElementById('pronunciation').textContent = word.pronunciation;
            document.getElementById('definition').textContent = word.definition;
        }
    }

    updateGreeting() {
        const hour = new Date().getHours();
        const greetingElement = document.getElementById('greeting');
        
        let greeting;
        if (hour < 12) {
            greeting = 'Good Morning, Student!';
        } else if (hour < 18) {
            greeting = 'Good Afternoon, Student!';
        } else {
            greeting = 'Good Evening, Student!';
        }
        
        greetingElement.textContent = greeting;
    }

    animateProgressRings() {
        setTimeout(() => {
            document.querySelectorAll('.progress-ring-fill').forEach((ring, index) => {
                const circumference = 2 * Math.PI * 50;
                const progress = [0.8, 0.9][index] || 0.75;
                const offset = circumference * (1 - progress);
                ring.style.strokeDashoffset = offset;
            });
        }, 500);
    }

    renderCharts() {
        // Simple canvas charts for analytics
        this.renderScoreChart();
        this.renderFrequencyChart();
    }

    renderScoreChart() {
        const canvas = document.getElementById('score-chart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const data = [75, 78, 82, 85, 87, 89, 91]; // Mock data
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw line chart
        ctx.strokeStyle = '#0066FF';
        ctx.lineWidth = 3;
        ctx.beginPath();
        
        const stepX = canvas.width / (data.length - 1);
        const maxValue = Math.max(...data);
        const minValue = Math.min(...data);
        const range = maxValue - minValue;
        
        data.forEach((value, index) => {
            const x = index * stepX;
            const y = canvas.height - ((value - minValue) / range) * (canvas.height - 40) - 20;
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
        
        // Draw points
        ctx.fillStyle = '#0066FF';
        data.forEach((value, index) => {
            const x = index * stepX;
            const y = canvas.height - ((value - minValue) / range) * (canvas.height - 40) - 20;
            
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, 2 * Math.PI);
            ctx.fill();
        });
    }

    renderFrequencyChart() {
        const canvas = document.getElementById('frequency-chart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const data = [3, 5, 4, 7, 6, 8, 5]; // Mock data (hours per day)
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const barWidth = canvas.width / data.length - 10;
        const maxValue = Math.max(...data);
        
        data.forEach((value, index) => {
            const x = index * (barWidth + 10) + 20;
            const height = (value / maxValue) * (canvas.height - 60);
            const y = canvas.height - height - 40;
            
            // Draw bar
            ctx.fillStyle = '#0066FF';
            ctx.fillRect(x, y, barWidth, height);
            
            // Draw day label
            ctx.fillStyle = '#6C757D';
            ctx.font = '12px Inter';
            ctx.textAlign = 'center';
            const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
            ctx.fillText(days[index], x + barWidth/2, canvas.height - 20);
        });
    }

    updateAnalytics() {
        // Update analytics with fresh data
        this.renderCharts();
    }

    initializeSpeakingSection() {
        // Reinitialize any speaking-specific features
    }

    initializeConversationSection() {
        // Reinitialize conversation features
    }

    initializePodcastSection() {
        // Reinitialize podcast features
    }

    loadSavedData() {
        // Load any saved progress or settings
        const savedProgress = localStorage.getItem('englishTutorProgress');
        if (savedProgress) {
            const progress = JSON.parse(savedProgress);
            // Apply saved progress
        }
    }

    saveData() {
        // Save current progress
        const progress = {
            timestamp: new Date().toISOString(),
            section: this.currentSection
        };
        localStorage.setItem('englishTutorProgress', JSON.stringify(progress));
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new EnglishTutorApp();
});

// Handle page visibility changes to save state
document.addEventListener('visibilitychange', () => {
    if (window.app) {
        window.app.saveData();
    }
});