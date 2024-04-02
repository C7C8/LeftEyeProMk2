export type ImageData = {
	/**
	 * URL to a low-res preview of the image.
	 */
	thumbnail: string;

	/**
	 * List of tags applicable to the image.
	 */
	tags: string[];

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

export type Category = {
	/**
	 * Human-readable name for the category.
	 */
	name: string;

	/**
	 * Human-readable description for the category.
	 */
	description: string;

	/**
	 * List of images within this category.
	 */
	images?: ImageData[];
}
