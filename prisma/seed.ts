import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Neon database...");

  // 1. Seed Events
  const events = [
    {
      id: "evt-001",
      slug: "buet-ideathon-2025",
      title: "BUET Ideathon 2025",
      date: new Date("2025-11-15T09:00:00Z"),
      venue: "BUET Auditorium",
      category: "Competition",
      status: "upcoming",
      isOpenForReg: true,
      summary: "The flagship ideation competition for young entrepreneurs to pitch their groundbreaking ideas.",
      description: "Join us for a 24-hour intense brainstorming and pitching event where the best minds of BUET come together to solve real-world problems. Pitch your ideas to industry leaders and win seed funding.",
      fbLink: "https://facebook.com/events/buet-ideathon-2025",
      timeline: [
        { time: "09:00 AM", activity: "Registration & Breakfast", order: 1 },
        { time: "10:00 AM", activity: "Opening Ceremony", order: 2 },
        { time: "11:30 AM", activity: "Pitching Session 1", order: 3 },
        { time: "02:00 PM", activity: "Lunch Break", order: 4 },
        { time: "03:00 PM", activity: "Final Pitches & Award Ceremony", order: 5 },
      ],
      speakers: [
        { name: "Dr. Anisul Haque", designation: "Professor, EEE, BUET", photoUrl: "https://i.pravatar.cc/150?u=anis", order: 1 },
        { name: "Fahim Saleh", designation: "Founder, Pathao", photoUrl: "https://i.pravatar.cc/150?u=fahim", order: 2 },
      ],
      attendees: [
        {
          id: "att-1",
          name: "Ashfaque Amin Eshan",
          email: "eshan@example.com",
          phone: "01700000000",
          institution: "BUET",
          studentId: "2105001",
          dept: "CSE",
          year: "4th Year",
          paymentMethod: "bKash",
          trxId: "9J28A7LK1Q",
        },
      ],
    },
    {
      id: "evt-002",
      slug: "startup-masterclass-101",
      title: "Startup Masterclass 101",
      date: new Date("2025-08-10T14:00:00Z"),
      venue: "Seminar Room, ECE Building",
      category: "Workshop",
      status: "past",
      isOpenForReg: false,
      summary: "Learn the fundamentals of building a startup from scratch.",
      description: "A comprehensive workshop covering lean startup methodology, customer validation, and basic financial modeling for early-stage founders.",
      fbLink: "#",
      timeline: [],
      speakers: [],
      attendees: [],
    },
  ];

  for (const e of events) {
    const { timeline, speakers, attendees, ...eventData } = e;
    await prisma.event.upsert({
      where: { slug: e.slug },
      update: {},
      create: {
        ...eventData,
        timeline: {
          create: timeline,
        },
        speakers: {
          create: speakers,
        },
        attendees: {
          create: attendees,
        },
      },
    });
  }

  // 2. Seed Executives
  const executives = [
    {
      id: "exec-001",
      name: "Dr. Mohammad Muntasir",
      designation: "Club Moderator",
      wing: "Advisory Panel",
      term: "current",
      photoUrl: "https://i.pravatar.cc/300?u=muntasir",
      linkedin: "#",
      order: 1,
    },
    {
      id: "exec-002",
      name: "Sadman Sakib",
      designation: "President",
      wing: "Executive Board",
      term: "current",
      photoUrl: "https://i.pravatar.cc/300?u=sadman",
      facebook: "#",
      linkedin: "#",
      order: 2,
    },
    {
      id: "exec-003",
      name: "Nafisa Anjum",
      designation: "General Secretary",
      wing: "Executive Board",
      term: "current",
      photoUrl: "https://i.pravatar.cc/300?u=nafisa",
      facebook: "#",
      linkedin: "#",
      order: 3,
    },
    {
      id: "exec-004",
      name: "Rahat Khan",
      designation: "Director of Logistics",
      wing: "Logistics",
      term: "current",
      photoUrl: "https://i.pravatar.cc/300?u=rahat",
      facebook: "#",
      linkedin: "#",
      order: 4,
    },
    {
      id: "exec-005",
      name: "Tanvir Ahmed",
      designation: "Former President",
      wing: "Executive Board",
      term: "past",
      photoUrl: "https://i.pravatar.cc/300?u=tanvir",
      linkedin: "#",
      order: 5,
    },
  ];

  for (const exec of executives) {
    await prisma.executive.upsert({
      where: { id: exec.id },
      update: {},
      create: exec,
    });
  }

  // 3. Seed Partners & Ambassadors
  const partners = [
    { id: "p-1", name: "10 Minute School", type: "Incubation Partner", logoUrl: "https://via.placeholder.com/150x80/013565/FFFFFF?text=10MS", order: 1 },
    { id: "p-2", name: "Walton", type: "Title Sponsor", logoUrl: "https://via.placeholder.com/150x80/013565/FFFFFF?text=Walton", order: 2 },
    { id: "p-3", name: "SBK Tech Ventures", type: "Ecosystem Partner", logoUrl: "https://via.placeholder.com/150x80/013565/FFFFFF?text=SBK", order: 3 },
  ];

  for (const p of partners) {
    await prisma.partner.upsert({
      where: { id: p.id },
      update: {},
      create: p,
    });
  }

  const ambassadors = [
    {
      id: "ca-1",
      name: "Ayman Sadiq",
      company: "10 Minute School",
      logoUrl: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=120&auto=format&fit=crop&q=80",
      photoUrl: "https://i.pravatar.cc/300?u=ayman",
      linkedin: "#",
      order: 1,
    },
    {
      id: "ca-2",
      name: "Sabira Mehrin",
      company: "Wander Woman",
      logoUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=120&auto=format&fit=crop&q=80",
      photoUrl: "https://i.pravatar.cc/300?u=sabira",
      facebook: "#",
      linkedin: "#",
      order: 2,
    },
  ];

  for (const ca of ambassadors) {
    await prisma.ambassador.upsert({
      where: { id: ca.id },
      update: {},
      create: ca,
    });
  }

  // 4. Seed Sponsors
  const sponsors = [
    {
      id: "sp-1",
      name: "Walton",
      logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Walton_Group_logo.svg/320px-Walton_Group_logo.svg.png",
      tier: "Title Sponsor",
      websiteUrl: "https://waltonbd.com",
      order: 1,
    },
    {
      id: "sp-2",
      name: "10 Minute School",
      logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/10_Minute_School_Logo.svg/320px-10_Minute_School_Logo.svg.png",
      tier: "Incubation Partner",
      websiteUrl: "https://10minuteschool.com",
      order: 2,
    },
    {
      id: "sp-3",
      name: "bKash",
      logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/BKash_Logo.svg/320px-BKash_Logo.svg.png",
      tier: "Fintech Partner",
      websiteUrl: "https://bkash.com",
      order: 3,
    },
    {
      id: "sp-4",
      name: "Grameenphone",
      logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Grameenphone_logo.svg/320px-Grameenphone_logo.svg.png",
      tier: "Telecom Partner",
      websiteUrl: "https://grameenphone.com",
      order: 4,
    },
    {
      id: "sp-5",
      name: "Pathao",
      logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Pathao_logo.svg/320px-Pathao_logo.svg.png",
      tier: "Mobility Partner",
      websiteUrl: "https://pathao.com",
      order: 5,
    },
    {
      id: "sp-6",
      name: "Unilever",
      logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Unilever.svg/320px-Unilever.svg.png",
      tier: "FMCG Partner",
      websiteUrl: "https://unilever.com.bd",
      order: 6,
    },
    {
      id: "sp-7",
      name: "Robi Axiata",
      logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Robi_logo.svg/320px-Robi_logo.svg.png",
      tier: "Digital Partner",
      websiteUrl: "https://robi.com.bd",
      order: 7,
    },
    {
      id: "sp-8",
      name: "Nagad",
      logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Nagad_Logo.svg/320px-Nagad_Logo.svg.png",
      tier: "Strategic Partner",
      websiteUrl: "https://nagad.com.bd",
      order: 8,
    },
  ];

  for (const s of sponsors) {
    await prisma.sponsor.upsert({
      where: { id: s.id },
      update: {},
      create: s,
    });
  }

  // 5. Seed Gallery Photos
  const photos = [
    {
      id: "photo-1",
      imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
      caption: "The flagship pitch competition where 50+ startups presented their ideas.",
      eventDate: new Date("2026-03-15"),
      eventName: "National Startup Sprint 2026",
      showOnHomepage: true,
    },
    {
      id: "photo-2",
      imageUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&q=80",
      caption: "Networking session with industry leaders and angel investors.",
      eventDate: new Date("2026-04-10"),
      eventName: "Founders Meetup",
      showOnHomepage: true,
    },
    {
      id: "photo-3",
      imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
      caption: "Collaborative ideation workshop focusing on sustainable tech solutions.",
      eventDate: new Date("2026-02-22"),
      eventName: "Sustainability Hackathon",
      showOnHomepage: true,
    },
    {
      id: "photo-4",
      imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
      caption: "Keynote address on the future of AI in consumer products.",
      eventDate: new Date("2025-11-05"),
      eventName: "Tech Trends Summit",
      showOnHomepage: false,
    },
    {
      id: "photo-5",
      imageUrl: "https://images.unsplash.com/photo-1558402529-d2638a7023e9?w=800&q=80",
      caption: "Award ceremony recognizing the most innovative student projects.",
      eventDate: new Date("2025-12-12"),
      eventName: "Annual Innovation Awards",
      showOnHomepage: true,
    },
    {
      id: "photo-6",
      imageUrl: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&q=80",
      caption: "Team building and leadership retreat for the executive panel.",
      eventDate: new Date("2026-01-18"),
      eventName: "Executive Retreat",
      showOnHomepage: false,
    },
  ];

  for (const ph of photos) {
    await prisma.galleryPhoto.upsert({
      where: { id: ph.id },
      update: {},
      create: ph,
    });
  }

  // 6. Seed Resources
  const resources = [
    {
      id: "res-001",
      title: "How to Build a Pitch Deck",
      category: "Pitch Decks",
      type: "PDF",
      readingTime: "10 min read",
      description: "A comprehensive guide to creating a pitch deck that stands out to investors. Includes templates and real-world examples.",
      link: "https://assets.strategyzer.com/assets/resources/the-business-model-canvas.pdf",
    },
    {
      id: "res-002",
      title: "Financial Modeling Basics for Startups",
      category: "Financial Models",
      type: "Article",
      readingTime: "15 min read",
      description: "Learn the fundamentals of projecting revenue, managing burn rate, and understanding unit economics for your early-stage startup.",
      link: "https://a16z.com/16-startup-metrics/",
    },
    {
      id: "res-003",
      title: "Case Study: Pathao's Growth Strategy",
      category: "Case Studies",
      type: "Article",
      readingTime: "8 min read",
      description: "An in-depth look at how Pathao scaled its operations and acquired users in the competitive ride-sharing market.",
      link: "https://restofworld.org/2021/pathao-bangladesh-superapp/",
    },
    {
      id: "res-004",
      title: "The Lean Startup Playbook",
      category: "Startup Guides",
      type: "PDF",
      readingTime: "20 min read",
      description: "A practical workbook based on the lean startup methodology to help you validate your ideas quickly.",
      link: "https://web.stanford.edu/class/ee204/TheLeanStartup.pdf",
    },
  ];

  for (const r of resources) {
    await prisma.resource.upsert({
      where: { id: r.id },
      update: r,
      create: r,
    });
  }

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
