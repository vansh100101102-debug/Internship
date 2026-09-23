import serviceModel from "../models/serviceModel.js";

const DEFAULT_SERVICES = [
  {
    title: 'Custom Full-Stack Web & Mobile Apps',
    tagline: 'High-performance web apps, mobile solutions & scalable microservices.',
    description: 'We build responsive, production-ready web and mobile applications tailored for fast-growing businesses. From rapid MVP launches to multi-tenant architectures, we deliver clean, modular code designed for velocity and effortless scaling.',
    category: 'engineering',
    icon: 'Code2',
    highlight: 'Fast Turnaround Sprints',
    capabilities: [
      'Modern web apps with React, Next.js, and TypeScript',
      'Cross-platform mobile engineering with React Native & Flutter',
      'Robust backend APIs & microservices (Node.js, Python, Go, PostgreSQL)',
      'Real-time data synchronization & event-driven WebSockets',
      'Clean multi-tenant architectures & secure payment integrations'
    ],
    techStack: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'React Native', 'PostgreSQL', 'Docker'],
    order: 1
  },
  {
    title: 'AI Engineering, Custom Agents & LLM Pipelines',
    tagline: 'Supercharge workflows with tailored AI models, autonomous agents & smart automation.',
    description: 'Harness state-of-the-art machine learning models and generative AI customized for your specific business data. We engineer autonomous agents, workflow automations, and intelligent retrieval systems (RAG) that eliminate repetitive manual overhead.',
    category: 'intelligence',
    icon: 'Cpu',
    highlight: 'Production-Grade AI',
    capabilities: [
      'Custom Retrieval-Augmented Generation (RAG) with vector databases',
      'Autonomous multi-agent workflows for internal process automation',
      'Fine-tuned LLM implementations & prompt engineering optimization',
      'Smart document extraction, semantic search & automated reporting',
      'Secure AI gateways with robust guardrails and API rate limiting'
    ],
    techStack: ['Python', 'OpenAI', 'Gemini API', 'LangChain', 'Pinecone', 'FastAPI', 'Hugging Face'],
    order: 2
  },
  {
    title: 'Product Strategy & UI/UX Design Systems',
    tagline: 'High-converting, intuitive interfaces crafted with user-centric precision.',
    description: 'Great software starts with exceptional user experience. We conduct user research, map frictionless workflows, and engineer scalable Figma design systems that turn visitors into loyal customers.',
    category: 'design',
    icon: 'Palette',
    highlight: 'Pixel-Perfect Fidelity',
    capabilities: [
      'User journey mapping & high-fidelity interactive wireframing',
      'Scalable Figma design systems with tokenized styles and reusable component libraries',
      'Interactive clickable prototypes for rapid stakeholder and user validation',
      'WCAG 2.1 accessibility compliance audits and responsive remediation',
      'Conversion rate optimization (CRO) and user onboarding telemetry'
    ],
    techStack: ['Figma', 'Design Tokens', 'Storybook', 'Tailwind', 'Accessibility WCAG', 'Protopie'],
    order: 3
  },
  {
    title: 'Cloud Infrastructure, DevOps & Reliability',
    tagline: 'Zero-downtime deployments, automated CI/CD pipelines & resilient cloud setups.',
    description: 'Empower your application with modern cloud-native infrastructure that scales effortlessly. We implement automated CI/CD deployment pipelines, containerization, and monitoring that ensure dependable uptime and low operating costs.',
    category: 'engineering',
    icon: 'Cloud',
    highlight: 'Zero-Downtime Reliability',
    capabilities: [
      'Cloud setup & cost optimization across AWS, GCP, and DigitalOcean',
      'Docker containerization & Kubernetes cluster orchestration',
      'Automated CI/CD deployment pipelines with automated test gates',
      'Comprehensive log observability, distributed tracing, and real-time alerts',
      'Automated backup disaster recovery and zero-downtime rolling updates'
    ],
    techStack: ['AWS', 'GCP', 'Kubernetes', 'Docker', 'Terraform', 'GitHub Actions', 'Datadog'],
    order: 4
  },
  {
    title: 'Cybersecurity, API Integrations & Code Audits',
    tagline: 'Hardened application security, vulnerability testing & secure integrations.',
    description: 'Safeguard your data and customer trust. Our security engineers perform deep code reviews, authentication hardening, and architectural audits to protect against modern attack vectors.',
    category: 'security',
    icon: 'ShieldCheck',
    highlight: 'Hardened Security',
    capabilities: [
      'OWASP Top 10 vulnerability assessment and code security audits',
      'API security hardening, rate limiting, and JWT/OAuth2 authentication',
      'Data encryption implementation (at rest and in transit)',
      'Security compliance readiness consulting and safe third-party integrations',
      'Actionable vulnerability remediation code reports'
    ],
    techStack: ['OWASP', 'Burp Suite', 'SonarQube', 'JWT / OAuth2', 'Zero-Trust', 'SSL/TLS'],
    order: 5
  },
  {
    title: 'Dedicated Tech Squads & Agile Sprints',
    tagline: 'Vetted senior developers and technical leads embedded directly into your project.',
    description: 'Accelerate your product delivery without lengthy hiring cycles. We provide senior, vetted engineering squads that integrate into your agile workflow with weekly sprint demos and full code ownership.',
    category: 'advisory',
    icon: 'Users',
    highlight: 'Rapid Squad Ramp-Up',
    capabilities: [
      'Autonomous dedicated engineering squads (frontend, backend, QA, and DevOps)',
      'Fractional CTO leadership, technology roadmap planning, and architecture reviews',
      'Seamless integration into Jira, Slack, and daily agile standups',
      'Transparent sprint velocity tracking with weekly milestone demonstrations',
      '100% full intellectual property and clean repository handover'
    ],
    techStack: ['Agile / Scrum', 'Jira', 'Architecture Reviews', 'Sprint Velocity', 'CI/CD Mentoring'],
    order: 6
  }
];

// Helper to sanitize arrays (capabilities, techStack)
const sanitizeArray = (val) => {
  if (Array.isArray(val)) return val.map(s => String(s).trim()).filter(Boolean);
  if (typeof val === 'string') {
    const separator = val.includes('\n') ? '\n' : ',';
    return val.split(separator).map(s => s.trim()).filter(Boolean);
  }
  return [];
};

// Get all services (public)
export const getServices = async (req, res) => {
  try {
    let services = await serviceModel.find().sort({ order: 1, createdAt: 1 });
    if (!services || services.length === 0) {
      services = await serviceModel.insertMany(DEFAULT_SERVICES);
    }
    return res.status(200).json({ success: true, count: services.length, data: services });
  } catch (error) {
    console.error("Error fetching services:", error);
    return res.status(500).json({ success: false, message: "Error fetching services", error: error.message });
  }
};

// Get single service by ID (public)
export const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await serviceModel.findById(id);
    if (!service) {
      return res.status(404).json({ success: false, message: "Service not found" });
    }
    return res.status(200).json({ success: true, data: service });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error fetching service", error: error.message });
  }
};

// Create new service (admin)
export const createService = async (req, res) => {
  try {
    const { title, tagline, description, category, icon, highlight, capabilities, techStack, order } = req.body;
    if (!title || !description) {
      return res.status(400).json({ success: false, message: "Title and description are required" });
    }

    const newService = new serviceModel({
      title: title.trim(),
      tagline: tagline ? tagline.trim() : '',
      description: description.trim(),
      category: category || 'engineering',
      icon: icon || 'Code2',
      highlight: highlight ? highlight.trim() : 'Fast Turnaround Sprints',
      capabilities: sanitizeArray(capabilities),
      techStack: sanitizeArray(techStack),
      order: order !== undefined ? Number(order) : 0
    });

    const saved = await newService.save();
    return res.status(201).json({ success: true, message: "Service created successfully", data: saved });
  } catch (error) {
    console.error("Error creating service:", error);
    return res.status(500).json({ success: false, message: "Error creating service", error: error.message });
  }
};

// Update existing service (admin)
export const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, tagline, description, category, icon, highlight, capabilities, techStack, order } = req.body;

    const updatePayload = {};
    if (title !== undefined) updatePayload.title = title.trim();
    if (tagline !== undefined) updatePayload.tagline = tagline.trim();
    if (description !== undefined) updatePayload.description = description.trim();
    if (category !== undefined) updatePayload.category = category;
    if (icon !== undefined) updatePayload.icon = icon;
    if (highlight !== undefined) updatePayload.highlight = highlight.trim();
    if (capabilities !== undefined) updatePayload.capabilities = sanitizeArray(capabilities);
    if (techStack !== undefined) updatePayload.techStack = sanitizeArray(techStack);
    if (order !== undefined) updatePayload.order = Number(order);

    const updated = await serviceModel.findByIdAndUpdate(id, updatePayload, { new: true, runValidators: true });
    if (!updated) {
      return res.status(404).json({ success: false, message: "Service not found" });
    }

    return res.status(200).json({ success: true, message: "Service updated successfully", data: updated });
  } catch (error) {
    console.error("Error updating service:", error);
    return res.status(500).json({ success: false, message: "Error updating service", error: error.message });
  }
};

// Delete service (admin)
export const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await serviceModel.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Service not found" });
    }
    return res.status(200).json({ success: true, message: "Service deleted successfully" });
  } catch (error) {
    console.error("Error deleting service:", error);
    return res.status(500).json({ success: false, message: "Error deleting service", error: error.message });
  }
};

// Reset services to defaults (admin utility)
export const resetDefaultServices = async (req, res) => {
  try {
    await serviceModel.deleteMany({});
    const services = await serviceModel.insertMany(DEFAULT_SERVICES);
    return res.status(200).json({ success: true, message: "Services reset to modern defaults", count: services.length, data: services });
  } catch (error) {
    console.error("Error resetting services:", error);
    return res.status(500).json({ success: false, message: "Error resetting services", error: error.message });
  }
};
