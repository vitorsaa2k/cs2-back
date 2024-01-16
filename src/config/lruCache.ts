import { LRUCache } from "lru-cache";

const options = {
	max: 10,
};

let cache: LRUCache<string, any>;

export default () => {
	if (!cache) {
		cache = new LRUCache(options);
	}
	return cache;
};
