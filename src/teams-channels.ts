export const channels = [
	{
		slug: "shipping-channel",
		name: "Canal de notificações",
		webhook: "",
		webhookTesting: "",
		grafana: "",
	},
];

export type TeamsChannel = (typeof channels)[number];
