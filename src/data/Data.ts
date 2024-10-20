export interface DataType {
  key: React.Key;
  eventName: string;
  description: string;
  date: string;
  speakers: string[];
  status: string;
  attendees: number;
}

export const data: DataType[] = [
  {
    key: "1",
    eventName: "Tech Conference 2024",
    date: "2024-10-15",
    speakers: ["John Doe", "Sarah Connor", "Alex Johnson"],
    status: "Completed",
    attendees: 300,
    description:
      "A conference focusing on the latest advancements in technology, covering topics like AI, blockchain, and quantum computing.",
  },
  {
    key: "2",
    eventName: "AI Summit",
    date: "2024-11-22",
    speakers: ["Jane Smith", "Alex Johnson"],
    status: "In Progress",
    attendees: 500,
    description:
      "An annual event showcasing the most innovative developments in artificial intelligence and machine learning.",
  },
  {
    key: "3",
    eventName: "Web Dev Workshop",
    date: "2024-12-01",
    speakers: ["Alex Johnson", "Michael Brown"],
    status: "In Progress",
    attendees: 150,
    description:
      "A hands-on workshop focused on modern web development techniques using React, Node.js, and TypeScript.",
  },
  {
    key: "4",
    eventName: "Cloud Expo",
    date: "2024-09-10",
    speakers: ["Chris White", "Anna Lee"],
    status: "Completed",
    attendees: 400,
    description:
      "An expo showcasing the latest in cloud computing technologies and services from top providers.",
  },
  {
    key: "5",
    eventName: "Data Science Symposium",
    date: "2024-08-25",
    speakers: ["Emily Green", "David Carter"],
    status: "Completed",
    attendees: 350,
    description:
      "A symposium dedicated to data science, featuring case studies, tools, and methodologies from industry experts.",
  },
  {
    key: "6",
    eventName: "Blockchain Meetup",
    date: "2024-07-15",
    speakers: ["Daniel Brown", "Sophia Martinez"],
    status: "In Progress",
    attendees: 250,
    description:
      "A meetup for blockchain enthusiasts, discussing the future of decentralized finance and cryptocurrency.",
  },
  {
    key: "7",
    eventName: "Cybersecurity Workshop",
    date: "2024-06-20",
    speakers: ["Olivia Taylor", "Marcus Wright"],
    status: "Completed",
    attendees: 200,
    description:
      "A workshop on the latest cybersecurity threats and prevention strategies for enterprises and developers.",
  },
  {
    key: "8",
    eventName: "IoT Conference",
    date: "2024-05-12",
    speakers: ["Lucas Lee", "Rachel Adams"],
    status: "Completed",
    attendees: 180,
    description:
      "A conference exploring the future of the Internet of Things (IoT) and its applications in smart cities and industries.",
  },
  {
    key: "9",
    eventName: "Fintech Innovations",
    date: "2024-04-08",
    speakers: ["Sophia Walker", "James Anderson"],
    status: "In Progress",
    attendees: 320,
    description:
      "A conference discussing the latest trends and innovations in the financial technology (fintech) sector.",
  },
  {
    key: "10",
    eventName: "Quantum Computing Forum",
    date: "2024-03-18",
    speakers: ["Ethan Clark", "Laura Johnson"],
    status: "Completed",
    attendees: 150,
    description:
      "A forum on the advancements in quantum computing and its potential impact on various industries.",
  },
];
