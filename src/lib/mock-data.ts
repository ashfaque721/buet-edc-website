export const mockData = {
  events: [
    {
      id: "evt-001",
      slug: "buet-ideathon-2025",
      title: "BUET Ideathon 2025",
      date: "2025-11-15T09:00:00Z",
      venue: "BUET Auditorium",
      category: "Competition",
      status: "upcoming", // upcoming | past
      isOpenForReg: true,
      summary: "The flagship ideation competition for young entrepreneurs to pitch their groundbreaking ideas.",
      description: "Join us for a 24-hour intense brainstorming and pitching event where the best minds of BUET come together to solve real-world problems. Pitch your ideas to industry leaders and win seed funding.",
      timeline: [
        { time: "09:00 AM", activity: "Registration & Breakfast" },
        { time: "10:00 AM", activity: "Opening Ceremony" },
        { time: "11:30 AM", activity: "Pitching Session 1" },
        { time: "02:00 PM", activity: "Lunch Break" },
        { time: "03:00 PM", activity: "Final Pitches & Award Ceremony" }
      ],
      speakers: [
        { name: "Dr. Anisul Haque", designation: "Professor, EEE, BUET", photoUrl: "https://i.pravatar.cc/150?u=anis" },
        { name: "Fahim Saleh", designation: "Founder, Pathao", photoUrl: "https://i.pravatar.cc/150?u=fahim" }
      ],
      fbLink: "https://facebook.com/events/buet-ideathon-2025",
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
          trxId: "9J28A7LK1Q"
        }
      ]
    },
    {
      id: "evt-002",
      slug: "startup-masterclass-101",
      title: "Startup Masterclass 101",
      date: "2025-08-10T14:00:00Z",
      venue: "Seminar Room, ECE Building",
      category: "Workshop",
      status: "past",
      isOpenForReg: false,
      summary: "Learn the fundamentals of building a startup from scratch.",
      description: "A comprehensive workshop covering lean startup methodology, customer validation, and basic financial modeling for early-stage founders.",
      timeline: [],
      speakers: [],
      fbLink: "#",
      attendees: []
    }
  ],
  executives: [
    {
      id: "exec-001",
      name: "Dr. Mohammad Muntasir",
      designation: "Club Moderator",
      wing: "Advisory Panel",
      term: "current", // current | past
      photoUrl: "https://i.pravatar.cc/300?u=muntasir",
      socials: { linkedin: "#" }
    },
    {
      id: "exec-002",
      name: "Sadman Sakib",
      designation: "President",
      wing: "Executive Board",
      term: "current",
      photoUrl: "https://i.pravatar.cc/300?u=sadman",
      socials: { facebook: "#", linkedin: "#" }
    },
    {
      id: "exec-003",
      name: "Nafisa Anjum",
      designation: "General Secretary",
      wing: "Executive Board",
      term: "current",
      photoUrl: "https://i.pravatar.cc/300?u=nafisa",
      socials: { facebook: "#", linkedin: "#" }
    },
    {
      id: "exec-004",
      name: "Rahat Khan",
      designation: "Director of Logistics",
      wing: "Logistics",
      term: "current",
      photoUrl: "https://i.pravatar.cc/300?u=rahat",
      socials: { facebook: "#", linkedin: "#" }
    },
    {
      id: "exec-005",
      name: "Tanvir Ahmed",
      designation: "Former President",
      wing: "Executive Board",
      term: "past",
      photoUrl: "https://i.pravatar.cc/300?u=tanvir",
      socials: { linkedin: "#" }
    }
  ],
  affiliations: {
    partners: [
      { id: "p-1", name: "10 Minute School", type: "Incubation Partner", logoUrl: "https://via.placeholder.com/150x80/013565/FFFFFF?text=10MS" },
      { id: "p-2", name: "Walton", type: "Title Sponsor", logoUrl: "https://via.placeholder.com/150x80/013565/FFFFFF?text=Walton" },
      { id: "p-3", name: "SBK Tech Ventures", type: "Ecosystem Partner", logoUrl: "https://via.placeholder.com/150x80/013565/FFFFFF?text=SBK" }
    ],
    ambassadors: [
      { id: "ca-1", name: "Ayman Sadiq", company: "10 Minute School", logoUrl: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=120&auto=format&fit=crop&q=80", photoUrl: "https://i.pravatar.cc/300?u=ayman", socials: { linkedin: "#" } },
      { id: "ca-2", name: "Sabira Mehrin", company: "Wander Woman", logoUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=120&auto=format&fit=crop&q=80", photoUrl: "https://i.pravatar.cc/300?u=sabira", socials: { facebook: "#", linkedin: "#" } }
    ]
  },
  resources: [
    {
      id: "res-001",
      title: "How to Build a Pitch Deck",
      category: "Pitch Decks",
      type: "PDF",
      readingTime: "10 min read",
      description: "A comprehensive guide to creating a pitch deck that stands out to investors. Includes templates and real-world examples.",
      link: "#"
    },
    {
      id: "res-002",
      title: "Financial Modeling Basics for Startups",
      category: "Financial Models",
      type: "Article",
      readingTime: "15 min read",
      description: "Learn the fundamentals of projecting revenue, managing burn rate, and understanding unit economics for your early-stage startup.",
      link: "#"
    },
    {
      id: "res-003",
      title: "Case Study: Pathao's Growth Strategy",
      category: "Case Studies",
      type: "Article",
      readingTime: "8 min read",
      description: "An in-depth look at how Pathao scaled its operations and acquired users in the competitive ride-sharing market.",
      link: "#"
    },
    {
      id: "res-004",
      title: "The Lean Startup Playbook",
      category: "Startup Guides",
      type: "PDF",
      readingTime: "20 min read",
      description: "A practical workbook based on the lean startup methodology to help you validate your ideas quickly.",
      link: "#"
    }
  ]
};
