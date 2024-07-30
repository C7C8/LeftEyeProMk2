import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { firstValueFrom } from "rxjs";
import YAML from "yaml";
import { RuntimeConfig } from "./defs";

/**
 * Config service, for loading in different configs as YAML files.
 * Main purpose is to separate out config providing from actual
 * config loading implementation.
 *
 * May be useful for dynamic editing of configs in the future.
 */
@Injectable({
	providedIn: "root"
})
export class RuntimeConfigService {
	private static cache: Map<string, object> = new Map<string, object>();

	constructor(private http: HttpClient) {}

	public async getConfig<Ret>(file: RuntimeConfig<Ret>): Promise<Ret> {
		// Check cache to see if we've loaded this file in the past or not.
		if (RuntimeConfigService.cache.has(file.path)) {
			console.debug(`Runtime config ${file} found in local cache, skipping server querying...`);
			return RuntimeConfigService.cache.get(file.path)! as Ret;
		}

		// Nope, we don't have it.
		console.group(`Fetch runtime configuration ${file.path}`);
		console.debug(`Requesting file ${file.path}`);
		try {
			const result = await firstValueFrom(this.http.get(file.path, { responseType: "text" }));
			console.debug(`Retrieved runtime config ${file}; parsing YAML`);

			// Extract config from the HTTP response as a string, parse it, and put it in the cache.
			const config = YAML.parse(result);
			console.debug(`Parsed config file ${file.path}:`, config);
			RuntimeConfigService.cache.set(file.path, config);
			return config;
		} catch (e) {
			console.error(`Obtained error when requesting file ${file.path}`, e);
			throw e;
		} finally {
			console.groupEnd();
		}
	}
}
