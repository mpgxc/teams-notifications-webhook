import type { TeamsChannel } from "./teams-channels";
import type { Card, CardContent } from "./types";

type NotificationTeamsCard = {
	service: string;
	channel: TeamsChannel;
	error: {
		date: string;
		name: string;
		message: string;
		stack: string;
		cause: string;
	};
};

export const TeamsExceptionCard = (params: NotificationTeamsCard): Card => {
	const content = {
		type: "AdaptiveCard",
		body: [
			{
				type: "Container",
				style: "emphasis",
				items: [
					{
						type: "ColumnSet",
						columns: [
							{
								type: "Column",
								items: [
									{
										type: "TextBlock",
										size: "large",
										weight: "bolder",
										text: `EXCEPTION - ${params.service}`,
										style: "heading",
										wrap: true,
									},
								],
								width: "stretch",
							},
						],
					},
				],
				bleed: true,
			},
			{
				type: "TextBlock",
				text: `**Horário:** ${params.error.date}`,
				spacing: "Small",
				isSubtle: true,
				wrap: true,
			},
			{
				type: "TextBlock",
				text: `**Título:** ${params.error.name}`,
				weight: "Bolder",
				spacing: "Medium",
				wrap: true,
			},
			{
				type: "TextBlock",
				text: `**Messagem:** ${params.error.message}`,
				wrap: true,
			},
			{
				type: "Container",
				items: [
					{
						type: "TextBlock",
						text: "Conteudo do erro",
						weight: "Bolder",
						wrap: true,
					},
					{
						type: "TextBlock",
						text: params.error.stack,
						fontType: "Monospace",
						wrap: true,
					},
				],
				spacing: "Medium",
				style: "attention",
			},
		],
		actions: [
			{
				type: "Action.OpenUrl",
				title: "Grafana",
				url: params.channel.grafana,
			},
		],
		$schema: "http://adaptivecards.io/schemas/adaptive-card.json",
		version: "1.5",
	} as CardContent;

	if (Object.keys(params.error.cause).length > 0) {
		content.body.push({
			type: "Container",
			items: [
				{
					type: "TextBlock",
					text: "Mais Detalhes",
					weight: "Bolder",
					wrap: true,
				},
				{
					type: "Table",
					columns: [
						{
							width: 1,
						},
						{
							width: 3,
						},
					],
					rows: Object.entries(params.error.cause).map(([key, value]) => ({
						type: "TableRow",
						cells: [
							{
								type: "TableCell",
								items: [
									{
										type: "TextBlock",
										text: key,
										wrap: true,
									},
								],
							},
							{
								type: "TableCell",
								items: [
									{
										type: "TextBlock",
										text: JSON.stringify(value, null, 2),
										wrap: true,
									},
								],
							},
						],
					})),
				},
			],
			spacing: "Medium",
			style: "emphasis",
		});
	}

	return {
		type: "message",
		attachments: [
			{
				contentType: "application/vnd.microsoft.card.adaptive",
				contentUrl: null,
				content,
			},
		],
	};
};
