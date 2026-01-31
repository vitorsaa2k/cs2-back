import { Roll } from "../models/RollModel";
import { User } from "../models/UserModel";
import getCache from "../config/lruCache";

export interface StatisticsData {
	totalCratesOpened: number;
	totalUsersCreated: number;
	totalUpgradesCompleted: number;
	lastUpdated: Date;
}

const CACHE_KEY = "site_statistics";

export class StatisticsService {
	private cache = getCache();

	async getStatistics(): Promise<StatisticsData> {
		// Try to get from cache first
		const cached = this.cache.get(CACHE_KEY);
		if (cached) {
			return cached as StatisticsData;
		}

		// If not in cache, fetch from database
		const stats = await this.fetchFromDatabase();

		// Cache the results
		this.cache.set(CACHE_KEY, stats, { ttl: 1000 * 60 });

		return stats;
	}

	private async fetchFromDatabase(): Promise<StatisticsData> {
		try {
			// Get total crates opened (count rolls with type 'crate')
			const totalCratesOpenedPromise = Roll.countDocuments({ type: "crate" });

			// Get total users created
			const totalUsersCreatedPromise = User.countDocuments();

			// Get total upgrades completed (count rolls with type 'upgrade')
			const totalUpgradesCompletedPromise = Roll.countDocuments({
				type: "upgrade",
			});

			const countersPromises = [
				totalCratesOpenedPromise,
				totalUsersCreatedPromise,
				totalUpgradesCompletedPromise,
			];

			const [totalCratesOpened, totalUsersCreated, totalUpgradesCompleted] =
				await Promise.all(countersPromises);

			return {
				totalCratesOpened,
				totalUsersCreated,
				totalUpgradesCompleted,
				lastUpdated: new Date(),
			};
		} catch (error) {
			console.error("Error fetching statistics from database:", error);

			// Return default values on error
			return {
				totalCratesOpened: 0,
				totalUsersCreated: 0,
				totalUpgradesCompleted: 0,
				lastUpdated: new Date(),
			};
		}
	}

	// Force refresh the cache
	async refreshStatistics(): Promise<StatisticsData> {
		// Clear cache entry
		this.cache.delete(CACHE_KEY);

		// Fetch fresh data
		return await this.getStatistics();
	}
}

// Export singleton instance
export const statisticsService = new StatisticsService();
