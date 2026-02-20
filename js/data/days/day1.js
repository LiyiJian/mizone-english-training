// Day 1: Self-Introduction — Personal Background & Career Story
AppContent.days.push({
  day: 1,
  theme: 'Self-Introduction: Personal Background & Career Story',
  themeZh: '自我介绍：个人背景与职业故事',
  minutes: 240,

  listening: {
    title: 'Introducing Yourself in a Brand Manager Interview',
    text: [
      'Good morning. My name is Xueyan Xu, and I\'m excited to be here today.',
      'I have seven years of experience in the fast-moving consumer goods industry, specifically in the beverage sector.',
      'In my current role as a Brand Manager at a leading sports drink company, I oversee the full brand lifecycle — from consumer insight to campaign execution.',
      'One of my proudest achievements was relaunching a mature product line that had seen three consecutive years of declining sales.',
      'By repositioning the brand toward a younger, health-conscious demographic and launching a digital-first campaign, we achieved a 23% volume uplift within six months.',
      'I\'m particularly drawn to Danone\'s commitment to health and sustainability, values that align deeply with my personal and professional beliefs.',
      'I believe my background in FMCG brand management and my passion for consumer-centric marketing make me a strong fit for the Mizone Brand Manager role.',
      'I look forward to discussing how I can contribute to the brand\'s growth agenda.'
    ],
    keywords: ['fast-moving consumer goods', 'brand lifecycle', 'consumer insight', 'campaign execution', 'repositioning', 'digital-first', 'volume uplift', 'consumer-centric'],
    comprehension: [
      {
        question: 'How many years of experience does Xueyan Xu have in the beverage industry?',
        options: ['Five years', 'Seven years', 'Ten years', 'Three years'],
        answer: 1
      },
      {
        question: 'What was the key strategy Xueyan Xu used to relaunch the declining product line?',
        options: [
          'Price reduction and promotions',
          'Repositioning toward younger, health-conscious consumers with a digital-first campaign',
          'Expanding distribution channels',
          'Introducing new flavors'
        ],
        answer: 1
      },
      {
        question: 'What volume uplift did the relaunch achieve?',
        options: ['13%', '30%', '23%', '50%'],
        answer: 2
      }
    ]
  },

  writing: {
    title: 'Introduction Email to Your New Team',
    scenario: 'You have just joined Danone as the new Mizone Brand Manager. Write a professional introduction email to your team of 8 people, including 2 marketing specialists, 1 digital manager, 1 trade marketing manager, and 4 agency partners.',
    template: {
      subject: 'Excited to Join the Mizone Team!',
      structure: [
        {
          label: 'Opening Greeting',
          text: 'Hi everyone,\n\nI\'m thrilled to introduce myself as the new Brand Manager for Mizone.'
        },
        {
          label: 'Personal Introduction',
          text: 'My name is Xueyan Xu, and I\'m joining Danone from [Previous Company], where I spent the past [X] years driving brand growth in the FMCG space.'
        },
        {
          label: 'Key Background & Value',
          text: 'I\'m passionate about consumer-centric marketing and building brands that truly connect with people\'s lifestyles. I\'m excited to bring fresh energy to the Mizone portfolio.'
        },
        {
          label: 'Action Item',
          text: 'In my first week, I\'d love to schedule a brief 30-minute chat with each of you to learn about your work. I\'ll send calendar invites shortly.'
        },
        {
          label: 'Open-Door Tone',
          text: 'Please don\'t hesitate to reach out — my door is always open.'
        },
        {
          label: 'Closing',
          text: 'Looking forward to working together!\n\nBest regards,\nXueyan Xu'
        }
      ]
    },
    task: 'Rewrite the following poorly structured email to make it professional, warm, and action-oriented:\n\n"Hi all. I am new here. I worked at a beverage company before. I hope we can work together well. Let me know if you need anything. Thanks."',
    reference: 'Subject: Excited to Join the Mizone Team!\n\nHi everyone,\n\nI\'m thrilled to introduce myself as the new Brand Manager for Mizone. My name is Xueyan Xu, and I\'m joining Danone from [Previous Company], where I spent the past [X] years driving brand growth in the FMCG space.\n\nI\'m passionate about consumer-centric marketing and building brands that truly connect with people\'s lifestyles. I\'m excited to bring fresh energy to the Mizone portfolio and collaborate closely with all of you.\n\nIn my first week, I\'d love to schedule a brief 30-minute chat with each of you to learn about your work and understand how we can best support each other. I\'ll send calendar invites shortly.\n\nPlease don\'t hesitate to reach out — my door is always open.\n\nLooking forward to working together!\n\nBest regards,\nXueyan Xu'
  },

  speaking: {
    title: 'Tell Me About Yourself — 2-Minute Self-Introduction',
    outline: [
      { point: '1. Hook (0:00–0:15)', note: 'Open with a strong statement about your professional identity and passion.' },
      { point: '2. Background (0:15–0:40)', note: 'Years of experience, industry, key roles. Keep it factual and concise.' },
      { point: '3. Key Achievement (0:40–1:10)', note: 'One specific accomplishment using STAR: Situation, Task, Action, Result.' },
      { point: '4. Why Danone / Mizone (1:10–1:40)', note: 'Connect your values and skills to the company\'s mission and brand positioning.' },
      { point: '5. Forward Look (1:40–2:00)', note: 'What you aim to bring to this role. End with enthusiasm.' }
    ],
    keySentences: [
      'I\'m a brand marketer with seven years of experience building consumer-loved brands in the FMCG space.',
      'My expertise spans the full marketing mix — from brand strategy and consumer insight to integrated campaign management.',
      'I\'m particularly proud of a brand relaunch I led that delivered a 23% volume increase within six months by targeting a new health-conscious audience.',
      'I\'m drawn to Danone Mizone because of its mission to bring hydration and health to everyday consumers — a cause I\'m genuinely passionate about.',
      'In this role, I\'m excited to leverage my experience to sharpen Mizone\'s brand positioning and drive meaningful growth.'
    ],
    selfEvalCriteria: [
      { label: 'Clarity & Structure', desc: 'Did you follow hook → background → achievement → motivation → forward look?' },
      { label: 'Fluency', desc: 'Did you speak smoothly without long pauses or excessive filler words (um, uh)?' },
      { label: 'Vocabulary', desc: 'Did you use at least 3 professional marketing terms naturally?' },
      { label: 'Confidence', desc: 'Did you maintain an upbeat, confident tone throughout?' },
      { label: 'Timing', desc: 'Did you finish within the 2-minute window?' }
    ]
  },

  quiz: {
    questions: [
      {
        type: 'mcq',
        question: 'Which of the following best describes "brand lifecycle"?',
        options: [
          'The time it takes to design a brand logo',
          'The stages a brand goes through from introduction to decline',
          'The annual marketing budget cycle',
          'The duration of a marketing campaign'
        ],
        answer: 1,
        explanation: 'Brand lifecycle refers to the stages a brand goes through: introduction, growth, maturity, and decline — similar to a product lifecycle.'
      },
      {
        type: 'mcq',
        question: 'In marketing, "consumer-centric" means:',
        options: [
          'Focusing on reducing production costs',
          'Placing the consumer\'s needs and preferences at the center of all decisions',
          'Using consumer data for advertising only',
          'Selling directly to consumers without retailers'
        ],
        answer: 1,
        explanation: 'Consumer-centric marketing means building strategy around deep understanding of consumer needs, behaviors, and motivations.'
      },
      {
        type: 'fillblank',
        question: 'Complete the sentence: "We achieved a 23% volume ________ within six months of the relaunch."',
        answer: 'uplift',
        explanation: '"Volume uplift" is the standard FMCG term for an increase in sales volume. More specific than simply saying "increase."'
      },
      {
        type: 'correction',
        question: 'Find and correct the error: "I have been working on fast-moving consumer good industry for seven years."',
        corrected: 'I have been working in the fast-moving consumer goods industry for seven years.',
        answer: 'I have been working in the fast-moving consumer goods industry for seven years.',
        explanation: 'Three errors: (1) "on" → "in" for industries; (2) missing "the" before industry names; (3) "good" → "goods" (always plural in FMCG).'
      },
      {
        type: 'mcq',
        question: 'Which self-introduction structure is most effective in an interview?',
        options: [
          'Start with education history, then work chronologically',
          'Open with a hook, then background, key achievement, motivation, and forward look',
          'List all previous jobs in reverse order',
          'Focus only on your most recent role'
        ],
        answer: 1,
        explanation: 'The hook → background → achievement → motivation → forward look structure is most compelling because it immediately engages the interviewer and links your past to the specific role.'
      }
    ]
  }
});
