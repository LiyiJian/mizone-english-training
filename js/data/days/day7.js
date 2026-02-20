// Day 7: Crisis Communication & Brand Reputation Management
AppContent.days.push({
  day: 7,
  theme: 'Crisis Communication & Brand Reputation Management',
  themeZh: '危机沟通与品牌声誉管理',
  minutes: 240,

  listening: {
    title: 'Managing a Product Safety Crisis — A Brand Manager\'s Account',
    text: [
      'No brand manager hopes to face a crisis, but the way you respond in the first 24 hours defines your brand\'s reputation for years to come.',
      'We faced a serious situation when social media reports emerged claiming our product had caused allergic reactions in a small number of consumers.',
      'Our first action was to activate the crisis management protocol: convene the core team, establish the facts, and agree on a single spokesperson within two hours.',
      'We issued an initial holding statement within four hours — acknowledging the reports, expressing genuine care for the affected consumers, and committing to a thorough investigation.',
      'The holding statement did not admit fault, but it was empathetic and transparent — two qualities that are essential in any crisis response.',
      'Internally, we contacted all major retail partners to brief them proactively, before they heard the news from media — maintaining their trust was critical to protecting shelf space.',
      'The investigation found that the reactions were linked to an undisclosed allergen from a third-party ingredient supplier, which we immediately removed from the formula.',
      'Within 72 hours, we issued a full public statement with the investigation findings, a formula update, and a consumer goodwill program — which helped contain the reputational damage.'
    ],
    keywords: ['crisis management', 'holding statement', 'spokesperson', 'transparent', 'proactive', 'allergen', 'reputational damage', 'goodwill program'],
    comprehension: [
      {
        question: 'What are two essential qualities of a good crisis response, according to the speaker?',
        options: [
          'Speed and aggression',
          'Empathy and transparency',
          'Denial and redirection',
          'Silence and legal defense'
        ],
        answer: 1
      },
      {
        question: 'Why did the team contact retail partners before the news broke publicly?',
        options: [
          'To ask retailers to remove the product from shelves',
          'To negotiate better pricing deals',
          'To brief them proactively and maintain their trust, protecting shelf space',
          'To inform them of a product recall'
        ],
        answer: 2
      },
      {
        question: 'What was the root cause of the consumer allergic reactions?',
        options: [
          'A manufacturing defect in the brand\'s own factory',
          'An undisclosed allergen from a third-party ingredient supplier',
          'Incorrect product storage by retailers',
          'Consumer misuse of the product'
        ],
        answer: 1
      }
    ]
  },

  writing: {
    title: 'Crisis Holding Statement Email to Retail Partners',
    scenario: 'Social media posts are circulating claiming that some Mizone consumers experienced unusual symptoms after drinking a new product variant. No investigation has been completed yet. Write a proactive email to your top 10 retail partners to brief them before media coverage escalates, without admitting fault.',
    template: {
      subject: 'Important Update: Mizone — Proactive Communication on Recent Social Media Reports',
      structure: [
        {
          label: 'Opening — Proactive Outreach',
          text: 'Dear [Partner Name],\n\nI am reaching out proactively to brief you on recent social media activity related to the Mizone brand, before you encounter this through media channels.'
        },
        {
          label: 'Situation Statement',
          text: 'We have become aware of a small number of social media posts where consumers report experiencing discomfort after consuming Mizone [Product Variant]. We take any consumer concern extremely seriously and want to ensure you have full, accurate information.'
        },
        {
          label: 'Actions Being Taken',
          text: 'We have immediately activated our consumer safety protocol and launched a thorough internal investigation in collaboration with our quality and regulatory teams. We expect to have preliminary findings within 48 hours.'
        },
        {
          label: 'Your Action — Hold Position',
          text: 'At this time, we recommend continuing normal product operations. We will notify you immediately with investigation findings and any recommended next steps.'
        },
        {
          label: 'Consumer Inquiry Handling',
          text: 'If consumers raise questions in-store, please direct them to our consumer hotline: [Number]. Our team is standing by to respond to all inquiries promptly.'
        },
        {
          label: 'Commitment & Closing',
          text: 'We are committed to full transparency throughout this process. I will personally provide you with a status update within 24 hours.\n\nThank you for your continued partnership.\n\nSincerely,\nXueyan Xu\nBrand Manager, Mizone'
        }
      ]
    },
    task: 'Rewrite this panicked and unprofessional crisis email:\n\n"Hi. We have a big problem. People are saying bad things about our product online. Don\'t worry, it\'s not our fault. We will fix it. Please don\'t stop selling. Thanks."',
    reference: 'Subject: Important Update: Mizone — Proactive Communication on Recent Social Media Reports\n\nDear [Partner Name],\n\nI am reaching out proactively to ensure you have accurate, first-hand information regarding recent social media activity related to Mizone.\n\nSituation: We have become aware of a limited number of social media posts in which consumers report discomfort after consuming Mizone [Variant]. We take every consumer concern with the utmost seriousness.\n\nImmediate Actions: We have activated our consumer safety protocol and launched a full investigation with our quality and regulatory teams. We expect preliminary findings within 48 hours.\n\nOur Recommendation: We advise continuing normal operations while the investigation is underway. We will notify you immediately should any action be required.\n\nConsumer Inquiries: Please direct any in-store consumer questions to our dedicated hotline: [Number]. Our team is responding to all inquiries on a priority basis.\n\nI will personally provide you with a full status update within 24 hours. Thank you for your trust and continued partnership.\n\nSincerely,\nXueyan Xu\nBrand Manager, Mizone | Danone China'
  },

  speaking: {
    title: 'How Would You Handle a Social Media Crisis for Mizone?',
    outline: [
      { point: '1. Immediate Response — First 2 Hours (0:00–0:25)', note: 'Activate crisis team, assign spokesperson, establish facts before communicating.' },
      { point: '2. Holding Statement — First 4 Hours (0:25–0:45)', note: 'Issue an empathetic, transparent message that acknowledges concern without admitting fault.' },
      { point: '3. Stakeholder Management (0:45–1:05)', note: 'Sequence: consumers → retail partners → media → regulators. Each audience needs a tailored message.' },
      { point: '4. Investigation & Resolution (1:05–1:25)', note: 'Conduct a rigorous root cause investigation. Communicate findings openly. Introduce a goodwill program if warranted.' },
      { point: '5. Post-Crisis Review (1:25–1:45)', note: 'Conduct a post-mortem. Update crisis protocols. Rebuild brand trust through consistent, positive brand actions.' }
    ],
    keySentences: [
      'In a crisis, the first rule is: communicate before you are communicated about. Proactive transparency is always better than reactive denial.',
      'The holding statement is your most critical communication — it must be empathetic and transparent without admitting fault before the facts are established.',
      'I would sequence stakeholder communications very carefully: consumers first via social channels, then retail partners before media runs the story, then regulators if required.',
      'A consumer goodwill program — such as a refund offer or a product replacement — can significantly accelerate trust recovery once the root cause has been identified and addressed.',
      'After every crisis, I conduct a formal post-mortem to update our response protocols and identify any systemic gaps — so the next team is better prepared.'
    ],
    selfEvalCriteria: [
      { label: 'Crisis Sequence', desc: 'Did you clearly describe what happens in the first 2 hours, first 24 hours, and beyond?' },
      { label: 'Stakeholder Thinking', desc: 'Did you address multiple stakeholder groups — not just consumers?' },
      { label: 'Communication Tone', desc: 'Did you emphasize empathy and transparency throughout?' },
      { label: 'Problem-Solving', desc: 'Did you demonstrate a structured, calm, solution-oriented approach?' },
      { label: 'Brand Protection', desc: 'Did you show awareness of long-term reputation impact, not just short-term damage control?' }
    ]
  },

  quiz: {
    questions: [
      {
        type: 'mcq',
        question: 'What is the primary purpose of a "holding statement" in a crisis?',
        options: [
          'To admit fault and apologize immediately',
          'To acknowledge the situation and express concern while the investigation is ongoing, without prematurely assigning blame',
          'To deny all claims made on social media',
          'To announce a product recall'
        ],
        answer: 1,
        explanation: 'A holding statement buys time during a crisis — it shows the brand is aware and caring, while the investigation establishes the facts before a full statement is made.'
      },
      {
        type: 'mcq',
        question: 'In crisis communication, "proactive" means:',
        options: [
          'Waiting for media to ask questions before responding',
          'Communicating with stakeholders before they receive the news from external sources',
          'Immediately launching a new advertising campaign to distract consumers',
          'Hiring a PR agency to handle all communications'
        ],
        answer: 1,
        explanation: 'Proactive crisis communication means reaching key stakeholders BEFORE they hear the news elsewhere — maintaining trust through first-hand briefing.'
      },
      {
        type: 'fillblank',
        question: 'Damage to a brand\'s public image and consumer trust caused by a crisis or scandal is called ________ damage.',
        answer: 'reputational',
        explanation: '"Reputational damage" refers to the harm done to how a brand is perceived — often harder to repair than financial losses from a crisis.'
      },
      {
        type: 'mcq',
        question: 'Which of the following best describes a "consumer goodwill program" in a post-crisis context?',
        options: [
          'A loyalty program launched before a crisis',
          'An initiative (e.g., refunds, replacements, donations) offered to affected consumers to rebuild trust after a crisis',
          'A PR campaign promoting the brand\'s positive community activities',
          'A discount program for new consumer acquisition'
        ],
        answer: 1,
        explanation: 'A goodwill program demonstrates that the brand takes responsibility and values its consumers, helping to accelerate trust recovery after a crisis.'
      },
      {
        type: 'correction',
        question: 'Correct this sentence: "We take every consumer concern with utmost serious and will investigate thorough."',
        corrected: 'We take every consumer concern with the utmost seriousness and will investigate thoroughly.',
        answer: 'We take every consumer concern with the utmost seriousness and will investigate thoroughly.',
        explanation: 'Errors: "utmost serious" → "the utmost seriousness" (noun needed; missing article "the"); "investigate thorough" → "investigate thoroughly" (adverb needed).'
      }
    ]
  }
});
