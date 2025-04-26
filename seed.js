import { initiatives } from "./src/assets/constants";
import { postInitiative } from "./apis/initiative";

export async function seedInitiatives() {
    try {
        for (const initiative of initiatives) {
            postInitiative(initiative);
        }

        console.log("✅ All initiatives seeded successfully.");
    } catch (error) {
        console.error("❌ Error seeding initiatives:", error);
    }
}

async function runSeeding() {
    await seedInitiatives();
    console.log("🌱 Seeding script finished.");
    process.exit(0); // Close the script when finished
}

