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
	 * URL to a high-res but low detail preview of the image in SVG format. This should be blurred to hide that it's
	 * actually a low-poly SVG in disguise. Ideal for showing in large-format previews of images while the tiled version
	 * loads in.
	 */
	svg?: string;

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
	year?: number;

	/**
	 * How many tiles in the X dimension
	 */
	xTiles?: number;

	/**
	 * How many tiles in the Y dimension
	 */
	yTiles?: number;
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
	image_sidecars: string[];
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

