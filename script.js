// ---- TYPEWRITER EFFECT ----
const titles = [
  "Cybersecurity Developer",
  "AI Automation Developer"
];
let titleIdx = 0, charIdx = 0, deleting = false;
const typeEl = document.getElementById("typewriter-text");

function typewrite() {
  const current = titles[titleIdx];
  if (!deleting) {
    typeEl.textContent = current.substring(0, charIdx + 1);
    charIdx++;
    if (charIdx === current.length) {
      deleting = true;
      setTimeout(typewrite, 1800);
      return;
    }
    setTimeout(typewrite, 70);
  } else {
    typeEl.textContent = current.substring(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) {
      deleting = false;
      titleIdx = (titleIdx + 1) % titles.length;
      setTimeout(typewrite, 400);
      return;
    }
    setTimeout(typewrite, 40);
  }
}

typewrite();

// ---- SCROLL OBSERVER ----
const sections = document.querySelectorAll(".section");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("visible");
    });
  },
  { threshold: 0.12 }
);
sections.forEach((s) => observer.observe(s));

// ---- ACTIVE NAV LINK ----
const navLinks = document.querySelectorAll(".nav-links a");
const sectionEls = document.querySelectorAll("section[id]");

function updateActiveLink() {
  let current = "";
  sectionEls.forEach((s) => {
    if (window.scrollY >= s.offsetTop - 100) current = s.getAttribute("id");
  });
  navLinks.forEach((a) => {
    a.classList.remove("active");
    if (a.getAttribute("href") === "#" + current) a.classList.add("active");
  });
}
window.addEventListener("scroll", updateActiveLink);
updateActiveLink();

// ---- SHOW MORE PROJECTS ----
const showMoreBtn = document.getElementById("show-more-btn");
if (showMoreBtn) {
  showMoreBtn.addEventListener("click", () => {
    document.querySelectorAll(".hidden-card").forEach((c) => {
      c.classList.remove("hidden-card");
    });
    showMoreBtn.style.display = "none";
  });
}

// ---- RADAR CHART ----
const ctx = document.getElementById("skillsChart").getContext("2d");
new Chart(ctx, {
  type: "radar",
  data: {
    labels: [
      "Python",
      "JavaScript",
      "Security Ops",
      "Networking",
      "Docker/DevOps",
      "ML",
      "n8n",
      "Web Dev",
      "Forensics"
    ],
    datasets: [
      {
        data: [92, 78, 88, 82, 75, 72, 80, 80, 85],
        backgroundColor: "rgba(0, 201, 177, 0.12)",
        borderColor: "#00c9b1",
        borderWidth: 2,
        pointBackgroundColor: "#00c9b1",
        pointBorderColor: "#0d0d0d",
        pointRadius: 4,
        pointBorderWidth: 2
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: true,
    plugins: { legend: { display: false } },
    scales: {
      r: {
        min: 0,
        max: 100,
        ticks: { stepSize: 25, display: false },
        grid: { color: "rgba(255,255,255,0.06)" },
        angleLines: { color: "rgba(255,255,255,0.06)" },
        pointLabels: { color: "#555", font: { size: 11, family: "Inter" } }
      }
    }
  }
});

// ---- CONTACT FORM LOGIC (Web3Forms) ----
const form = document.getElementById("contact-form");
if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const btn = form.querySelector("button");
    const originalText = btn.textContent;
    btn.textContent = "Sending...";
    btn.style.opacity = "0.7";
    btn.disabled = true;

    const formData = new FormData(form);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      if (response.ok) {
        btn.textContent = "Message Sent ✓";
        form.reset();
      } else {
        btn.textContent = "Error Sending!";
      }
    } catch (error) {
      btn.textContent = "Network Error";
    }

    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.opacity = "1";
      btn.disabled = false;
    }, 3000);
  });
}

// ---- PROJECT MODAL LOGIC ----
const projectDetails = {
  "Automated Threat Detection & Response System (SOAR)": `
    <p>A hybrid-cloud SOAR platform integrating Suricata IDS and pfSense to automate threat responses. It features a risk scoring algorithm mapped to compliance frameworks that dramatically reduces false positives. The platform acts as a centralized command center, seamlessly bridging network intrusion detection with automated firewall rules to instantly quarantine malicious actors without manual intervention.</p>
    <div style="margin-top:15px;"><strong>Tech Stack:</strong> Suricata, pfSense, n8n, Docker, WireGuard</div>
  `,
  "MFT Recovery Tool: Advanced Digital Forensics Utility": `
    <p>This project is a Python-based, enterprise-grade digital forensics utility designed to interact directly with raw storage media to reconstruct the NTFS file system. By bypassing the operating system's logical file parsing, this tool reads the raw hexadecimal data of a physical drive.</p>
    <p>This allows it to recover permanently deleted files, bypass encryption environments via live analysis, and reconstruct complete directory trees from severely corrupted or formatted partitions. It features dual-mode acquisition for both static forensic images and live disk analysis, deep MFT parsing of 1024-byte records, and a custom 'Scenario 3' signature carving engine that can sweep disks byte-by-byte for the FILE signature.</p>
    <div style="margin-top:15px;"><strong>Tech Stack:</strong> Python, PySide6, hex-level disk I/O, NTFS MFT Parsing</div>
  `,
  "Distributed AI Meeting Automation System": `
    <p>An autonomous meeting agent that automatically monitors Google Classroom, detects new meeting links for Google Meet or Microsoft Teams, and joins the class on your behalf. The bot uses Selenium with anti-bot evasion techniques to navigate and join.</p>
    <p>Once inside, it records the speaker's audio and streams it to a remote, GPU-powered Kaggle server. This server runs the Faster-Whisper model for real-time speech-to-text transcription. The system is event-driven; it continuously monitors the transcription and chat, and if your specific name is called by the instructor, it automatically replies in the chat to confirm your presence.</p>
    <div style="margin-top:15px;"><strong>Tech Stack:</strong> Python, Selenium, FastAPI, Faster-Whisper, PyTorch, ngrok, Kaggle GPUs</div>
  `,
  "DocuMind AI: Event-Driven Multi-Doc RAG System": `
    <p>DocuMind AI is a state-of-the-art Retrieval-Augmented Generation (RAG) system designed to transform static PDFs into an interactive knowledge base. Built with an event-driven architecture powered by Inngest, it ensures durable, retriable workflows for heavy tasks like PDF ingestion and vector embedding.</p>
    <p>Unlike standard chatbots, DocuMind features a unique Comparison Mode, allowing users to mathematically contrast revenue, facts, and data across multiple PDF files simultaneously using metadata-filtered vector search. All answers are strictly anchored to the uploaded document context with precise source citations to completely eliminate AI hallucinations.</p>
    <div style="margin-top:15px;"><strong>Tech Stack:</strong> FastAPI, Streamlit, Inngest, Qdrant (Vector DB), OpenAI GPT-4o-mini, text-embedding-3-large, Docker</div>
  `,
  "Hash-Based Data Loss Prevention (DLP) Engine": `
    <p>A highly sophisticated, enterprise-grade Data Loss Prevention (DLP) web application designed to prevent the unauthorized exfiltration of sensitive organizational data. It utilizes a dual-tier cryptographic detection engine: Tier 1 uses SHA3-256 for exact, byte-for-byte matching, while Tier 2 employs SimHash (Locality-Sensitive Hashing) for fuzzy logic matching.</p>
    <p>This context-triggered piecewise hashing prevents data leakage even if an attacker slightly modifies a file. Built with a zero-knowledge architecture, raw sensitive data is never stored; only abstract mathematical fingerprints reside on the server. It also features strict Role-Based Access Control and a live monitoring dashboard for logging all global transfer attempts.</p>
    <div style="margin-top:15px;"><strong>Tech Stack:</strong> Python, Flask, SQLite, Bootstrap 5, SHA3-256, SimHash</div>
  `,
  "SecureShare: Secure File-Sharing Platform": `
    <p>SecureShare is a robust and secure file-sharing application featuring advanced security mechanisms, Role-Based Access Control (RBAC), and Envelope Encryption simulating a KMS for encrypting files at rest. The platform integrates directly with the VirusTotal API to scan all uploaded files for known malware signatures.</p>
    <p>Furthermore, it employs deep Steganography Detection algorithms (including Chi-Square, Histogram, and RS Analysis) to detect hidden payloads within images. The system is fortified with Email-based Multi-Factor Authentication (MFA), PBKDF2 password hashing, stateless JWT session management, strict regex input validation to prevent SQLi/XSS, and rate limiting against credential stuffing.</p>
    <div style="margin-top:15px;"><strong>Tech Stack:</strong> Node.js, Express.js, MySQL, JWT, Crypto, Multer, Nodemailer, Jimp, Axios</div>
  `,
  "AutoML for Deep Learning-based Malware Detection": `
    <p><strong>MALGUARD-X</strong> is an advanced AI-powered static and dynamic malware analysis suite. It leverages deep learning and AutoML methodologies to detect Windows PE malware and monitor live process behaviors.</p>
    <p><strong>Static Detection (FFNN):</strong> Analyzes PE files using the EMBER-2018 dataset (800,000 labeled samples). It extracts 1,649 feature vectors (including byte histograms, entropy, and PE headers) and processes them through an optimized Feed Forward Neural Network, achieving a <strong>96.2% accuracy</strong> and <strong>0.988 AUC</strong>. It generates comprehensive HTML/JSON reports including malware probability and risk scores.</p>
    <p><strong>Dynamic Monitoring (DARTS CNN):</strong> Performs real-time behavior monitoring by analyzing CPU, memory, IO, and network activity. It converts live process metrics into 1x64x64 image-like tensors, which are then classified by a Convolutional Neural Network. The architecture was optimized using Differentiable Architecture Search (DARTS), achieving <strong>94.9% runtime accuracy</strong>.</p>
    <p><strong>AutoML & Architecture:</strong> Both models were heavily optimized using Neural Architecture Search (NAS) and Hyperparameter Optimization (HPO). The entire system is packaged in a real-time cybersecurity-themed PyQt5 command center GUI that provides live monitoring snapshots and event logging.</p>
    <div style="margin-top:15px;"><strong>Tech Stack:</strong> Python, PyTorch, TensorFlow, Scikit-learn, PyQt5, Pandas, NumPy, pefile, psutil, Matplotlib</div>
  `,
  "Tour & Travel Booking Platform (MERN Stack)": `
    <p>YOU Travel is a full-stack travel booking website designed for a travel agency offering public, private, and honeymoon packages. The platform features a public-facing React frontend where users can browse destinations, read travel blogs, chat with an AI assistant (powered by Hugging Face API), and seamlessly book trips.</p>
    <p>The backend is a robust REST API built with Node.js and Express, securely connecting to a MongoDB database. It includes a comprehensive admin dashboard for managing packages, uploading images via Multer, tracking total users and revenue, and handling customer messages. Security features include JWT authentication, bcrypt password hashing, helmet security headers, and MongoDB query sanitization.</p>
    <div style="margin-top:15px;"><strong>Tech Stack:</strong> MongoDB, Express.js, React, Node.js (MERN), JWT, Firebase, Nodemailer, Hugging Face API</div>
  `,
  "Pac-Man Assembly Edition": `
    <p>A complete Pac-Man clone built entirely from scratch in x86 Assembly using the Irvine32 library. This project demonstrates low-level game logic implementation and direct memory manipulation without relying on high-level constructs. It features an accurately aligned game grid, smooth continuous movement, and precise wall/entity collision detection.</p>
    <p>The highlight of the project is the implementation of distinct AI movement algorithms for each ghost: Blinky targets Pac-Man directly, Pinky ambushes by aiming ahead, Inky uses complex unpredictable pathing, and Clyde alternates between chasing and wandering. The ghost AI utilizes the Manhattan Distance heuristic for optimal grid-based pathfinding.</p>
    <div style="margin-top:15px;"><strong>Tech Stack:</strong> x86 Assembly, MASM, Irvine32 Library</div>
  `,
  "CNetSim: Enterprise Network Simulation": `
    <p>A complex, multi-block enterprise network simulation designed in Cisco Packet Tracer. This project demonstrates the practical application of core networking concepts and services across a realistic, scalable topology.</p>
    <p>It features the configuration of multiple dynamic routing protocols, including multi-area OSPF, EIGRP, and RIPv2. To enable communication between these different routing domains, complex route redistribution was implemented. The network utilizes VLSM for highly efficient IP allocation, centralized DHCP for dynamic assignment, and NAT to simulate secure internet access using public IPs. Additionally, strict Access Control Lists (ACLs) were applied to segment traffic and restrict access to specific internal Web, FTP, and Email servers.</p>
    <div style="margin-top:15px;"><strong>Tech Stack:</strong> Cisco Packet Tracer, OSPF, EIGRP, RIPv2, VLSM, DHCP, NAT, ACL</div>
  `
};

const modalOverlay = document.getElementById("project-modal");
const modalTitle = document.getElementById("modal-title");
const modalBody = document.getElementById("modal-body");
const modalCloseBtn = document.getElementById("modal-close-btn");

if (modalOverlay) {
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', (e) => {
      // Prevent opening modal if clicking on a link
      if(e.target.tagName.toLowerCase() === 'a') return;

      const title = card.querySelector('h3').textContent.trim();
      if (projectDetails[title]) {
        modalTitle.textContent = title;
        modalBody.innerHTML = projectDetails[title];
        modalOverlay.classList.add("active");
        document.body.style.overflow = "hidden"; // Prevent scrolling
      }
    });
  });

  const closeModal = () => {
    modalOverlay.classList.remove("active");
    document.body.style.overflow = "auto";
  };

  modalCloseBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });
}
