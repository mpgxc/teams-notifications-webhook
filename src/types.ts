/**
 * Tipos gerados altomaticamente a partir do JSON Schema do Adaptive Cards
 */

export type Card = {
	type: string;
	attachments: Attachment[];
};

export type Attachment = {
	contentType: string;
	contentUrl: unknown;
	content: CardContent;
};

export type CardContent = {
	type: string;
	body: Body[];
	actions: Action[];
	$schema: string;
	version: string;
};

export type Body = {
	type: string;
	style?: string;
	items?: Item[];
	bleed?: boolean;
	text?: string;
	spacing?: string;
	isSubtle?: boolean;
	wrap?: boolean;
	weight?: string;
};

export type Item = {
	type: string;
	columns?: Column[];
	text?: string;
	weight?: string;
	wrap?: boolean;
	fontType?: string;
	rows?: Row[];
};

export type Column = {
	type?: string;
	items?: Item2[];
	width: unknown;
};

export type Item2 = {
	type: string;
	size: string;
	weight: string;
	text: string;
	style: string;
	wrap: boolean;
};

export type Row = {
	type: string;
	cells: Cell[];
};

export type Cell = {
	type: string;
	items: Item3[];
};

export type Item3 = {
	type: string;
	text: string;
	wrap: boolean;
};

export type Action = {
	type: string;
	title: string;
	url: string;
};
