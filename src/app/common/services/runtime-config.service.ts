import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { firstValueFrom } from "rxjs";
import YAML from "yaml"

export enum RuntimeConfigFile {
	HERO_IMAGES = "/assets/configs/hero_images.yaml",
	PUBLICATIONS = "/assets/configs/publications.yaml",
	CATEGORIES = "/assets/configs/categories.yaml",
	ADVENTURES = "/assets/configs/adventures.yaml"
}

/**
 * Config service, for loading in different configs as YAML files.
 * Main purpose is to separate out config providing from actual
 * config loading implementation.
 *
 * May be useful for dynamic editing of configs in the future.
 */
@Injectable({
	providedIn: 'root'
})
export class RuntimeConfigService {

	private static cache: Map<string, object> = new Map<string, object>();

	constructor(private http: HttpClient) { }

	public async getConfig(file: RuntimeConfigFile): Promise<object> {
		// Check cache to see if we've loaded this file in the past or not.
		if (RuntimeConfigService.cache.has(file)) {
			console.debug(`Runtime config ${file} found in local cache, skipping server querying...`)
			return RuntimeConfigService.cache.get(file)!;
		}

		// Nope, we don't have it.
		console.group(`Fetch runtime configuration ${file}`);
		console.debug(`Requesting file ${file}`)
		try {
			const result = await firstValueFrom(this.http.get(file, {responseType: "text"}))
			console.debug(`Retrieved runtime config ${file}; parsing YAML`);

			// Extract config from the HTTP response as a string, parse it, and put it in the cache.
			const config = YAML.parse(result);
			console.debug(`Parsed config file ${file}:`, config)
			RuntimeConfigService.cache.set(file, config);
			return config;
		} catch (e) {
			console.error(`Obtained error when requesting file ${file}`, e);
			throw e;
		} finally {
			console.groupEnd()
		}
	}
}
