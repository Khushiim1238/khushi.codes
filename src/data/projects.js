export const projects = [
  {
    name: 'FinTechCore',
    version: '2.1.0',
    publisher: 'khushi.codes',
    description: 'A comprehensive fintech solution with modern financial tools, real-time data processing, and intuitive user interface for managing digital finances.',
    fullDescription: `### Overview
FinTechCore is a high-performance financial management platform designed for the modern economy. It features a robust backend architecture capable of processing real-time transactions with sub-100ms latency.

### Key Features
- **Real-time Ledger:** Atomic transaction processing with strict consistency.
- **Dynamic Analytics:** Visualized data insights using high-frequency data streams.
- **Secure Vault:** Multi-layer encryption for sensitive user financial data.
- **API First:** Fully documented RESTful API for third-party integrations.

### Engineering Challenges
One of the primary challenges was ensuring data integrity during high-concurrency periods. I implemented a distributed locking mechanism using Redis to prevent race conditions during simultaneous fund transfers.`,
    techStack: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'Docker', 'AWS'],
    changelog: [
      { version: '2.1.0', changes: ['Implemented Redis caching layer', 'Added E2E encryption for transactions'] },
      { version: '2.0.0', changes: ['Initial public release', 'Integrated Stripe API'] }
    ],
    language: 'JavaScript',
    langColor: '#F7DF1E',
    github: 'https://github.com/Khushiim1238/FinTechCore',
    homepage: 'https://fin-tech-core.vercel.app',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    stars: 4832,
    downloads: 12400,
    rating: 4.8,
    architecture: ['UI Layer → API Gateway → Redis Cache → PostgreSQL', 'WebSocket Server → Real-time Dashboard', 'Stripe Webhook → Transaction Processor'],
  },
  {
    name: 'Music-Analytics-Pipeline',
    version: '1.4.2',
    publisher: 'khushi.codes',
    description: 'Processes music streaming data using S3, Redshift, and Cassandra with automated ETL pipelines via Apache Airflow.',
    fullDescription: `### Architecture
This project implements a robust Data Lakehouse architecture. It ingests raw JSON streaming data into S3, processes it via Spark on AWS Glue, and loads it into Amazon Redshift for analytical querying.

### Pipeline Stages
1. **Extraction:** Automated listeners for new S3 objects.
2. **Transformation:** Spark jobs for schema validation and deduplication.
3. **Loading:** Parallel COPY commands into Redshift clusters.
4. **Orchestration:** Directed Acyclic Graphs (DAGs) in Airflow for task scheduling and monitoring.

### Performance
Optimized the Redshift distribution keys, resulting in a 60% reduction in query execution time for complex joins across 100M+ record tables.`,
    techStack: ['Python', 'Apache Airflow', 'AWS S3', 'AWS Redshift', 'Spark', 'Cassandra'],
    changelog: [
      { version: '1.4.2', changes: ['Optimized Spark shuffle partitions', 'Added Slack alerts for failed DAGs'] },
      { version: '1.0.0', changes: ['Core ETL logic implemented'] }
    ],
    language: 'Python',
    langColor: '#3572A5',
    github: 'https://github.com/Khushiim1238/Music-Analytics-Pipeline-MAP',
    homepage: null,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    stars: 2134,
    downloads: 5800,
    rating: 4.5,
    architecture: ['S3 Ingestion → AWS Glue (Spark) → Redshift', 'Airflow DAGs → Task Scheduler → Slack Alerts', 'Cassandra → Real-time Lookups'],
  },
  {
    name: 'IntraChat-System',
    version: '3.0.1',
    publisher: 'khushi.codes',
    description: 'A real-time intranet chat application enabling secure communication within local networks. Built for high concurrency.',
    fullDescription: `### Secure Communication
IntraChat is built for enterprises requiring high-security, local-only communication. It bypasses external servers to ensure data never leaves the corporate network.

### Technical Highlights
- **Java NIO:** Utilized non-blocking I/O for handling 5000+ simultaneous socket connections.
- **Custom Protocol:** Designed a lightweight binary protocol for message framing.
- **AES-256:** End-to-end encryption for all message payloads.

### Scalability
The server architecture is stateless, allowing for easy horizontal scaling behind a local load balancer.`,
    techStack: ['Java', 'Netty', 'SQLite', 'JavaFX', 'TCP/IP'],
    changelog: [
      { version: '3.0.1', changes: ['Switched to Netty for better I/O performance', 'Added file transfer support'] }
    ],
    language: 'Java',
    langColor: '#B07219',
    github: 'https://github.com/Khushiim1238/IntraChat',
    homepage: null,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    stars: 1567,
    downloads: 3200,
    rating: 4.6,
    architecture: ['Client (JavaFX) → TCP Socket → Netty Server', 'AES-256 Encryption Layer', 'SQLite → Message Persistence'],
  },
  {
    name: 'Timing-Violation-Predictor',
    version: '0.9.0-beta',
    publisher: 'khushi.codes',
    description: 'AI algorithm to predict combinational complexity and depth of signals in digital circuits.',
    fullDescription: `### The Problem
In modern VLSI design, identifying timing violations early in the synthesis flow is critical. Traditional tools are slow and resource-heavy.

### The Solution
I trained a Gradient Boosted Tree model on a dataset of 50k+ circuit paths to predict Slack and Total Negative Slack (TNS) with 94% accuracy.

### Features
- **Feature Extraction:** Automated parsing of Verilog netlists.
- **Prediction:** Near-instant identification of critical paths.
- **Integration:** Hooks for standard EDA toolchains.`,
    techStack: ['Python', 'Scikit-Learn', 'XGBoost', 'Pandas', 'Matplotlib'],
    changelog: [
      { version: '0.9.0', changes: ['Added support for multi-corner analysis', 'Improved feature engineering'] }
    ],
    language: 'Python',
    langColor: '#3572A5',
    github: 'https://github.com/Khushiim1238/project',
    homepage: null,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    stars: 892,
    downloads: 1700,
    rating: 4.3,
    architecture: ['Verilog Parser → Feature Extractor', 'XGBoost Model → Prediction Engine', 'EDA Toolchain Hooks → Integration Layer'],
  }
];
