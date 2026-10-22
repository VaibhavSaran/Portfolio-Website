// Shared factual content for the portfolio and its assistant.
export const resumeData = {
  basics: {
    name: "Vaibhav Saran",
    title: "AI Engineer & Applied ML Researcher",
    summary:
      "AI engineer building and deploying production agentic systems, enterprise diagnostic skills, autonomous race-intelligence pipelines, and interpretable clinical RL frameworks. I connect agentic AI, data engineering, and MLOps, with research in offline RL and sustainable machine learning.",
    location: "Naperville, Chicago, United States",
    email: "vaibhavsaran8@gmail.com",
    phone: null,
    links: {
      linkedin: "www.linkedin.com/in/vaibhav-saran",
      github: "github.com/VaibhavSaran",
    },
  },
  topSkills: [
    "LangChain",
    "LangGraph",
    "GCP Cloud Run",
    "Agentic AI development",
    "Python",
  ],
  languages: ["English (Native or Bilingual)"],
  experience: [
    {
      company: "Trek Health",
      role: "AI/ML Engineering Intern",
      dates: "August 2026 – Present",
      duration: "",
      location: "San Mateo, CA",
      bullets: [
        "Cut error-resolution time by 70% for sales teams and customers by deploying a diagnostic skill that traces failed agent runs to priority-ranked root causes, using an evidence-bundle query and mandatory sub-agent drilldown.",
        "Improved response time by 87% and reduced model calls by 38% by migrating the platform’s LangGraph orchestration to a REST API architecture, reducing infrastructure costs by 42%.",
      ],
    },
    {
      company: "Green AI Labs, University at Buffalo",
      role: "Research Intern",
      dates: "January 2025 – August 2026",
      duration: "",
      location: "Buffalo, NY",
      bullets: [
        "Built an LLM-grounded decision-support framework combining retrieved clinical knowledge with an ensemble offline RL, XGBoost, and TabNet policy over 874K ICU records.",
        "Achieved 83% treatment accuracy in research evaluation, a 23 percentage-point gain over the BCQ baseline.",
        "Built an admission-time risk-stratification module using HDBSCAN and UMAP over 27,799 patient stays, classifying cases into three validated mortality-risk tiers within minutes to flag high-risk cases for physician review.",
      ],
    },
    {
      company: "Innomatics Research Labs",
      role: "Data Scientist",
      dates: "January 2023 - June 2024",
      duration: "1 year 6 months",
      location: "Hyderabad, Telangana, India",
      bullets: [
        "Validated a price-aggregation proof of concept for Amazon, BestBuy, and Flipkart, collecting 5,000+ listings through BeautifulSoup and Selenium with automated weekly refreshes and stress-testing under simulated production-scale conditions.",
        "Normalized multi-source data into 12 structured attributes and built a distributed PySpark ETL pipeline into PostgreSQL, enabling unified CRUD and cross-brand price analytics.",
        "Mentored 150+ learners across seven countries with a 4.7/5 satisfaction rating.",
      ],
    },
    {
      company: "Hacktoberfest",
      role: "Deep Learning Open Source Code Contributor",
      dates: "October 2022",
      duration: "1 month",
      location: "Online",
      bullets: [
        "Successfully merged 5 pull requests in the repository DSA and data science by parikshitsen.",
        "Contributed programs in C++ and Python, and created separate channels for machine learning and deep learning.",
      ],
    },
    {
      company: "Hacktoberfest",
      role: "Machine Learning Open Source Code Contributor",
      dates: "October 2021",
      duration: "1 month",
      location: "Online",
      bullets: [
        "Successfully contributed in Hacktoberfest 2021 and was able to get 4 pull requests merged.",
        "Started a repository for beginners to open source so that they could also contribute.",
      ],
    },
    {
      company: "CipherSchools",
      role: "Deep Learning Trainee",
      dates: "May 2021 - June 2021",
      duration: "2 months",
      location: "Online",
      bullets: [
        "Part of 45 days training program to learn about Deep Learning.",
        "Worked on a project to translate hand signs to text for mute people using object detection as final project submission.",
      ],
    },
    {
      company: "WsCube Tech",
      role: "Trainee",
      dates: "January 2021 - February 2021",
      duration: "2 months",
      location: "Jodhpur, Rajasthan, India",
      bullets: ["Trainee for 45 days learning Python programming language."],
    },
    {
      company: "AIESEC in India",
      role: "Corporate Exchange Manager",
      dates: "August 2019 - January 2021",
      duration: "1 year 6 months",
      location: "Jodhpur, Rajasthan, India",
      bullets: [
        "Worked as Corporate Exchange Manager for 1 year, bringing international interns to clients of AIESEC in Jodhpur.",
        "Was the best performing member in the local chapter at end of term.",
      ],
    },
    {
      company: "AIESEC in India",
      role: "Organizing Committee Recruitments",
      dates: "August 2020",
      duration: "1 month",
      location: "Jodhpur, Rajasthan, India",
      bullets: [
        "Part of team responsible for hiring new talent for AIESEC in Jodhpur.",
      ],
    },
    {
      company: "Hacktoberfest",
      role: "Python and C++ Open Source Code Contributor",
      dates: "October 2020",
      duration: "1 month",
      location: "Online",
      bullets: [
        "Started Open Source Journey with Hacktoberfest 2020, achieving a total of 9 successful pull requests.",
        "Repositories contributed to: github.com/bansalkanav/SOLVING_200_LEETCODE_QUESTIONS, github.com/Shashank9928/5th-SEM-LAB, github.com/parikshitsen/Python-, github.com/rajatgupta300557/Python_start",
      ],
    },
    {
      company: "CipherSchools",
      role: "Machine Learning Trainee",
      dates: "May 2020 - June 2020",
      duration: "2 months",
      location: "Chandigarh, India",
      bullets: [
        "Trained for 45 days learning Machine Learning using Python, awarded 5 star at end of training.",
      ],
    },
  ],
  projects: [
    {
      title: "StockPilot AI — Agentic RAG Stock Analysis Agent",
      dates: "February 2026 – August 2026",
      associated: null,
      bullets: [
        "Built a supervisor-based multi-agent research system combining live stock data, news, and charts through hybrid retrieval, with responses under 10 seconds.",
        "Added a prompt-injection guardrail and an 11.4% data-quality filter. Evaluated retrieval with RAGAS: 0.624 overall, 0.754 faithfulness, and answer relevancy improved from 0.673 to 0.736.",
        "Extended analysis with seven-day Prophet forecasting and archived 3,800+ cold records to AWS S3 with DuckDB fallback. Airflow orchestrates PostgreSQL, MongoDB, and ChromaDB.",
      ],
      skills: ["LangGraph", "RAGAS", "Airflow", "FastAPI", "AWS EC2", "DuckDB"],
      links: {
        liveDemo: "https://stockpilot.vaibhavsaran.com/",
        github: "https://github.com/VaibhavSaran/Stock-Pilot-AI",
      },
      contributors: null,
    },
    {
      title: "F1 Primus AI — Autonomous Pre-Race Prediction Pipeline",
      dates: "January 2026 - February 2026",
      associated: null,
      bullets: [
        "Built an autonomous pre-race intelligence pipeline that brings weather, practice telemetry, news, and a Gradient Boosting lap-time model into a single report in under two minutes across 24 rounds.",
        "A LangGraph ReAct agent reasons over FastF1, Open-Meteo, and Tavily sources; MLflow records offline experiments and Prefect handles orchestration and retries.",
        "Containerized the Streamlit application with Docker, deployed it on GCP Cloud Run, and automated deployment with GitHub Actions.",
      ],
      skills: [
        "LangGraph",
        "LangChain",
        "FastF1",
        "MLflow",
        "Prefect",
        "Docker",
        "GCP Cloud Run",
        "GitHub Actions",
      ],
      links: {
        liveDemo: "https://f1primus.vaibhavsaran.com/",
        github: "https://github.com/VaibhavSaran/F1-Primus-AI",
      },
      contributors: null,
    },
    {
      title: "Job Search Automation Pipeline",
      dates: "March 2026 – Present",
      associated: null,
      bullets: [
        "Created a weekday 8 AM or manual n8n workflow that collects LinkedIn jobs through Apify, normalizes fields, and removes duplicate URLs.",
        "Claude Sonnet 4.6 scores fit and provides resume suggestions. The pipeline logs 21 fields per job into Google Sheets, routing scores of 70 or above into High Matches while retaining All Jobs.",
        "Processes 100 jobs per run, turning job discovery into a repeatable, inspectable pipeline.",
      ],
      skills: ["n8n", "Claude API", "Apify", "Google Sheets", "Automation"],
      links: {},
      contributors: null,
    },
    {
      title: "Optimizing Sepsis Treatment With Reinforcement Learning",
      dates: "February 2025 - May 2025",
      associated: "University at Buffalo",
      award: "3rd Place — CSE Demo Days, SUNY Buffalo",
      publication: "IEEE ICMLA 2025 conference paper",
      bullets: [
        "Developed an interpretable attention-based offline RL framework with clustering and LLM-generated rationale, evaluated on MIMIC-III and eICU cohorts.",
        "The ensemble policy achieved 83% treatment accuracy over 874K ICU records. HDBSCAN and UMAP group 27,799 patient stays into three mortality-risk tiers.",
        "Augmented underrepresented fluid and vasopressor examples with synthetic trajectories from diffusion models and a conditional VAE, addressing sparse intervention data during offline training.",
        "Awarded third place at CSE Demo Days, University at Buffalo; the work developed into an IEEE ICMLA 2025 conference paper.",
      ],
      skills: [
        "LangChain",
        "Reinforcement Learning",
        "HDBSCAN",
        "UMAP",
        "LLaMA",
        "Streamlit",
      ],
      links: {
        demoVideo: "https://www.youtube.com/watch?v=Sna3q-Jr_jA",
        github:
          "https://github.com/VaibhavSaran/Optimizing-Sepsis-Treatment-with-RL",
        paperPdf: "https://arxiv.org/pdf/2601.14228",
      },
      contributors: [
        {
          name: "Punit Kumar (Lead Author)",
          github: "https://github.com/punit121",
          linkedin: "https://www.linkedin.com/in/punit121/",
        },
        {
          name: "Vaibhav Saran (Second Author)",
          github: null,
          linkedin: null,
        },
        {
          name: "Divyesh Patel",
          github: "https://github.com/Divyesh230902",
          linkedin: "https://www.linkedin.com/in/thedivyeshpatel/",
        },
      ],
    },
    {
      title: "Laptrack — Laptop Price Aggregator and Recommendation Engine",
      dates: "February 2025 - May 2025",
      associated: "University at Buffalo",
      bullets: [
        "Built a robust ETL pipeline using PySpark to scrape, preprocess, and load extensive laptop data from Amazon, BestBuy, and Flipkart, ensuring seamless handling of diverse data formats. Dataset published on Kaggle.",
        "Developed a feature-rich aggregator application using Flask (backend) and ReactJS (frontend), enabling users to compare laptop buying options across multiple platforms.",
        "Implemented a content-based recommendation engine to suggest similar products, enhancing user engagement and providing tailored shopping experiences.",
        "Designed and deployed machine learning models to predict laptop prices based on specifications and analyze pricing trends, integrating insights into an admin dashboard for informed decision-making.",
      ],
      skills: ["PySpark", "Hadoop", "Flask", "ReactJS", "Machine Learning"],
      links: {
        demoVideo: "https://www.youtube.com/watch?v=WnHhlB1WFgM",
        kaggleDataset:
          "https://www.kaggle.com/datasets/vaibhavsaran/best-buy-amazon-flipkart-laptop-data",
        github: "https://github.com/VaibhavSaran/PROJECT-LAPTRACK",
      },
      contributors: [
        {
          name: "Shaurya Mathur",
          github: "https://github.com/ShauryaMathur",
          linkedin: "https://www.linkedin.com/in/shauryamathur27/",
        },
        {
          name: "Yeswanth Chitturi",
          github: "https://github.com/s1th883",
          linkedin: "https://www.linkedin.com/in/yeswanth-chitturi/",
        },
      ],
    },
    {
      title: "Hand Sign Detection — Real-Time Visual Communication",
      dates: "Undergraduate major project",
      associated: "JIET Group of Institutions",
      bullets: [
        "Built a real-time webcam detector for 10 custom hand signs using TensorFlow Object Detection and SSD MobileNet V2 FPNLite 320×320, connecting visual sign recognition to on-screen text.",
        "Created a 300-image dataset by photographing personal examples of each sign and annotating bounding boxes with LabelImg. Used 240 images for training and 60 for testing.",
        "Fine-tuned the pretrained detector for 10,000 training steps, then ran predictions on still images and live camera input with bounding boxes, sign labels, and confidence scores.",
        "Organized data collection, training, evaluation, and inference in Jupyter notebooks and exported the frozen model. The custom vocabulary includes expressions such as “thank you,” “name,” “what,” “nice,” and “I love you.”",
      ],
      skills: ["Python", "TensorFlow", "SSD MobileNet", "LabelImg", "Jupyter"],
      links: {
        github:
          "https://github.com/VaibhavSaran/Hand-Sign-Detection-with-Tensorflow-Object-Detection",
      },
      contributors: null,
    },
  ],
  research: {
    greenCrisp: {
      title: "Green CRISP-ML(Q): A Framework for Sustainable Machine Learning",
      subtitle:
        "Embedding sustainability into AI development through comprehensive environmental profiling",
      authors: ["Vaibhav Saran", "Dr. Asif Imran (advisor)"],
      venue:
        "Poster, NY-BEST Annual Energy Storage Conference, 2025, Ithaca, NY",
      overview:
        "Extends CRISP-ML(Q) with sustainability checkpoints across all six stages of the ML lifecycle, bringing carbon budgets, resource profiling, and environmental trade-offs alongside model quality.",
      checkpoints: [
        "Business & data understanding",
        "Data engineering",
        "Model building & training",
        "Model evaluation",
        "Deployment",
        "Monitoring & maintenance",
      ],
      architecture:
        "A five-phase profiler combines Scalene and CodeCarbon: initialization, execution profiling, parallel monitoring, result aggregation, and output generation. Function decorators and context managers capture CPU, GPU, RAM, energy, and CO₂ measurements, exporting a 43-column dataset with session logs and performance summaries.",
      experiment:
        "Proof-of-concept evaluation: Neural Collaborative Filtering on MovieLens-20M, using an Intel Xeon Gold 6126 (48 cores), Quadro RTX 6000 GPU, and 187.4 GB RAM.",
      findings: [
        {
          value: "93.5%",
          label: "of measured CO₂ came from training",
          detail: "114.60 g of the experiment’s 122.62 g total",
        },
        {
          value: "8.57%",
          label: "average GPU utilization during training",
          detail: "An opportunity to improve acceleration and batch sizing",
        },
        {
          value: "0.333",
          label: "kWh total experiment energy",
          detail: "Measured consumption, not a claimed energy saving",
        },
      ],
      limitations:
        "These are observations from one NCF/MovieLens-20M experiment, not measured reductions or a general benchmark. Validation across more AI domains and automated optimization recommendations are future work.",
      skills: [
        "Sustainable AI",
        "Scalene",
        "CodeCarbon",
        "Environmental profiling",
        "NCF",
        "MovieLens-20M",
      ],
    },
  },
  achievements: [
    {
      type: "award",
      title: "Winner — CSE Demo Days, SUNY Buffalo",
      context:
        "Won at 3rd place for Optimizing Sepsis Treatment With Reinforcement Learning and clustering, which was further developed into a research paper accepted at IEEE ICMLA 2025.",
      date: "2025",
    },
    {
      type: "publication",
      title: "Paper accepted at IEEE Conference (ICMLA 2025)",
      context:
        "Attention-Based Offline Reinforcement Learning and Clustering for Interpretable Sepsis Treatment",
      date: "2025",
    },
    {
      type: "metric",
      title: "83% Accuracy on sepsis treatment prediction",
      value: 83,
      context:
        "Using offline RL with custom attention on MIMIC-III and e-ICU datasets",
    },
    {
      type: "metric",
      title: "Mentored 150+ learners",
      value: 150,
      context:
        "Data Science Coach at Innomatics Research Labs with 4.7/5 satisfaction score",
    },
    {
      type: "metric",
      title: "Delivered 12 production-ready projects",
      value: 12,
      context:
        "Including object detection, image classification, and sentiment analysis for learners across 7 countries",
    },
    {
      type: "research",
      title: "Green CRISP-ML(Q)",
      context:
        "Developed a six-stage sustainability framework with Scalene and CodeCarbon profiling. An NCF/MovieLens-20M experiment measured 0.333 kWh total energy and attributed 93.5% of CO₂ to training, identifying optimization opportunities.",
      link: "/documents/Green-CRISP-ML-Q-Poster.pdf",
    },
    {
      type: "project",
      title: "1,000+ Articles · StockPilot AI",
      context:
        "Indexed 1,000+ real-time financial news articles across 7 stock tickers using ChromaDB vector store and Apache Airflow DAGs — deployed live on AWS EC2.",
      liveDemo: "https://stockpilot.vaibhavsaran.com/",
    },
    {
      type: "project",
      title: "Hand Sign Detection",
      context:
        "Built an object detection system that detects hand signs and gives the meaning of sign as text in real time, enabling communication for mute individuals. Implemented using TensorFlow Object Detection.",
      github:
        "https://github.com/VaibhavSaran/Hand-Sign-Detection-with-Tensorflow-Object-Detection",
    },
  ],
  skills: {
    "Agentic AI": [
      "LangGraph",
      "LangChain",
      "LangSmith",
      "RAG",
      "Multi-Agent Systems",
      "MCP",
      "Claude API",
      "OpenAI API",
      "Gemini",
      "Jev (TypeSafe AI)",
    ],
    "Machine learning": [
      "PyTorch",
      "scikit-learn",
      "Hugging Face",
      "Offline RL",
      "XGBoost",
      "HDBSCAN",
      "UMAP",
      "VAE",
      "Diffusion Models",
      "NLTK",
      "spaCy",
      "Speech/audio processing",
    ],
    "Data & infrastructure": [
      "Python",
      "C++",
      "SQL",
      "PySpark",
      "Airflow",
      "Prefect",
      "PostgreSQL",
      "MongoDB",
      "ChromaDB",
      "FAISS",
      "DuckDB",
      "Hadoop",
      "Snowflake",
      "Databricks",
      "Microsoft Fabric",
      "MySQL",
      "SQLite",
    ],
    "Shipping & serving": [
      "FastAPI",
      "Docker",
      "GitHub Actions",
      "MLflow",
      "AWS EC2 / S3",
      "GCP Cloud Run",
      "Nginx",
      "Groq",
      "Cerebras",
      "vLLM",
      "TensorRT",
      "Git",
      "Selenium",
    ],
    "Programming languages": ["Python", "C++", "C"],
    "Sustainable ML": [
      "Scalene",
      "CodeCarbon",
      "Energy & CO₂ profiling",
      "CRISP-ML(Q)",
    ],
  },
  education: [
    {
      institution: "University at Buffalo",
      degree: "MS in Artificial Intelligence",
      dates: "Dec 2025",
      gpa: "3.7",
      highlights: [
        "Paper accepted at IEEE Conference (ICMLA)",
        "Part of Green-AI Labs, optimizing AI Workflows and reducing cost and carbon footprints",
      ],
    },
    {
      institution: "JIET Group of Institutions",
      degree: "B.Tech in Computer Science",
      dates: "June 2022",
      gpa: "3.64",
      highlights: [
        "Began open-source contributions via Hacktoberfest, successfully merging pull requests across Python, C++, and Machine Learning repositories — marking the start of a consistent engineering practice.",
        "Built a real-time Hand Sign Detection system using TensorFlow Object Detection API that captions hand signs as text, enabling communication for mute individuals — submitted as final major project.",
      ],
    },
  ],
  extra: [
    "Part of Green-AI Labs at University at Buffalo",
    "Learners trained across 7 countries at Innomatics Research Labs",
    "Created separate channels in open source contributions during hacktober fest. The channels comprised of Python, C++, Machine Learning and Deep Learning so that new contributors to open source can easily find resources and contribute in simple issues and tasks.",
    {
      text: "Building a comprehensive learning roadmap repository covering the full journey from Python fundamentals to Generative AI, designed as a structured guide for aspiring AI practitioners.",
      link: "https://github.com/VaibhavSaran/Artificial-Intelligence",
    },
  ],
};
