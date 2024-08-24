/*
 * This file specifies data structures used for browser-side indexing & searching of images.
 *
 * SIDECAR files are files that have a one-to-one mapping with another file or concept. Their paths are not known at
 * runtime and there are arbitrarily many of them.
 *
 * INDEX files are single-occurrence files with known paths, mapping specific concepts to list of sidecar files. There
 * are fewer index files than sidecar files.
 *
 *
 * SIDECAR files have the naming convention "[name].sidecar.yaml"
 * INDEX files have the naming convention "[name].index.yaml"
 *
 */

/************
 * SIDECARS *
 ************/

export interface ImageSidecar {
	/**
	 * URL to a low-res preview of the image, used in large grids of images where high resolution is not a priority.
	 */
	thumbnail: string;

	/**
	 * List of tags applicable to the image.
	 */
	tags: string[];

	/**
	 * Medium to long form description of the image.
	 */
	description?: string;

	/**
	 * The year the image was created in.
	 */
	date: string;

	/**
	 * Filenames for each tile, in row-column order.
	 */
	tiles: string[][];

	/**
	 * Pixels int he tie
	 */
	dimensions: {
		/**
		 * X-dimension pixels
		 */
		x: number;

		/**
		 * Y-dimension pixels
		 */
		y: number;

		/**
		 * How many tiles in the X dimension
		 */
		columns: number;

		/**
		 * How many tiles in the Y dimension
		 */
		rows: number;
	}
}

export interface TagSidecar {
	/**
	 * Human-readable name for the tag.
	 */
	name: string;

	/**
	 * Human-readable description for the tag.
	 */
	description?: string;

	/**
	 * List of images within this tag.
	 */
	images: string[];
}

export interface CategorySidecar {
	name: string;
	description: string;
	associatedTags: string[];
}

/***********
 * INDEXES *
 ***********/

export interface TagIndex {
	/**
	 * Map of tags to their tag sidecars
	 */
	[name: string]: string;
}

export interface CategoriesIndex {
	/**
	 * Map of categories to lists of tags
	 */
	[name: string]: string[];
}

