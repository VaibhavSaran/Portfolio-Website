export const resumeData = {
  basics: {
    name: "Vaibhav Saran",
    title: "Agentic AI Engineer · LLM Systems · Production ML · IEEE ICMLA 2025",
    summary: "MS in Artificial Intelligence from SUNY Buffalo (Dec 2025). Published research on attention-based offline RL for sepsis treatment (IEEE ICMLA 2025). Building production LLM and multi-agent AI systems from research to deployment.",
    location: "Buffalo, New York, United States",
    email: "vaibhavsaran8@gmail.com",
    phone: null,
    links: {
      linkedin: "www.linkedin.com/in/vaibhav-saran",
      github: "github.com/VaibhavSaran"
    }
  },
  topSkills: [
    "LangChain",
    "LangGraph",
    "GCP Cloud Run",
    "Agentic AI development",
    "Python",
  ],
  languages: [
    "English (Native or Bilingual)"
  ],
  experience: [
    {
      company: "University at Buffalo - Artificial Intelligence and Data Science",
      role: "Research Assistant",
      dates: "October 2024 - December 2025",
      duration: "1 year 3 months",
      location: "Buffalo, New York, United States",
      bullets: [
        "Conducted research on optimizing sepsis treatment using reinforcement learning and custom attention mechanisms.",
        "Collaborated as co-author on the above paper accepted at an IEEE conference (ICMLA), showcasing novel approaches.",
        "Developed a custom AI workflow for Green-AI Labs, focusing on resource consumption profiling and carbon footprint reduction."
      ]
    },
    {
      company: "Innomatics Research Labs",
      role: "Data Scientist",
      dates: "January 2023 - June 2024",
      duration: "1 year 6 months",
      location: "Hyderabad, Telangana, India",
      bullets: [
        "Mentored over 150 learners as a Data Science Coach with a 4.7/5 satisfaction score, providing training in advanced data science skills in both live offline and online mode.",
        "Delivered 12 production-ready projects including object detection, image classification, and sentiment analysis for learners across 7 countries.",
        "Enhanced 200 ML projects, improving model accuracy by 12% and increasing placement rates by 5% through performance optimization guidance."
      ]
    },
    {
      company: "Hacktoberfest",
      role: "Deep Learning Open Source Code Contributor",
      dates: "October 2022",
      duration: "1 month",
      location: "Online",
      bullets: [
        "Successfully merged 5 pull requests in the repository DSA and data science by parikshitsen.",
        "Contributed programs in C++ and Python, and created separate channels for machine learning and deep learning."
      ]
    },
    {
      company: "Hacktoberfest",
      role: "Machine Learning Open Source Code Contributor",
      dates: "October 2021",
      duration: "1 month",
      location: "Online",
      bullets: [
        "Successfully contributed in Hacktoberfest 2021 and was able to get 4 pull requests merged.",
        "Started a repository for beginners to open source so that they could also contribute."
      ]
    },
    {
      company: "CipherSchools",
      role: "Deep Learning Trainee",
      dates: "May 2021 - June 2021",
      duration: "2 months",
      location: "Online",
      bullets: [
        "Part of 45 days training program to learn about Deep Learning.",
        "Worked on a project to translate hand signs to text for mute people using object detection as final project submission."
      ]
    },
    {
      company: "WsCube Tech",
      role: "Trainee",
      dates: "January 2021 - February 2021",
      duration: "2 months",
      location: "Jodhpur, Rajasthan, India",
      bullets: [
        "Trainee for 45 days learning Python programming language."
      ]
    },
    {
      company: "AIESEC in India",
      role: "Corporate Exchange Manager",
      dates: "August 2019 - January 2021",
      duration: "1 year 6 months",
      location: "Jodhpur, Rajasthan, India",
      bullets: [
        "Worked as Corporate Exchange Manager for 1 year, bringing international interns to clients of AIESEC in Jodhpur.",
        "Was the best performing member in the local chapter at end of term."
      ]
    },
    {
      company: "AIESEC in India",
      role: "Organizing Committee Recruitments",
      dates: "August 2020",
      duration: "1 month",
      location: "Jodhpur, Rajasthan, India",
      bullets: [
        "Part of team responsible for hiring new talent for AIESEC in Jodhpur."
      ]
    },
    {
      company: "Hacktoberfest",
      role: "Python and C++ Open Source Code Contributor",
      dates: "October 2020",
      duration: "1 month",
      location: "Online",
      bullets: [
        "Started Open Source Journey with Hacktoberfest 2020, achieving a total of 9 successful pull requests.",
        "Repositories contributed to: github.com/bansalkanav/SOLVING_200_LEETCODE_QUESTIONS, github.com/Shashank9928/5th-SEM-LAB, github.com/parikshitsen/Python-, github.com/rajatgupta300557/Python_start"
      ]
    },
    {
      company: "CipherSchools",
      role: "Machine Learning Trainee",
      dates: "May 2020 - June 2020",
      duration: "2 months",
      location: "Chandigarh, India",
      bullets: [
        "Trained for 45 days learning Machine Learning using Python, awarded 5 star at end of training."
      ]
    }
  ],
  projects: [
    {
      title: "StockPilot AI — Agentic RAG Stock Analysis Agent",
      dates: "March 2026 - Present",
      associated: null,
      bullets: [
        "Built a full-stack AI-powered stock market analysis agent using a multi-agent LangGraph architecture with Claude AI (claude-sonnet-4-6) as the primary LLM and Google Gemini for embeddings.",
        "The system features a Supervisor Agent that intelligently routes natural language queries to three specialized sub-agents: News RAG (ChromaDB + web search with source citations), Stock Data RAG (NL-to-SQL against PostgreSQL), and Stock Charts RAG (candlestick visualizations).",
        "Real-time data pipelines built with Apache Airflow ingest live stock prices via yfinance (hourly) and financial news (every 3 hours), with automatic ChromaDB vector sync every 4 hours.",
        "Deployed on AWS EC2 (Ubuntu 24.04) with Nginx reverse proxy, Docker Compose orchestrating 9 containers, and a GitHub Actions CI/CD pipeline for automated deployments on every push to main."
      ],
      skills: ["LangGraph", "LangChain", "Apache Airflow", "ChromaDB", "PostgreSQL", "Docker", "AWS EC2", "Nginx", "GitHub Actions"],
      links: {
        liveDemo: "https://stockpilot.vaibhavsaran.com/",
        github: "https://github.com/VaibhavSaran/Stock-Pilot-AI"
      },
      contributors: null
    },
    {
      title: "F1 Primus AI — Autonomous Pre-Race Prediction Pipeline",
      dates: "March 2026",
      associated: null,
      bullets: [
        "Built an end-to-end agentic AI system that autonomously generates pre-race intelligence reports for the 2026 Formula 1 season.",
        "Given a race round, the pipeline fetches real F1 telemetry via FastF1, race weekend weather via Open-Meteo, grid penalties and team news via Tavily AI search, and runs a Gradient Boosting ML model — all orchestrated by a LangGraph ReAct agent using Claude claude-sonnet-4.5 as the reasoning engine.",
        "ML experiments tracked with MLflow (hyperparameters, MAE, model artifacts). Pipeline wrapped in a Prefect flow with task-level retry logic.",
        "Streamlit UI containerised with Docker, deployed on GCP Cloud Run, automatically redeployed via GitHub Actions CI/CD on every push to main."
      ],
      skills: ["LangGraph", "LangChain", "FastF1", "MLflow", "Prefect", "Docker", "GCP Cloud Run", "GitHub Actions"],
      links: {
        liveDemo: "https://f1-primus-ai-214856382722.us-central1.run.app/",
        github: "https://github.com/VaibhavSaran/F1-Primus-AI"
      },
      contributors: null
    },
    {
      title: "Job Search Automation Pipeline",
      dates: "March 2026 – Present",
      associated: null,
      bullets: [
        "Built a live n8n automation workflow that scrapes LinkedIn, Indeed, and Glassdoor daily using an Apify actor, scoring each job posting via the Claude API (claude-sonnet-4-6) for fit against a target profile.",
        "High-match roles are automatically routed to a dedicated Google Sheets tab with AI-generated fit scores and reasoning — eliminating manual job discovery entirely.",
        "Stack: n8n (self-hosted), Apify, Claude API, Google Sheets API"
      ],
      skills: ["n8n", "Claude API", "Apify", "Google Sheets", "Automation"],
      links: {},
      contributors: null
    },
    {
      title: "Optimizing Sepsis Treatment With Reinforcement Learning",
      dates: "February 2025 - May 2025",
      associated: "University at Buffalo",
      award: "3rd Place — CSE Demo Days, SUNY Buffalo",
      publication: "Accepted at IEEE ICMLA 2025 — \"Attention-Based Offline Reinforcement Learning and Clustering for Interpretable Sepsis Treatment\"",
      bullets: [
        "Built an interpretable sepsis treatment framework using offline RL with custom attention and LLaMA-3.2 for interpretation of actions, achieving 83% accuracy on MIMIC-III and e-ICU via a novel attention-based offline RL approach.",
        "Deployed the complete framework in a secure local environment using Streamlit for UI, ensuring patient data privacy and compliance for clinical AI applications.",
        "Implemented a clustering-driven risk stratification pipeline using HDBSCAN with UMAP, generating 124 clusters from ICU data and consolidating them into 3 clinically meaningful mortality-based risk categories (low, intermediate, high), effectively addressing the cold-start problem for new admissions.",
        "Research contribution: synthetic data augmentation using VAE and diffusion models to address data sparsity in critical interventions. AWR-based agent with attention mechanisms for personalized treatment recommendations. LLM-based rationale generation providing clinicians with natural-language explanations."
      ],
      skills: ["LangChain", "Reinforcement Learning", "HDBSCAN", "UMAP", "LLaMA", "Streamlit"],
      links: {
        demoVideo: "https://www.youtube.com/watch?v=Sna3q-Jr_jA",
        github: "https://github.com/VaibhavSaran/Optimizing-Sepsis-Treatment-with-RL",
        paperPdf: "https://arxiv.org/pdf/2601.14228"
      },
      contributors: [
        { name: "Punit Kumar (Lead Author)", github: "https://github.com/punit121", linkedin: "https://www.linkedin.com/in/punit121/" },
        { name: "Vaibhav Saran (Second Author)", github: null, linkedin: null },
        { name: "Divyesh Patel", github: "https://github.com/Divyesh230902", linkedin: "https://www.linkedin.com/in/thedivyeshpatel/" }
      ]
    },
    {
      title: "Laptrack — Laptop Price Aggregator and Recommendation Engine",
      dates: "February 2025 - May 2025",
      associated: "University at Buffalo",
      bullets: [
        "Built a robust ETL pipeline using PySpark to scrape, preprocess, and load extensive laptop data from Amazon, BestBuy, and Flipkart, ensuring seamless handling of diverse data formats. Dataset published on Kaggle.",
        "Developed a feature-rich aggregator application using Flask (backend) and ReactJS (frontend), enabling users to compare laptop buying options across multiple platforms.",
        "Implemented a content-based recommendation engine to suggest similar products, enhancing user engagement and providing tailored shopping experiences.",
        "Designed and deployed machine learning models to predict laptop prices based on specifications and analyze pricing trends, integrating insights into an admin dashboard for informed decision-making."
      ],
      skills: ["PySpark", "Hadoop", "Flask", "ReactJS", "Machine Learning"],
      links: {
        demoVideo: "https://www.youtube.com/watch?v=WnHhlB1WFgM",
        kaggleDataset: "https://www.kaggle.com/datasets/vaibhavsaran/best-buy-amazon-flipkart-laptop-data",
        github: "https://github.com/VaibhavSaran/PROJECT-LAPTRACK"
      },
      contributors: [
        { name: "Shaurya Mathur", github: "https://github.com/ShauryaMathur", linkedin: "https://www.linkedin.com/in/shauryamathur27/" },
        { name: "Yeswanth Chitturi", github: "https://github.com/s1th883", linkedin: "https://www.linkedin.com/in/yeswanth-chitturi/" }
      ]
    }
  ],
  achievements: [
    {
      type: "award",
      title: "Winner — CSE Demo Days, SUNY Buffalo",
      context: "Won at 3rd place for Optimizing Sepsis Treatment With Reinforcement Learning and clustering, which was further developed into a research paper accepted at IEEE ICMLA 2025.",
      date: "2025"
    },
    {
      type: "publication",
      title: "Paper accepted at IEEE Conference (ICMLA 2025)",
      context: "Attention-Based Offline Reinforcement Learning and Clustering for Interpretable Sepsis Treatment",
      date: "2025"
    },
    {
      type: "metric",
      title: "83% Accuracy on sepsis treatment prediction",
      value: 83,
      context: "Using offline RL with custom attention on MIMIC-III and e-ICU datasets"
    },
    {
      type: "metric",
      title: "Mentored 150+ learners",
      value: 150,
      context: "Data Science Coach at Innomatics Research Labs with 4.7/5 satisfaction score"
    },
    {
      type: "metric",
      title: "Delivered 12 production-ready projects",
      value: 12,
      context: "Including object detection, image classification, and sentiment analysis for learners across 7 countries"
    },
    {
      type: "research",
      title: "Green CRISP-ML(Q)",
      context: "Developed comprehensive environmental profiling framework for sustainable AI development, reducing computational costs and carbon footprint in ML workflows.",
      link: "https://drive.google.com/file/d/1ppyDC72qR3O5KgLZyQszFwrJ1i0rE3lx/view?usp=sharing"
    },
    {
      type: "project",
      title: "5,000+ Articles · StockPilot AI",
      context: "Indexed 5,000+ real-time financial news articles across 7 stock tickers using ChromaDB vector store and Apache Airflow DAGs — deployed live on AWS EC2.",
      liveDemo: "http://3.209.133.64"
    },
    {
      type: "project",
      title: "Hand Sign Detection",
      context: "Built an object detection system that detects hand signs and gives the meaning of sign as text in real time, enabling communication for mute individuals. Implemented using TensorFlow Object Detection.",
      github: "https://github.com/VaibhavSaran/Hand-Sign-Detection-with-Tensorflow-Object-Detection"
    }
  ],
  skills: {
    "AI & ML Frameworks": ["LangChain", "LangGraph", "LangSmith", "PyTorch", "Google ADK"],
    "AI & ML Ops": ["Apache Airflow", "MLflow", "Prefect", "Docker", "CI/CD", "GitHub Actions"],
    "Agentic AI & Tools": ["Agentic AI development", "Multi-Agent Systems", "RAG","Claude Code", "Google Gemini"],
    "Cloud & Infrastructure": ["AWS EC2", "GCP Cloud Run", "Nginx", "FastAPI"],
    "Databases & Vector Stores": ["SQLite", "PostgreSQL", "ChromaDB", "MongoDB"],
    "Data Engineering": ["PySpark", "Hadoop"],
    "Deep Learning": ["Reinforcement Learning", "HDBSCAN", "UMAP", "VAE", "GANs", "Transformers"],
    "Programming Languages": ["Python", "C++", "C"],
    "Frontend UI": ["Streamlit", "Flask"]
    
  },
  education: [
    {
      institution: "University at Buffalo",
      degree: "MS in Artificial Intelligence",
      dates: "Dec 2025",
      gpa: "3.7",
      highlights: [
        "Paper accepted at IEEE Conference (ICMLA)",
        "Part of Green-AI Labs, optimizing AI Workflows and reducing cost and carbon footprints"
      ]
    },
    {
      institution: "JIET Group of Institutions",
      degree: "B.Tech in Computer Science",
      dates: "2018-2022",
      gpa: "3.64",
      highlights: [
        "Began open-source contributions via Hacktoberfest, successfully merging pull requests across Python, C++, and Machine Learning repositories — marking the start of a consistent engineering practice.",
        "Built a real-time Hand Sign Detection system using TensorFlow Object Detection API that captions hand signs as text, enabling communication for mute individuals — submitted as final major project."
      ]
    }
  ],
  extra: [
    "Part of Green-AI Labs at University at Buffalo",
    "Learners trained across 7 countries at Innomatics Research Labs",
    "Created separate channels in open source contributions during hacktober fest. The channels comprised of Python, C++, Machine Learning and Deep Learning so that new contributors to open source can easily find resources and contribute in simple issues and tasks.",
    {
      text: "Building a comprehensive learning roadmap repository covering the full journey from Python fundamentals to Generative AI, designed as a structured guide for aspiring AI practitioners.",
      link: "https://github.com/VaibhavSaran/Artificial-Intelligence"
    }
  ]
};
