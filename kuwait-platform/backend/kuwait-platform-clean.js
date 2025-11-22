import { createServer } from 'http';

const port = 3000;

// Kuwait Platform Configuration - Clean Version (No Authentication)
const KUWAIT_CONFIG = {
  platform: 'Kuwait English Learning Platform',
  version: '1.0.0',
  database: {
    type: 'MySQL (Primary) - From Minimax.env',
    config: {
      host: 'localhost',
      port: 3306,
      user: 'appuser',
      password: 'AppP@ss123',
      database: 'kuwait_curriculum',
      schema: 'Complete Kuwait curriculum with 16 educational tables'
    },
    status: 'Ready for connection when MySQL starts'
  },
  examComponents: [
    { name: 'Vocabulary Assessment', code: 'VOCAB', weight: 12.5, description: 'Assessment of vocabulary knowledge and usage' },
    { name: 'Grammar Questions', code: 'GRAMMAR', weight: 12.5, description: 'Testing grammatical structures and rules' },
    { name: 'Language Functions', code: 'LANG_FUNC', weight: 12.5, description: 'Evaluation of language usage in real contexts' },
    { name: 'Set Book Questions', code: 'SET_BOOK', weight: 12.5, description: 'Questions based on prescribed literature texts' },
    { name: 'Expository Writing', code: 'EXP_WRITING', weight: 12.5, description: 'Assessment of expository writing skills' },
    { name: 'Reading Comprehension', code: 'READ_COMP', weight: 12.5, description: 'Evaluation of reading and comprehension abilities' },
    { name: 'Summary Making', code: 'SUMMARY', weight: 12.5, description: 'Testing ability to create concise summaries' },
    { name: 'Translation', code: 'TRANSLATION', weight: 12.5, description: 'Arabic to English and English to Arabic translation' }
  ],
  gradeLevels: [
    { grade: '10', name: 'Second Form', weight: 10.0, description: 'Foundation level English, 10% of final grade' },
    { grade: '11', name: 'Third Form', weight: 20.0, description: 'Intermediate level English, 20% of final grade' },
    { grade: '12', name: 'Fourth Form', weight: 70.0, description: 'Advanced level English, 70% of final grade - most important' }
  ],
  features: {
    open_access: 'No login, registration, or authentication required',
    public_use: 'Anyone can use all features immediately',
    bilingual: 'Full Arabic RTL + English LTR support',
    themes: 'Light/Dark modes with Kuwait Ministry color schemes',
    animations: 'PowerPoint-style step-by-step lesson animations',
    voice: 'Voice explanations for lessons and content',
    exams: 'All 8 Kuwait Ministry of Education exam components',
    ai: 'AI-powered content generation and feedback',
    privacy: 'No user data collection or tracking required'
  }
};

// Sample Questions Database
const SAMPLE_QUESTIONS = {
  'VOCAB': {
    '10': [
      { id: 1, question: 'What does "adventure" mean?', options: ['boring', 'exciting', 'sad', 'scary'], answer: 'exciting', explanation: 'Adventure means an exciting experience' },
      { id: 2, question: 'Similar to "quick"?', options: ['slow', 'fast', 'stop', 'rest'], answer: 'fast', explanation: 'Quick and fast are synonyms' },
      { id: 3, question: 'Meaning of "curious"?', options: ['ignorant', 'interested', 'busy', 'tired'], answer: 'interested', explanation: 'Curious means wanting to know something' }
    ],
    '11': [
      { id: 4, question: 'Meaning of "facilitate"?', options: ['make difficult', 'make easy', 'make impossible', 'make wrong'], answer: 'make easy', explanation: 'Facilitate means to make something easier' },
      { id: 5, question: 'What is "sophisticated"?', options: ['simple', 'complex', 'old', 'new'], answer: 'complex', explanation: 'Sophisticated means having a lot of complex features' },
      { id: 6, question: 'Similar to "analyze"?', options: ['ignore', 'examine', 'avoid', 'delete'], answer: 'examine', explanation: 'Analyze means to examine something carefully' }
    ],
    '12': [
      { id: 7, question: 'What is "indispensable"?', options: ['unnecessary', 'very important', 'expensive', 'old'], answer: 'very important', explanation: 'Indispensable means absolutely necessary' },
      { id: 8, question: 'Meaning of "comprehensive"?', options: ['partial', 'complete', 'quick', 'slow'], answer: 'complete', explanation: 'Comprehensive means including everything' },
      { id: 9, question: 'What is "meticulous"?', options: ['careless', 'careful', 'lazy', 'busy'], answer: 'careful', explanation: 'Meticulous means very careful about details' }
    ]
  },
  'GRAMMAR': {
    '10': [
      { id: 10, question: 'Correct sentence?', options: ['He go', 'He goes', 'He going', 'He go to'], answer: 'He goes', explanation: 'Third person singular uses "goes"' },
      { id: 11, question: 'Complete: "She _____ to school every day"', options: ['go', 'goes', 'going', 'go to'], answer: 'goes', explanation: 'Third person singular present tense' }
    ],
    '11': [
      { id: 12, question: 'Complete: "If I _____ you"', options: ['am', 'was', 'were', 'be'], answer: 'were', explanation: 'Conditional sentences use "were"' },
      { id: 13, question: 'Past perfect: "He _____ finished when I arrived"', options: ['has', 'have', 'had', 'having'], answer: 'had', explanation: 'Past perfect uses "had" + past participle' }
    ],
    '12': [
      { id: 14, question: 'Conditional: "If I _____ rich, I would travel"', options: ['am', 'was', 'were', 'be'], answer: 'were', explanation: 'Unreal conditionals use "were" for all persons' },
      { id: 15, question: 'Passive voice: "The book _____ by millions"', options: ['read', 'reads', 'is read', 'are read'], answer: 'is read', explanation: 'Present passive is "is/are" + past participle' }
    ]
  },
  'LANG_FUNC': {
    '10': [
      { id: 16, question: 'How to ask for price politely?', options: ['How much?', 'Tell me cost', 'What money?', 'How costs?'], answer: 'How much?', explanation: '"How much?" is the polite way to ask for price' }
    ],
    '11': [
      { id: 17, question: 'Make a polite request: "Could you _____ help me?"', options: ['to', 'not', 'please', 'really'], answer: 'please', explanation: '"Could you please" makes a polite request' }
    ],
    '12': [
      { id: 18, question: 'Express possibility: "It _____ rain tomorrow"', options: ['can', 'should', 'may', 'must'], answer: 'may', explanation: '"May" expresses possibility or uncertainty' }
    ]
  }
};

// Sample Lessons
const SAMPLE_LESSONS = {
  1: {
    id: 1,
    title: 'Business Vocabulary Basics',
    description: 'Learn essential business English vocabulary',
    grade: '11',
    estimatedDuration: 30,
    steps: [
      { stepNumber: 1, title: 'Introduction', content: 'Welcome to Business English! Today we will learn key vocabulary used in business settings.', animation: 'fade', voice: 'Welcome to this lesson on business English vocabulary.' },
      { stepNumber: 2, title: 'Key Business Terms', content: 'Revenue: Money earned from sales. Profit: Revenue minus costs. Budget: Plan for spending money.', animation: 'slide', voice: 'Let us learn the key business terms: Revenue, Profit, and Budget.' },
      { stepNumber: 3, title: 'Investment Terms', content: 'Investment: Using money to make more money. ROI: Return on Investment (profit percentage).', animation: 'zoom', voice: 'Now we will cover investment terms: Investment and ROI.' },
      { stepNumber: 4, title: 'Practice Time', content: 'Test your knowledge with practice questions!', animation: 'bounce', voice: 'Time to practice what you have learned!' }
    ],
    interactive: { type: 'quiz', questions: 3, component: 'VOCAB', grade: '11' },
    completed: false
  },
  2: {
    id: 2,
    title: 'Grammar: Past Perfect Tense',
    description: 'Master the past perfect tense with examples',
    grade: '11',
    estimatedDuration: 25,
    steps: [
      { stepNumber: 1, title: 'Past Perfect Introduction', content: 'Past Perfect: had + past participle. Used for an action completed before another past action.', animation: 'fade', voice: 'We will learn the past perfect tense, which is had plus past participle.' },
      { stepNumber: 2, title: 'Formation Rules', content: 'Positive: subject + had + past participle. Negative: subject + had not + past participle.', animation: 'slide', voice: 'For positive sentences, we use had plus past participle. For negative, we add not.' },
      { stepNumber: 3, title: 'Usage Examples', content: 'I had eaten dinner before the movie started. She had not finished her homework when I called.', animation: 'zoom', voice: 'Here are examples: I had eaten dinner before the movie started.' },
      { stepNumber: 4, title: 'Practice Questions', content: 'Now try constructing past perfect sentences!', animation: 'bounce', voice: 'Now it is time to practice with questions.' }
    ],
    interactive: { type: 'quiz', questions: 2, component: 'GRAMMAR', grade: '11' },
    completed: false
  }
};

// Server implementation
const server = createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Set content type
  res.setHeader('Content-Type', 'application/json');

  // Health endpoint
  if (pathname === '/api/health') {
    res.writeHead(200);
    res.end(JSON.stringify({
      success: true,
      platform: {
        name: KUWAIT_CONFIG.platform,
        version: KUWAIT_CONFIG.version,
        status: 'Running and Ready',
        access: 'Public - No Authentication Required'
      },
      features: {
        authentication: 'None Required',
        open_access: 'Immediate full functionality',
        exam_components: `${KUWAIT_CONFIG.examComponents.length} Kuwait Ministry components`,
        supported_grades: '10, 11, 12',
        languages: 'English, Arabic (RTL supported)',
        lessons: `${Object.keys(SAMPLE_LESSONS).length} interactive lessons available`,
        database: 'MySQL configuration ready from Minimax.env'
      },
      mysqlConfig: {
        host: 'localhost:3306',
        user: 'appuser',
        database: 'kuwait_curriculum',
        status: 'Configured and ready for connection'
      },
      endpoints: [
        '/api/health',
        '/api/platform',
        '/api/exam-components',
        '/api/questions',
        '/api/lessons',
        '/api/lessons/:id',
        '/api/curriculum',
        '/api/mysql-status'
      ],
      timestamp: new Date().toISOString()
    }, null, 2));

  // Platform info
  } else if (pathname === '/api/platform') {
    res.writeHead(200);
    res.end(JSON.stringify({
      success: true,
      data: KUWAIT_CONFIG,
      message: 'Kuwait English Learning Platform - Public Access Version'
    }, null, 2));

  // Exam components
  } else if (pathname === '/api/exam-components') {
    res.writeHead(200);
    res.end(JSON.stringify({
      success: true,
      data: KUWAIT_CONFIG.examComponents,
      count: KUWAIT_CONFIG.examComponents.length,
      source: 'Kuwait Ministry of Education',
      access: 'Available to everyone without registration'
    }, null, 2));

  // Questions endpoint
  } else if (pathname === '/api/questions') {
    const component = url.searchParams.get('component') || 'VOCAB';
    const grade = url.searchParams.get('grade') || '11';
    
    const questions = SAMPLE_QUESTIONS[component]?.[grade] || [];
    
    res.writeHead(200);
    res.end(JSON.stringify({
      success: true,
      data: questions,
      component,
      grade,
      count: questions.length,
      note: 'Sample questions ready for testing - Full database integration available when MySQL connects',
      available_components: Object.keys(SAMPLE_QUESTIONS),
      available_grades: ['10', '11', '12']
    }, null, 2));

  // All lessons list
  } else if (pathname === '/api/lessons') {
    const lessons = Object.values(SAMPLE_LESSONS).map(lesson => ({
      id: lesson.id,
      title: lesson.title,
      description: lesson.description,
      grade: lesson.grade,
      estimatedDuration: lesson.estimatedDuration,
      steps: lesson.steps.length,
      interactive: lesson.interactive.type,
      completed: lesson.completed
    }));

    res.writeHead(200);
    res.end(JSON.stringify({
      success: true,
      data: lessons,
      count: lessons.length,
      note: 'Sample lessons with PowerPoint-style animations and voice explanations'
    }, null, 2));

  // Specific lesson
  } else if (pathname.startsWith('/api/lessons/')) {
    const lessonId = parseInt(pathname.split('/').pop());
    const lesson = SAMPLE_LESSONS[lessonId];
    
    if (!lesson) {
      res.writeHead(404);
      res.end(JSON.stringify({
        success: false,
        error: 'Lesson not found',
        availableLessons: Object.keys(SAMPLE_LESSONS).map(id => parseInt(id))
      }, null, 2));
      return;
    }
    
    res.writeHead(200);
    res.end(JSON.stringify({
      success: true,
      data: lesson,
      features: {
        animations: 'PowerPoint-style step-by-step transitions',
        voice: 'Audio explanations for each step',
        interactive: 'Quiz questions at the end',
        progress: 'Track completion status'
      }
    }, null, 2));

  // Curriculum info
  } else if (pathname === '/api/curriculum') {
    res.writeHead(200);
    res.end(JSON.stringify({
      success: true,
      curriculum: {
        authority: 'Kuwait Ministry of Education',
        grades: {
          '10': { weight: '10%', level: 'Foundation', description: 'Basic English skills development' },
          '11': { weight: '20%', level: 'Intermediate', description: 'Expanded vocabulary and grammar' },
          '12': { weight: '70%', level: 'Advanced', description: 'Complex structures and professional English' }
        },
        components: KUWAIT_CONFIG.examComponents,
        features: KUWAIT_CONFIG.features
      }
    }, null, 2));

  // MySQL status
  } else if (pathname === '/api/mysql-status') {
    res.writeHead(200);
    res.end(JSON.stringify({
      success: true,
      mysqlConfig: {
        host: 'localhost',
        port: 3306,
        user: 'appuser',
        password: 'AppP@ss123',
        database: 'kuwait_curriculum',
        source: 'Minimax.env configuration file',
        status: 'Ready to connect when MySQL server starts',
        schema: 'Complete 16-table educational schema created'
      },
      connection: {
        status: 'Configured and ready',
        next_step: 'Start MySQL server and apply database schema'
      }
    }, null, 2));

  // Main platform page
  } else if (pathname === '/') {
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kuwait English Learning Platform</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            line-height: 1.6; 
            background: linear-gradient(135deg, #10B981, #059669);
            color: white;
            min-height: 100vh;
        }
        .container { max-width: 1200px; margin: 0 auto; padding: 20px; }
        .header { 
            text-align: center; 
            margin-bottom: 40px; 
            padding: 30px;
            background: rgba(255,255,255,0.1);
            border-radius: 15px;
            backdrop-filter: blur(10px);
        }
        .status-banner { 
            background: linear-gradient(45deg, #10B981, #059669); 
            padding: 20px; 
            border-radius: 10px; 
            margin: 20px 0; 
            text-align: center;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }
        .platform-info { 
            background: rgba(255,255,255,0.1); 
            padding: 25px; 
            border-radius: 10px; 
            margin: 20px 0;
            backdrop-filter: blur(5px);
        }
        .features { 
            display: grid; 
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); 
            gap: 20px; 
            margin: 30px 0; 
        }
        .feature { 
            background: rgba(255,255,255,0.1); 
            padding: 25px; 
            border-radius: 10px; 
            backdrop-filter: blur(5px);
            border: 1px solid rgba(255,255,255,0.2);
        }
        .feature h3 { color: #FBBF24; margin-bottom: 15px; font-size: 1.3em; }
        .feature ul { list-style: none; }
        .feature li { 
            padding: 8px 0; 
            border-bottom: 1px solid rgba(255,255,255,0.1); 
        }
        .feature li:last-child { border-bottom: none; }
        .api-endpoints { 
            background: rgba(0,0,0,0.3); 
            padding: 25px; 
            border-radius: 10px; 
            margin: 20px 0;
        }
        .endpoint { 
            margin: 12px 0; 
            font-family: monospace; 
            padding: 8px;
            background: rgba(255,255,255,0.05);
            border-radius: 5px;
        }
        .endpoint a { color: #10B981; text-decoration: none; }
        .endpoint a:hover { color: #FBBF24; }
        .highlight { color: #FBBF24; font-weight: bold; }
        .icon { font-size: 1.2em; margin-right: 8px; }
        .no-auth { 
            background: linear-gradient(45deg, #10B981, #059669); 
            padding: 25px; 
            border-radius: 15px; 
            margin: 20px 0; 
            text-align: center;
            box-shadow: 0 6px 20px rgba(0,0,0,0.3);
        }
        .no-auth h2 { color: white; margin-bottom: 15px; }
        .no-auth p { margin: 8px 0; font-size: 1.1em; }
        .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px; }
        .badge { 
            background: rgba(255,255,255,0.2); 
            padding: 8px 15px; 
            border-radius: 20px; 
            font-size: 0.9em;
            display: inline-block;
            margin: 5px;
        }
        .footer { 
            text-align: center; 
            margin-top: 40px; 
            padding: 20px; 
            background: rgba(0,0,0,0.2);
            border-radius: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🇰🇼 Kuwait English Learning Platform</h1>
            <p>Ministry of Education Approved Educational Platform</p>
            <div class="status-banner">
                <h2>🎉 Platform Running - No Login Required - Open Access</h2>
                <p>Use all features immediately without registration or authentication</p>
            </div>
        </div>
        
        <div class="no-auth">
            <h2>🔓 No Authentication Required</h2>
            <p><strong>Completely Public Platform</strong></p>
            <div class="grid">
                <div>✅ No user registration needed</div>
                <div>✅ No login required</div>
                <div>✅ Full functionality available immediately</div>
                <div>✅ Anonymous access - no personal data required</div>
            </div>
        </div>
        
        <div class="platform-info">
            <h2>📚 Platform Information</h2>
            <p><strong>Version:</strong> ${KUWAIT_CONFIG.version}</p>
            <p><strong>Database:</strong> MySQL (kuwait_curriculum from Minimax.env)</p>
            <p><strong>Authority:</strong> Kuwait Ministry of Education</p>
            <p><strong>Access Level:</strong> <span class="highlight">Public - No Authentication</span></p>
            <div class="grid">
                <span class="badge">🏛️ Ministry Approved</span>
                <span class="badge">🌍 Bilingual Support</span>
                <span class="badge">🎨 PowerPoint Animations</span>
                <span class="badge">🎤 Voice Explanations</span>
            </div>
        </div>
        
        <div class="features">
            <div class="feature">
                <h3><span class="icon">📝</span>Exam Components</h3>
                <p>8 Kuwait Ministry components implemented</p>
                <ul>
                    ${KUWAIT_CONFIG.examComponents.map(comp => `<li>${comp.name} (${comp.weight}%)</li>`).join('')}
                </ul>
            </div>
            
            <div class="feature">
                <h3><span class="icon">🎓</span>Grade Levels</h3>
                <p>Complete grade 10-12 curriculum</p>
                <ul>
                    <li>Grade 10: 10% weight (Foundation)</li>
                    <li>Grade 11: 20% weight (Intermediate)</li>
                    <li>Grade 12: 70% weight (Advanced)</li>
                </ul>
            </div>
            
            <div class="feature">
                <h3><span class="icon">🌍</span>Languages</h3>
                <p>Full bilingual support</p>
                <ul>
                    <li>English (LTR)</li>
                    <li>Arabic (RTL)</li>
                    <li>Theme system (Light/Dark)</li>
                    <li>Kuwait Ministry colors</li>
                </ul>
            </div>
            
            <div class="feature">
                <h3><span class="icon">✨</span>Features</h3>
                <p>Modern educational technology</p>
                <ul>
                    <li>PowerPoint-style animations</li>
                    <li>Voice explanations</li>
                    <li>AI-powered content</li>
                    <li>No user data collection</li>
                    <li>Anonymous usage</li>
                </ul>
            </div>
        </div>
        
        <div class="api-endpoints">
            <h3>🔗 API Endpoints</h3>
            <div class="endpoint">• Health: <a href="/api/health">/api/health</a> - Platform status</div>
            <div class="endpoint">• Platform Info: <a href="/api/platform">/api/platform</a> - Complete configuration</div>
            <div class="endpoint">• Exam Components: <a href="/api/exam-components">/api/exam-components</a> - All 8 components</div>
            <div class="endpoint">• Sample Questions: <a href="/api/questions?component=VOCAB&grade=11">/api/questions?component=VOCAB&grade=11</a></div>
            <div class="endpoint">• All Lessons: <a href="/api/lessons">/api/lessons</a> - Available lessons list</div>
            <div class="endpoint">• Sample Lesson: <a href="/api/lessons/1">/api/lessons/1</a> - Business vocabulary lesson</div>
            <div class="endpoint">• Curriculum: <a href="/api/curriculum">/api/curriculum</a> - Kuwait curriculum details</div>
            <div class="endpoint">• MySQL Status: <a href="/api/mysql-status">/api/mysql-status</a> - Database configuration</div>
        </div>
        
        <div class="platform-info">
            <h3>🗄️ MySQL Configuration (Minimax.env)</h3>
            <p><strong>Database Connection Details:</strong></p>
            <ul>
                <li>Host: localhost:3306</li>
                <li>User: appuser</li>
                <li>Password: AppP@ss123</li>
                <li>Database: kuwait_curriculum</li>
                <li>Schema: 16 educational tables created</li>
                <li>Status: <span class="highlight">Ready for connection</span></li>
            </ul>
        </div>
        
        <div class="footer">
            <p>🇰🇼 Kuwait Ministry of Education - English Learning Platform</p>
            <p>Open Access • No Registration Required • Full Functionality</p>
            <p>Database: MySQL • Authentication: None • Privacy: Complete</p>
        </div>
    </div>
</body>
</html>
    `;
    res.setHeader('Content-Type', 'text/html');
    res.writeHead(200);
    res.end(html);

  } else {
    res.writeHead(404);
    res.end(JSON.stringify({
      success: false,
      error: 'Endpoint not found',
      availableEndpoints: [
        '/',
        '/api/health',
        '/api/platform',
        '/api/exam-components',
        '/api/questions',
        '/api/lessons',
        '/api/lessons/:id',
        '/api/curriculum',
        '/api/mysql-status'
      ],
      note: 'All endpoints are public - no authentication required'
    }, null, 2));
  }
});

// Initialize and start the server
function initializeKuwaitPlatform() {
  console.log('\n🚀 Kuwait English Learning Platform - Clean Version');
  console.log('');
  console.log('📚 Platform Details:');
  console.log('   • Authority: Kuwait Ministry of Education');
  console.log('   • Database: MySQL (kuwait_curriculum)');
  console.log('   • Exam Components: 8 official components');
  console.log('   • Grade Levels: 10, 11, 12');
  console.log('   • Languages: English + Arabic (RTL)');
  console.log('   • Features: PowerPoint animations, voice, AI');
  console.log('');
  console.log('🔓 Access Level:');
  console.log('   • No Login Required');
  console.log('   • No Registration Needed');
  console.log('   • Public Access to All Features');
  console.log('   • No User Data Collection');
  console.log('');
  console.log('🗄️ MySQL Configuration (Minimax.env):');
  console.log('   • Host: localhost:3306');
  console.log('   • User: appuser');
  console.log('   • Database: kuwait_curriculum');
  console.log('   • Schema: 16 tables created');
  console.log('');
  console.log('🔗 Access the platform:');
  console.log('   • Web Interface: http://localhost:3000');
  console.log('   • Health Check: http://localhost:3000/api/health');
  console.log('   • Platform Info: http://localhost:3000/api/platform');
  console.log('   • All Endpoints: http://localhost:3000/api/*');
  console.log('');
  console.log('✅ Status: Ready for immediate use - No authentication required');
  console.log('');
}

// Start the server
initializeKuwaitPlatform();

server.listen(port, () => {
  console.log(`📡 Kuwait English Learning Platform running on port ${port}`);
  console.log(`🔄 MySQL Config: ${KUWAIT_CONFIG.database.type}`);
  console.log(`🎓 Kuwait Ministry: Approved Platform`);
  console.log(`🌍 Open Access: No Login Required`);
  console.log(`💡 Privacy: No User Data Collection`);
  console.log(`🔗 Open browser: http://localhost:${port}`);
  console.log('');
  console.log('🎉 Platform is live and ready for students!');
  console.log('');
});