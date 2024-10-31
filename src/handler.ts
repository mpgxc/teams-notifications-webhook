import type { SNSEvent, SNSHandler } from "aws-lambda";
import axios from "axios";
import { channels } from "./teams-channels";
import { TeamsExceptionCard } from "./teams-exception-card";

type NotificationPayload = {
	service: string;
	channel: string;
	error: {
		date: string;
		name: string;
		message: string;
		stack: string;
		cause: string;
	};
};

export const handler: SNSHandler = async (event: SNSEvent): Promise<void> => {
	try {
		for (const { Sns } of event.Records) {
			const content = JSON.parse(Sns.Message) as NotificationPayload;
			const channel = channels.find(({ slug }) => slug === content.channel);

			if (!channel) {
				console.warn("Canal não encontrado: ", content.channel);

				continue;
			}

			const cardContent = TeamsExceptionCard({
				service: content.service,
				error: content.error,
				channel,
			});

			const { status } = await axios.post(channel.webhook, cardContent);

			if (status !== 200) {
				throw new Error("A requisição do webhook do Teams falhou!");
			}
		}
	} catch (error) {
		console.error("Erro ao notificar o canal do Teams: ", error);
	}
};
