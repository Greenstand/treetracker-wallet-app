import { faker } from "@faker-js/faker";
import { Wallet } from "../types/wallet";

async function getWalletsRecentActivity(userId: string): Promise<Wallet[]> {
  await new Promise(resolve => setTimeout(resolve, 100));

  return Array.from({ length: 4 }, () => {
    const status = getRandomStatus();
    return {
      id: faker.string.uuid(),
      name: faker.internet.username(),
      balance: getRandomBalance(status),
      createdAt: faker.date.past(),
      logo: faker.image.url(),
      status,
    };
  });
}

const wallets: Wallet[] = Array.from({ length: 10 }, () => {
  const status = getRandomStatus();
  return {
    id: faker.string.uuid(),
    name: faker.internet.username(),
    balance: getRandomBalance(status),
    createdAt: faker.date.past(),
    logo: faker.image.url(),
    status,
  };
});

function getRandomStatus(): "Received" | "Pending" | "Sent" {
  const statuses: ("Received" | "Pending" | "Sent")[] = [
    "Received",
    "Pending",
    "Sent",
  ];
  return statuses[Math.floor(Math.random() * statuses.length)];
}

function getRandomBalance(status: "Received" | "Pending" | "Sent"): number {
  const balance = faker.number.int({ min: 100, max: 300 });
  return status === "Sent" ? -balance : balance;
}

async function getWalletByKeyword(keyword: string): Promise<Wallet[]> {
  await new Promise(resolve => setTimeout(resolve, 100));

  return wallets.filter(option =>
    option.name.toLowerCase().includes(keyword.toLowerCase()),
  );
}

export { getWalletsRecentActivity, getWalletByKeyword };